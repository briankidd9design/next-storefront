import { v } from "convex/values";
import { mutation } from "./_generated/server";
// This is the storage service that convex comes with and will be used to upload the logo
// 1. create a function that generates an upload url
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
// 2. get file url
// Make a get requeste to the gnerated url with the image type as a header and an image as a body
// We will get back a storageId which we can use to generate the url
// Convex will give us the url back and we can put that in the database.
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: (ctx, { storageId }) => {
    // @deprecated
    // Passing a string is deprecated, use storage.getUrl(Id<"_storage">) instead.
    return ctx.storage.getUrl(storageId);
  },
});
