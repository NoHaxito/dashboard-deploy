import { getAppStats } from "@/services/app";

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}
function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

async function* makeIterator(appId: string) {
  while (true) {
    const stats = await getAppStats(appId);
    yield encoder.encode(stats);
    await sleep(1000); // Espera 1 segundo entre cada iteración (puedes ajustar el tiempo según tus necesidades)
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const iterator = makeIterator(params.id);
  const stream = iteratorToStream(iterator);
  const response = new Response(stream);
  response.headers.set("Content-Type", "application/json");

  return response;
}
