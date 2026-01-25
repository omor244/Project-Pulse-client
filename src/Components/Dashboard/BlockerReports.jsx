"use client"
import useAuth from "@/Hook/sheard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import { AlertCircle, Calendar, User, ClipboardList, Star, Flag } from "lucide-react";
import Reports from "../Card/Reports";
import { HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineFolderOpen } from "react-icons/hi";


const BlockerReportss = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ['Blocker-Reports', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee/check-in?email=${user?.email}`);
            return res.data;
        }
    });

    const resolvedCount = reports.filter(r => r.resolved).length;
    const activeBlockers = reports.filter(r => r.issue_flag).length;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-slate-400 font-bold animate-pulse">Loading blocker reports...</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto">
                {/* Header section */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-error/10 rounded-2xl text-error">
                                    <HiOutlineExclamationCircle size={28} />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-slate-900">Blocker <span className="text-error">Reports</span></h1>
                                    <p className="text-slate-500 font-medium text-sm mt-1">Manage and review project bottlenecks and issues</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Total Reports</p>
                            <h3 className="text-3xl font-black text-slate-800">{reports.length}</h3>
                            <p className="text-slate-400 text-[10px] mt-2">Report submissions</p>
                        </div>

                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Active Blockers</p>
                            <h3 className="text-3xl font-black text-error">{activeBlockers}</h3>
                            <p className="text-slate-400 text-[10px] mt-2">Awaiting resolution</p>
                        </div>

                        <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Resolved</p>
                            <h3 className="text-3xl font-black text-emerald-600">{resolvedCount}</h3>
                            <p className="text-slate-400 text-[10px] mt-2">Successfully closed</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {reports.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-slate-100 rounded-full">
                                <ClipboardList className="text-slate-400" size={56} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-700 mb-2">No Blocker Reports</h3>
                        <p className="text-slate-500 font-medium max-w-sm mx-auto">There are currently no blocker reports associated with this account. Great job keeping projects on track!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 animate-fadeIn">
                        {reports.map((report) => (
                            <Reports refetch={refetch} key={report._id} report={report}></Reports>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockerReportss;