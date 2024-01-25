"use client";

import { useEffect, useState } from "react";
import { dayjs } from "@/lib/dayjs";
import { CircleNotch } from "@phosphor-icons/react";
export function UptimeCounter({ uptimeDate }: { uptimeDate: string }) {
  const [mounted, setMounted] = useState(false);
  const [uptime, setUptime] = useState<string | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const ahora = dayjs();
      const duracion = dayjs.duration(ahora.diff(dayjs(uptimeDate)));

      const horas = duracion.hours().toString().padStart(2, "0");
      const minutos = duracion.minutes().toString().padStart(2, "0");
      const segundos = duracion.seconds().toString().padStart(2, "0");
      setUptime(`${horas}:${minutos}:${segundos}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      {mounted && uptime !== null ? (
        <div className="text-neutral-500 text-sm">({uptime})</div>
      ) : (
        <CircleNotch className="animate-spin" />
      )}
    </>
  );
}
