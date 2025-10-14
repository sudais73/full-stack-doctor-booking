"use client"
import { assets } from "@/app/assets_admin/assets";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function DoctorLayout({ children }) {
const pathname = usePathname();
  

if (pathname === "/doctor/login") {
    return <>{children}</>;
  }
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-10">
      {/* Sidebar */}
      <aside className="">
        <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>
        <ul className="space-y-4">
          <li className="flex gap-2 p-2 rounded-lg bg-gray-400 mr-1">
            <Image alt="" src={assets.home_icon}/>
             <Link href="/doctor/dashboard">Dashboard</Link>
             </li>
              <li className="flex gap-2 p-2 rounded-lg bg-gray-400 mr-1">
            <Image alt="" src={assets.appointment_icon}/>
             <Link href="/doctor/appointment">Appointments</Link>
             </li>
              <li className="flex gap-2 p-2 rounded-lg bg-gray-400 mr-1">
            <Image alt="" src={assets.list_icon}/>
             <Link href="/doctor/profile">Profile</Link>
             </li>
     
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
