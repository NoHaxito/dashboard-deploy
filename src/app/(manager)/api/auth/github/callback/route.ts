import { github, lucia } from "@/auth";
import { db } from "@/db";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";

export async function GET(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    const userAlreadyRegistered = await db
      .selectFrom("auth_user")
      .selectAll()
      .where("email", "=", githubUser.email)
      .executeTakeFirst();
    // if (userAlreadyRegistered) {
    //   return new Response(
    //     "User already registered with this email. Please log-in and link your account with this provider.",
    //     {
    //       status: 400,
    //     }
    //   );
    // }
    const existingUser = await db
      .selectFrom("oauth_account")
      .selectAll()
      .where("provider_id", "=", "github")
      .where("provider_user_id", "=", githubUser.id)
      .executeTakeFirst();

    if (existingUser) {
      const session = await lucia.createSession(existingUser.user_id, {
        username: githubUser.login,
        email: githubUser.email,
        avatar_url: githubUser.avatar_url,
      });
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(20);
    await db
      .insertInto("auth_user")
      .values({
        id: userId,
        username: githubUser.login,
        email: githubUser.email,
        avatar_url: githubUser.avatar_url,
      })
      .execute();
    await db
      .insertInto("oauth_account")
      .values({
        provider_id: "github",
        provider_user_id: githubUser.id,
        user_id: userId,
      })
      .execute();
    const session = await lucia.createSession(userId, {
      username: githubUser.login,
      email: githubUser.email,
      avatar_url: githubUser.avatar_url,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e: any) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(e.message, {
        status: 400,
      });
    }
  }
}

interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
}
