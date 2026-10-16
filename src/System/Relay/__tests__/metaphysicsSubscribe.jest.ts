import {
  createMetaphysicsSubscribe,
  subscriptionFetch,
} from "System/Relay/metaphysicsSubscribe"
import { createClient } from "graphql-sse"
import type { RequestParameters } from "relay-runtime"

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
      await expect(subscriptionFetch("/v2")).rejects.toThrow("Not enabled")
    } finally {
      global.fetch = originalFetch
    }
  })
})
