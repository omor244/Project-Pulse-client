import Banner from "@/Components/Home/Banner";
import Features from "@/Components/Home/Features";
import HealthScale from "@/Components/Home/HealthScale";
import HowItWorks from "@/Components/Home/HowItWorks";


export default function Home() {
  return (
    <div className="bg-base-100">
      <Banner></Banner>
      <Features></Features>
      <HealthScale></HealthScale>
      <HowItWorks></HowItWorks>
    </div>
  );
}
