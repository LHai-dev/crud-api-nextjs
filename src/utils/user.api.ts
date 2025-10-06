import { User } from "@/utils/user.type";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/user");
  const result = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch users");
  }
  console.log("Fetched users:", result.data);
  return result.data;
};

export const createUser = async (
  user:{fullname: string; age: number; gender: string}
)=> {
  const res = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const result = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to create user");
  }

  console.log("Created user:", result.data);
  return result.data;
};

export const deleteUserById = async (id: number): Promise<void> => {
  const req = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });
  const result = await req.json();
  if (!req.ok || !result.success) {
    throw new Error(result.message || "Failed to delete user");
  }
};

export const updateUserById = async (id: number, user: Partial<User>) => {
  const req = await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  const result = await req.json();
};
