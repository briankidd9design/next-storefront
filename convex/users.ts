import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { generateUsername } from "friendly-username-generator";
import { getUserByClerkId, mutationWithUser, queryWithUser } from "./utils";

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
export const getUser = queryWithUser({
  args: {},
  // handler: async (ctx) => {
  handler: async (ctx) => {
    // ! is technically called the non-null assertion operator. If the typescript compiler complains about a value being null or undefined , you can use the ! operator to assert that the said value is not null or undefined .
    // since we are querying on the server side, we could leave the async and await keywords out
    // return await getUserByClerkId(ctx.db, ctx.userId!);
    return getUserByClerkId(ctx.db, ctx.userId!);
  },
});

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

export const updateUser = mutationWithUser({
  args: {
    userId: v.id("users"),
    name: v.string(),
    about: v.string(),
    username: v.string(),
  },
  // look for a user and see if there is another user with the same username and find the first record that is returned
  handler: async (ctx, { userId, name, about, username }) => {
    const isUsernameTaken = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", username))
      .filter((q) => q.neq(q.field("clerkId"), ctx.userId!))
      .first();
    if (isUsernameTaken) {
      throw new ConvexError("USERNAME_TAKEN");
    }
    // we want to find the useId and update the name, about, username
    await ctx.db.patch(userId, { name, about, username });
  },
});

export const updateUserLogo = mutationWithUser({
  args: {
    userId: v.id("users"),
    logo: v.string(),
  },
  handler: async (ctx, { userId, logo }) => {
    await ctx.db.patch(userId, { logo });
  },
});
