"use client"
import React, { useState } from 'react';
import useAuth from "@/Hook/sheard";

import useAxiosSecure from '../useAxiosSecure';
import { toast } from 'react-toastify';
import { HiOutlineBadgeCheck, HiOutlineCalendar, HiOutlineCheck, HiOutlineFolderAdd, HiOutlineMail, HiOutlineUserGroup } from 'react-icons/hi';

const CreateProjectPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
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

        axiosSecure.post('/projects', newProject)
            .then(res => {
                toast.success("✨ Project launched successfully!");
                form.reset();
                setIsSubmitting(false);
            })
            .catch(err => {
                toast.error("Failed to create project");
                setIsSubmitting(false);
            })
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-10">
      
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary text-white rounded-3xl shadow-lg shadow-primary/30">
                        <HiOutlineFolderAdd size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create <span className="text-primary">Project</span></h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Define scope, timeline, and assign your team members</p>
                    </div>
                </div>
                <div className="badge badge-secondary badge-lg font-bold uppercase tracking-widest text-white p-4">
                    Admin: {user?.email}
                </div>
            </div>

         
            <form onSubmit={handleCreateProject} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

             
                <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               
                    <div className="form-control w-full">
                        <label className="label font-black text-slate-600 uppercase text-[11px] tracking-wider p-1 mb-2">📋 Project Name</label>
                        <input 
                            name="project_name" 
                            type="text" 
                            placeholder="e.g. ProjectPulse Web App" 
                            className="input input-bordered w-full rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 border-slate-200 placeholder:text-slate-400" 
                            required 
                        />
                    </div>

                 
                    <div className="form-control w-full">
                        <label className="label p-1 font-black text-slate-600 uppercase text-[11px] tracking-wider mb-2">📝 Description</label>
                        <textarea 
                            name="description" 
                            className="textarea w-full h-32 rounded-xl font-medium border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400" 
                            placeholder="Describe the project scope, objectives, and deliverables..." 
                            required>
                        </textarea>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label p-1 font-black text-slate-600 uppercase text-[11px] tracking-wider flex items-center gap-2 mb-2">
                                <HiOutlineMail size={16} /> Client Email
                            </label>
                            <input 
                                name="client_email" 
                                type="email" 
                                placeholder="client@example.com" 
                                className="input input-bordered w-full rounded-xl font-bold border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400" 
                                required 
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label p-1 font-black text-slate-600 uppercase text-[11px] tracking-wider flex items-center gap-2 mb-2">
                                <HiOutlineUserGroup size={16} /> Team Members
                            </label>
                            <input 
                                name="members" 
                                type="text" 
                                placeholder="emp1@gmail.com, emp2@gmail.com, emp3@gmail.com" 
                                className="input input-bordered w-full rounded-xl font-bold border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400" 
                                required 
                            />
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <p className="text-[11px] font-black text-primary uppercase tracking-widest mb-1">💡 Tip</p>
                        <p className="text-xs text-slate-600 font-medium">Separate multiple team members with commas. All team members will receive notifications about this project.</p>
                    </div>
                </div>

                {/* Right Column: Meta Info */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <HiOutlineBadgeCheck className="text-secondary" size={24} />
                            <h3 className="text-lg font-black italic">Project Configuration</h3>
                        </div>

                        {/* Priority Level */}
                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-300 uppercase text-[10px] tracking-widest p-1 mb-2">⚡ Priority Level</label>
                            <select 
                                name="priority" 
                                className="select select-bordered bg-slate-700 border-slate-600 rounded-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                <option value="Low">🟢 Low Priority</option>
                                <option value="Medium" selected>🟡 Medium</option>
                                <option value="High">🔴 High Priority</option>
                            </select>
                        </div>

                        {/* Progress */}
                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-300 uppercase text-[10px] tracking-widest p-1 mb-2">📊 Start Progress (%)</label>
                            <input 
                                name="progress" 
                                type="number" 
                                defaultValue="0" 
                                min="0" 
                                max="100" 
                                className="input input-bordered bg-slate-700 border-slate-600 rounded-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-primary/30" 
                            />
                        </div>

                        {/* Dates */}
                        <div className="space-y-4 pt-4 border-t border-slate-700">
                            <div className="form-control w-full">
                                <label className="label font-bold text-slate-300 uppercase text-[10px] tracking-widest flex items-center gap-1 p-1 mb-2">
                                    <HiOutlineCalendar size={14} /> Start Date
                                </label>
                                <input 
                                    name="start_date" 
                                    type="date" 
                                    className="input input-bordered bg-slate-700 border-slate-600 rounded-xl font-bold text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                                    required 
                                />
                            </div>
                            <div className="form-control w-full">
                                <label className="label font-bold text-slate-300 uppercase text-[10px] tracking-widest flex items-center gap-1 p-1 mb-2">
                                    <HiOutlineCalendar size={14} /> Deadline
                                </label>
                                <input 
                                    name="deadline" 
                                    type="date" 
                                    className="input input-bordered bg-slate-700 border-slate-600 rounded-xl font-bold text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn btn-primary btn-block rounded-xl text-white font-black uppercase tracking-widest mt-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Launching...
                                </>
                            ) : (
                                <>
                                    <HiOutlineCheck size={20} />
                                    Launch Project
                                </>
                            )}
                        </button>
                    </div>

                    {/* Notice Box */}
                    <div className="p-5 bg-secondary/10 rounded-[1.5rem] border border-secondary/20">
                        <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">⚠️ Important</p>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">Launching this project will immediately notify the client and all assigned team members about the project details and deadlines.</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectPage;