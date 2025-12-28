"use client"
import useAuth from "@/Hook/sheard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineDotsVertical, HiOutlineRefresh } from "react-icons/hi";
import { useRef, useState } from "react";
// import toast from "react-hot-toast";

const ManageProductspage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [status, setstatus] = useState({})

    


    const { data: management = [], isLoading,refetch } = useQuery({
        queryKey: ['ManageProject', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/projects?email=${user?.email}`);
            return res.data;
        }
    });

  
    const handelupdate = ( id) => {
       
       
        const updatedDoc = {
            status: status
        }
       
        axiosSecure.patch(`/project/${id}`, updatedDoc)
            .then(res => {
           
                refetch()
        })
  }

 

    const handleDelete = (id) => {
     
    

        axiosSecure.delete(`/project/${id}`)
            .then(res => {
                console.log(res.data)
                refetch()
        })
    }; 

    if (isLoading) return <div className="p-20 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Manage <span className="text-primary">Projects</span></h1>
                    <p className="text-slate-400 font-medium text-sm">Overview and administrative control for all workstreams.</p>
                </div>
                <div className="badge badge-primary badge-lg font-bold gap-2 p-4">
                    {management.length} Total Projects
                </div>
            </div>

         
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2 px-4">
                     
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-400 uppercase text-[10px] tracking-widest border-none">
                                <th className="py-6 pl-8">Project & Client</th>
                                <th>Progress</th>
                                <th>Status Update</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {management.map((project) => (
                                <tr key={project._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                           
                                        
                                            <div>
                                                <div className="font-bold text-slate-800 text-base">{project.project_name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{project.client_email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex flex-col gap-1 w-32">
                                            <div className="flex justify-between text-[10px] font-black text-primary">
                                                <span>{project.progress}%</span>
                                            </div>
                                            <progress className="progress progress-primary h-1.5 w-full" value={project.progress} max="100"></progress>
                                        </div>
                                    </td>

                                    <td>
                                        <select
                                            defaultValue={project.status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            className={`select select-sm select-bordered rounded-xl font-bold text-xs ${project.status === 'Completed' ? 'text-emerald-600' : 'text-primary'
                                                }`}
                                        >
                                            <option value="In Progress">In Progress</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>

                                    <td>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                className="btn btn-ghost btn-sm btn-square text-slate-300 hover:text-error hover:bg-error/5 rounded-xl transition-all"
                                            >
                                                <HiOutlineTrash size={20} />
                                            </button>
                                            <button onClick={ () =>  handelupdate(project._id)} className="btn btn-ghost btn-sm btn-square text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl">
                                                <HiOutlineRefresh size={20} className="hover:rotate-180 transition-transform duration-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {management.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center opacity-20">
                        <HiOutlineDotsVertical size={40} />
                        <p className="font-bold mt-2">No projects found to manage.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProductspage;