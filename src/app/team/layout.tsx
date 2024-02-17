import type { Metadata } from "next";
import { Syncopate } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import TeamWrapper from "@/components/team/TeamWrapper";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techtrix-2024",
  description: "Techtrix-2024",
};

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
