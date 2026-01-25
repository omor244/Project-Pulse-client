"use client"
import useAuth from "@/Hook/sheard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { HiOutlineRefresh, HiOutlineTrash } from "react-icons/hi";

const ManageProductspage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [status, setstatus] = useState({})

    const { data: management = [], isLoading, refetch } = useQuery({
        queryKey: ['ManageProject', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/projects?email=${user?.email}`);
            return res.data;
        }
    });

    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handelupdate = (id) => {
        setUpdatingId(id);
        const updatedDoc = {
            status: status
        }
        axiosSecure.patch(`/project/${id}`, updatedDoc)
            .then(res => {
                toast.success("Project status updated successfully!");
                refetch();
                setUpdatingId(null);
        })
        .catch(() => {
            toast.error("Failed to update project");
            setUpdatingId(null);
        })
    }

    const handleDelete = (id) => {
        setDeletingId(id);
        axiosSecure.delete(`/project/${id}`)
            .then(res => {
                toast.success("Project deleted successfully!");
                refetch();
                setDeletingId(null);
        })
        .catch(() => {
            toast.error("Failed to delete project");
            setDeletingId(null);
        })
    }; 

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-emerald-600';
            case 'on hold':
                return 'text-warning';
            default:
                return 'text-primary';
        }
    };

    const getStatusBgColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-100';
            case 'on hold':
                return 'bg-warning/10';
            default:
                return 'bg-primary/10';
        }
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-3">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-slate-400 font-bold animate-pulse">Loading projects...</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl text-primary">
                        <HiOutlineRectangleStack size={28} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">Manage <span className="text-primary">Projects</span></h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Administrative control and oversight of all active workstreams</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-sm text-center">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total</p>
                        <p className="text-3xl font-black text-slate-800">{management.length}</p>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-sm text-center">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Active</p>
                        <p className="text-3xl font-black text-primary">{management.filter(p => p.status !== 'Completed').length}</p>
                    </div>
                </div>
            </div>

         
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                     
                        <thead className="bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                            <tr className="text-slate-500 uppercase text-[10px] tracking-widest">
                                <th className="py-6 pl-8 font-black">Project & Client</th>
                                <th className="py-6 font-black">Progress</th>
                                <th className="py-6 font-black">Status</th>
                                <th className="py-6 text-center font-black pr-8">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {management.map((project) => (
                                <tr key={project._id} className="hover:bg-slate-50/60 transition-all duration-200 group">
                                    <td className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                           
                                        
                                            <div>
                                                <div className="font-bold text-slate-800 text-base mb-1">{project.project_name}</div>
                                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{project.client_email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-6">
                                        <div className="flex flex-col gap-2 w-40">
                                            <div className="flex justify-between text-[10px] font-black">
                                                <span className="text-primary">{project.progress}%</span>
                                            </div>
                                            <progress 
                                                className="progress progress-primary h-2 w-full rounded-full" 
                                                value={project.progress} 
                                                max="100">
                                            </progress>
                                        </div>
                                    </td>

                                    <td className="py-6">
                                        <select
                                            defaultValue={project.status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            className={`select select-sm select-bordered rounded-xl font-bold text-xs border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${getStatusBgColor(project.status)} ${getStatusColor(project.status)}`}
                                        >
                                            <option value="In Progress">In Progress</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>

                                    <td className="py-6 pr-8">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                disabled={deletingId === project._id}
                                                className="btn btn-ghost btn-sm btn-circle text-slate-400 hover:text-error hover:bg-error/5 transition-all duration-200 disabled:loading disabled:opacity-50"
                                                title="Delete project"
                                            >
                                                {deletingId === project._id ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <HiOutlineTrash size={20} />
                                                )}
                                            </button>
                                            <button 
                                                onClick={() => handelupdate(project._id)} 
                                                disabled={updatingId === project._id}
                                                className="btn btn-ghost btn-sm btn-circle text-slate-400 hover:text-primary hover:bg-primary/5 transition-all duration-200 disabled:loading disabled:opacity-50"
                                                title="Update status"
                                            >
                                                {updatingId === project._id ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <HiOutlineRefresh size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {management.length === 0 && (
                    <div className="py-24 text-center flex flex-col items-center justify-center">
                        <div className="p-4 bg-slate-100 rounded-full mb-4">
                            <HiOutlineRectangleStack className="text-slate-400 text-5xl" />
                        </div>
                        <p className="font-bold text-slate-700 text-lg mb-2">No projects found</p>
                        <p className="text-slate-500 font-medium">Start by creating a new project to manage your workstreams.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProductspage;