import Link from "next/link";
import { HiOutlineClock, HiOutlineUserGroup, HiOutlineExclamationCircle, HiOutlineExternalLink } from "react-icons/hi";

const ProjectCard = ({ project }) => {
    const {
        project_name,
        description,
        status,
        priority,
        progress,
        deadline,
        members,
        risk_level,
        _id
    } = project;

   
    const statusStyle =
        status === "Completed" ? "bg-emerald-100 text-emerald-700" :
            status === "In Progress" ? "bg-blue-100 text-blue-700" :
                "bg-amber-100 text-amber-700";

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{project_name}</h3>
                    <p className="text-xs text-gray-400 mt-1">ID: {project._id.slice(-6).toUpperCase()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle}`}>
                    {status}
                </span>
            </div>

   
            <p className="text-sm text-gray-600 line-clamp-2 mb-6 h-10">
                {description}
            </p>

   
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-gray-500">Progress</span>
                    <span className="text-xs font-bold text-primary">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <HiOutlineClock className="text-gray-400" />
                    <div className="text-[11px]">
                        <p className="text-gray-400 leading-none">Deadline</p>
                        <p className="font-bold text-slate-700">{deadline}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <HiOutlineExclamationCircle className={`text-gray-400 ${priority === 'High' ? 'text-rose-500' : ''}`} />
                    <div className="text-[11px]">
                        <p className="text-gray-400 leading-none">Priority</p>
                        <p className="font-bold text-slate-700">{priority}</p>
                    </div>
                </div>
            </div>

            
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="flex -space-x-2">
                    {members.map((member, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600" title={member}>
                            {member[0]}
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-gray-400">
                        +
                    </div>
                </div>

                <Link href={`projects/${_id}`} className="flex items-center gap-1 text-sm font-bold text-primary hover:text-blue-700 transition-colors">
                    Details <HiOutlineExternalLink />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;