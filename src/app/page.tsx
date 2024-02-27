import { Events, Hero, Partners, Sponsor } from "@/components/home";

const Home = () => {
  return (
    <main className="oveflow-x-hidden flex flex-col gap-16">
      <Hero />
      <Events />
      <Partners />
      <Sponsor />
    </main>
  );
};
export default Home;
