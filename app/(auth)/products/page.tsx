import { ContentLayout } from "@/app/(auth)/content-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Products",
};

export default function Page() {
  return (
    <ContentLayout
      title="Products"
      description="Manage your products and view their sales performance"
      action={<Link href="/products/new">
        <Button>New Product</Button>
      </Link>}> 
      products
    </ContentLayout>
  );
}
