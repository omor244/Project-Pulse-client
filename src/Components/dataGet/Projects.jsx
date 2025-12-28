"use client"

import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProjectCard from "../Card/ProjectCard";

const Projects = () => {
 

    const {data: projects = [] } = useQuery({
        queryKey: ['Projects'],
        queryFn: async () => {
            const res = await axios.get('https://project-plus-liard.vercel.app/projects')

            
            return res.data
        }
    })

  
    return (
        <div>
            <div className="mb-10 border-b border-slate-100 pb-6">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    Projects Library
                </h1>
                <div className="flex items-center gap-2 mt-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        {projects.length } Total Active Projects
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 ">
                {projects.map(project => <ProjectCard key={project._id} project={project}></ProjectCard>)}
          </div>
        </div>
    );
};

export default Projects;