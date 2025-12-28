"use client"

const FullPageLoader = () => {
    return (
       
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-200 w-screen h-screen">
            <div className="relative flex items-center justify-center">
             
                <div className="absolute animate-ping h-24 w-24 rounded-full bg-primary/20 opacity-75"></div>

                <span className="loading loading-ring h-16 w-16 text-primary relative z-10"></span>
            </div>

            <div className="mt-10 text-center">
                <h2 className="text-2xl font-black text-slate-800 tracking-tighter animate-pulse">
                    Project<span className="text-primary">Pulse</span>
                </h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">
                    Securing your session...
                </p>
            </div>
        </div>
    );
};

export default FullPageLoader;