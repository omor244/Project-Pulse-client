"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { HiOutlineClock, HiOutlineMail, HiOutlineBadgeCheck, HiOutlineUserGroup, HiOutlineExclamationCircle } from "react-icons/hi";
import useAxiosSecure from '../useAxiosSecure';

const Details = ({ id}) => {
   
    const axiosSecure = useAxiosSecure();

    const { data: project, isLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/project/${id}`);
            return res.data;
        }
    });
  

    if (isLoading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading project details...</div>;
    if (!project) return <div className="p-10 text-center text-red-500 font-bold">Project not found!</div>;
 
    
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8">

       
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                            {project.status}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${project.priority === 'High' ? 'text-rose-500' : 'text-slate-500'
                            }`}>
                            <HiOutlineExclamationCircle size={14} /> {project.priority} Priority
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        {project.project_name}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95">
                        Edit Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          
                <div className="lg:col-span-2 space-y-8">
                
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <HiOutlineBadgeCheck className="text-blue-500" size={24} /> Project Scope
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {project.description}
                        </p>
                    </div>

                
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Execution Progress</h2>
                            <span className="text-3xl font-black text-blue-400">{project.progress}%</span>
                        </div>
                        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-1000"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                        <p className="mt-4 text-slate-400 text-sm italic font-medium">
                            * Current progress based on task completion and risk assessment.
                        </p>
                    </div>
                </div>

             
                <div className="space-y-8">
                
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl">
                            <HiOutlineClock size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Deadline</p>
                            <p className="text-lg font-black text-slate-800">{project.deadline}</p>
                        </div>
                    </div>

                 
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase text-xs font-bold tracking-widest">
                            <HiOutlineMail size={16} /> Communication
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400">Primary Email</p>
                            <p className="text-slate-800 font-bold break-all">{project.client_email}</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase text-xs font-bold tracking-widest">
                            <HiOutlineUserGroup size={16} /> Assigned Team
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {project.members?.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold uppercase">
                                        {member[0]}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">{member}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;