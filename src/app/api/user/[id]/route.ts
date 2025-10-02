import { HttpStatus } from "@/constants/http-status";
import { apiHandler, BadRequestException } from "@/error";
import { createSuccessResponse } from "@/lib/api-response";
import { userService } from "@/server/user/user.service";
import { NextRequest, NextResponse } from "next/server";

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
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
export const PUT = apiHandler<NextRequest>(async (req) => {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  const body = await req.json();
  if (!id) {
    throw new BadRequestException("User ID is required");
  }
  await userService.updateUser(Number(id), body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
