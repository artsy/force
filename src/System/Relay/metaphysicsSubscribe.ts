import {
  Observable,
  type GraphQLResponse,
  type RequestParameters,
  type Variables,
} from "relay-runtime"
import { toMetaphysicsSubscriptionError } from "System/Relay/metaphysicsSubscriptionError"

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
  const graphQLErrors = Array.isArray(body?.errors)
    ? body.errors.flatMap((error: { message?: unknown }) =>
        typeof error?.message === "string" ? [error.message] : [],
      )
    : []
  // graphql-sse wraps thrown fetch errors and discards their metadata. A response-like
  // rejection preserves GraphQL errors and HTTP status on NetworkError.response.
  return {
    ok: false,
    status: response.status,
    statusText: "The server did not return an event stream.",
    graphQLErrors,
  } as unknown as Response
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
          error: error => sink.error(toMetaphysicsSubscriptionError(error)),
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
