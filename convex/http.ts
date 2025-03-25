import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { onCreateUser } from "./clerk";
// create an instance of the router
const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  // handler: httpAction(async () => {
  //   new Promise<any>((resolve) => setTimeout(resolve, 1000));
  //   return new Response("Test", { status: 200 });
  // }),
  handler: onCreateUser,
});

export default http;
