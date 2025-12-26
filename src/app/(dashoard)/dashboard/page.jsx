import Overview from "@/Components/Dashboard/Overview";

export default function DashboardPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
                    <p className="text-gray-500">Active Projects</p>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="p-6 bg-white shadow rounded-xl border border-gray-100">
                    <p className="text-gray-500">System Status</p>
                    <p className="text-green-500 font-bold uppercase text-sm">Online</p>
                </div>
                <Overview></Overview>
            </div>
        </div>
    );
}