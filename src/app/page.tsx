import Events from "@/components/Events";
import Hero from "@/components/Hero";
import Sponsor from "@/components/Sponsor";

const Home = () => {
  return (
    <main className="oveflow-x-hidden flex flex-col gap-10">
      <Hero />
      <Events />
      <Sponsor />
    </main>
  );
};
export default Home;
