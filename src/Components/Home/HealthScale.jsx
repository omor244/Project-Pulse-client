

const HealthScale = () => {
    const levels = [
        { range: "80 - 100", label: "On Track", color: "bg-success", text: "Project is healthy and meeting all milestones." },
        { range: "60 - 79", label: "At Risk", color: "bg-warning", text: "Some issues detected. Requires attention from PM." },
        { range: "Below 60", label: "Critical", color: "bg-error", text: "Immediate action required to prevent failure." }
    ];

    return (
        <section className="py-20 ">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">Understanding Health Scores</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {levels.map((lvl, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-16 h-16 ${lvl.color} rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4`}>
                                {lvl.range}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{lvl.label}</h3>
                            <p className="text-sm text-gray-500">{lvl.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthScale