"use client"

import { AlertCircle, Calendar, ClipboardList, Star, User } from "lucide-react";
import useAxiosSecure from "../useAxiosSecure";

const Reports = ({ report, refetch }) => {
     
    const axiosSecure = useAxiosSecure()

    const handeldelete = () => {
        console.log('deleteing')
        axiosSecure.delete(`/feedback/${report._id}`)
            .then(res => {
                
                refetch()
        })
    }
    return (
        <div>
            <div
                key={report._id}
                className={`bg-white rounded-xl shadow-sm border-l-4 overflow-hidden transition-all hover:shadow-md ${report.issue_flag ? 'border-l-red-500' : 'border-l-green-500'
                    } border-y border-r border-gray-200`}
            >
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                        {/* Left Side: Project Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl font-bold text-gray-900">{report.project_name}</h2>
                                {report.issue_flag && (
                                    <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                                        <AlertCircle size={12} /> BLOCKED
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-gray-400" />
                                    <span className="font-medium text-gray-700">{report.client_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{new Date(report.date).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Middle Side: Satisfaction & Rating */}
                        <div className="flex items-center gap-8 px-6 border-l border-r border-gray-100 hidden lg:flex">
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Rating</p>
                                <div className="flex items-center justify-center gap-1 text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="font-bold text-gray-800">{report.rating}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Satisfaction</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${report.satisfaction === 'Needs Work'
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {report.satisfaction}
                                </span>
                            </div>
                        </div>

                  
                        <div className="flex flex-col justify-center items-end text-right">
                            <span className="text-[10px] text-gray-400 font-mono tracking-tighter">REF: {report.project_id}</span>
                        </div>
                    </div>

                   
                    <div className="mt-6 p-4 flex justify-between bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-start  gap-2">
                            <ClipboardList size={16} className="text-gray-400 mt-1 shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">Report Details</p>
                                <p className="text-gray-700 mt-1 leading-relaxed italic text-sm md:text-base">
                                    "{report.comment}"
                                </p>
                            </div>
                        </div>
                        <div className=" btn btn-primary ">
                            <button onClick={() => handeldelete() }>Delete Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;