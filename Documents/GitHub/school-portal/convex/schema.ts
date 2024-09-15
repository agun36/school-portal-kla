// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,
    users: defineTable({
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),
        // other "users" fields...
        role: v.optional(v.string()),
    }).index("email", ["email"]),
    admin: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
    students: defineTable({
        email: v.string(),
        role: v.string(),
        password: v.string(),
    }).index("email", ["email"]),
    teachers: defineTable({
        email: v.string(),
        role: v.string(),
        password: v.string(),
    }).index("email", ["email"]),
});