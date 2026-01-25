"use client"
import React, { useState } from 'react';
import useAuth from "@/Hook/sheard";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle, HiOutlineSave, HiOutlineTrendingUp } from 'react-icons/hi';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';

const CheckInPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [updatingId, setUpdatingId] = useState(null);

    const { data: checkIn = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['CheckIn', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myProjects?email=${user?.email}`);
            return res.data;
        }
    });

    const handleUpdate = (e, id) => {
        e.preventDefault();
        setUpdatingId(id);
        const progress = e.target.progress.value;
        const risk_level = e.target.risk_level.value;

        const updateedDoc = {
            risk_level,
            progress
        }

        axiosSecure.patch(`/project/${id}`, updateedDoc)
            .then(res => {
                toast.success("Progress updated successfully!");
                refetch();
                setUpdatingId(null);
            })
            .catch(err => {
                toast.error("Failed to update progress");
                setUpdatingId(null);
            })
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-slate-400 font-bold animate-pulse">Loading your worklog...</p>
        </div>
    );

    if (isError) return (
        <div className="max-w-7xl mx-auto p-4 md:p-10">
            <div className="bg-error/10 border border-error/20 rounded-[2rem] p-10 text-center">
                <HiOutlineExclamationCircle size={56} className="text-error mx-auto mb-4" />
                <p className="text-error font-bold text-lg">Error loading data. Please try again.</p>
            </div>
        </div>
    );

    const highRiskProjects = checkIn.filter(p => p.risk_level === 'High').length;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-8 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl text-primary">
                        <HiOutlineTrendingUp size={28} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Weekly <span className="text-primary">Worklog</span></h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Update progress and risk assessments for your projects</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="bg-primary/5 border border-primary/20 px-5 py-3 rounded-xl">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Active</p>
                        <p className="text-2xl font-black text-primary">{checkIn.length}</p>
                    </div>
                    {highRiskProjects > 0 && (
                        <div className="bg-error/5 border border-error/20 px-5 py-3 rounded-xl">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">At Risk</p>
                            <p className="text-2xl font-black text-error">{highRiskProjects}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                            <tr className="text-slate-500 uppercase text-[10px] tracking-widest">
                                <th className="py-6 pl-8 font-black">Project Details</th>
                                <th className="py-6 font-black">Progress Update</th>
                                <th className="py-6 font-black">Risk Level</th>
                                <th className="py-6 text-center pr-8 font-black">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {checkIn.length > 0 ? (
                                checkIn.map((project) => (
                                    <tr key={project._id} className="hover:bg-slate-50/60 transition-all duration-200 group">
                                        <td className="py-6 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-black text-sm shadow-md">
                                                    {project.project_name?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-base">{project.project_name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5 flex items-center gap-1">
                                                        📅 Deadline: {project.deadline}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-6">
                                            <form id={`form-${project._id}`} onSubmit={(e) => handleUpdate(e, project._id)}>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="number"
                                                            name="progress"
                                                            defaultValue={project.progress}
                                                            className="input input-bordered input-sm w-20 font-black text-primary rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                            min="0" max="100"
                                                            required
                                                        />
                                                        <span className="text-xs font-bold text-slate-400">%</span>
                                                    </div>
                                                    <progress
                                                        className="progress progress-primary w-32 h-2 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                                                        value={project.progress}
                                                        max="100"
                                                    ></progress>
                                                </div>
                                            </form>
                                        </td>

                                        <td className="py-6">
                                            <select
                                                form={`form-${project._id}`}
                                                name="risk_level"
                                                defaultValue={project.risk_level || "Low"}
                                                className={`select select-bordered select-sm font-bold rounded-lg w-full max-w-[150px] border-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                                    project.risk_level === 'High' 
                                                        ? 'text-error border-error/30 bg-error/5 focus:ring-error/20' 
                                                        : project.risk_level === 'Medium'
                                                        ? 'text-warning border-warning/30 bg-warning/5 focus:ring-warning/20'
                                                        : 'text-emerald-600 border-emerald-200 bg-emerald-50/50 focus:ring-emerald-200'
                                                }`}
                                            >
                                                <option value="Low">🟢 Low Risk</option>
                                                <option value="Medium">🟡 Medium</option>
                                                <option value="High">🔴 Blocker/High</option>
                                            </select>
                                        </td>

                                        <td className="py-6 pr-8">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="submit"
                                                    form={`form-${project._id}`}
                                                    disabled={updatingId === project._id}
                                                    className="btn btn-primary btn-sm rounded-lg text-white font-bold normal-case shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all disabled:loading disabled:opacity-50"
                                                >
                                                    {updatingId === project._id ? (
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    ) : (
                                                        <HiOutlineSave size={18} />
                                                    )}
                                                    Save
                                                </button>
                                                <Link
                                                    href={`/dashboard/weekly-check-in/${project._id}`}
                                                    className="btn btn-ghost btn-sm btn-circle rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                                                    title="View Details"
                                                >
                                                    <HiArrowTopRightOnSquare size={20} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-24">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-slate-100 rounded-full">
                                                <HiOutlineExclamationCircle size={56} className="text-slate-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xl font-black text-slate-700 mb-2">No Assigned Projects</p>
                                                <p className="text-slate-500 font-medium">No projects have been assigned to you yet. Check back later!</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CheckInPage;