// dont ttrigger middleware but calling prisma

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter:PrismaAdapter(db),
  // we didnt use session in prismaSchema bcz it dowsnt work in edge
  session: { strategy:'jwt' },
  ...authConfig
})