"use client"
import React, { useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { HiOutlineClock, HiOutlineMail, HiOutlineBadgeCheck, HiOutlineUserGroup, HiOutlineExclamationCircle, HiOutlineX, HiOutlineCalendar, HiOutlineTrendingUp, HiOutlineShieldExclamation } from "react-icons/hi";
import { motion } from 'framer-motion';
import useAxiosSecure from '../useAxiosSecure';
import useRole from '@/Hook/useRole';
import useAuth from '@/Hook/sheard';
import FeedbackPage from '../Dashboard/FeedbackPage';
import Loading from '../loading/Loading';

const Details = ({ id }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const role = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const { data: project, isLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/project/${id}`);
            return res.data;
        }
    });

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    if (isLoading) {
        return <Loading></Loading>
    }

    

    const statusConfig = {
        "Completed": { bg: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/50", text: "text-emerald-400", label: "✓ Completed" },
        "In Progress": { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/50", text: "text-blue-400", label: "→ In Progress" },
        "On Hold": { bg: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/50", text: "text-amber-400", label: "⏸ On Hold" },
    };

    const priorityConfig = {
        "High": { color: "text-red-400", bg: "from-red-500/20 to-pink-500/20", icon: "🔴" },
        "Medium": { color: "text-amber-400", bg: "from-amber-500/20 to-orange-500/20", icon: "🟠" },
        "Low": { color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/20", icon: "🟢" },
    };

    const currentStatus = statusConfig[project.status] || statusConfig["In Progress"];
    const currentPriority = priorityConfig[project.priority] || priorityConfig["Medium"];

    return (
        <div className="h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
       
            <motion.div
                className="absolute top-20 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20 -z-10"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
          
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                    <div className="relative p-8 md:p-12 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-xl">
                    
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                            <div>
                                <motion.div
                                    className="flex items-center gap-3 mb-4 flex-wrap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <motion.span
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${currentStatus.bg} border ${currentStatus.border} ${currentStatus.text}`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {currentStatus.label}
                                    </motion.span>
                                    <motion.span
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${currentPriority.bg} border ${currentPriority.border} ${currentPriority.color} flex items-center gap-2`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span>{currentPriority.icon}</span>
                                        {project.priority} Priority
                                    </motion.span>
                                </motion.div>

                                <motion.h1
                                    className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {project.project_name}
                                </motion.h1>

                                <motion.p
                                    className="text-slate-300 text-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Project ID: <span className="font-mono text-primary">{project._id}</span>
                                </motion.p>
                            </div>

                            {user && (
                                <motion.button
                                    onClick={toggleModal}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2 whitespace-nowrap"
                                >
                                    <HiOutlineMail className="w-5 h-5" />
                                    Give Feedback
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>

          
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                     
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-500/20 rounded-lg">
                                        <HiOutlineBadgeCheck className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Project Scope</h2>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-lg">{project.description}</p>
                            </div>
                        </div>

                    
                        <motion.div
                            className="group relative"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500 -z-10" />
                            <div className="relative p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/20 rounded-lg">
                                            <HiOutlineTrendingUp className="w-6 h-6 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Execution Progress</h2>
                                    </div>
                                    <motion.span
                                        className="text-4xl font-black text-primary"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {project.progress}%
                                    </motion.span>
                                </div>

                       
                                <div className="space-y-3">
                                    <div className="h-5 w-full bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 text-right">{project.progress}% Complete</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="space-y-6"
                    >
                  
                        <motion.div
                            className="group relative"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-amber-500/20 rounded-lg">
                                        <HiOutlineCalendar className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Deadline</p>
                                </div>
                                <p className="text-2xl font-black text-white">{project.deadline}</p>
                            </div>
                        </motion.div>

                   
                        <motion.div
                            className="group relative"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-red-500/20 rounded-lg">
                                        <HiOutlineShieldExclamation className="w-5 h-5 text-red-400" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Level</p>
                                </div>
                                <p className="text-2xl font-black text-white">{project.risk_level}</p>
                            </div>
                        </motion.div>

                    
                        <motion.div
                            className="group relative"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-purple-500/20 rounded-lg">
                                        <HiOutlineUserGroup className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Team Members</p>
                                </div>
                                <div className="space-y-2">
                                    {project.members && project.members.slice(0, 5).map((member, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-700/30 text-white text-sm font-semibold"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * idx }}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
                                                {member[0].toUpperCase()}
                                            </div>
                                            <span className="truncate">{member}</span>
                                        </motion.div>
                                    ))}
                                    {project.members && project.members.length > 5 && (
                                        <p className="text-xs text-slate-400 pt-2">+{project.members.length - 5} more members</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

          
            {isModalOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                  
                    <motion.div
                        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
                        onClick={toggleModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />

                    
                    <motion.div
                        className="relative bg-gradient-to-b from-slate-800 to-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-700/50"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                 
                        <motion.button
                            onClick={toggleModal}
                            className="absolute top-6 right-6 p-2 bg-slate-700/50 text-slate-300 rounded-full hover:bg-rose-500/20 hover:text-rose-400 transition-all border border-slate-600/50 z-10"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <HiOutlineX className="w-6 h-6" />
                        </motion.button>

                      
                        <div className="p-8">
                            <FeedbackPage setIsModalOpen={setIsModalOpen} projectData={project} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Details;
