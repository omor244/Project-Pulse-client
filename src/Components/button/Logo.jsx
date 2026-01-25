"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


const Logo = () => {
     const pathname = usePathname();
    return (
        <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <span className={`text-white text-xl font-bold tracking-tight  uppercase hidden sm:block`}>
                Project<span className="text-primary">Pulse</span>
            </span>
        </Link>
    );
};

export default Logo;