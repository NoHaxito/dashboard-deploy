"use client";

import { ArrowCounterClockwise, Play, Stop } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

export function ActionButtons({ app }: { app: any }) {
  const router = useRouter();
  const params = useParams();
  async function startApp() {
    const res = await fetch(`/api/apps/${params.appId}/start`, {});
    const data = await res.json();
    console.log(data);
    router.refresh();
  }

  async function restartApp() {
    const res = await fetch(`/api/apps/${params.appId}/restart`, {});
    const data = await res.json();
    console.log(data);
    router.refresh();
  }

  async function stopApp() {
    const res = await fetch(`/api/apps/${params.appId}/stop`, {});
    const data = await res.json();
    console.log(data);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={startApp}
        disabled={app.State.Running}
        rounded="xl"
        variant="green"
        size="sm"
        left={<Play />}
      >
        Start
      </Button>
      <Button
        onClick={restartApp}
        disabled={app.State.Restarting || !app.State.Running}
        rounded="xl"
        variant="secondary"
        size="sm"
        left={<ArrowCounterClockwise />}
      >
        Restart
      </Button>
      <Button
        onClick={stopApp}
        disabled={!app.State.Running}
        rounded="xl"
        variant="destructive"
        size="sm"
        left={<Stop />}
      >
        Stop
      </Button>
    </div>
  );
}
