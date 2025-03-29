import { ContentLayout } from "@/app/(auth)/content-layout";
import { SettingsForm } from "@/app/(auth)/settings/settings-form";

export default function Settings() {
  //   return "settings";
  return (
    <ContentLayout
      title="Settings"
      description="Update all of your store information"
    >
      <SettingsForm />
    </ContentLayout>
  );
}
