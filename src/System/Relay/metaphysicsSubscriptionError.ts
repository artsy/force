export class MetaphysicsSubscriptionError extends Error {
  readonly status?: number
  readonly graphQLErrors?: string[]

  constructor({
    status,
    graphQLErrors,
  }: { status?: number; graphQLErrors?: string[] } = {}) {
    super("The subscription failed.")
    this.name = "MetaphysicsSubscriptionError"
    this.status = status
    this.graphQLErrors = graphQLErrors
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
    status:
      typeof response?.status === "number" && response.status >= 400
        ? response.status
        : undefined,
    graphQLErrors,
  })
}
