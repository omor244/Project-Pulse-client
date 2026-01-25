"use client"
import useAuth from '@/Hook/sheard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { HiOutlineFolderOpen,  HiOutlineCheckCircle, HiOutlineArrowTrendingUp, HiOutlineUsers, HiOutlineEye } from "react-icons/hi2";
import Link from 'next/link';
import Loading from '../loading/Loading';

const Overview = () => {
    const { user, loading } = useAuth();

    const { data: projectsData = [], isLoading } = useQuery({
        queryKey: ['overview', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get('https://project-plus-liard.vercel.app/projects');
            return res.data;
        }
    });

   
    const projects = (Array.isArray(projectsData) ? projectsData : 
                     (Array.isArray(projectsData?.data) ? projectsData.data : 
                     (Array.isArray(projectsData?.projects) ? projectsData.projects : [])))
                     .filter(p => p && typeof p === 'object' && Object.keys(p).length > 0);

    if (isLoading || loading) return <Loading></Loading>

    console.log('Projects:', projects)

    const completedProjects = Array.isArray(projects) ? projects.filter(p => p?.status === 'Completed').length : 0;
    const activeProjects = Array.isArray(projects) ? projects.filter(p => p?.status === 'In Progress').length : 0;
    const onHoldProjects = Array.isArray(projects) ? projects.filter(p => p?.status === 'On Hold').length : 0;

    return (
        <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
          
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center shadow-lg">
                        <HiOutlineUsers size={24} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{user?.displayName || 'user'}!</span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">Here's your project performance overview</p>
                    </div>
                </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-primary/10 p-4 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <HiOutlineFolderOpen size={28} />
                        </div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total</span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Projects</p>
                    <h3 className="text-4xl font-black text-slate-900 mb-1">{Array.isArray(projects) ? projects.length : 0}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">All projects managed</p>
                </div>

                {/* Completed Projects Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                            <HiOutlineCheckCircle size={28} />
                        </div>
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Done</span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Completed</p>
                    <h3 className="text-4xl font-black text-emerald-600 mb-1">{completedProjects}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Projects finished</p>
                </div>

                {/* In Progress Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-amber-100 p-4 rounded-2xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                            <HiOutlineArrowTrendingUp size={28} />
                        </div>
                        <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Active</span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">In Progress</p>
                    <h3 className="text-4xl font-black text-amber-600 mb-1">{activeProjects}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Currently running</p>
                </div>

                {/* Team Members Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            <HiOutlineUsers size={28} />
                        </div>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Team</span>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Team Members</p>
                    <h3 className="text-4xl font-black text-indigo-600 mb-1">24</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Active members</p>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">On Hold</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{onHoldProjects}</p>
                    </div>
                    <div className="text-5xl opacity-10">⏸️</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Success Rate</p>
                        <p className="text-2xl font-black text-emerald-600">{Array.isArray(projects) && projects.length > 0 ? Math.round((completedProjects / projects.length) * 100) : 0}%</p>
                    </div>
                    <div className="text-5xl opacity-10">📈</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Avg Progress</p>
                        <p className="text-2xl font-black text-primary">{Array.isArray(projects) && projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + (parseInt(p?.progress) || 0), 0) / projects.length) : 0}%</p>
                    </div>
                    <div className="text-5xl opacity-10">🎯</div>
                </div>
            </div>

        
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Recent Projects</h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Overview of your latest projects</p>
                    </div>
                    <Link href="/dashboard/manage-project" className="btn btn-sm btn-primary rounded-lg font-bold uppercase tracking-widest">
                        <HiOutlineEye size={18} />
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-slate-500 uppercase text-[10px] tracking-widest border-b border-slate-100 bg-slate-50/50">
                                <th className="font-black py-4">Project Name</th>
                                <th className="font-black py-4">Status</th>
                                <th className="font-black py-4">Progress</th>
                                <th className="font-black py-4">Client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(projects) && projects.length > 0 ? (
                                projects.map((project, idx) => (
                                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                        <td className="py-5 font-bold text-slate-800">{typeof project?.project_name === 'string' ? project.project_name : 'Unnamed'}</td>
                                        <td className="py-5">
                                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                                                project?.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                                                project?.status === 'On Hold' ? 'bg-amber-100 text-amber-600' :
                                                'bg-primary/10 text-primary'
                                            }`}>
                                                {typeof project?.status === 'string' ? project.status : 'Active'}
                                            </span>
                                        </td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[100px] overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                                                        style={{ width: `${(typeof project?.progress === 'number' ? project.progress : 0)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-black text-slate-700 min-w-fit">{typeof project?.progress === 'number' ? project.progress : 0}%</span>
                                            </div>
                                        </td>
                                        <td className="py-5 text-slate-600 text-sm font-medium">{typeof project?.client_email === 'string' ? project.client_email : 'N/A'}</td>
                                    </tr>
                                ))
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {!Array.isArray(projects) || projects.length === 0 ? (
                    <div className="py-16 text-center">
                        <HiOutlineFolderOpen size={56} className="text-slate-300 mx-auto mb-4" />
                        <p className="font-black text-slate-700 text-lg">No projects to display yet</p>
                        <p className="text-slate-500 mt-2">Start creating projects to see them here</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Overview;
