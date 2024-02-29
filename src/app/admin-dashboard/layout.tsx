import SessionProvider from "@/components/SessionProvider";
import AdminWrapper from "@/components/admin/AdminWrapper";
import { generateMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { Syncopate } from "next/font/google";

const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = generateMetadata({
  title: "Events | TechTrix 2024",
  description: "TechTrix 2024's Events",
});

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <>
      <AdminWrapper
      >
        
        {children}
      </AdminWrapper>
      <SessionProvider />
    </>
  );
}
