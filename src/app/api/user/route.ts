import { HttpStatus } from "@/constants/http-status";
import { UserSchema } from "@/db/types/user.type";
import { apiHandler, BadRequestException } from "@/error";
import { createSuccessResponse } from "@/lib/api-response";
import { userService } from "@/server/user/user.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = apiHandler<NextRequest>(async () => {
  const yt = await userService.getAllUsers();
  return createSuccessResponse({ data: yt });
});
export const POST = apiHandler<NextRequest>(async (req) => {
  const body = await req.json();
  const validatedBody = UserSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new BadRequestException(validatedBody.error.message);
  }

  await userService.createUser(body);
  return NextResponse.json({ success: true }, { status: HttpStatus.CREATED });
});
