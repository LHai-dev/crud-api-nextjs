"use client";
import { CreateUserModal } from "@/compoments/PopupForm";
import { deleteUserById, fetchUsers } from "@/utils/user.api";
import { User } from "@/utils/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "./loading";

export default function UsersPage() {
  const queryClient = useQueryClient();
  const {
    data: tableItems,
    isLoading,
    isError,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUserById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Team members
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add member
          </button>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">id</th>
              <th className="py-3 px-6">fullname</th>
              <th className="py-3 px-6">age</th>
              <th className="py-3 px-6">gender</th>
              <th className="py-3 px-6">create at</th>
              <th className="py-3 px-6">update at</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems?.map((item, idx) => (
              <tr key={idx}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">
                      {item.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.fullname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.updatedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.createdAt}
                </td>

                <td className="text-right px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    {deleteMutation.isPending ? "deleting..." : "delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      {showModal && <CreateUserModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
