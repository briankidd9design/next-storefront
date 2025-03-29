import { auth } from "@clerk/nextjs/server";

export async function getAuthToken() {
  // ?? if the value is null or undefined
  // The return value will be a string or undefined
  return (await auth().getToken({ template: "convex" })) ?? undefined;
}
