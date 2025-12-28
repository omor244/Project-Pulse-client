 "use client"
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../Card/ProjectCard";
import axios from "axios";

const Risk = () => {
    const { data: risk = [] } = useQuery({
        queryKey: ['Risks'],
        queryFn: async () => {
            const res = await axios.get('https://project-plus-liard.vercel.app/risk')
            return res.data
        }
    })

   
    return (
        <div className="p-6 w-10/12 mx-auto">
        
            <div className="mb-10 border-l-8 border-rose-500 bg-rose-50/50 p-6 rounded-r-3xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                            Critical Risk Assessment
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">
                            Monitoring <span className="text-rose-600">{risk?.length} high-priority issues</span>
                        </p>
                    </div>
                </div>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {risk?.map(project => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>

        
            {risk?.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
                    No high-risk projects detected.
                </div>
            )}
        </div>
    );
};

export default Risk;