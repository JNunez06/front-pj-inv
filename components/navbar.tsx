"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            MiLogo
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-gray-300">Inicio</Link>
            <Link href="/prediction" className="hover:text-gray-300">Prediccion</Link>
           
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
            <Link href="/about" onClick={() => setOpen(false)}>Sobre mí</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
