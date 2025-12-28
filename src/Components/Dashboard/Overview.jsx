"use client"
import useAuth from '@/Hook/sheard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HiOutlineFolderOpen, HiOutlineClipboardCheck, HiOutlineTrendingUp, HiOutlineUsers } from "react-icons/hi";

const Overview = () => {
    const { user, loading } = useAuth();

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['overview', user?.email], // ইমেল যোগ করা ভালো যাতে ডাটা ক্যাশিং সঠিক থাকে
        enabled: !!user?.email, // ইউজার ইমেল পাওয়ার পর কুয়েরি রান হবে
        queryFn: async () => {
            const res = await axios.get('https://project-plus-liard.vercel.app/projects');
            return res.data;
        }
    });

    if (isLoading || loading) {
        return <div className="p-10 text-center"><span className="loading loading-dots loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-6 md:p-10 bg-base-200 min-h-screen">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800">
                    Welcome back, <span className="text-primary">{user?.displayName || 'Admin'}!</span>
                </h1>
                <p className="text-slate-500 font-medium mt-1">Here is what is happening with your projects today.</p>
            </div>

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                {/* Total Projects Card - Your Requirement */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                        <HiOutlineFolderOpen size={30} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Projects</p>
                        <h3 className="text-3xl font-black text-slate-800">{projects.length}</h3>
                    </div>
                </div>

        
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                        <HiOutlineClipboardCheck size={30} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Completed</p>
                        <h3 className="text-3xl font-black text-slate-800">12</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="bg-amber-100 p-4 rounded-2xl text-amber-600">
                        <HiOutlineTrendingUp size={30} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">In Progress</p>
                        <h3 className="text-3xl font-black text-slate-800">08</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600">
                        <HiOutlineUsers size={30} />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Team Members</p>
                        <h3 className="text-3xl font-black text-slate-800">24</h3>
                    </div>
                </div>
            </div>

        
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Recent Projects Summary</h2>
                    
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-slate-400 uppercase text-[10px] tracking-widest border-b border-slate-50">
                                <th>Project Name</th>
                                <th>Status</th>
                                <th>Client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.slice(0, 5).map((project, idx) => (
                                <tr key={idx} className="border-b border-slate-50">
                                    <td className="font-bold text-slate-700">{project.project_name}</td>
                                    <td>
                                        <span className="badge badge-soft badge-primary font-bold">{project.status || 'Active'}</span>
                                    </td>
                                    <td className="text-slate-500 text-sm">{project.client_email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Overview;