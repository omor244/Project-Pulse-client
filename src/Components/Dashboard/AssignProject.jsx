"use client"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import useAuth from "@/Hook/sheard";
import axios from "axios";


const AssignProject = () => {
  
    const {user} = useAuth()
    const { data: Assigned = [] } = useQuery({
        queryKey: ['Assigned', user.email],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/projects')


            return res.data
        }
    })

    return (
        <div>
            
        </div>
    );
};

export default AssignProject;