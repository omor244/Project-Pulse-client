"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProjectCard from "../Card/ProjectCard";
import { motion } from "framer-motion";
import { AlertCircle, TrendingUp } from "lucide-react";
import Loading from "../loading/Loading";

const Projects = () => {


    const { data: projects =[], isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await axios.get('https://project-plus-liard.vercel.app/projects')

            console.log(res.data)
            return res?.data 
        }
    })
 


    if(isLoading) return <Loading></Loading>
   
   
    const completedCount = projects?.filter(p => p.status === "Completed").length;
    const inProgressCount = projects?.filter(p => p.status === "In Progress").length;
    const atRiskCount = projects?.filter(p => p.risk_level === "High").length;

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
         
            <motion.div
                className="absolute top-20 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20 -z-10"
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
                 
                    <div className="mb-8">
                        <motion.div className="inline-block mb-4">
                            <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/40 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Live Projects
                                </div>
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
                            Projects <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Library</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl">
                            Explore and manage all active projects with real-time insights and analytics
                        </p>
                    </div>

                   
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-primary/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">Total Projects</p>
                                        <p className="text-4xl font-black text-white">{projects?.length}</p>
                                    </div>
                                    <TrendingUp className="w-10 h-10 text-primary opacity-40" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-emerald-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">Completed</p>
                                        <p className="text-4xl font-black text-emerald-400">{completedCount}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-emerald-400 font-black">✓</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-blue-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">In Progress</p>
                                        <p className="text-4xl font-black text-blue-400">{inProgressCount}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-400 font-black">→</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10" />
                            <div className="relative p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-xl border border-red-500/30 backdrop-blur-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm font-semibold mb-2">At Risk</p>
                                        <p className="text-4xl font-black text-red-400">{atRiskCount}</p>
                                    </div>
                                    <AlertCircle className="w-10 h-10 text-red-400 opacity-40" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                    

               
              
                {isLoading ? (
                    <Loading></Loading>
                ) : error ? (
                    <motion.div
                        className="flex items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center">
                            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                            <p className="text-red-400 font-semibold text-lg">Error loading projects</p>
                            <p className="text-slate-500 text-sm">Please try refreshing the page</p>
                        </div>
                    </motion.div>
                ) : projects && projects?.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
                    >
                                {projects?.map(project => <motion.div key={project?._id} variants={itemVariants}>
                                    <ProjectCard project={project} />
                                </motion.div>)}
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex items-center justify-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center">
                            <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
                            <p className="text-slate-400 font-semibold text-lg">No projects available</p>
                            <p className="text-slate-500 text-sm">Check back later for new projects</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Projects;