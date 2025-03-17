import React from "react";
import { Home, Info, Phone } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();

    // If it's the home link and there's no specific section, scroll to top
    if (!sectionId || sectionId === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    // Find the section element
    const section = document.querySelector(sectionId);
    if (section) {
      // Scroll to the section
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-xl shadow-lg rounded-full px-8 py-4 flex items-center justify-between w-[90%] max-w-5xl z-50 border border-gray-200 font-[Rubik]">
      {/* Logo */}
      <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text tracking-wide drop-shadow-sm">
        EzStudyAI
      </div>

      {/* Nav Links */}
      <div className="flex space-x-10">
        <NavItem icon={<Home size={18} className="text-blue-500" />} text="Home" href="#" onClick={(e) => scrollToSection(e, "#")} />
        <NavItem icon={<Info size={18} className="text-purple-500" />} text="About" href="#about" onClick={(e) => scrollToSection(e, "#about")} />
        <NavItem icon={<Phone size={18} className="text-red-400" />} text="Contact" href="#contact" onClick={(e) => scrollToSection(e, "#contact")} />
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4">
        {/* Show user profile button when signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Show Sign In & Sign Up buttons when signed out */}
        <SignedOut>
          <SignInButton>
            <button className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 shadow-sm flex items-center">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-5 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-red-400 text-white font-medium rounded-full hover:shadow-md hover:scale-105 transition-all duration-300">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, text, href, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center space-x-2 cursor-pointer text-gray-700 font-medium hover:text-purple-600 hover:scale-105 transition-all duration-300"
    >
      <span className="p-1 rounded-full bg-gray-100/80">{icon}</span>
      <span>{text}</span>
    </a>
  );
};

export default Navbar;