"use client"
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../Card/ProjectCard";
import axios from "axios";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle, HiOutlineTrendingUp, HiOutlineShieldExclamation, HiOutlineCheckCircle } from "react-icons/hi";
import Loading from "../loading/Loading";

const Risk = () => {
    const { data: risk = [], isLoading } = useQuery({
        queryKey: ['Risks'],
        queryFn: async () => {
            const res = await axios.get('https://project-plus-liard.vercel.app/risk')
            return res.data
        }
    })

   
    const highRiskCount = risk.filter(p => p.risk_level === "High").length;
    const mediumRiskCount = risk.filter(p => p.risk_level === "Medium").length;
    const lowRiskCount = risk.filter(p => p.risk_level === "Low").length;
    const totalRisks = risk.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };
           
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    if(isLoading) return <Loading></Loading>

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
          
            <motion.div
                className="absolute top-20 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl opacity-20 -z-10"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-4 py-16">
          
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Title and Badge */}
                    <div className="mb-8">
                        <motion.div className="inline-block mb-4">
                            <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest border border-red-500/40 backdrop-blur-sm flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                                </span>
                                Critical Risk Assessment
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
                            Risk <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Management</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            Monitor high-priority issues and manage project risks with real-time insights
                        </p>
                    </div>

                    {/* Risk Stats Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-red-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">Total Risks</p>
                                        <p className="text-4xl font-black text-white">{totalRisks}</p>
                                    </div>
                                    <HiOutlineExclamationCircle className="w-10 h-10 text-red-500 opacity-40" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-red-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">High Risk</p>
                                        <p className="text-4xl font-black text-red-400">{highRiskCount}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-red-400 font-black">🔴</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-amber-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">Medium Risk</p>
                                        <p className="text-4xl font-black text-amber-400">{mediumRiskCount}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-amber-400 font-black">🟠</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-emerald-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">Low Risk</p>
                                        <p className="text-4xl font-black text-emerald-400">{lowRiskCount}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-emerald-400 font-black">🟢</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Risk Projects Grid */}
                {isLoading ? (
                    <motion.div
                        className="flex items-center justify-center py-20"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
                            <p className="text-slate-400 font-semibold">Loading risk assessment...</p>
                        </div>
                    </motion.div>
                ) : risk.length === 0 ? (
                    <motion.div
                        className="flex items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center">
                            <div className="inline-flex p-4 bg-emerald-500/20 rounded-full mb-4">
                                <HiOutlineCheckCircle className="w-12 h-12 text-emerald-400" />
                            </div>
                            <p className="text-slate-300 font-bold text-2xl mb-2">All Clear!</p>
                            <p className="text-slate-400">No high-risk projects detected. Keep up the good work!</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                    >
                        {risk.map((project) => (
                            <motion.div key={project._id} variants={itemVariants}>
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Warning Banner */}
                {risk.length > 0 && (
                    <motion.div
                        className="mt-12 p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/50 rounded-2xl backdrop-blur-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-500/20 rounded-lg mt-1 flex-shrink-0">
                                <HiOutlineShieldExclamation className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Risk Alert</h3>
                                <p className="text-slate-300">
                                    You have <span className="font-bold text-red-400">{highRiskCount} high-risk project(s)</span> that require immediate attention. 
                                    Review these projects carefully and take necessary mitigation steps to prevent project failures.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Risk;