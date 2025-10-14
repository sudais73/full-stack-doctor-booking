"use client";
import { assets } from "@/assets/assets";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const menuItems = [
  { name: "HOME", href: "/", key: "home" },
  { name: "ALL DOCTORS", href: "/all-doctors", key: "doctor" },
  { name: "ABOUT", href: "/about", key: "about" },
  { name: "CONTACT", href: "/contact", key: "contact" },
];

const Navbar = () => {
  const { user, setUser, router, userData } = useContext(AppContext);
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const Logout = async () => {
    try {
      const response = await axios.get("/api/user/logout", {
        withCredentials: true,
      });

      if (response.data.success) {
        userData();
        setOpenDropdown(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
useEffect(() => {
  if (showMenu) {
    document.body.style.overflow = "hidden"; 
  } else {
    document.body.style.overflow = "";
  }
}, [showMenu]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md ${
        isScrolled && !showMenu
          ? "bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-white"
      }`}
    >
      {/* Inner container with 10% padding */}
      <div className="max-w-[1400px] mx-auto px-[10%] py-3 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            alt="Healthcare Logo"
            src={assets.logo}
            className="w-10 md:w-15 cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center">
          {menuItems.map((item) => (
            <li key={item.key} className="text-center">
              <Link href={item.href} className="block py-1 cursor-pointer">
                {item.name}
              </Link>
              <hr
                className={`h-0.5 bg-blue-600 border-none w-3/5 mx-auto transition-all duration-300 ${
                  pathname === item.href ? "opacity-100" : "opacity-0"
                }`}
              />
            </li>
          ))}
        </ul>

        {/* User / Auth Button */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                className="p-2 rounded-lg border border-gray-400"
                aria-label="User menu"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                <Image
                  width={40}
                  height={40}
                  src={user.image}
                  alt="User Avatar"
                  className="w-5 md:w-5 rounded-lg cursor-pointer"
                />
              </button>

              {/* Dropdown */}
              {openDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-48 animate-fadeIn">
                  <button
                    onClick={() => {
                      router.push("/my-profile");
                      setOpenDropdown(false);
                    }}
                    className="block w-full text-left cursor-pointer hover:text-blue-600 py-1"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      router.push("/my-appointments");
                      setOpenDropdown(false);
                    }}
                    className="block w-full text-left cursor-pointer hover:text-blue-600 py-1"
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={Logout}
                    className="block w-full text-left cursor-pointer hover:text-blue-600 py-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hidden lg:block bg-blue-600 py-3 px-8 rounded-full text-sm text-white cursor-pointer"
            >
              Create account
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          aria-label="Open mobile menu"
          onClick={() => {setShowMenu(true), scrollTo(0,0)}}
          className="lg:hidden"
        >
          <Image
            src={assets.menu_icon}
            alt="menu"
            className="w-6 cursor-pointer"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[100%] bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Image src={assets.logo} alt="logo" className="w-28" />
          <button
            aria-label="Close mobile menu"
            onClick={() => setShowMenu(false)}
          >
            <Image
              src={assets.cross_icon}
              alt="close"
              className="w-8 cursor-pointer"
            />
          </button>
        </div>
        <ul className="flex flex-col gap-6 px-6 mt-4 text-lg font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setShowMenu(false)}
            >
              {item.name}
            </Link>
          ))}
          {!user && (
            <Link
              className="bg-blue-600 py-3 px-8 rounded-full text-sm text-white text-center"
              onClick={() => setShowMenu(false)}
              href={"/login"}
            >
              Create account
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
