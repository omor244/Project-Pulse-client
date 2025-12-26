const Features = () => {
    const roles = [
        {
            title: "Administrative Control",
            role: "For Admins",
            description: "Monitor overall project health scores and manage team assignments in one dashboard.",
            icon: "📊",
            color: "border-primary"
        },
        {
            title: "Weekly Check-ins",
            role: "For Employees",
            description: "Submit weekly progress, report risks, and share confidence levels easily.",
            icon: "✍️",
            color: "border-secondary"
        },
        {
            title: "Direct Feedback",
            role: "For Clients",
            description: "Provide structured satisfaction ratings and flag issues to ensure project success.",
            icon: "💬",
            color: "border-accent"
        }
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">One Platform, Three Perspectives</h2>
                    <p className="mt-4 text-slate-600">Tailored experiences for every stakeholder in the project lifecycle.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((item, index) => (
                        <div key={index} className={`card bg-white shadow-xl border-t-4 ${item.color} hover:-translate-y-2 transition-transform duration-300`}>
                            <div className="card-body">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <div className="badge badge-secondary badge-outline mb-2">{item.role}</div>
                                <h3 className="card-title text-slate-800">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;