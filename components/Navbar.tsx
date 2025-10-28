"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Sensors Dashboard</h1>

      <ul className="flex gap-6 relative">
        <li>
          <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        </li>

        {/* Dropdown Menu */}
                <li className="relative">
          <button
            className="text-black hover:text-blue-500"
            onClick={() => setOpen(!open)}
          >
            Sensors ▼
          </button>

          {open && (
            <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md border w-40 z-50">
              <li>
                <Link
                  href="/dashboard-temp"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Temperature
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard-humidity"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Humidity
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
