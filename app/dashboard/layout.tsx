// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

//     //vérifier si l'utilisateur est connecté
//     const session = await auth.api.getSession({ headers: await headers() });
//     if (!session) {
//         redirect("/authentication/login");
//     }
//     return (
//         <div>
//             <button>Deconnexion</button>
//             <main>{children}</main>
//         </div>

//     );
// }


"use client";
import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-800 rounded-lg ">
      <Sidebar isOpen={sidebarOpen} />
      <DashboardNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`transition-all duration-300 pt-20 ${sidebarOpen ? "ml-72" : "ml-20"
          }`}
      >
        <div className="p-6">{children}</div>
      </main>

    </div>
  );
}