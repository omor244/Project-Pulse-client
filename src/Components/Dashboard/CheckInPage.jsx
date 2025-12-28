"use client"
import React from 'react';
import useAuth from "@/Hook/sheard";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineSave, HiOutlineExclamationCircle, HiOutlineExternalLink, HiOutlineTrendingUp } from "react-icons/hi";
import Link from 'next/link';
import { progress } from 'framer-motion';


const CheckInPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


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
        const progress = e.target.progress.value;
        const risk_level = e.target.risk_level.value;
        

        console.log(risk_level, progress, id)

        const updateedDoc = {
            risk_level,
            progress
        }

        axiosSecure.patch(`/project/${id}`, updateedDoc)
            .then(res => {
                console.log(res.data)
                refetch()
            })
            .catch(err => {
            console.log(err)
        })
    };


    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-slate-400 font-bold animate-pulse">Loading assigned projects...</p>
        </div>
    );

    if (isError) return <div className="text-center p-20 text-red-500">Error loading data. Please try again.</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Assigned <span className="text-primary">Worklog</span></h1>
                    <p className="text-slate-500 font-medium mt-1 text-sm">Update your weekly progress and report blockers.</p>
                </div>
                <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                    <HiOutlineTrendingUp className="text-primary" size={20} />
                    <span className="text-sm font-bold text-primary">{checkIn.length} Active Projects</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 uppercase text-[10px] tracking-widest border-b border-slate-100">
                                <th className="py-6 pl-10">Project Details</th>
                                <th>Execution Progress</th>
                                <th>Risk Assessment</th>
                                <th className="text-center pr-10">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {checkIn.length > 0 ? (
                                checkIn.map((project) => (
                                    <tr key={project._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="py-6 pl-10">
                                            <div className="flex items-center gap-4">
                                                
                                                   
                                               
                                                <div>
                                                    <div className="font-bold text-slate-800 text-base">{project.project_name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">Deadline: {project.deadline}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="w-1/4">
                                            <form id={`form-${project._id}`} onSubmit={(e) => handleUpdate(e, project._id)}>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="number"
                                                            name="progress"
                                                            defaultValue={project.progress}
                                                            className="input input-bordered input-sm w-20 font-black text-primary rounded-lg focus:ring-2 focus:ring-primary/20"
                                                            min="0" max="100"
                                                            required
                                                        />
                                                        <span className="text-xs font-bold text-slate-400">%</span>
                                                    </div>
                                                    <progress
                                                        className="progress progress-primary w-32 h-1.5 opacity-30 group-hover:opacity-100 transition-opacity"
                                                        value={project.progress}
                                                        max="100"
                                                    ></progress>
                                                </div>
                                            </form>
                                        </td>

                                        <td>
                                            <select
                                                form={`form-${project._id}`}
                                                name="risk_level"
                                                defaultValue={project.risk_level || "Low"}
                                                className={`select select-bordered select-sm font-bold rounded-lg w-full max-w-[150px] ${project.risk_level === 'High' ? 'text-error border-error bg-error/5' : 'text-slate-600'
                                                    }`}
                                            >
                                                <option value="Low">Low Risk</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">Blocker/High</option>
                                            </select>
                                        </td>

                                        <td className="pr-10">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="submit"
                                                    form={`form-${project._id}`}
                                                   
                                                    className="btn btn-primary btn-sm rounded-xl text-white font-bold normal-case shadow-md shadow-primary/20 hover:scale-105 transition-transform"
                                                >
                                                    {isLoading ? <span className="loading loading-spinner loading-xs"></span> : <HiOutlineSave size={18} />}
                                                    Save
                                                </button>
                                                <Link
                                                    href={`/dashboard/weekly-check-in/${project._id}`}
                                                    className="btn btn-ghost btn-sm btn-square rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5"
                                                    title="View Details"
                                                >
                                                    <HiOutlineExternalLink size={20} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <HiOutlineExclamationCircle size={60} />
                                            <p className="text-xl font-bold">No assigned projects found.</p>
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