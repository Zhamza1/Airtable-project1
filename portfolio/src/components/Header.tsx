"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Footer",
    path: "#footer",
  },
];

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        {/* Logo remplacé par l'image d'Ismail */}
        <Link href="/" className="flex items-center">
          <img
            src="https://media.licdn.com/dms/image/v2/C4E03AQGnrEycAkfRHw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1653404526132?e=1751500800&v=beta&t=TlVfztlPiF3lxoOe2E8vJobVGEOif4zqIYg-HG8kOfU"
            alt="Ismail Mrabet"
            width={50}
            height={50}
            className="rounded-full border-2 border-white"
          />
        </Link>

        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              {/* Tu peux rajouter l'icône du menu ici */}
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              {/* Tu peux rajouter l'icône du menu fermé ici */}
            </button>
          )}
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="block py-2 pl-3 pr-4 text-slate-200 hover:text-white hover:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
