"use client"

import FullPageLoader from "@/Components/button/FullPageLoader";
import useAuth from "@/Hook/sheard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [showLoader, setShowLoader] = useState(true);

    
    useEffect(() => {
      
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 3000);

     
        if (!loading && !user) {
            router.push("/login");
        }

        return () => clearTimeout(timer); 
    }, [user, loading, router]);

    
    if (loading || showLoader) {
        return <FullPageLoader></FullPageLoader>
    }
         
       
  


   
  

        return children;
  
    
};

export default PrivateRoute;