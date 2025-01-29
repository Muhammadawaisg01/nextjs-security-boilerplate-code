import { default as NextAuth } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { getProviders } from "next-auth/react";


const authOptions = {
    providers: [
        GoogleProvider({
          clientId:
            process.env.GOOGLE_CLIENT_ID,
          clientSecret:
            process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
}

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);



