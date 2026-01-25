"use client"
import useAuth from "@/Hook/sheard";
import useRole from "@/Hook/useRole";
import Link from "next/link";
import { useState } from "react"; 
import { motion } from "framer-motion";
import { HiOutlineHome, HiOutlineCube, HiOutlineChartBar, HiOutlineCog, HiOutlineLogout, HiOutlineUserGroup, HiMenuAlt2, HiX, HiOutlineClipboardList, HiOutlineShieldExclamation, HiOutlineDocumentAdd, HiOutlineAdjustments, HiOutlineSparkles } from "react-icons/hi";

const DashboardNavber = () => {
    const { logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false); 
    const { role } = useRole()

    return (
        <>
           
            <motion.div 
                className="lg:hidden flex w-full  items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-slate-950 text-white border-b border-slate-800/50  "
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div 
                        className="bg-gradient-to-r from-primary to-secondary p-1.5 rounded-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </motion.div>
                    <span className="font-bold tracking-tight uppercase text-sm group-hover:text-primary transition-colors">ProjectPulse</span>
                </Link>
                <motion.button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-slate-800/50 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isOpen ? <HiX size={28} /> : <HiMenuAlt2 size={28} />}
                </motion.button>
            </motion.div>

            {/* Sidebar Navigation */}
            <motion.nav 
                className={`
                    fixed inset-y-0 left-0 z-40 h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col transition-transform duration-300 transform w-72
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 lg:static lg:inset-0 min-h-screen border-r border-slate-800/50 backdrop-blur-xl
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Logo Section */}
                <motion.div 
                    className="h-24 flex items-center justify-center border-b border-slate-800/50 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 hover:opacity-100 transition-opacity" />
                    <Link href="/" className="flex items-center gap-3 relative z-10 group">
                        <motion.div 
                            className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </motion.div>
                        <span className="text-xl font-bold tracking-tight uppercase">
                            Project<span className="text-primary">Pulse</span>
                        </span>
                    </Link>
                </motion.div>

                {/* Navigation Items */}
                <motion.div 
                    className="flex-1 px-4 py-8 space-y-2 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <p className="text-[11px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-6 flex items-center gap-2">
                        <HiOutlineSparkles size={14} />
                        Main Menu
                    </p>

                    {role === "client" && (
                        <>
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineHome size={22} />} label="Overview" active={true} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineCube size={22} />} label="Assigned Projects" href={`/dashboard/assignedProject`} />
                        </>
                    )}

                    {role === "employee" && (
                        <>
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineCube size={22} />} label="Assigned Projects" href={`/dashboard/assignedProject`} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineClipboardList size={22} />} label="Weekly Check-in" href={`/dashboard/weekly-check-in`} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineShieldExclamation size={22} />} label="Blocker Reports" href={`/dashboard/Blocker-Reports`} />
                        </>
                    )}

                    {role === "admin" && (
                        <>
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineCube size={22} />} label="Assigned Projects" href={`/dashboard/assignedProject`} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineClipboardList size={22} />} label="Weekly Check-in" href={`/dashboard/weekly-check-in`} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineShieldExclamation size={22} />} label="Blocker Reports" href={`/dashboard/Blocker-Reports`} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineDocumentAdd size={22} />} label="Create Project" href={`/dashboard/create-project`} />
                            <NavItem onClick={() => setIsOpen(false)} icon={<HiOutlineAdjustments size={22} />} label="Manage Projects" href={`/dashboard/manage-project`} />
                        </>
                    )}
                </motion.div>

                {/* Logout Button */}
                <motion.div 
                    className="p-4 border-t border-slate-800/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <motion.button 
                        onClick={() => logOut()} 
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all font-semibold text-sm bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 text-rose-400 hover:from-rose-500/20 hover:to-pink-500/20 hover:border-rose-500/50"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiOutlineLogout size={22} />
                        <span>Logout</span>
                    </motion.button>
                </motion.div>
            </motion.nav>

            {/* Mobile Overlay */}
            {isOpen && (
                <motion.div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </>
    );
};

function NavItem({ icon, label, href, active = false, onClick }) {
    return (
        <Link href={`${href ? href : '/dashboard'}`} onClick={onClick}>
            <motion.div
                className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                    active
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/50"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                >
                    {icon}
                </motion.div>
                <span>{label}</span>
                {active && <motion.div className="ml-auto w-2 h-2 bg-primary rounded-full" layoutId="activeIndicator" />}
            </motion.div>
        </Link>
    );
}

export default DashboardNavber;