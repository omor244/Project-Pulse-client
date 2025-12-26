"use client"
import useAuth from "@/Hook/sheard";
import Link from "next/link";
import { useState } from "react"; 
import { HiOutlineHome, HiOutlineCube, HiOutlineChartBar, HiOutlineCog, HiOutlineLogout, HiOutlineUserGroup, HiMenuAlt2, HiX } from "react-icons/hi";

const DashboardNavber = () => {
    const { logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <>
           
            <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold tracking-tight uppercase text-sm">ProjectPulse</span>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-white transition-colors">
                    {isOpen ? <HiX size={28} /> : <HiMenuAlt2 size={28} />}
                </button>
            </div>

           
            <nav className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:static lg:inset-0 min-h-screen
            `}>

                <div className="h-20 flex items-center justify-center border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight uppercase">
                            Project<span className="text-blue-500">Pulse</span>
                        </span>
                    </Link>
                </div>

                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-4 mb-4">Main Menu</p>

                    <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineHome size={22} />} label="Overview" active={true} />
                    <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineCube size={22} />} label="Assigned Projects" href={`/dashboard/assignedProject`} />
                    <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineUserGroup size={22} />} label="Team" />
                    <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineChartBar size={22} />} label="Analytics" />

                    <div className="pt-6">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-4 mb-4">Settings</p>
                        <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineCog size={22} />} label="Configurations" />
                    </div>
                </div>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => logOut()} className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-medium">
                        <HiOutlineLogout size={22} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

        
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
                />
            )}
        </>
    );
};

function NavItem({ icon, label, href, active = false, onClick }) {
    return (
        <Link
            href={`${href ? href : '/dashboard'}`}
            onClick={onClick}
            className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}>
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}

export default DashboardNavber;