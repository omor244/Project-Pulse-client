"use client";
import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

const HealthScale = () => {
    const levels = [
        {
            range: "80 - 100",
            label: "On Track",
            icon: CheckCircle,
            color: "from-emerald-500 to-teal-500",
            borderColor: "border-emerald-500/30",
            bgColor: "bg-emerald-500/10",
            text: "Project is healthy and meeting all milestones.",
            textColor: "text-emerald-300"
        },
        {
            range: "60 - 79",
            label: "At Risk",
            icon: AlertTriangle,
            color: "from-amber-500 to-orange-500",
            borderColor: "border-amber-500/30",
            bgColor: "bg-amber-500/10",
            text: "Some issues detected. Requires attention from PM.",
            textColor: "text-amber-300"
        },
        {
            range: "Below 60",
            label: "Critical",
            icon: AlertCircle,
            color: "from-red-500 to-pink-500",
            borderColor: "border-red-500/30",
            bgColor: "bg-red-500/10",
            text: "Immediate action required to prevent failure.",
            textColor: "text-red-300"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
            {/* Decorative background elements */}
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20"
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest border border-secondary/40 backdrop-blur-sm">
                            Health Metrics
                        </span>
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                        Understanding <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Health Scores</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Know the status of your projects at a glance with our comprehensive scoring system
                    </p>
                </motion.div>

                {/* Health Scale Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {levels.map((lvl, i) => {
                        const IconComponent = lvl.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                whileHover="hover"
                                className="group relative"
                            >
                                {/* Glow background */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${lvl.color} rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10`} />

                                {/* Card */}
                                <div className={`relative p-8 rounded-2xl border ${lvl.borderColor} ${lvl.bgColor} backdrop-blur-xl transition-all duration-300 h-full flex flex-col`}>
                                    {/* Icon Circle */}
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.8 }}
                                        className={`w-20 h-20 ${lvl.bgColor} rounded-full flex items-center justify-center mb-6 border ${lvl.borderColor} mx-auto`}
                                    >
                                        <IconComponent className={`w-10 h-10 ${lvl.textColor}`} />
                                    </motion.div>

                                    {/* Score Range */}
                                    <motion.div
                                        className={`text-3xl font-black mb-4 text-center ${lvl.textColor}`}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        {lvl.range}
                                    </motion.div>

                                    {/* Status Label */}
                                    <h3 className="text-2xl font-bold text-white mb-4 text-center">{lvl.label}</h3>

                                    {/* Description */}
                                    <p className="text-slate-300 text-sm leading-relaxed text-center flex-grow">
                                        {lvl.text}
                                    </p>

                                    {/* Progress indicator */}
                                    <motion.div
                                        className={`mt-6 h-2 bg-gradient-to-r ${lvl.color} rounded-full`}
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        viewport={{ once: true }}
                                        style={{ originX: 0 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HealthScale;