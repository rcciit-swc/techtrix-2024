import { Metadata } from "next";

export function generateMetadata({
  title = "TechTrix 2024",
  description = "TechTrix is Official Techno-Management Fest organised by RCCIIT,Kolkata.",
  image = "/thumbnail.png",
  authors = {
    name: "TechTrix RCCIIT Team",
    url: "https://techtrix.rcciit.org.in/",
  },
  creator = "TechTrix RCCIIT Team",
  generator = "RCCIIT Kolkata",
  publisher = "RCCIIT Kolkata",
  icons = "/favicon.ico",
  robots = "index, follow",
}: {
  title?: string;
  description?: string;
  image?: string;
  authors?: { name: string; url: string };
  creator?: string;
  generator?: string;
  publisher?: string;
  icons?: string;
  robots?: string;
} = {}): Metadata {
  return {
    title,
    description,
    authors,
    creator,
    generator,
    publisher,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    metadataBase: new URL("https://techtrix.rcciit.org.in/"),
    robots,
  };
}
