import { NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { ApiResponse } from "@/types/api-reponse.type";

type SuccessResponseOptions<T> = {
  data: T;
  message?: string;
  details?: Record<string, unknown>;
  status?: number;
};

export function createSuccessResponse<T>(
  options: SuccessResponseOptions<T>
): NextResponse<ApiResponse<T>> {
  const { message, details, status = HttpStatus.OK, data } = options;

  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
      ...(details && { meta: details }),
    },
    { status }
  );
}
export function createCreatedResponse(location?: string) {
  const headers: HeadersInit = {};

  if (location) {
    headers["Location"] = location;
  }

  return new NextResponse(null, {
    status: HttpStatus.CREATED,
    headers,
  });
}

export function createNoContentResponse() {
  return new NextResponse(null, {
    status: HttpStatus.NO_CONTENT,
  });
}

export function createErrorResponse(
  message: string,
  status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  code: string,
  details?: Record<string, unknown>
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}
