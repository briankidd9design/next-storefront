import { v } from "convex/values";
import { mutation } from "./_generated/server";
// 1, generate upload url
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
})
// 1. get file url
export const getFileUrl = mutation({
    args: {
        storageId: v.string()
    }, 
    handler: (ctx, { storageId }) => {
        return ctx.storage.getUrl(storageId)
    }
})