"use client";

import {
  ArrowCounterClockwise,
  CircleNotch,
  Play,
  Stop,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { toast } from "sonner";

export function ActionButtons({ app }: { app: any }) {
  const [loading, setLoading] = useState({
    start: false,
    stop: false,
    restart: false,
  });
  const router = useRouter();
  const params = useParams();
  async function startApp() {
    setLoading({ ...loading, start: true });
    const res = await fetch(`/api/apps/${params.appId}/start`, {});
    const data = await res.json();
    router.refresh();
    setLoading({ ...loading, start: false });
    toast("App is now starting", {
      // description: "Monday, January 3rd at 6:00pm",
    });
  }
  async function restartApp() {
    setLoading({ ...loading, restart: true });
    const res = await fetch(`/api/apps/${params.appId}/restart`, {});
    const data = await res.json();
    router.refresh();
    setLoading({ ...loading, restart: false });
    toast("App is now restarting", {
      // description: "Monday, January 3rd at 6:00pm",
    });
  }
  async function stopApp() {
    setLoading({ ...loading, stop: true });
    const res = await fetch(`/api/apps/${params.appId}/stop`, {});
    const data = await res.json();
    router.refresh();
    setLoading({ ...loading, stop: false });
    toast("App is now stopped", {
      // description: "Monday, January 3rd at 6:00pm",
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={startApp}
        disabled={app.State.Running || loading.start}
        rounded="xl"
        variant="green"
        size="sm"
        left={
          loading.start ? <CircleNotch className="animate-spin" /> : <Play />
        }
      >
        Start
      </Button>
      <Button
        onClick={restartApp}
        disabled={app.State.Restarting || !app.State.Running || loading.restart}
        rounded="xl"
        variant="secondary"
        size="sm"
        left={
          loading.restart ? (
            <CircleNotch className="animate-spin" />
          ) : (
            <ArrowCounterClockwise />
          )
        }
      >
        Restart
      </Button>
      <Button
        onClick={stopApp}
        disabled={!app.State.Running || loading.stop}
        rounded="xl"
        variant="destructive"
        size="sm"
        left={
          loading.stop ? <CircleNotch className="animate-spin" /> : <Stop />
        }
      >
        Stop
      </Button>
    </div>
  );
}
