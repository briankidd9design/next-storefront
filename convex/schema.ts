import { defineSchema, defineTable } from "convex/server";
// v is our validator that makes sure the data coming in adheres to the correct data types
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
  }),
});
