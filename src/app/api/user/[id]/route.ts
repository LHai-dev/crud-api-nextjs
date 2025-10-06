import { userUpdateSchema } from "@/db/schema";
import { apiHandler, BadRequestException } from "@/error";
import {
  createNoContentResponse,
  createSuccessResponse,
} from "@/lib/api-response";
import { userService } from "@/server/user";

import { NextRequest } from "next/server";

export const GET = apiHandler<NextRequest>(async (req) => {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  if (!id) {
    throw new BadRequestException("User ID is required");
  }

  const user = await userService.getUserById(Number(id));
  return createSuccessResponse({ data: user });
});
export const DELETE = apiHandler<NextRequest>(async (req) => {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  if (!id) {
    throw new BadRequestException("User ID is required");
  }
  await userService.deleteUser(Number(id));
  return createNoContentResponse();
});
export const PUT = apiHandler<NextRequest>(async (req) => {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const body = await req.json();
  const validatedBody = userUpdateSchema.safeParse(body);
  if (!id) {
    throw new BadRequestException("User ID is required");
  }
  if (!validatedBody.success) {
    throw new BadRequestException(validatedBody.error.message);
  }
  await userService.updateUser(Number(id), validatedBody.data);
  return createNoContentResponse();
});
