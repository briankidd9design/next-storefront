import { ContentLayout } from "@/app/(auth)/content-layout";
import { SettingsForm } from "@/app/(auth)/settings/settings-form";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/gitAuthToken";
import { fetchQuery } from "convex/nextjs";

export default async function Settings() {
  //   return "settings";
  // this will give us the token
  const token = await getAuthToken();
  const user = await fetchQuery(api.users.getUser, {}, { token });
  // console.log(user);
  return (
    <ContentLayout
      title="Settings"
      description="Update all of your store information"
    >
      {/* We can pass from a server component to a client component data */}
      <SettingsForm user={user} />
    </ContentLayout>
  );
}
