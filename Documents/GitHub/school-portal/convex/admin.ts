import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
    args: { email: v.string(), password: v.string() },
    handler: async (ctx, { email, password }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeAdmin without authentication present");
        }

        // Check if we've already stored this identity before.
        const admin = await ctx.db
            .query("admin")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
        if (admin !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (admin.name !== identity.name) {
                await ctx.db.patch(admin._id, { name: identity.name });
            }
            return admin._id;
        }
        // If it's a new identity, create a new `Admin`.
        return await ctx.db.insert("admin", {
            name: identity.name ?? "Anonymous",
            tokenIdentifier: identity.tokenIdentifier,
        });
    },
});


export const createStudent = mutation({
    args: { email: v.string(), password: v.string(), role: v.string() },
    handler: async (ctx, { email, password, role }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called createStudent without authentication present");
        }

        console.log("Authenticated user identity:", JSON.stringify(identity, null, 2));

        // Check if the user is an admin
        const admin = await ctx.db
            .query("admin")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.email!))
            .unique();
        if (!admin) {
            console.log("Admin check failed for user:", identity.email);
            throw new Error("Only admins can create students");
        }

        console.log("Admin user found:", admin);

        // Check if the student already exists
        const existingStudent = await ctx.db
            .query("students")
            .withIndex("email", (q) => q.eq("email", email))
            .unique();
        if (existingStudent) {
            throw new Error("Student with this email already exists");
        }

        // Create a new student
        await ctx.db.insert("students", {
            email,
            password,
            role,
        });
    },
});
export const createTeacher = mutation({
    args: { email: v.string(), password: v.string(), role: v.string() },
    handler: async (ctx, { email, password, role }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called createStudent without authentication present");
        }

        // Check if the user is an admin
        const admin = await ctx.db
            .query("admin")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.email!))
            .unique();
        if (!admin) {
            throw new Error("Only admins can create teachers");
        }

        // Check if the teacher already exists
        const existingTeacher = await ctx.db
            .query("teachers")
            .withIndex("email", (q) => q.eq("email", email))
            .unique();
        if (existingTeacher) {
            throw new Error("Student with this email already exists");
        }

        // Create a new student
        await ctx.db.insert("students", {
            email,
            password,
            role,
        });
    },
});

export const deleteStudent = mutation({
    args: {
        email: v.string()
    },
    handler: async (ctx, { email }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called deleteStudent without authentication present");
        }
        // Check if the user is an admin
        const admin = await ctx.db
            .query("admin")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.email!))
            .unique();
        if (!admin) {
            throw new Error("Only admins can delete students");
        }
        // Find the student by email
        const student = await ctx.db
            .query("students")
            .withIndex("email", (q) => q.eq("email", email))
            .unique();
        if (!student) {
            throw new Error("Student not found");
        }
        // Delete the student
        await ctx.db.delete(student._id);
    }

});
export const deleteTeacher = mutation({
    args: {
        email: v.string()
    },
    handler: async (ctx, { email }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called deleteTeacher without authentication present");
        }
        // Check if the user is an admin
        const admin = await ctx.db
            .query("admin")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.email!))
            .unique();
        if (!admin) {
            throw new Error("Only admins can delete teachers");
        }
        // Find the student by email
        const teacher = await ctx.db
            .query("teachers")
            .withIndex("email", (q) => q.eq("email", email))
            .unique();
        if (!teacher) {
            throw new Error("Teacher not found");
        }
        // Delete the student
        await ctx.db.delete(teacher._id);
    }

});

export const listStudents = query(async (ctx) => {
    const students = await ctx.db.query("students").collect();
    return students;
});
export const listTeachers = query(async (ctx) => {
    const teachers = await ctx.db.query("teachers").collect();
    return teachers;
});