import { userUpdateSchema } from "@/db/schema";
import { apiHandler, BadRequestException } from "@/error";
import {
  createNoContentResponse,
  createSuccessResponse,
} from "@/lib/api-response";
import { userService } from "@/server/user";

import { NextRequest } from "next/server";

export const GET = apiHandler<NextRequest>(async (req, context) => {
  const { id } = context.params;
  if (!id) {
    throw new BadRequestException("User ID is required");
  }

  const user = await userService.getUserById(Number(id));
  return createSuccessResponse({ data: user });
});
export const DELETE = apiHandler<NextRequest>(async (req, context) => {
  const { id } = context.params;
  if (!id) {
    throw new BadRequestException("User ID is required");
  }
  await userService.deleteUser(Number(id));
  return createNoContentResponse();
});
export const PUT = apiHandler<NextRequest>(async (req, context) => {
  const { id } = context.params;
  const body = await req.json();
  const validatedBody = userUpdateSchema.safeParse(body);
  if (!id) {
    throw new BadRequestException("User ID is required");
  }
  if (!validatedBody.success) {
    throw new BadRequestException(validatedBody.error.message.normalize());
  }
  await userService.updateUser(Number(id), validatedBody.data);
  return createNoContentResponse();
});
