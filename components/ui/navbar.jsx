"use client";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white px-6 py-4 shadow flex items-center justify-between">
        {/* Hamburger Icon */}
        <button onClick={() => setMenuOpen(true)} className="mr-4">
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
        </button>

        {/* Logo */}
        <Link href={"/"} className="text-yellow-500 text-2xl font-bold">Cheezious</Link>

        {/* Search Bar */}
        <div className="flex-1 mx-6 hidden md:block">
          <input
            type="text"
            placeholder="Find in Cheezious"
            className="w-full max-w-xl px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="font-medium flex items-center gap-2 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-black transition">
            <ShoppingCart className="w-5 h-5" />
            Cart
          </button>
          <button className="font-medium flex items-center gap-2 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-black transition">
            <User className="w-5 h-5" />
            Login
          </button>
        </div>
      </nav>

      {/* Sidebar with Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="bg-black bg-opacity-30 w-full h-full absolute" />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="bg-white w-1/2 h-full p-6 relative z-10 shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul className="space-y-4 text-lg">
              <li className="hover:text-yellow-500 cursor-pointer">Home</li>
              <li className="hover:text-yellow-500 cursor-pointer">Menu</li>
              <li className="hover:text-yellow-500 cursor-pointer">About</li>
              <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
