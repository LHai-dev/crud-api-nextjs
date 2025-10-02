"server-only";

import type { NextRequest } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { createErrorResponse } from "@/lib/api-response";


/**
 * Interface for constructing API errors
 */

/**
 * Configuration options for creating an API error
 * @param message Human-readable error message
 * @param status HTTP status code
 * @param details Optional metadata for the error
 */
type ApiErrorOptions = {
  message: string;
  status: number;
  details?: Record<string, unknown>;
};

/**
 * Base error class for handling API errors
 * Uses standardized error structure: { name, message, details } + status
 * Name is automatically set from the constructor name
 * @param options Configuration for creating the error
 * @param options.message Human-readable error message
 * @param options.status HTTP status code
 * @param options.details Optional metadata for the error
 *
 * @example
 * throw new ApiError({
 *   message: "Invalid input provided",
 *   status: HttpStatus.BAD_REQUEST,
 *   details: { field: "email" }
 * });
 */
export class ApiError extends Error {
  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = this.constructor.name;
    this.status = options.status;
    this.details = options.details;
  }

  status: number;
  details?: Record<string, unknown>;
}

/**
 * Options for customizing error responses
 * @param message Custom error message
 * @param details Additional metadata for the response
 */
type ErrorOptions = {
  message?: string;
  details?: Record<string, unknown>;
};

/**
 * Helper function to process constructor arguments for exception classes
 */
const processErrorArgs = (
  messageOrOptions: string | ErrorOptions,
  defaultMessage: string,
  status: number,
): ApiErrorOptions => {
  const options =
    typeof messageOrOptions === "string"
      ? { message: messageOrOptions }
      : messageOrOptions;

  return {
    message: options.message || defaultMessage,
    status,
    details: options.details,
  };
};

export class BadRequestException extends ApiError {
  constructor(messageOrOptions: string | ErrorOptions = "Bad Request") {
    super(
      processErrorArgs(messageOrOptions, "Bad Request", HttpStatus.BAD_REQUEST),
    );
  }
}

export class UnauthorizedException extends ApiError {
  constructor(messageOrOptions: string | ErrorOptions = "Unauthorized") {
    super(
      processErrorArgs(
        messageOrOptions,
        "Unauthorized",
        HttpStatus.UNAUTHORIZED,
      ),
    );
  }
}

export class ForbiddenException extends ApiError {
  constructor(messageOrOptions: string | ErrorOptions = "Forbidden") {
    super(
      processErrorArgs(messageOrOptions, "Forbidden", HttpStatus.FORBIDDEN),
    );
  }
}

export class NotFoundException extends ApiError {
  constructor(messageOrOptions: string | ErrorOptions = "Not Found") {
    super(
      processErrorArgs(messageOrOptions, "Not Found", HttpStatus.NOT_FOUND),
    );
  }
}

export class TooManyRequestsException extends ApiError {
  constructor(messageOrOptions: string | ErrorOptions = "Too Many Requests") {
    super(
      processErrorArgs(
        messageOrOptions,
        "Too Many Requests",
        HttpStatus.TOO_MANY_REQUESTS,
      ),
    );
  }
}

export class InternalServerErrorException extends ApiError {
  constructor(
    messageOrOptions: string | ErrorOptions = "Internal Server Error",
  ) {
    super(
      processErrorArgs(
        messageOrOptions,
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}

export class ConflictException extends ApiError {
  constructor(messageOrOptions: string | ErrorOptions = "Conflict") {
    super(processErrorArgs(messageOrOptions, "Conflict", HttpStatus.CONFLICT));
  }
}

/**
 * Handles API errors and converts them to HTTP responses
 * @param error The error to handle
 */
export function HandleApiError(error: unknown) {

  if (error instanceof ApiError) {
    return createErrorResponse(
      error.message,
      error.status,
      error.name,
      error.details,
    );
  }

  return createErrorResponse(
    "An unexpected error occurred",
    HttpStatus.INTERNAL_SERVER_ERROR,
    "INTERNAL_SERVER_ERROR",
  );
}

// Define the base params type
type RouteParams = Record<string, string | string[]>;

// Define the context types for both handler and wrapper
type HandlerContext<TParams extends RouteParams> = {
  params: TParams;
};

type WrapperContext<TParams extends RouteParams> = {
  params: Promise<TParams>;
};

// Define the handler type
type ApiHandler<TRequest, TParams extends RouteParams> = (
  req: TRequest,
  context: HandlerContext<TParams>,
) => Promise<Response>;

/**
 * Wraps an API route handler with error handling functionality
 * @function apiHandler
 * @template TRequest - The request type (Request | NextRequest)
 * @template TParams - The route parameters type extending RouteParams
 * @param {ApiHandler<TRequest, TParams>} handler - The route handler function
 * @returns {Function} A wrapped handler function with error handling
 *
 * @example
 * export const GET = apiHandler(async (req, context) => {
 *
 *   return NextResponse.json({ data: "success" });
 * });
 */
export function apiHandler<
  TRequest = Request | NextRequest,
  TParams extends RouteParams = RouteParams,
>(
  handler: ApiHandler<TRequest, TParams>,
): (req: TRequest, context: WrapperContext<TParams>) => Promise<Response> {
  return async (req: TRequest, context: WrapperContext<TParams>) => {
    try {
      const params = await context.params;
      return await handler(req, { params });
    } catch (error) {
      return HandleApiError(error);
    }
  };
}