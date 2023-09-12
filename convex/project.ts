import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { projectSchema } from "./schema";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: { ...projectSchema, userId: v.string() },
    handler: async (ctx, args) => {
        const createProject = await ctx.db.insert("projects", {
            name: args.name,
            description: args.description,
            owners: [args.userId],
            badge: args.badge,
            expectedCompletionDate: args.expectedCompletionDate,
            priority: args.priority,
            status: args.status,
        });

        await ctx.db.insert("users_projects", {
            userId: args.userId,
            projectId: createProject,
        });

        return createProject;
    },
});

export const getAll = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const allUsersPorjects = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();

        const allProjects = allUsersPorjects.map(async (p) => {
            const projects = await ctx.db.get(p.projectId);
            return projects || [];
        });

        return (await Promise.all(allProjects)).flat();
    },
});

export const getById = query({
    args: { id: v.string() },

    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id as Id<"projects">);
        return project;
    },
});

export const checkIfUserHasAccess = query({
    args: { userId: v.string(), projectId: v.string() },
    handler: async (ctx, args) => {
        const userProject = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!userProject) {
            return false;
        }

        return userProject.userId === args.userId;
    },
});