"use client"

import useAuth from '@/Hook/sheard';
import { saveorupdateuser } from '@/Utility/utility';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { toast } from 'react-toastify';

// import useAuth from '@/hooks/useAuth';
// import { saveorupdateuser } from '@/utility/utility';

const Loginpage = () => {

    const router = useRouter(); 

    const { signIn, signInWithGoogle } = useAuth()



    const handleSignup = async (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;


        console.log(email, password)
        try {

            const result = await signIn(email, password);


            router.push('/');
        } catch (err) {
            toast.error(err?.message || 'Signup Failed');
        } finally {

        }
    };

    const handleGoogleSignIn = async () => {

        try {
            const result = await signInWithGoogle();
            router.push('/');
            await saveorupdateuser({
                name: result.user?.displayName,
                email: result.user?.email,
                image: result.user?.photoURL
            });
            toast.success('Welcome to ProjectPulse!');
        } catch (err) {
            toast.error(err?.message || 'Google Sign-in Failed');
        } finally {

        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden p-4">

            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-primary/10"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div
                    className="card p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl text-white"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 50px), 50% 100%, 0 calc(100% - 50px))',
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tighter uppercase">
                            Join <span className=" text-primary">Pulse</span>
                        </h2>
                        <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-2">Start monitoring project health</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-4">

                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="Email Address"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-secondary transition-all text-sm"
                        />
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="Create Password (6+ chars)"
                            className="input input-bordered w-full bg-white/5 border-white/10 focus:border-secondary transition-all text-sm"
                        />

                        <button
                            type="submit"

                            className="btn btn-secondary w-full rounded-full text-white shadow-lg shadow-secondary/20 border-none mt-2"
                        >
                            {'Login Now'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">or</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    {/* Google Signup */}
                    <button
                        onClick={handleGoogleSignIn}

                        className="btn btn-outline w-full rounded-full border-white/10 text-white hover:bg-white/5 gap-3"
                    >
                        <FcGoogle size={20} />
                        <span className="text-xs font-medium">Register with Google</span>
                    </button>

                    {/* Footer Link */}
                    <div className="text-center mt-8 pb-10">
                        <p className="text-xs text-white/50">
                            Already a member?{' '}
                            <Link href="/register" className="text-primary font-bold hover:underline">
                                Register Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;