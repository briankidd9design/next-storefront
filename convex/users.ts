import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { generateUsername } from "friendly-username-generator";
import { queryWithUser } from "./utils";

// export const getUsers = query({
//   args: {
//     userId: v.id("users"),
//   },
//   //   handler: async (ctx) => {
//   //   handler: async (ctx, args) => {
//   //     // const users = await ctx.db.query("users").collect();
//   //     // return await ctx.db.query("users").collect();
//   //     return await ctx.db.get(args.userId);
//   //     // console.log("users");
//   //     // return "users";
//   //   },
//   // We can pass this information to clerk via the context and this can be accomplished in a special util file
//   handler: (ctx, { userId }) => {
//     // const users = await ctx.db.query("users").collect();
//     // return await ctx.db.query("users").collect();
//     return ctx.db.get(userId);
//     // console.log("users");
//     // return "users";
//   },
// });
// using the utils file queryWithUser we can get the userId in a much nicer/cleaner way
export const getUsers = queryWithUser({
  args: {},
  handler: async (ctx) => {
    ctx.userId;
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
