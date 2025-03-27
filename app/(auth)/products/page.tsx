import { ContentLayout } from "@/app/(auth)/content-layout";

export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <ContentLayout
      title="Products"
      description="Manage your products and view their sales performance"
    >
      products
    </ContentLayout>
  );
}
