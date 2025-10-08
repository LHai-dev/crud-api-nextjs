import { User } from "@/utils/user.type";
import { ApiResponse } from "@/types/api-reponse.type";

type SortField = "firstName" | "lastName" | "age" | "phoneNumber";
const ALLOWED_SORT_FIELDS: SortField[] = [
  "firstName",
  "lastName",
  "age",
  "phoneNumber",
];

export const fetchUsers = async (
  sortBy: SortField = "firstName",
  sortOrder: "asc" | "desc" = "asc",
  search?: string
): Promise<User[]> => {
  const params = new URLSearchParams();

  if (sortBy && ALLOWED_SORT_FIELDS.includes(sortBy)) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (search) params.append("search", search);

  const url = `/api/user?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  const result: ApiResponse<User[]> = await res.json();

  if (!res.ok || !result.success) {
    const message = result.success ? undefined : result.error.message;
    throw new Error(message || "Failed to fetch users");
  }

  return result.data;
};

export const createUser = async (user: {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phoneNumber: string;
}): Promise<void> => {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const err: ApiResponse<null> = await res.json();
    const message = err.success ? undefined : err.error.message;
    throw new Error(message || "Failed to create user");
  }
};

export const deleteUserById = async (id: number): Promise<boolean> => {
  const rep = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });
  return rep.ok;
};

export const updateUserById = async (id: number, user: Partial<User>): Promise<void> => {
  const res = await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const err: ApiResponse<null> = await res.json();
    const message = err.success ? undefined : err.error.message;
    throw new Error(message || "Failed to update user");
  }
};
