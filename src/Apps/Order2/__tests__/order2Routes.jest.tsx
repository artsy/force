import type { FarceRedirectResult } from "found/server"
import { getFarceResult } from "found/server"
import { Resolver } from "found-relay"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { order2Routes } from "../order2Routes"

jest.mock("Apps/Order/redirects", () => ({
  newCheckoutEnabled: jest.fn(() => true),
}))

jest.mock("Utils/logger", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    warn: jest.fn(),
  })),
}))

const featureFlags = {
  isEnabled: jest.fn(() => false),
}

describe("order2Routes redirect logic", () => {
  async function render(url: string, mockData): Promise<FarceRedirectResult> {
    const environment = createMockEnvironment()

    environment.mock.queueOperationResolver(operation =>
      MockPayloadGenerator.generate(operation, mockData as any),
    )

    const result = await getFarceResult({
      render: _props => {
        return <div>hello</div>
      },
      resolver: new Resolver(environment),
      routeConfig: order2Routes,
      url,
      matchContext: {
        featureFlags,
      },
    })

    return result as FarceRedirectResult
  }

  const mockResolver = data => ({
    Viewer: () => ({
      me: {
        order: {
          internalID: "test-order-id",
          mode: "BUY",
          ...data,
        },
      },
    }),
  })

  describe("checkout route redirects", () => {
    it("redirects to details page when buyerState is not INCOMPLETE", async () => {
      const res = await render(
        "/orders2/test-order-id/checkout",
        mockResolver({
          buyerState: "SUBMITTED",
        }),
      )
      expect(res.redirect.url).toMatch(/\/orders\/.*\/details/)
    })

    it("does not redirect when buyerState is INCOMPLETE", async () => {
      try {
        await render(
          "/orders2/test-order-id/checkout",
          mockResolver({
            buyerState: "INCOMPLETE",
          }),
        )
      } catch (error) {
        expect(error.message).toBe("No redirect found for order")
      }
    })
  })
})
