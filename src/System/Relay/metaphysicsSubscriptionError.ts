interface MetaphysicsSubscriptionErrorParams {
  message?: string
  status?: number
  graphQLErrors?: string[]
  cause?: unknown
}

export class MetaphysicsSubscriptionError extends Error {
  readonly status?: number
  readonly graphQLErrors?: string[]
  // Assigned manually because `super(message, { cause })` needs an ES2022 target.
  readonly cause?: unknown

  constructor({
    message,
    status,
    graphQLErrors,
    cause,
  }: MetaphysicsSubscriptionErrorParams = {}) {
    super(message || "The subscription failed.")
    this.name = "MetaphysicsSubscriptionError"
    this.status = status
    this.graphQLErrors = graphQLErrors
    this.cause = cause
  }
}

export const toMetaphysicsSubscriptionError = (
  error: unknown,
): MetaphysicsSubscriptionError => {
  if (error instanceof MetaphysicsSubscriptionError) return error
  const response =
    error && typeof error === "object" && "response" in error
      ? (error.response as
          | { status?: number; graphQLErrors?: string[] }
          | undefined)
      : undefined
  const graphQLErrors = Array.isArray(error)
    ? error.flatMap(item =>
        typeof item?.message === "string" ? [item.message] : [],
      )
    : response?.graphQLErrors
  return new MetaphysicsSubscriptionError({
    message: error instanceof Error ? error.message : undefined,
    status:
      typeof response?.status === "number" && response.status >= 400
        ? response.status
        : undefined,
    graphQLErrors,
    cause: error,
  })
}
