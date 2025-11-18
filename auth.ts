// auth.ts   (in the root of the project, next to package.json)
import NextAuth from "next-auth"
import { authConfig } from "./authConfig"

// NextAuth v5 returns { handlers, auth, signIn, signOut }
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)