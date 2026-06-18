"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  PenSquare, Newspaper, LayoutTemplate, Settings, LogOut, ArrowRight,
} from "lucide-react";

interface Stats {
  blogsTotal: number | null;
  brandsTotal: number | null;
}

interface CardDef {
  icon: React.ReactNode;
  label: string;
  desc: string;
  href: string;
  count?: number | null;
  countLabel?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [stats, setStats] = useState<Stats>({ blogsTotal: null, brandsTotal: null });

  useEffect(() => {
    (async () => {
      const [blogsRes, brandsRes] = await Promise.all([
        supabase.from("blogs_autoking").select("*", { count: "exact", head: true }),
        supabase.from("autoking_brands").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        blogsTotal: blogsRes.count ?? 0,
        brandsTotal: brandsRes.count ?? 0,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_authed");
    sessionStorage.clear();
    router.push("/login");
  };

  const cards: CardDef[] = [
    {
      icon: <PenSquare className="w-6 h-6" />,
      label: "New Blog Post",
      desc: "Write and publish a new article",
      href: "/dashboard/blogs/new",
    },
    {
      icon: <Newspaper className="w-6 h-6" />,
      label: "Blog Manager",
      desc: "Edit, publish & delete posts",
      href: "/dashboard/blogs",
      count: stats.blogsTotal,
      countLabel: "posts",
    },
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      label: "Add Brand Page",
      desc: "Engine / transmission SEO pages",
      href: "/brandpage",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Brands Manager",
      desc: "Edit, publish & delete brand pages",
      href: "/brands",
      count: stats.brandsTotal,
      countLabel: "pages",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col items-center justify-center bg-[#F4F6FA] px-4">
      <div className="w-full max-w-3xl py-14">

        <div className="text-center mb-10">
          <div className="w-10 h-[3px] rounded-full mx-auto mb-5 bg-[#E31E24]" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="mt-2 text-[14px] text-gray-400">Manage your website content from here</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => (
            <button
              key={card.href}
              onClick={() => router.push(card.href)}
              className="group relative text-left rounded-2xl p-6 transition-all duration-200
                         active:scale-[0.98] bg-white border border-gray-200 shadow-sm
                         hover:border-red-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center
                                bg-[#E31E24]/10 text-[#E31E24]">
                  {card.icon}
                </div>
                {card.count !== undefined && (
                  <span className="text-[11px] font-semibold text-gray-500 bg-gray-100
                                   rounded-full px-2.5 py-1">
                    {card.count === null
                      ? <span className="inline-block w-6 h-3 bg-gray-200 rounded animate-pulse" />
                      : `${card.count} ${card.countLabel}`}
                  </span>
                )}
              </div>

              <p className="text-[15px] font-bold mb-1 text-gray-900 flex items-center gap-1.5">
                {card.label}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100
                                       group-hover:translate-x-0 transition-all text-[#E31E24]" />
              </p>

              <p className="text-[12px] leading-relaxed text-gray-400">{card.desc}</p>

              <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-[#E31E24]
                              opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
  <button
    onClick={handleLogout}
    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border
               border-gray-300 bg-white text-gray-700 text-[13px] font-semibold
               hover:border-red-300 hover:text-[#E31E24] hover:bg-red-50
               shadow-sm transition-all duration-200"
  >
    <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
    Sign Out
  </button>
</div>

       <div className="mt-8 h-px bg-gray-300" />

<p className="text-center text-[11px] mt-6 text-gray-600 font-medium">
  TheAutoKingUSA — Engines &amp; Transmission Parts
</p>
      </div>
    </div>
  );
}