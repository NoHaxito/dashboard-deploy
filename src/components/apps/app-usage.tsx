"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function AppUsage() {
  const params = useParams();
  const [cpuUsage, setCpuUsage] = useState("Loading...");
  const [ramUsage, setRamUsage] = useState("Loading...");
  const [netUsage, setNetUsage] = useState("Loading...");

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/apps/${params.appId}/stats`);
      const data = await res.json();
      setCpuUsage(data.CPUPerc);
      setRamUsage(data.MemUsage);
      setNetUsage(data.NetIO);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Card className="dark:bg-neutral-900 bg-neutral-100">
        <CardHeader className="space-y-0 px-4 py-4">
          <CardTitle className="text-2xl">CPU Usage</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">{cpuUsage}</CardContent>
      </Card>
      <Card className="dark:bg-neutral-900 bg-neutral-100">
        <CardHeader className="space-y-0 px-4 py-4">
          <CardTitle className="text-2xl">RAM Usage</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">{ramUsage}</CardContent>
      </Card>
      <Card className="dark:bg-neutral-900 bg-neutral-100">
        <CardHeader className="space-y-0 px-4 py-4">
          <CardTitle className="text-2xl">NET Usage</CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">{netUsage}</CardContent>
      </Card>
    </>
  );
}
