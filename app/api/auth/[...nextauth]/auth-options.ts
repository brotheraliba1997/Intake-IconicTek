import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { pagesOptions } from "./pages-options";

export const authOptions: NextAuthOptions = {
  pages: {
    ...pagesOptions,
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
          id: token.idToken as string,
        },
      };
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger == "update") {
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName;
        token.email = session.user.email;
        token.phone = session.user.phone;
        token.profileImageUrl = session.user.profileImageUrl;
        token.city = session.user.city;
        token.state = session.user.state;
        token.zipCode = session.user.zipCode;
        token.address = session.user.address;
      }
      console.log("11token after", token);
      return { ...token, ...user };
    },

    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          if (!response.ok) {
            const errorDetails = await response.json(); // Parse response body for detailed error
            throw new Error(
              errorDetails?.message || `HTTP Error: ${response.status}`
            );
          }

          const jsonRes = await response.json();
          if (jsonRes?.success) {
            const user = {
              ...jsonRes.data.user,
              accessToken: jsonRes.data.tokens.access.token,
            };
            console.log("user==>", user);
            return user;
          } else {
            throw new Error(jsonRes?.message || "Login failed");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
            throw new Error(err.message);
          } else {
            throw new Error("Unknown error occurred");
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
