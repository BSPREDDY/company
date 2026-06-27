import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.jpeg'
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav
            className="
      sticky
      top-0
      z-50
      glass
      "
        >
            <div
                className="
        max-w-7xl
        mx-auto
        flex
        justify-between
        items-center
        pr-5
        p-2
        pl-2
        "
            >
                <div className="">
                    <img src={logo} alt="Logo" className="logo" height={40} width={60} className="rounded" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">

                    <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>

                    <Link to="/about" className="hover:text-yellow-500 transition-colors">About</Link>

                    <Link to="/services" className="hover:text-yellow-500 transition-colors">Services</Link>

                    <Link to="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-xl cursor-pointer"
                    onClick={toggleMenu}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/50 backdrop-blur-xl border-t border-white/10">
                    <div className="flex flex-col gap-4 p-5">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/services"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
