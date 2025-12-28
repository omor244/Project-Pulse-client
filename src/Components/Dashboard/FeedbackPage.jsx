"use client"
import React, { useState } from 'react';
import { HiOutlineChatAlt2, HiOutlineStar, HiOutlineLightningBolt, HiOutlineCheckCircle } from "react-icons/hi";
import useAuth from '@/Hook/sheard'; 
import useAxiosSecure from '../useAxiosSecure';



const FeedbackPage = ({ projectData, setIsModalOpen }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [rating, setRating] = useState(0);
    const [satisfaction, setSatisfaction] = useState("");
    const [submitted, setSubmitted] = useState(false);

  
  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0 || !satisfaction) {
            return alert("Please select a rating and satisfaction level.");
        }

        const formData = new FormData(e.target);
        const comment = formData.get('comment');

        const feedbackData = {
            project_id: projectData?._id || "6589a1b2c3d4e5f6a1234561",
            project_name: projectData?.project_name || "ProjectPulse Web App",
            employee_email: projectData.client_email,
            client_name: user?.displayName,
            rating: rating,
            comment: comment,
            satisfaction: satisfaction,
    
            issue_flag: satisfaction === "Needs Work" || rating <= 2,
            date: new Date().toISOString(),
        };

        console.log(feedbackData)

        axiosSecure.post('/feedback', feedbackData)
            .then(res => {
            console.log(res.data)
        })
        setIsModalOpen(false)

    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <HiOutlineCheckCircle size={50} />
                </div>
                <h2 className="text-3xl font-black text-slate-800">Thank You!</h2>
                <p className="text-slate-500 mt-2 max-w-sm font-medium">Your feedback has been recorded. Our team will review it shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-indigo-600 font-bold hover:underline">Submit another response</button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Client Satisfaction <span className="text-primary">Survey</span></h1>
                <p className="text-slate-500 font-medium mt-2">Project: <span className="text-slate-800 font-bold tracking-wide underline decoration-indigo-200">{projectData?.project_name || "Loading..."}</span></p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Left Side: Instructions */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
                        <HiOutlineLightningBolt size={40} className="mb-4 text-indigo-300" />
                        <h3 className="text-2xl font-bold mb-4">Why your feedback matters?</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed opacity-90">
                            Your feedback ensures that our developers stay aligned with your business goals. Negative feedback automatically triggers an "Issue Flag" for immediate attention.
                        </p>
                    </div>

                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50/50">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <HiOutlineChatAlt2 className="text-indigo-500" /> Quick Guidelines
                        </h4>
                        <ul className="text-xs text-slate-500 space-y-3 font-medium">
                            <li className="flex gap-2"><span>•</span> Be specific about feature requests.</li>
                            <li className="flex gap-2"><span>•</span> Mention any blockers you've noticed.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Actual Form */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-2 md:p-6">
                        {/* Rating Component */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Rate this week's progress</label>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-2 ${rating >= star
                                            ? "bg-amber-400 border-amber-400 text-white shadow-lg shadow-amber-100 scale-110"
                                            : "bg-white border-slate-100 text-slate-300 hover:border-amber-200"
                                            }`}
                                    >
                                        <HiOutlineStar size={24} fill={rating >= star ? "white" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Textarea */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Your Comments</label>
                            <textarea
                                name="comment"
                                required
                                rows={6}
                                className="w-full p-6 bg-slate-50 rounded-[2rem] border-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400 font-medium"
                                placeholder="Describe your experience this week..."
                            />
                        </div>

                        {/* Selection for Satisfaction */}
                        <div className="space-y-4">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Overall Satisfaction</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setSatisfaction("Highly Satisfied")}
                                    className={`p-4 rounded-2xl border-2 transition-all font-bold ${satisfaction === "Highly Satisfied"
                                            ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                                            : "border-slate-100 text-slate-600 hover:border-indigo-500"
                                        }`}
                                >
                                    Highly Satisfied
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSatisfaction("Needs Work")}
                                    className={`p-4 rounded-2xl border-2 transition-all font-bold ${satisfaction === "Needs Work"
                                            ? "bg-rose-50 border-rose-500 text-rose-600"
                                            : "border-slate-100 text-slate-600 hover:border-rose-500"
                                        }`}
                                >
                                    Needs Work
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                           
                            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-primary transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:bg-slate-400"
                        >
                            Submit Weekly Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;