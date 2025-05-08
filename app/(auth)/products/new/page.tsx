import { ContentLayout } from "@/app/(auth)/content-layout";
import { NewProductForm } from "./new-product-form";

export default function NewProduct() {
  return (
    <ContentLayout title="New Product" description="Add your new product">
      <NewProductForm />
    </ContentLayout>
  );
}
