import { User } from "@/utils/user.type";
export const fetchUsers = async (
  sortBy = "id",
  sortOrder: "asc" | "desc" = "asc",
  search?: string
): Promise<User[]> => {
  const params = new URLSearchParams();

  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (search) params.append("search", search);

  const url = `/api/user?${params.toString()}`;

  const res = await fetch(url);
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch users");
  }

  return result.data;
};

export const createUser = async (user: {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}) => {
  await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const deleteUserById = async (id: number): Promise<boolean> => {
  const rep = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });
  return rep.ok;
};

export const updateUserById = async (id: number, user: Partial<User>) => {
  await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
};
