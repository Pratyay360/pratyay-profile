import Link from "next/link";
import "./styles1.css";
import { ModeToggle } from "./themer";
export default function Navbar() {
  return (
    <div className="sticky top-0 navheader z-50 backdrop-blur-md flex flex-col font-bold">
      <header className="text-white-600 border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-xl">
            <Link href="/#aboutme">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                About Me
              </span>
            </Link>
            <Link href="/#education">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Education
              </span>
            </Link>
            <Link href="/#skills">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Skills
              </span>
            </Link>
            <Link href="/#certificate">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Certificates
              </span>
            </Link>
            <Link href="/#projects">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Projects
              </span>
            </Link>
            <Link href="/#blogs">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Blogs
              </span>
            </Link>
            <Link href="/#resume">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Resume
              </span>
            </Link>
            <Link href="/#donate">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Donate
              </span>
            </Link>
            <Link href="/#contact">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Contact Me
              </span>
            </Link>
            <div className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer z-auto ">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
