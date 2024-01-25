import { getStreamLogs } from "@/services/app";
import { ExecaChildProcess } from "execa";

interface AsyncIterator {
  next(): Promise<{ value: Uint8Array; done: boolean }>;
}
function iteratorToStream(asyncIteratorFn: () => AsyncIterator) {
  const iterator = asyncIteratorFn();

  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(new Uint8Array(value));
      }
    },
  });
}
async function* readCmdOutput(cmd: ExecaChildProcess<string>) {
  const onDataReceivedPromiseWrapper = (): Promise<{
    chunk?: Uint8Array;
    closed?: boolean;
  }> => {
    return new Promise((resolve, reject) => {
      cmd.stdout?.on("data", (chunk: any) => resolve({ chunk }));

      cmd.stderr?.on("data", (errChunk: any) => {
        reject(new Error(errChunk.toString("utf8")));
      });

      cmd.on("close", () => resolve({ closed: true }));
    });
  };

  while (true) {
    try {
      const { chunk, closed } = await onDataReceivedPromiseWrapper();

      if (closed) break;

      yield chunk as Uint8Array;
    } catch (e) {
      if (e instanceof Error) console.error(`ERROR: ${e.message}`);
      break;
    }
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cmd = getStreamLogs(params.id);

  const stream = iteratorToStream(() => readCmdOutput(cmd) as AsyncIterator);

  const headers = new Headers({
    "Content-Type": "application/json",
    "Content-Encoding": "none",
  });

  return new Response(stream, {
    status: 200,
    headers,
  });
}
