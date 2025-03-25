import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { generateUsername } from "friendly-username-generator";

export const getUsers = query({
  args: {
    userId: v.id("users"),
  },
  //   handler: async (ctx) => {
  //   handler: async (ctx, args) => {
  //     // const users = await ctx.db.query("users").collect();
  //     // return await ctx.db.query("users").collect();
  //     return await ctx.db.get(args.userId);
  //     // console.log("users");
  //     // return "users";
  //   },
  handler: (ctx, { userId }) => {
    // const users = await ctx.db.query("users").collect();
    // return await ctx.db.query("users").collect();
    return ctx.db.get(userId);
    // console.log("users");
    // return "users";
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { clerkId, name, email }) => {
    await ctx.db.insert("users", {
      clerkId,
      name,
      email,
      username: generateUsername(),
    });
  },
});
