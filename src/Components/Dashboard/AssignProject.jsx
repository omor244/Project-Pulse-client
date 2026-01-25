"use client"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import useAuth from "@/Hook/sheard";
import { HiOutlineInbox, HiChevronRight, HiOutlineFire, HiOutlineShieldCheck, HiOutlineCalendarDays } from "react-icons/hi2";
import Link from "next/link";

const AssignProject = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: assigned = [], isLoading: isQueryLoading } = useQuery({
        queryKey: ['Assigned', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myProjects?email=${user?.email}`);
            return res.data;
        }
    });

    if (loading || isQueryLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] gap-3">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-slate-400 font-bold animate-pulse">Loading your projects...</p>
            </div>
        );
    }

    const getRiskBadgeStyle = (risk) => {
        switch (risk?.toLowerCase()) {
            case 'high':
                return 'bg-error/10 text-error border border-error/20';
            case 'medium':
                return 'bg-warning/10 text-warning border border-warning/20';
            default:
                return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
        }
    };

    const getStatusBadgeStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-600';
            case 'on hold':
                return 'bg-warning/10 text-warning';
            default:
                return 'bg-primary/10 text-primary';
        }
    };

    return (
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
            {/* --- Heading Section --- */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-600">
                        <HiOutlineCalendarDays size={28} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Assigned <span className="text-indigo-600">Projects</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">
                            Manage and track all projects assigned to you
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Project Stats --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Assigned</p>
                    <h3 className="text-3xl font-black text-slate-800">{assigned.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Active</p>
                    <h3 className="text-3xl font-black text-primary">{assigned.filter(p => p.status !== 'Completed').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Completed</p>
                    <h3 className="text-3xl font-black text-emerald-600">{assigned.filter(p => p.status === 'Completed').length}</h3>
                </div>
            </div>

            {/* --- Project List (Without Cards) --- */}
            {assigned.length > 0 ? (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100">
                                    <th className="p-6 text-left text-xs font-black uppercase text-slate-500 tracking-widest">Project Name</th>
                                    <th className="p-6 text-left text-xs font-black uppercase text-slate-500 tracking-widest">Status</th>
                                    <th className="p-6 text-left text-xs font-black uppercase text-slate-500 tracking-widest">Risk Level</th>
                                    <th className="p-6 text-left text-xs font-black uppercase text-slate-500 tracking-widest">Progress</th>
                                    <th className="p-6 text-center text-xs font-black uppercase text-slate-500 tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {assigned.map((project) => (
                                    <tr key={project._id} className="hover:bg-slate-50/60 transition-all duration-200 group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                                                    {project.project_name?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-base">{project.project_name}</p>
                                                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-1">
                                                        <HiOutlineCalendarDays size={14} /> Deadline: {project.deadline}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${getStatusBadgeStyle(project.status)}`}>
                                                { project.status }
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getRiskBadgeStyle(project.risk_level)}`}>
                                                    {project.risk_level === 'High' ? (
                                                        <HiOutlineFire size={16} className="animate-pulse" />
                                                    ) : (
                                                        <HiOutlineShieldCheck size={16} />
                                                    )}
                                                    <span className="text-xs font-black">{project.risk_level}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[120px] overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 shadow-sm"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-black text-slate-800 min-w-fit">{project.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <Link
                                                href={`/dashboard/assignedProject/${project._id}`}
                                                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-slate-100 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-600/30 transition-all duration-300 transform group-hover:scale-110"
                                            >
                                                <HiChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-gradient-to-b from-white to-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <div className="p-4 bg-slate-100 rounded-full mb-4">
                        <HiOutlineInbox className="text-slate-400 text-5xl" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-700 mb-2">No Projects Assigned</h3>
                    <p className="text-slate-500 font-medium text-center max-w-sm">You don't have any projects assigned at the moment. Check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default AssignProject;