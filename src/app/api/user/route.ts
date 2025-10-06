import { userInsertSchema } from "@/db/schema";
import { apiHandler, BadRequestException } from "@/error";
import {
  createCreatedResponse,
  createSuccessResponse,
} from "@/lib/api-response";
import { userService } from "@/server/user";
import { NextRequest } from "next/server";

export const GET = apiHandler<NextRequest>(async () => {
  const yt = await userService.getAllUsers();
  return createSuccessResponse({ data: yt });
});
export const POST = apiHandler<NextRequest>(async (req) => {
  const body = await req.json();
  const validatedBody = userInsertSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new BadRequestException(validatedBody.error.message);
  }

  await userService.createUser(body);
  return createCreatedResponse();
});
