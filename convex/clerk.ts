import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
// import { headers } from "next/headers";
import { Webhook } from "svix";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;
console.log(webhookSecret);
async function validateRequest(request: Request) {
  const payloadString = await request.text();
  //   const headerPayload = headers();

  const svixHeaders = {
    "svix-id": request.headers.get("svix-id")!,
    "svix-timestamp": request.headers.get("svix-timestamp")!,
    "svix-signature": request.headers.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

// export async function POST(request: Request) {
//   const payload = await validateRequest(request);
//   console.log(payload);
//   return Response.json({ message: "Received" });
// }

export const onCreateUser = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  const data = event.data as UserJSON;
  // console.log(data);
  await ctx.runMutation(internal.users.createUser, {
    clerkId: data.id,
    name: `${data.first_name} ${data.last_name}`,
    email: data.email_addresses[0].email_address,
  });
  //   return new Response(null);
  console.log("User Identity");
  console.log("server identity", await ctx.auth.getUserIdentity());
  return new Response(null, { status: 200 });
});
