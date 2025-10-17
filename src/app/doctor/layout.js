"use client";
import { assets } from "@/app/assets_admin/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DoctorLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Hide sidebar on login page
  if (pathname === "/doctor/login") return <>{children}</>;

  const navLinks = [
    { href: "/doctor/dashboard", icon: assets.home_icon, label: "Dashboard" },
    { href: "/doctor/appointment", icon: assets.appointment_icon, label: "Appointments" },
    { href: "/doctor/profile", icon: assets.list_icon, label: "Profile" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post("/api/doctor/logout");
      toast.success("Logged out successfully!");
      router.push("/doctor/login");
    } catch (error) {
      toast.error("Logout failed, please try again");
    }
  };

  return (
    <div className="flex gap-10 min-h-screen w-full my-10">
      {/* ==== Mobile Header ==== */}
      <div className="fixed md:hidden top-0 left-0 w-full bg-white border-b shadow-sm flex items-center justify-between px-4 py-3 z-20">
        <h2 className="text-xl font-semibold">Doctor Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle sidebar">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ==== Sidebar ==== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-sm p-6 mt-10 flex-col z-30 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:flex`}
      >
        <h2 className="text-2xl font-semibold mb-8 hidden md:block">Doctor Panel</h2>

        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-semibold">Doctor Panel</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-3 flex-1">
          {navLinks.map(({ href, icon, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-6 mb-5 p-3 rounded-lg bg-red-600 text-white w-full hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ==== Main Content ==== */}
      <main className="flex-1 bg-gray-50 min-h-screen p-6 md:ml-34 mt-14 md:mt-0 transition-all">
        {children}
      </main>
    </div>
  );
}
