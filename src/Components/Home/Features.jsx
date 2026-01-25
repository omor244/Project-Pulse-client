"use client";
import { motion } from "framer-motion";
import { Users, CheckCircle2, MessageSquare } from "lucide-react";

const Features = () => {
    const roles = [
        {
            title: "Administrative Control",
            role: "For Admins",
            description: "Monitor overall project health scores and manage team assignments with real-time insights.",
            icon: Users,
            gradient: "from-blue-500 to-cyan-500",
            borderColor: "border-blue-500/30"
        },
        {
            title: "Weekly Check-ins",
            role: "For Employees",
            description: "Submit weekly progress, report risks, and share confidence levels with ease.",
            icon: CheckCircle2,
            gradient: "from-purple-500 to-pink-500",
            borderColor: "border-purple-500/30"
        },
        {
            title: "Direct Feedback",
            role: "For Clients",
            description: "Provide structured satisfaction ratings and flag issues to ensure project success.",
            icon: MessageSquare,
            gradient: "from-amber-500 to-orange-500",
            borderColor: "border-amber-500/30"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" },
        },
        hover: {
            y: -10,
            transition: { duration: 0.3 },
        },
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/40 backdrop-blur-sm">
                            Features
                        </span>
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                        One Platform, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Three Perspectives</span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Tailored experiences for every stakeholder in the project lifecycle
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {roles.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover="hover"
                                className="group relative"
                            >
                                {/* Card background glow */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-60 transition duration-500 -z-10`} />

                                {/* Card content */}
                                <div className={`relative h-full p-8 bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl border ${item.borderColor} backdrop-blur-xl transition-all duration-300`}>
                                    {/* Icon container */}
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} mb-6 shadow-lg`}
                                    >
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </motion.div>

                                    {/* Role Badge */}
                                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600/50 text-slate-200 text-xs font-semibold uppercase tracking-wide">
                                        {item.role}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Animated line on hover */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3 }}
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

export default Features;