import BlogEditorForm from "@/app/components/cms/BlogEditorForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogEditorForm id={id} />;
}