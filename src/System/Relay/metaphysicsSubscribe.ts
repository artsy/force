import {
  Observable,
  type GraphQLResponse,
  type RequestParameters,
  type Variables,
} from "relay-runtime"

interface MetaphysicsSubscribeOptions {
  url: string
  headers: Record<string, string>
}

// GraphQL rejections can arrive as JSON before an SSE stream is established.
export const subscriptionFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init)

  if (response.headers.get("content-type")?.includes("text/event-stream")) {
    return response
  }

  const body = await response.json().catch(() => null)
  const errors = body?.errors as { message?: string }[] | undefined
  const message = errors
    ?.map(error => error.message)
    .filter(Boolean)
    .join("; ")
  const error = new Error(
    message || `Subscription request failed (${response.status})`,
  )
  throw Object.assign(error, {
    status: response.status >= 400 ? response.status : undefined,
  })
}

export const createMetaphysicsSubscribe = ({
  url,
  headers,
}: MetaphysicsSubscribeOptions): ((
  request: Pick<RequestParameters, "text" | "name">,
  variables: Variables,
) => Observable<GraphQLResponse>) => {
  return (request, variables) => {
    return Observable.create(sink => {
      if (typeof window === "undefined") {
        sink.error(new Error("Subscriptions are only available in the browser"))
        return
      }

      if (!request.text) {
        sink.error(new Error("Subscription document is missing"))
        return
      }

      // Load only when a subscription is actually opened, including its fetch implementation.
      const { createClient } =
        require("graphql-sse") as typeof import("graphql-sse")
      const client = createClient({
        url,
        headers,
        fetchFn: subscriptionFetch,
        retryAttempts: 0,
      })
      const unsubscribe = client.subscribe(
        { query: request.text, operationName: request.name, variables },
        {
          next: response => sink.next(response as GraphQLResponse),
          error: error =>
            sink.error(
              error instanceof Error ? error : new Error(String(error)),
            ),
          complete: () => sink.complete(),
        },
      )

      return () => {
        unsubscribe()
        client.dispose()
      }
    })
  }
}
