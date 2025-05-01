import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl py-4 px-6 ">
      <div className="max-w-5xl mx-auto flex justify-between items-center bg-gray-800 rounded-full px-6 py-3 shadow-lg">
        {/* Logo or title */}
        <Link to="/" className="text-white font-bold text-2xl hover:text-[#8a2be2]  transition-colors duration-200">
          F.M.Vhora
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative text-lg font-medium transition-all duration-300 px-2 py-1
                ${isActive(link.href) ? "text-white" : "text-gray-200"}
                hover:text-[#8a2be2]
                before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-[2px]
                before:bg-[#8a2be2] before:transition-all before:duration-300 before:rounded-full
                hover:before:w-full hover:before:left-0
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-200 transition p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 rounded-xl bg-gradient-dark-card backdrop-blur-xl shadow-lg p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-center text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300
                ${isActive(link.href) ? "text-white bg-white/10" : "text-gray-200"}
                hover:bg-white/10 hover:text-white
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
