"use client"
import React, { useState } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { HiOutlineClock, HiOutlineMail, HiOutlineBadgeCheck, HiOutlineUserGroup, HiOutlineExclamationCircle, HiOutlineX } from "react-icons/hi";
import useAxiosSecure from '../useAxiosSecure';
import useRole from '@/Hook/useRole';
import useAuth from '@/Hook/sheard';
import FeedbackPage from '../Dashboard/FeedbackPage';


const Details = ({ id }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const role = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const { data: project, isLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/project/${id}`);
            return res.data;
        }
    });

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    if (isLoading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading project details...</div>;
    if (!project) return <div className="p-10 text-center text-red-500 font-bold">Project not found!</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-8 relative">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                            {project.status}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${project.priority === 'High' ? 'text-rose-500' : 'text-slate-500'}`}>
                            <HiOutlineExclamationCircle size={14} /> {project.priority} Priority
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        {project.project_name}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* Feedback Button */}
                    {user && (
                        <button
                            onClick={toggleModal}
                            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                        >
                            Give Feedback
                        </button>
                    )}
                </div>
            </div>

            {/* --- Main Content Grid (Scope, Progress, Sidebar) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ... (আপনার আগের কোড অনুযায়ী Scope এবং Progress সেকশন) ... */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <HiOutlineBadgeCheck className="text-blue-500" size={24} /> Project Scope
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
                    </div>
                    {/* Execution Progress */}
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Execution Progress</h2>
                            <span className="text-3xl font-black text-blue-400">{project.progress}%</span>
                        </div>
                        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                        </div>
                    </div>
                </div>

                {/* Sidebar (Deadline, Team, etc) */}
                <div className="space-y-8">
                    {/* ... (আপনার আগের কোড অনুযায়ী Sidebar সেকশন) ... */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><HiOutlineClock size={28} /></div>
                        <div><p className="text-xs font-bold text-slate-400 uppercase">Deadline</p><p className="text-lg font-black text-slate-800">{project.deadline}</p></div>
                    </div>
                </div>
            </div>

            {/* --- CUSTOM MODAL OVERLAY --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop (ক্লিক করলে মোডাল বন্ধ হবে) */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={toggleModal}
                    ></div>

                    {/* Modal Content Card */}
                    <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl transition-all transform animate-in zoom-in duration-300">

                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute top-8 right-8 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors z-10"
                        >
                            <HiOutlineX size={24} />
                        </button>

                        {/* Rendering FeedbackPage inside Modal */}
                        <div className="p-2">
                            <FeedbackPage setIsModalOpen={setIsModalOpen} projectData={project} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;