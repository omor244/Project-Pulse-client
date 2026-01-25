"use client";
import { motion } from "framer-motion";
import { MessageSquare, BarChart3, Zap, Shield } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Weekly Check-ins",
            description: "Employees provide weekly updates on progress, confidence levels, and potential roadblocks.",
            icon: MessageSquare,
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            number: "02",
            title: "Client Feedback",
            description: "Clients submit structured ratings on satisfaction, communication, and overall quality.",
            icon: MessageSquare,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            number: "03",
            title: "Pulse Analysis",
            description: "Our algorithm processes the data to generate a real-time Health Score (0-100).",
            icon: BarChart3,
            gradient: "from-amber-500 to-orange-500"
        },
        {
            number: "04",
            title: "Proactive Actions",
            description: "Admins identify 'At Risk' projects early and take necessary steps to ensure success.",
            icon: Shield,
            gradient: "from-emerald-500 to-teal-500"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const stepVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    return (
        <section className="py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20"
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20"
                animate={{ y: [0, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/40 backdrop-blur-sm">
                            Process
                        </span>
                    </motion.div>
                    <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        How Project<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pulse</span> Works
                    </h3>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        A seamless data-driven cycle designed to keep your projects on track and clients happy
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Animated Connector Line (Desktop Only) */}
                    <svg
                        className="hidden lg:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 z-0"
                        viewBox="0 0 1400 2"
                        preserveAspectRatio="none"
                    >
                        <motion.line
                            x1="0"
                            y1="1"
                            x2="1400"
                            y2="1"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                            viewport={{ once: true }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgb(79, 70, 229)" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Steps */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <motion.div key={index} variants={stepVariants} className="group flex flex-col items-center text-center">
                                    {/* Step Circle with Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative mb-8"
                                    >
                                        {/* Background glow */}
                                        <div className={`absolute -inset-2 bg-gradient-to-r ${step.gradient} rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500 -z-10`} />

                                        {/* Circle */}
                                        <div className={`relative w-24 h-24 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-2xl`}>
                                            <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center border border-white/20">
                                                <IconComponent className="w-10 h-10 text-white" />
                                            </div>
                                        </div>

                                        {/* Step Number */}
                                        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-lg font-black text-white shadow-lg">
                                            {step.number}
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-3">
                                            {step.title}
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed px-2">
                                            {step.description}
                                        </p>

                                        {/* Animated underline */}
                                        <motion.div
                                            className={`mt-6 h-1 bg-gradient-to-r ${step.gradient} rounded-full`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "80%" }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                            viewport={{ once: true }}
                                            style={{ margin: "0 auto" }}
                                        />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="text-slate-300 text-lg mb-6">
                        Ready to transform your project management experience?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 70, 229, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Zap size={20} />
                        Start Your Journey
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;