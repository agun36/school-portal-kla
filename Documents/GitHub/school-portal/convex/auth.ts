// convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { MutationCtx, query } from "./_generated/server";
import { DataModel, Id } from "./_generated/dataModel";
import { GenericQueryCtx } from "convex/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password],
});



export const getUser = query(async (ctx: GenericQueryCtx<any>, args: {}) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("No user identity found");
  }
  const user = await ctx.db.query("admin").filter(q => q.eq("email", identity.email)).first();
  if (user) {
    return {
      ...user,
      role: "admin" // Add the role property
    };
  }
  return null;
});

export type User = {
  _id: Id<"admin">;
  _creationTime: number;
  name: string;
  tokenIdentifier: string;
  role: string; // Add the role property
};