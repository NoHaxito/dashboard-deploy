import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function ConsoleLoading() {
  return (
    <div className="flex items-center justify-center bg-neutral-200 rounded-lg p-2 max-h-[450px] min-h-[400px] dark:bg-neutral-900">
      <CircleNotch className="animate-spin h-8 w-8" />
    </div>
  );
}
