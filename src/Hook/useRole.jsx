import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "@/Components/useAxiosSecure";
import useAuth from "./sheard";




const useRole = () => {

    const { user, loading } = useAuth()
    const axiossecure = useAxiosSecure()

    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],

        queryFn: async () => {

            const { data } = await axiossecure.get(`/user?email=${user?.email}`)

           return data.role
        }
    })



    if (isLoading) return <p>Loading...</p>
    return { role };
};

export default useRole;