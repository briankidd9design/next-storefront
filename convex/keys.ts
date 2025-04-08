import { v } from "convex/values";
import { getKeyByClerkId, mutationWithUser, queryWithUser } from "./utils";

export const getStripeSecretKey = queryWithUser({
  args: {},
  handler(ctx, args) {
    // This is technically called the non-null assertion operator. If the typescript compiler complains about a value being null or undefined , you can use the ! operator to assert that the said value is not null or undefined .
    return getKeyByClerkId(ctx.db, ctx.userId!);
  },
});
// This is used to create the stripe secret key
export const createStripeSecretKey = mutationWithUser({
  args: {
    stripeKey: v.string(),
  },
  handler: async (ctx, { stripeKey }) => {
    const hasStripeKey = await getKeyByClerkId(ctx.db, ctx.userId!);
    if (hasStripeKey) {
      await ctx.db.patch(hasStripeKey._id, { stripeKey });
    } else {
      await ctx.db.insert("keys", {
        clerkId: ctx.userId,
        stripeKey,
      });
    }
  },
});
