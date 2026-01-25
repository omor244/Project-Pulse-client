
import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "@/Components/useAxiosSecure";
import useAuth from "./sheard";




const useRole = () => {

    const { user, loading } = useAuth()
    const axiossecure = useAxiosSecure()

    const { data: role = null, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email,

        queryFn: async () => {
            if (!user?.email) return null;

            const { data } = await axiossecure.get(`/user?email=${user?.email}`)

           return data?.role || null
        }
    })

    // Always return an object with role and isLoading, ensuring role is never undefined
    return { 
        role: role || null, 
        isLoading: isLoading || loading 
    };
};

export default useRole;