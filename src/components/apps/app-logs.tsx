"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CaretDown } from "@phosphor-icons/react";
import { dayjs } from "@/lib/dayjs";

export function AppLogs({ logs }: { logs: string | null }) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("logs-container");
      if (!container) return;
      const shouldShowButton =
        container.scrollTop + container.clientHeight < container.scrollHeight;
      setShowScrollButton(shouldShowButton);
    };

    const container = document.getElementById("logs-container");
    if (!container) return;
    container.addEventListener("scroll", handleScroll);

    return () => {
      if (!container) return;
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    const container = document.getElementById("logs-container");
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  };
  const logsArray = logs?.split("\n") ?? [];
  return (
    <>
      {logs !== null && (
        <div
          id="logs-container"
          className="border dark:border-neutral-800 col-span-3 grid relative overflow-hidden overflow-y-auto overflow-x-auto bg-neutral-100 rounded-lg p-2 max-h-[420px] min-h-[400px] dark:bg-neutral-900"
        >
          <pre className="px-1">
            {logsArray.map((line, idx) => {
              const date = line.substring(0, 30);
              const log = line.substring(30);
              return (
                <div
                  className="flex items-center gap-x-1 px-2 py-1 dark:text-neutral-300 text-sm rounded-lg dark:hover:bg-neutral-800"
                  key={idx}
                >
                  <span className="text-neutral-500">
                    [{dayjs(date).format("YYYY-MM-DD HH:mm")}]
                  </span>
                  <p>{log}</p>
                </div>
              );
            })}
          </pre>

          {showScrollButton && (
            <Button
              size="icon"
              variant="secondary"
              left={<CaretDown />}
              onClick={scrollToBottom}
              rounded="full"
              className="sticky dark:hover:bg-neutral-800 bottom-0 left-0"
            />
          )}
        </div>
      )}
      {logs === null && (
        <div className="border dark:border-neutral-800 col-span-3 flex items-center justify-center bg-neutral-100 rounded-lg p-2 max-h-[450px] min-h-[400px] dark:bg-neutral-900">
          Start app to see logs.
        </div>
      )}
    </>
  );
}
