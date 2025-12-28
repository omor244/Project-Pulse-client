"use client"
import useAuth from "@/Hook/sheard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import { AlertCircle, Calendar, User, ClipboardList, Star, Flag } from "lucide-react";
import Reports from "../Card/Reports";


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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Blocker Reports</h1>
                        <p className="text-gray-500 text-sm mt-1">Reviewing potential bottlenecks and project health</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Total Reports</span>
                            <span className="text-xl font-bold text-blue-600">{reports.length}</span>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                            <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Issues</span>
                            <span className="text-xl font-bold text-red-500">
                                {reports.filter(r => r.issue_flag).length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {reports.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm">
                        <ClipboardList className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-gray-600">No reports found</h3>
                        <p className="text-gray-400">There are currently no blocker reports associated with this account.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
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