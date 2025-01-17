"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Profile from "./Profile";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="px-6 py-4 bg-[#D7DEDC] text-gray-500 flex justify-between items-center">
      {/* Logo Section */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={45} height={45} />
        <h1 className="font-extrabold text-2xl text-[#7263f3]">Job Hunter</h1>
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-gray-600 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {/* Show different icons based on menu state */}
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-[#D7DEDC] p-4 md:static md:w-auto md:flex md:items-center md:gap-8 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <li>
            <Link
              href={"/findwork"}
              className={`py-2 px-4 rounded-md ${
                pathname === "/findwork"
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : ""
              }`}
            >
              Find Work
            </Link>
          </li>
          <li>
            <Link
              href={"/myjobs"}
              className={`py-2 px-4 rounded-md ${
                pathname === "/myjobs"
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : ""
              }`}
            >
              My Jobs
            </Link>
          </li>
          <li>
            <Link
              href={"/postjob"}
              className={`py-2 px-4 rounded-md ${
                pathname === "/postjob"
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : ""
              }`}
            >
              Post a Job
            </Link>
          </li>
        </ul>
      </nav>

      {/* Authentication Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <>
            <Link
              href={"https://job-portal-app-mern-nqri.onrender.com/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href={"https://job-portal-app-mern-nqri.onrender.com/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 text-[#7263F3] border-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
