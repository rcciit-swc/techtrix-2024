import { Events, Hero, Sponsor } from "@/components/home";

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
