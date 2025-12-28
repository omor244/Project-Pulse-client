"use client"
import React from 'react';
import useAuth from "@/Hook/sheard";
import { HiOutlineFolderAdd, HiOutlineMail, HiOutlineCalendar, HiOutlineBadgeCheck, HiOutlineUserGroup } from "react-icons/hi";
import useAxiosSecure from '../useAxiosSecure';
import { refresh } from 'next/cache';
// import toast from 'react-hot-toast';

const CreateProjectPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const handleCreateProject = async (e) => {
        e.preventDefault();
        const form = e.target;
      
         
        const newProject = {
            project_name: form.project_name.value,
            client_email: form.client_email.value,
            admin_email: user?.email, 
            description: form.description.value,
            status: "In Progress", 
            priority: form.priority.value,
            progress: form.progress.value || "0",
            start_date: form.start_date.value,
            deadline: form.deadline.value,
            risk_level: "Low",
            members: form.members.value.split(',').map(email => email.trim()), 
            createdAt: new Date().toLocaleDateString()
        };

        console.log(newProject);

        axiosSecure.post('/projects', newProject)
            .then(res => {
               
            })
            e.target.reset()
       
        // toast.success("ProjectPulse: New Project Initialized!");
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-10">
      
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary text-primary-content rounded-3xl shadow-xl shadow-primary/20">
                        <HiOutlineFolderAdd size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Create <span className="text-primary">Project</span></h1>
                        <p className="text-slate-400 font-medium text-sm italic">Define scope and assign team members</p>
                    </div>
                </div>
                <div className="badge badge-secondary badge-outline p-4 font-bold uppercase tracking-widest text-[10px]">
                    Admin: {user?.email}
                </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleCreateProject} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Basic Info */}
                <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="form-control w-full">
                        <label className="label font-black text-slate-500 uppercase p-1 text-[10px]">Project Name</label>
                        <input name="project_name" type="text" placeholder="e.g. ProjectPulse Web App" className="input input-bordered w-full rounded-2xl font-bold focus:ring-primary/10" required />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="label p-1 font-bold text-slate-500 uppercase text-sm">Description</label>
                        <textarea name="description" className="textarea w-full h-40 rounded-2xl font-medium" placeholder="Write description" required></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label p-1 font-black text-slate-500 uppercase text-[10px] flex items-center gap-2"><HiOutlineMail /> Client Email</label>
                            <input name="client_email" type="email" placeholder="client@example.com" className="input input-bordered w-full rounded-2xl font-bold" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label p-1 font-black text-slate-500 uppercase text-[10px] flex items-center gap-2"><HiOutlineUserGroup /> Team Members (Emails)</label>
                            <input name="members" type="text" placeholder="emp1@gmail.com, emp2@gmail.com" className="input input-bordered w-full rounded-2xl font-bold text-sm" required />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
                        <h3 className="text-lg font-black italic flex items-center gap-2">
                            <HiOutlineBadgeCheck className="text-secondary" /> Project Meta
                        </h3>

                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-400 uppercase text-[9px]">Priority Level</label>
                            <select name="priority" className="select select-bordered bg-slate-800 border-slate-700 rounded-xl font-bold text-white">
                                <option value="Low">Low</option>
                                <option value="Medium" selected>Medium</option>
                                <option value="High">High Priority</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-400 uppercase text-[9px]">Start Progress (%)</label>
                            <input name="progress" type="number" defaultValue="0" min="0" max="100" className="input input-bordered bg-slate-800 border-slate-700 rounded-xl font-bold text-white" />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <div className="form-control w-full">
                                <label className="label font-bold text-slate-400 uppercase text-[9px] flex items-center gap-1"><HiOutlineCalendar /> Start Date</label>
                                <input name="start_date" type="date" className="input input-bordered bg-slate-800 border-slate-700 rounded-xl font-bold text-white text-sm" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label font-bold text-slate-400 uppercase text-[9px] flex items-center gap-1"><HiOutlineCalendar /> Deadline</label>
                                <input name="deadline" type="date" className="input input-bordered bg-slate-800 border-slate-700 rounded-xl font-bold text-white text-sm" required />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block rounded-2xl text-white font-black uppercase tracking-widest mt-4">
                            Launch Project
                        </button>
                    </div>

                    <div className="p-6 bg-secondary/10 rounded-3xl border border-secondary/20">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Notice</p>
                        <p className="text-xs text-slate-600 font-medium">Launching this project will notify the assigned client and team members immediately.</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectPage;