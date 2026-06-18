import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; // ✅ Use shared server client

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient(); // ✅ Await the async factory

  const {
    data: { user },
  } = await supabase.auth.getUser(); // ✅ Always getUser(), never getSession()

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white px-6 py-3 flex justify-between items-center shadow-sm">
  <div className="font-bold text-gray-900">AutoKing CMS</div>
  <div className="text-xs text-gray-500">{user.email}</div>
</header>
      <main className="p-6">{children}</main>
    </div>
  );
}