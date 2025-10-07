import { userInsertSchema } from "@/db/schema";
import { userQuerySchema } from "@/db/types/user.type";
import { apiHandler, BadRequestException } from "@/error";
import {
  createCreatedResponse,
  createSuccessResponse,
} from "@/lib/api-response";
import { userService } from "@/server/user";
import { NextRequest } from "next/server";

// export const GET = apiHandler<NextRequest>(async () => {
//   const yt = await userService.getAllUsers();
//   return createSuccessResponse({ data: yt });
// });
export const GET = apiHandler<NextRequest>(async (req) => {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());
  const validatedQuery = userQuerySchema.safeParse(query);

  if (!validatedQuery.success) {
    return Response.json({ error: "Invalid query" }, { status: 400 });
  }

  const { search, sortBy, sortOrder } = validatedQuery.data;

  const users = await userService.listUsers({ search, sortBy, sortOrder });
  return createSuccessResponse({ data: users });
});

export const POST = apiHandler<NextRequest>(async (req) => {
  const body = await req.json();
  const validatedBody = userInsertSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new BadRequestException(validatedBody.error.message.normalize());
  }

  await userService.createUser(body);
  return createCreatedResponse();
});
