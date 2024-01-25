"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CaretDown } from "@phosphor-icons/react";

export function AppLogs({ logs }: { logs: string | null }) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("logs-container"); // Reemplaza 'tuContenedor' con el ID de tu contenedor
      if (!container) return;
      const shouldShowButton =
        container.scrollTop + container.clientHeight < container.scrollHeight;
      setShowScrollButton(shouldShowButton);
    };

    const container = document.getElementById("logs-container"); // Reemplaza 'tuContenedor' con el ID de tu contenedor
    if (!container) return;
    container.addEventListener("scroll", handleScroll);

    return () => {
      if (!container) return;
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    const container = document.getElementById("logs-container"); // Reemplaza 'tuContenedor' con el ID de tu contenedor
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      {logs !== null && (
        <div
          id="logs-container"
          className="relative overflow-hidden overflow-y-auto overflow-x-auto bg-neutral-200 rounded-lg p-2 max-h-[420px] min-h-[400px] dark:bg-neutral-900"
        >
          <pre className="px-2 text-sm dark:text-neutral-400">{logs}</pre>

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
        <div className="flex items-center justify-center bg-neutral-200 rounded-lg p-2 max-h-[450px] min-h-[400px] dark:bg-neutral-900">
          Start app to see logs.
        </div>
      )}
    </>
  );
}
