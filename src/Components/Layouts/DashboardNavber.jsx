"use client"
import useAuth from "@/Hook/sheard";
import Link from "next/link";
import { HiOutlineHome, HiOutlineCube, HiOutlineChartBar, HiOutlineCog, HiOutlineLogout, HiOutlineUserGroup } from "react-icons/hi";

const DashboardNavber = () => {
    const {logOut} = useAuth()
    return (
        <nav className="min-h-screen inset-y-0 left-0  bg-slate-900 text-white flex flex-col  ">

          
            <div className="h-20 flex items-center justify-center border-b border-slate-800">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className={`text-xl font-bold tracking-tight  uppercase hidden sm:block`}>
                        Project<span className="text-primary">Pulse</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-4 mb-4">Main Menu</p>

                <NavItem icon={<HiOutlineHome size={22} />} label="Overview"  active={true} />
                <NavItem icon={<HiOutlineCube size={22} />} label="Assigned Projects" href={`/dashboard/assignedProject`} />
                <NavItem icon={<HiOutlineUserGroup size={22} />} label="Team"    />
                <NavItem icon={<HiOutlineChartBar size={22} />} label="Analytics"  />

                <div className="pt-6">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-4 mb-4">Settings</p>
                    <NavItem icon={<HiOutlineCog size={22} />} label="Configurations" />
                </div>
            </div>

       
            <div className="p-4 border-t border-slate-800">
                <button onClick={() => logOut()} className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all font-medium">
                    <HiOutlineLogout size={22} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};


function NavItem({ icon, label, href,  active = false }) {
    return (
        <Link href={`${href ? href : '/dashboard'}`} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${active
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}>
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}

export default DashboardNavber;