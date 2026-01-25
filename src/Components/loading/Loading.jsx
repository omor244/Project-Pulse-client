import { motion } from 'framer-motion';
import React from 'react';

const Loading = () => {
    return (
        <div>
            <motion.div
                className="flex items-center justify-center py-20"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

                    <p className="text-slate-400 font-semibold">Loading projects...</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Loading;