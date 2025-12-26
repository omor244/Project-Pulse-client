"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../button/Logo";

import useAuth from "@/Hook/sheard";

const Navber = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { logOut, user } = useAuth()


  

    // Active Link Styling Function (Next.js logic)
    const getLinkClass = (path) => {
        const isActive = pathname === path;
        return `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                ? "bg-primary text-white shadow-md shadow-blue-200"
            : ` ${pathname == '/' ? 'text-white' : 'text-gray-600'} hover:bg-slate-100 hover:text-primary`
            }`;
    };

    return (
        <div className={` ${pathname == "/" ? 'bg-[#020617] text-white' : "bg-white"}   border-b border-gray-100 sticky top-0 z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* 1. Logo Section */}
                   <Logo></Logo>

                    {/* 2. Desktop Navigation (Center) */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link href="/" className={getLinkClass("/")}>
                           Home
                        </Link>
                        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
                            Dashboard
                        </Link>
                        <Link href="/projects" className={getLinkClass("/projects")}>
                            Projects
                        </Link>
                        <Link href="/risks" className={getLinkClass("/risks")}>
                            Risks
                        </Link>
                    </div>

                    {
                        user ? <>
                            <div className="hidden md:flex items-center gap-4">
                                <div className="flex flex-col items-end mr-2 text-right">
                                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">Admin</span>
                                    <span className={`text-sm font-bold ${pathname == "/" ? ' text-white' : "text-slate-600"}`}>{user?.displayName}</span>
                                </div>

                                {/* DaisyUI Dropdown */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user?.photUrl} alt="Profile" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[10] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
                                        <li><Link href="/profile">Profile Settings</Link></li>
                                        <li><button onClick={() => logOut()} className="text-error font-semibold">Logout</button></li>
                                    </ul>
                                </div>
                            </div> 
                        </> : <> <Link href={'/login'} className="btn btn-primary">Login</Link> </>
                    }

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="btn btn-ghost btn-circle text-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-50 px-4 py-4 space-y-2 shadow-inner">
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-md font-medium text-gray-700 hover:bg-slate-50 hover:text-primary">Dashboard</Link>
                    <Link href="/projects" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-md font-medium text-gray-700 hover:bg-slate-50 hover:text-primary">Projects</Link>
                    <Link href="/risks" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-md font-medium text-gray-700 hover:bg-slate-50 hover:text-primary">Risks</Link>
                    <div className="divider my-1"></div>
                    
                </div>
            )}
        </div>
    );
};

export default Navber;