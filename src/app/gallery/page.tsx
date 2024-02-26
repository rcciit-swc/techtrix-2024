import { Metadata } from "next";
import { Heading } from "@/components/home";

import GalleryCard from "@/components/gallery/GalleryCard";
import { generateMetadata } from "@/utils/metadata";
import { gallery } from "@/utils/constants/constants";

export const metadata: Metadata = generateMetadata({
  title: "Gallery | TechTrix 2024",
  description: "Explore the Gallery of TechTrix 2024",
});
const page = () => {
  return (
    <div className="px-5  mx-auto text-center">
      <Heading text="Gallery" />
      <div className="mx-auto grid max-w-[1600px] mt-10 grid-cols-1 items-center justify-center gap-20 rounded-2xl px-5 py-10 font-sans md:grid-cols-2 md:border md:px-10 md:py-20 lg:grid-cols-3">
        {gallery.map((photo, index) => (
          <GalleryCard photo={photo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
