"use client";

import { InputForm } from "@/components/form";
import TableUsers from "@/components/table";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 p-4 w-full  mx-auto md:flex-row">
      <div className="w-full md:w-1/3">
        <InputForm />
      </div>
      <div className="w-full md:w-2/3">
        <TableUsers />
      </div>
    </div>
  );
}
