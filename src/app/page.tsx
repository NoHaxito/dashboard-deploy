import { Button } from "@/components/ui/button";
import { DotOutline, House } from "@phosphor-icons/react/dist/ssr";
import { getAllApps } from "./api/apps/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dayjs } from "@/lib/dayjs";
import Link from "next/link";

export const revalidate = 5;
export const dynamic = "force-dynamic";

export default async function Home() {
  const allApps = await getAllApps();
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-2 sm:grid-cols-2">
        {allApps.map((app, i) => (
          <Link
            className="overflow-hidden rounded-lg"
            href={`/${app.ID}`}
            key={app.ID}
          >
            <Card className="active:border-neutral-500 transition-[border] duration-500 ease-in-out dark:active:border-neutral-400">
              <CardHeader className="px-4 py-2 flex flex-row space-y-0 items-center gap-2">
                <CardTitle className="flex-1 text-lg">{app.Names}</CardTitle>
                <DotOutline
                  weight="fill"
                  className={cn(
                    app.State === "running" && "text-green-500",
                    app.State === "exited" && "text-red-500",
                    app.State === "paused" && "text-gray-500",
                    "h-12 w-12 ml-auto"
                  )}
                />
              </CardHeader>
              <CardContent className="px-4 py-2">
                <p className="text-xs text-neutral-500">
                  {dayjs(dayjs().format(app.CreatedAt)).fromNow()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
