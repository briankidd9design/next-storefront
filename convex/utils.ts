import { Auth } from "convex/server";
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { action, mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

async function getUserId(ctx: { auth: Auth }) {
  // context (ctx) has information about our user including the userId
  const authInfo = await ctx.auth.getUserIdentity();
  // subject will give us the clerk id and this is either going to ba string or undefined
  return authInfo?.subject;
}

// Helper functions
// queryWithUser will have the userId attached to it from clerk
// With these helper functions we can prevent the user from doing anything if they are not logged in and also we do not need to manually query the user every single time we want access to the current user within a convex funtion
export const queryWithUser = customQuery(
  query,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx),
    };
  })
);

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);
export const actionWithUser = customAction(
  action,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);
