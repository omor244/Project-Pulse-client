"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import sheard from '@/Hook/sheard';
import { saveorupdateuser } from '@/Utility/utility';
import { toast } from 'react-toastify';



const Registerpage = () => {
    const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading, user } = sheard()
    const router = useRouter();
   



    // if (user) {
    //     router.replace('/dashboard');
    // }

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photoURL.value;

        console.log(name, email, password, photo)
        try {
        
            await createUser(email, password);

            await updateUserProfile(name, photo);

        
            await saveorupdateuser({
                name: name,
                email: email,
                image: photo
            });

            toast.success('Account Created Successfully!');
            router.push('/');
        } catch (err) {
            toast.error(err?.message || 'Registration Failed');
        } finally {
            
        }
    };

    const handleGoogleSignIn = async () => {

        try {
            const result = await signInWithGoogle();
            await saveorupdateuser({
                name: result.user?.displayName,
                email: result.user?.email,
                image: result.user?.photoURL
            });
            router.push('/');
            toast.success('Welcome to ProjectPulse!');
        } catch (err) {
            toast.error(err?.message || 'Google Sign-in Failed');
        } finally {
            // setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden p-4">

            {/* Background with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('https://i.ibb.co/y9VqSwb/images.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10"></div>
            </div>

           
            <div className="relative z-10 w-full max-w-sm">
                <div
                    className="card p-8 pt-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl text-white"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), 50% 100%, 0 calc(100% - 40px))',
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-black italic tracking-tighter uppercase">
                            Project<span className="text-primary">Pulse</span>
                        </h1>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Create your professional account</p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="space-y-3">
                        <div className="form-control">
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="Full Name"
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary text-sm h-10"
                            />
                        </div>

                        <div className="form-control">
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email Address"
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary text-sm h-10"
                            />
                        </div>

                        <div className="form-control">
                            <input
                                name="photoURL"
                                type="url"
                                required
                                placeholder="Photo URL (https://...)"
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary text-sm h-10"
                            />
                        </div>

                        <div className="form-control">
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Password (6+ chars)"
                                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary text-sm h-10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full rounded-full text-white mt-4 border-none shadow-lg shadow-primary/20 h-10"
                        >
                            {'Register'}
                        </button>
                    </form>

                    {/* Social Divider */}
                    <div className="flex items-center gap-2 my-5">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-[9px] uppercase text-white/30">Quick Access</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    {/* Google Sign-In */}
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="btn btn-outline w-full rounded-full border-white/10 text-white hover:bg-white/5 gap-3 h-10"
                    >
                        <FcGoogle size={18} />
                        <span className="text-xs">Signup with Google</span>
                    </button>

                    {/* Footer Link */}
                    <p className="text-center text-xs mt-6 pb-10 opacity-60">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registerpage;