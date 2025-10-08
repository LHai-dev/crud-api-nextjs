"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { deleteUserById, fetchUsers } from "@/utils/user.api";
import { User } from "@/utils/user.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TablePlaceholder } from "./table-placeholder";
import { AlertDialogButton } from "./alert-dialog";

type SortField = "firstName" | "lastName" | "age";
const ALLOWED_SORT_FIELDS: SortField[] = [
  "firstName",
  "lastName",
  "age",
] as const;

export default function UsersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const rawSortBy = searchParams.get("sortBy");
  const rawSortOrder = searchParams.get("sortOrder");

  const validSortBy = ALLOWED_SORT_FIELDS.includes(rawSortBy as SortField)
    ? (rawSortBy as SortField)
    : "age";
  const validSortOrder = rawSortOrder === "desc" ? "desc" : "asc";

  const [sortBy, setSortBy] = useState<SortField>(validSortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(validSortOrder);

  useEffect(() => {
    setSearch(searchInput);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.replace(`${pathname}?${params.toString()}`);
  }, [sortBy, sortOrder, search, router, pathname]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(sortBy, sortOrder, search);
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSort = (column: SortField) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getGenderBadgeVariant = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "secondary";
      case "female":
        return "outline";
      default:
        return "default";
    }
  };

  const getAriaSort = (field: SortField) => {
    if (sortBy !== field) return undefined;
    return sortOrder === "asc" ? "ascending" : "descending";
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    try {
      const isDeleted = await deleteUserById(id);
      if (!isDeleted) {
        throw new Error("Delete request failed");
      }
      await loadUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Input
          placeholder="Search by name or phone..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm"
          aria-label="Search users"
          type="search"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("firstName")}
                className="flex items-center gap-1 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                aria-sort={getAriaSort("firstName")}
                aria-label={`Sort by first name, currently ${
                  getAriaSort("firstName") || "not sorted"
                }`}
              >
                First Name <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("lastName")}
                className="flex items-center gap-1 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                aria-sort={getAriaSort("lastName")}
                aria-label={`Sort by last name, currently ${
                  getAriaSort("lastName") || "not sorted"
                }`}
              >
                Last Name <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>
              <button
                onClick={() => handleSort("age")}
                className="flex items-center gap-1 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                aria-sort={getAriaSort("age")}
                aria-label={`Sort by age, currently ${
                  getAriaSort("age") || "not sorted"
                }`}
              >
                Age <ArrowUpDown className="w-4 h-4" />
              </button>
            </TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TablePlaceholder />
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Badge variant={getGenderBadgeVariant(user.gender)}>
                    {user.gender}
                  </Badge>
                </TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <AlertDialogButton
                      id={user.id}
                      onDelete={(id) => handleDeleteUser(id)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      Update
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-4"
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
