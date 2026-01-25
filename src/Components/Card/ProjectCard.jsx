"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineUserGroup, HiOutlineExclamationCircle, HiOutlineExternalLink, HiOutlineCheckCircle } from "react-icons/hi";

const ProjectCard = ({ project }) => {
    const {
        project_name,
        description,
        status,
        priority,
        progress,
        deadline,
        members,
        risk_level,
        _id
    } = project;

    const statusConfig = {
        "Completed": { bg: "bg-emerald-500/20", border: "border-emerald-500/50", text: "text-emerald-400", label: "✓ Completed" },
        "In Progress": { bg: "bg-blue-500/20", border: "border-blue-500/50", text: "text-blue-400", label: "→ In Progress" },
        "On Hold": { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400", label: "⏸ On Hold" },
    };

    const priorityConfig = {
        "High": { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
        "Medium": { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
        "Low": { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    };

    const riskConfig = {
        "High": { color: "text-red-400", icon: "🔴" },
        "Medium": { color: "text-amber-400", icon: "🟠" },
        "Low": { color: "text-emerald-400", icon: "🟢" },
    };

    const currentStatus = statusConfig[status] || statusConfig["In Progress"];
    const currentPriority = priorityConfig[priority] || priorityConfig["Medium"];
    const currentRisk = riskConfig[risk_level] || riskConfig["Low"];

    const progressPercentage = Math.min(Math.max(progress, 0), 100);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative h-full"
        >
            {/* Animated glow background */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500 -z-10" />

            {/* Card */}
            <div className="relative h-full p-6 bg-gradient-to-b from-slate-800/30 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-xl transition-all duration-300 flex flex-col hover:border-slate-600/80">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {project_name}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono">
                            ID: {_id.slice(-8).toUpperCase()}
                        </p>
                    </div>

                    {/* Status Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${currentStatus.bg} ${currentStatus.text} border ${currentStatus.border} backdrop-blur-sm`}
                    >
                        {currentStatus.label}
                    </motion.div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 line-clamp-2 mb-4 h-10 flex-shrink-0">
                    {description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6 flex-shrink-0">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-slate-400">Progress</span>
                        <motion.span
                            className="text-xs font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {progressPercentage}%
                        </motion.span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                    </div>
                </div>

                {/* Meta Information Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6 flex-shrink-0">
                    {/* Deadline */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50 hover:border-slate-500 transition-all"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <HiOutlineClock className="text-slate-400 w-4 h-4" />
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Deadline</p>
                        </div>
                        <p className="text-xs font-bold text-white">{deadline}</p>
                    </motion.div>

                    {/* Priority */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`p-3 rounded-lg ${currentPriority.bg} border ${currentPriority.border} hover:border-opacity-100 transition-all`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <HiOutlineExclamationCircle className={`${currentPriority.color} w-4 h-4`} />
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Priority</p>
                        </div>
                        <p className={`text-xs font-bold ${currentPriority.color}`}>{priority}</p>
                    </motion.div>

                    {/* Risk Level */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50 hover:border-slate-500 transition-all"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-base">{currentRisk.icon}</span>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">Risk</p>
                        </div>
                        <p className={`text-xs font-bold ${currentRisk.color}`}>{risk_level}</p>
                    </motion.div>
                </div>

                {/* Team Members */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 mt-auto">
                    <div className="flex items-center gap-2">
                        <HiOutlineUserGroup className="text-slate-400 w-4 h-4" />
                        <div className="flex -space-x-2">
                            {members.slice(0, 3).map((member, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                    className="w-8 h-8 rounded-full border-2 border-slate-800 bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                                    title={member}
                                >
                                    {member[0].toUpperCase()}
                                </motion.div>
                            ))}
                            {members.length > 3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-300">
                                    +{members.length - 3}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Link */}
                    <Link href={`projects/${_id}`}>
                        <motion.button
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 text-primary font-bold text-sm hover:from-primary/40 hover:to-secondary/40 transition-all duration-300"
                        >
                            Details
                            <HiOutlineExternalLink className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;