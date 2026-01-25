"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";

const Banner = () => {
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 40 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    return (
        <section className="relative w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-28 px-4">
            {/* Animated gradient blur elements */}
            <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                animate={{ y: [0, -50, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8">
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm hover:border-primary/60 transition-colors duration-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Real-time Monitoring
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={itemVariants}>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
                            Project{" "}
                            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
                                Pulse
                            </span>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        Monitor project health in real-time with automated scoring, structured client feedback, and proactive risk management—your intelligent companion for project success.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <Zap size={20} />
                                Launch Dashboard
                                <ChevronRight size={20} />
                            </motion.button>
                        </Link>
                        <Link href="/projects">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-slate-400 text-white font-bold rounded-full backdrop-blur-sm hover:border-slate-300 transition-all duration-300"
                            >
                                View Projects
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right Image */}
                <motion.div variants={imageVariants} className="relative group">
                    <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-40"
                        animate={{ opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                        <Image
                            src="/banner1.jpg"
                            alt="ProjectPulse Interface"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner;