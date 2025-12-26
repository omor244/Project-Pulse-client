const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Weekly Check-ins",
            description: "Employees provide weekly updates on progress, confidence levels, and potential roadblocks.",
           
        },
        {
            number: "02",
            title: "Client Feedback",
            description: "Clients submit structured ratings on satisfaction, communication, and overall quality.",
            
        },
        {
            number: "03",
            title: "Pulse Analysis",
            description: "Our algorithm processes the data to generate a real-time Health Score (0-100).",
           
        },
        {
            number: "04",
            title: "Proactive Actions",
            description: "Admins identify 'At Risk' projects early and take necessary steps to ensure success.",
            
        }
    ];

    return (
        <section className="py-24 bg-white  overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Process</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        How Project<span className="text-primary">Pulse</span> Works
                    </h3>
                    <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
                        A seamless data-driven cycle designed to keep your projects on track and clients happy.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="relative ">
                    {/* Connector Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="group flex flex-col items-center text-center">
                                {/* Step Number Circle */}
                                <div className={`w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-6 shadow-xl transform transition-transform group-hover:rotate-12 group-hover:scale-110`}>
                                    {step.number}
                                </div>

                                {/* Content */}
                                <h4 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed px-4">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;