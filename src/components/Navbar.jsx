import React from "react";
import { Home, Info, Phone } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 backdrop-blur-xl shadow-xl rounded-full px-10 py-3 flex items-center justify-between w-[80%] max-w-4xl z-50 border border-gray-300 font-[Rubik]">
      {/* Logo */}
      <div className="text-3xl font-extrabold bg-gradient-to-l from-blue-600 to-red-400 text-transparent bg-clip-text tracking-wide drop-shadow-lg">
        EzStudyAI
      </div>
      {/* Nav Links */}
      <div className="flex space-x-8">
        <NavItem icon={<Home size={22} />} text="Home" href="#" />
        <NavItem icon={<Info size={22} />} text="About" href="#about" />
        <NavItem icon={<Phone size={22} />} text="Contact" href="#contact" />
      </div>
      {/* Authentication Buttons */}
      <div className="flex space-x-4">
        {/* Show user profile button when signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* Show Sign In & Sign Up buttons when signed out */}
        <SignedOut>
          <SignInButton>
            <button className="px-6 py-2 border border-gray-400 rounded-full text-gray-800 font-bold hover:bg-gray-200 transition duration-300 shadow-md">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-red-400 text-white font-bold rounded-full hover:opacity-90 transition duration-300 shadow-lg">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, text, href }) => {
  return (
    <a href={href} className="flex items-center space-x-2 cursor-pointer text-gray-900 font-bold hover:text-purple-600 transition duration-300">
      {icon}
      <span>{text}</span>
    </a>
  );
};

export default Navbar;