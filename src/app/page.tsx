import { Events, Hero, Partners, Sponsor } from "@/components/home";
import Sessions from "@/components/home/Sessions";

const Home = () => {
  return (
    <main className="oveflow-x-hidden  flex flex-col gap-16">
      <Hero />
      <Events />
      <Sessions />
      <Partners />
      <Sponsor />
    </main>
  );
};
export default Home;
