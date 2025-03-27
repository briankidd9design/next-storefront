import { Auth } from "convex/server";
import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { action, DatabaseReader, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
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

queryWithUser({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    //     const user = await ctx.db
    //       .query("users")
    //       .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
    //       .first();
    //   },
    const user = await getUserByClerkId(ctx.db, args.clerkId);
  },
});

export const getUserByClerkId = async (db: DatabaseReader, clerkId: string) => {
  const user = await db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .first();
  return user;
};

export const getUserByUsername = async (
  db: DatabaseReader,
  username: string
) => {
  const user = await db
    .query("users")
    .withIndex("by_username", (q) => q.eq("username", username))
    .first();
  return user;
};

export const getProductsByClerkId = async (
  db: DatabaseReader,
  clerkId: string
) => {
  const products = await db
    // we use the collect method so that we can get an array of products
    .query("products")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .collect();
  return products;
};

export const getSalesByStoreClerkId = async (
  db: DatabaseReader,
  storeClerkId: string
) => {
  const sales = await db
    // we use the collect method so that we can get an array of products
    .query("sales")
    .withIndex("by_storeClerkId", (q) => q.eq("storeClerkId", storeClerkId))
    .collect();
  return sales;
};
export const getSalesByProductId = async (
  db: DatabaseReader,
  productId: string
) => {
  const sales = await db
    // we use the collect method so that we can get an array of products
    .query("sales")
    .withIndex("by_productId", (q) => q.eq("productId", productId))
    .collect();
  return sales;
};

export const getSalesByCustomerClerkId = async (
  db: DatabaseReader,
  customerClerkId: string
) => {
  const sales = await db
    // we use the collect method so that we can get an array of products
    .query("sales")
    .withIndex("by_customerClerkId", (q) =>
      q.eq("customerClerkId", customerClerkId)
    )
    .collect();
  return sales;
};

export const getKeyByClerkId = async (db: DatabaseReader, clerkId: string) => {
  const key = await db
    // we use the collect method so that we can get an array of products
    .query("keys")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .first();
  return key;
};
