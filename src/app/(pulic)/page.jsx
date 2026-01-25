import Banner from "@/Components/Home/Banner";
import Features from "@/Components/Home/Features";
import HealthScale from "@/Components/Home/HealthScale";
import HowItWorks from "@/Components/Home/HowItWorks";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <Banner />
      <Features />
      <HealthScale />
      <HowItWorks />
    </div>
  );
}
