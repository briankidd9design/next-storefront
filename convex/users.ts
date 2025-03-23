import { v } from "convex/values";
import { query } from "./_generated/server";

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
