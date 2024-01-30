import { validateRequest } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { oauthProviders } from "@/config/oauth_providers";
import { db } from "@/db";
import { Session } from "lucia";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Update your account settings. Link/Unlink your account with oauth providers.",
};
async function getConnectedAccounts(userId: string) {
  const connectedAccounts = await db
    .selectFrom("oauth_account")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();
  return { connectedAccounts };
}

export default async function AccountPage() {
  const { session } = (await validateRequest()) as { session: Session };

  const { connectedAccounts } = await getConnectedAccounts(session.userId);
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Account</h2>
      <p className="text-neutral-500 text-sm">
        Update your account settings. Link/Unlink your account with oauth
        providers.
      </p>
      <Separator />
      <img src={session.avatar_url} className="size-32 rounded-full" />
      <section>
        <h3 className="mb-2 text-xl font-bold">Linked accounts</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
          {oauthProviders.map((provider) => {
            const isConnected = connectedAccounts.find(
              (acc) => acc.provider_id === provider.id
            );
            return (
              <div
                key={provider.id}
                className="bg-neutral-100 rounded-lg px-3 py-2 dark:bg-neutral-900 flex items-center gap-4"
              >
                {provider.icon}
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm font-medium">{provider.name}</p>
                    {isConnected ? (
                      <Badge className="bg-green-500 dark:hover:bg-opacity-80 hover:!bg-green-500 hover:!bg-opacity-90 dark:bg-green-500">
                        Linked
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unlinked</Badge>
                    )}
                  </div>
                  {isConnected ? (
                    <>
                      <span className="text-xs text-neutral-500">
                        {session.username}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {session.userId}
                      </span>
                    </>
                  ) : (
                    <div className="line-clamp-2 text-xs text-neutral-500">
                      Linking your account you will able to use this provider to
                      login.
                    </div>
                  )}
                </div>
                <div className="ml-auto">
                  {isConnected ? (
                    <Button rounded="xl" size="xs" variant="destructive">
                      Unlink
                    </Button>
                  ) : (
                    <Button rounded="xl" size="xs" variant="default">
                      Link
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* <section>
        <h3 className="text-xl font-bold">Current sessions</h3>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-neutral-100 rounded-lg px-3 py-2 dark:bg-neutral-900 flex items-center gap-2">
            <Laptop className="size-12" />
            <div className="flex flex-col">
              <p className="text-sm font-medium">Windows</p>
              <span className="text-xs text-neutral-500">Chrome 121.0.0.0</span>
              <span className="text-xs text-neutral-500">
                192.168.0.0 (Tacna, PE)
              </span>
            </div>
            <div className="ml-auto">
              <Button rounded="xl" size="sm" variant="destructive">
                Revoke
              </Button>
            </div>
          </div>
          <div className="bg-neutral-100 rounded-lg px-3 py-2 dark:bg-neutral-900 flex items-center gap-2">
            <DeviceMobileCamera className="size-12" />
            <div className="flex flex-col">
              <p className="text-sm font-medium">Android</p>
              <span className="text-xs text-neutral-500">Chrome 121.0.0.0</span>
              <span className="text-xs text-neutral-500">
                192.168.0.0 (Lima, PE)
              </span>
            </div>
            <div className="ml-auto">
              <Button rounded="xl" size="sm" variant="destructive">
                Revoke
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
