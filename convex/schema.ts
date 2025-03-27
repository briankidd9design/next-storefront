import { defineSchema, defineTable } from "convex/server";
// v is our validator that makes sure the data coming in adheres to the correct data types
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    name: v.string(),
    email: v.string(),
    about: v.optional(v.string()),
    logo: v.optional(v.string()),
  })
    // indexing makes it more efficient to find data entries because like a card catalog in a library, it can index certain data to make it easier to find. This prvents us from having to search through the entire database.
    .index("by_clerkId", ["clerkId"])
    .index("by_username", ["username"]),
  products: defineTable({
    clerkId: v.string(),
    name: v.string(),
    description: v.string(),
    content: v.optional(v.string()),
    price: v.number(),
    // we want to store the price in this products table and the sales table in case the store owner changes the price we do not want to change any sale records, which could have the old price
    currency: v.string(),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
  }).index("by_clerkId", ["clerkId"]),
  sales: defineTable({
    storeClerkId: v.string(),
    customerClerkId: v.string(),
    productId: v.string(),
    price: v.number(),
    currency: v.string(),
  })
    .index("by_storeClerkId", ["storeClerkId"])
    .index("by_customerClerkId", ["customerClerkId"])
    .index("by_productId", ["productId"]),
  // Stripe keys
  keys: defineTable({
    clerkId: v.string(),
    stripeKey: v.string(),
  }).index("by_clerkId", ["clerkId"]),
});
