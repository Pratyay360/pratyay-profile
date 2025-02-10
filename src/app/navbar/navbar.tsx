'use client'; // Mark as client component

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/themer/themer";
import "./styles1.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} passHref>
      <span
        className="block px-4 py-2 text-lg dark:text-white hover:text-gray-500 cursor-pointer md:text-base md:py-0"
        onClick={() => setIsOpen(false)}
      >
        {children}
      </span>
    </Link>
  );

  return (
    <nav className="sticky top-0 navheader z-50 backdrop-blur-md font-bold">
      <div className="container mx-auto p-5">
        <div className="flex items-center justify-between md:justify-center">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-x-6 text-xl">
            <NavLink href="/#aboutme">About Me</NavLink>
            <NavLink href="/#education">Education</NavLink>
            <NavLink href="/#skills">Skills</NavLink>
            <NavLink href="/#certificate">Certificates</NavLink>
            <NavLink href="/#projects">Projects</NavLink>
            <NavLink href="/#blogs">Blogs</NavLink>
            <NavLink href="/#resume">Resume</NavLink>
            <NavLink href="/#donate">Donate</NavLink>
            <NavLink href="/#contact">Contact Me</NavLink>
            <ModeToggle />
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 md:hidden shadow-lg">
              <div className="flex flex-col items-center py-4">
                <NavLink href="/#aboutme">About Me</NavLink>
                <NavLink href="/#education">Education</NavLink>
                <NavLink href="/#skills">Skills</NavLink>
                <NavLink href="/#certificate">Certificates</NavLink>
                <NavLink href="/#projects">Projects</NavLink>
                <NavLink href="/#blogs">Blogs</NavLink>
                <NavLink href="/#resume">Resume</NavLink>
                <NavLink href="/#donate">Donate</NavLink>
                <NavLink href="/#contact">Contact Me</NavLink>
                <div className="mt-4">
                  <ModeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}