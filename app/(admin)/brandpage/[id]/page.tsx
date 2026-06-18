import BrandPageForm from "@/app/components/cms/BrandPageForm";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BrandPageForm id={id} />;
}