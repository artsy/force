import {
  createMetaphysicsSubscribe,
  subscriptionFetch,
} from "System/Relay/metaphysicsSubscribe"
import { createClient } from "graphql-sse"
import type { RequestParameters } from "relay-runtime"
import {
  MetaphysicsSubscriptionError,
  toMetaphysicsSubscriptionError,
} from "System/Relay/metaphysicsSubscriptionError"

jest.mock("graphql-sse", () => ({ createClient: jest.fn() }))

describe("Metaphysics subscriptions", () => {
  const unsubscribe = jest.fn()
  const dispose = jest.fn()
  const subscribe = jest.fn(() => unsubscribe)
  const request: RequestParameters = {
    id: null,
    cacheID: "test",
    name: "AgentTurn",
    operationKind: "subscription",
    metadata: {},
    text: "subscription AgentTurn { aiAgentTurn { __typename } }",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    const mockCreateClient = createClient as jest.Mock
    mockCreateClient.mockReturnValue({ subscribe, dispose, iterate: jest.fn() })
  })

  it("forwards authentication, payloads and disposal without retrying", () => {
    const next = jest.fn()
    const execute = createMetaphysicsSubscribe({
      url: "/v2",
      headers: { "X-ACCESS-TOKEN": "token" },
    })
    const subscription = execute(request, {
      input: { message: "Hello" },
    }).subscribe({ next })
    expect(createClient).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/v2",
        headers: { "X-ACCESS-TOKEN": "token" },
        retryAttempts: 0,
      }),
    )
    const [payload, sink] = subscribe.mock.calls[0] as unknown as [
      unknown,
      { next: (data: unknown) => void },
    ]
    expect(payload).toEqual({
      query: request.text,
      operationName: "AgentTurn",
      variables: { input: { message: "Hello" } },
    })
    sink.next({ data: { aiAgentTurn: { __typename: "AIAgentTextDelta" } } })
    expect(next).toHaveBeenCalled()
    subscription.unsubscribe()
    expect(unsubscribe).toHaveBeenCalledTimes(1)
    expect(dispose).toHaveBeenCalledTimes(1)
  })

  it("reports a JSON GraphQL rejection rather than a broken stream", async () => {
    const originalFetch = global.fetch
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({ errors: [{ message: "Not enabled" }] }),
    })
    try {
      const rejection = await subscriptionFetch("/v2")
      const { NetworkError } = jest.requireActual("graphql-sse")
      const error = toMetaphysicsSubscriptionError(new NetworkError(rejection))
      expect(error).toBeInstanceOf(MetaphysicsSubscriptionError)
      expect(error.graphQLErrors).toEqual(["Not enabled"])
      expect(error.status).toBeUndefined()
    } finally {
      global.fetch = originalFetch
    }
  })
  it("preserves HTTP status and GraphQL errors through graphql-sse wrapping", async () => {
    const originalFetch = global.fetch
    global.fetch = jest.fn().mockResolvedValue({
      status: 429,
      headers: { get: () => "application/json" },
      json: async () => ({
        errors: [{ message: "Conversation input is too large" }],
      }),
    })
    try {
      const { NetworkError } = jest.requireActual("graphql-sse")
      const error = toMetaphysicsSubscriptionError(
        new NetworkError(await subscriptionFetch("/v2")),
      )
      expect(error.status).toBe(429)
      expect(error.graphQLErrors).toEqual(["Conversation input is too large"])
      expect(
        toMetaphysicsSubscriptionError([{ message: "Rejected" }]).graphQLErrors,
      ).toEqual(["Rejected"])
    } finally {
      global.fetch = originalFetch
    }
  })

  it("surfaces a JSON rejection through the real graphql-sse client", async () => {
    const mockCreateClient = createClient as jest.Mock
    mockCreateClient.mockImplementation(
      jest.requireActual("graphql-sse").createClient,
    )
    const originalFetch = global.fetch
    global.fetch = jest.fn().mockResolvedValue({
      status: 403,
      headers: { get: () => "application/json" },
      json: async () => ({ errors: [{ message: "Not enabled" }] }),
    })
    try {
      const error = await new Promise<MetaphysicsSubscriptionError>(resolve => {
        createMetaphysicsSubscribe({
          url: "https://metaphysics.test/v2",
          headers: {},
        })(request, {}).subscribe({ error: resolve })
      })
      expect(error).toBeInstanceOf(MetaphysicsSubscriptionError)
      expect(error.status).toBe(403)
      expect(error.graphQLErrors).toEqual(["Not enabled"])
      expect(error.message).toContain("Server responded with 403")
      expect(error.cause).toBeInstanceOf(
        jest.requireActual("graphql-sse").NetworkError,
      )
    } finally {
      global.fetch = originalFetch
    }
  })

  it("falls back to a generic message for non-Error failures", () => {
    const error = toMetaphysicsSubscriptionError([{ message: "Rejected" }])
    expect(error.message).toBe("The subscription failed.")
    expect(error.cause).toEqual([{ message: "Rejected" }])
  })
})
