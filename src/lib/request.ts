import { ApiResponseError } from "@/types/api-reponse.type";
import { type Result, err, ok } from "@justmiracle/result";

/**
 * Custom error class for API fetch failures
 * Uses standardized error structure: { name, message, details } + status
 */
export class ApiFetchError extends Error {
  constructor(
    public readonly name: string,
    message: string,
    public readonly status: number,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = name;
    this.status = status;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiFetchError);
    }
  }
}

/**
 * Type-safe wrapper around fetch API with built-in error handling.
 * @param url - Request URL
 * @param options - Fetch options (defaults to GET)
 * @returns Result containing either response data or error
 *
 * @example
 * // GET request
 * const users = await apiFetch<User[]>('/api/users')
 *
 * // POST request
 * const result = await apiFetch<User>('/api/users', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' })
 * })
 * if (result.error) return handleError(result.error)
 * console.log(result.value) // TypeScript knows this is User
 */
export async function apiFetch<TResult>(
  url: string,
  options: RequestInit = {}
): Promise<Result<TResult>> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })
    .then(ok)
    .catch(err);

  if (response.error) {
    return response;
  }

  if (!response.value.ok) {
    const contentType = response.value.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      return err(
        new ApiFetchError(
          "ROUTE_NOT_FOUND",
          `Route not found: ${url}`,
          response.value.status
        )
      );
    }

    const errorData: ApiResponseError = await response.value.json();

    return err(
      new ApiFetchError(
        errorData.error.code,
        errorData.error.message,
        response.value.status,
        errorData.error.details
      )
    );
  }

  return response.value.json().then(ok).catch(err);
}
