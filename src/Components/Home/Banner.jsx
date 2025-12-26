import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="relative w-full  flex items-center justify-center overflow-hidden bg-[#020617] py-20 px-4">


            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                <div className="text-center lg:text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Real-time Monitoring
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                        Project  <span className="text-primary">Pulse</span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
                        Monitor Project Health in Real-Time with automated scoring, structured client feedback, and proactive risk management.
                    </p>

              
                  

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
                        <Link href="/dashboard" className="btn btn-primary px-8 text-white rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                            Launch Dashboard
                        </Link>
                        <Link href="/projects" className="btn btn-outline border-white/20 text-white rounded-full hover:bg-white/10">
                            View Projects
                        </Link>
                    </div>
                </div>

     
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                      
                        <Image
                            src="/banner1.jpg" 
                            alt="ProjectPulse Interface"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;