"use client"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import useAuth from "@/Hook/sheard";
import { HiOutlineInbox, HiChevronRight } from "react-icons/hi";
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
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* --- Heading Section --- */}
            <div className="mb-10 border-l-4 border-indigo-600 pl-6 py-2 bg-indigo-50/30 rounded-r-xl">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                    Assigned Projects
                </h1>
                <p className="text-slate-500 font-medium mt-1">
                    Manage and track the progress of projects linked to <span className="text-indigo-600 font-bold">{user?.email}</span>
                </p>
            </div>

            {/* --- Project List (Without Cards) --- */}
            {assigned.length > 0 ? (
                <div className="overflow-hidden bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="p-5 text-xs font-black uppercase text-slate-400 tracking-widest">Project Name</th>
                                    <th className="p-5 text-xs font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="p-5 text-xs font-black uppercase text-slate-400 tracking-widest">Risk Level</th>
                                    <th className="p-5 text-xs font-black uppercase text-slate-400 tracking-widest">Progress</th>
                                    <th className="p-5 text-xs font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {assigned.map((project) => (
                                    <tr key={project._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                                    {project.project_name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{project.project_name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">Deadline: {project.deadline}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${project.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${project.risk_level === 'High' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
                                                    }`} />
                                                <span className="text-sm font-bold text-slate-700">{project.risk_level}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[100px] overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-black text-slate-800">{project.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            <Link
                                                href={`/dashboard/assignedProject/${project._id}`}
                                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"
                                            >
                                                <HiChevronRight size={20} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <HiOutlineInbox className="text-slate-300 text-5xl mb-4" />
                    <h3 className="text-xl font-bold text-slate-700">No Projects Found</h3>
                    <p className="text-slate-400 mt-2 text-center">You don't have any projects assigned at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default AssignProject;