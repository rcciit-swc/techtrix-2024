import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import TeamWrapper from "@/components/team/TeamWrapper";
import { generateMetadata } from "@/utils/metadata";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = generateMetadata({
  title: "Team | TechTrix 2024",
  description: "RCCIIT's Team for TechTrix 2024",
});

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TeamWrapper>
        {children}
      </TeamWrapper>
      <SessionProvider />
    </>
  );
}
