import React from "react";
import Link from "next/link";

const AdminTab = ({ name, path }: { name: string; path: string }) => {
  return (
    <Link
      href={path}
      className="bg-black text-white py-2  lg:py-3 text-xs  lg:text-sm xl:text-lg px-5 md:px-10 border-2 cursor-pointer border-black hover:bg-white hover:text-black rounded-xl  font-semibold"
    >
      {name}
    </Link>
  );
};
const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-row items-center justify-center flex-wrap max-md:mt-5 gap-4 md:gap-10">
        <AdminTab name="Edit Events" path="/admin-dashboard/manage-events" />
        <AdminTab
          name="Approve Registrations"
          path="/admin-dashboard/approve"
        />
      </div>

      {children}
    </div>
  );
};

export default AdminWrapper;
