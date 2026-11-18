import { collectorProfileRoutes } from "Apps/CollectorProfile/collectorProfileRoutes"
import { C2C_SELLER_PAYMENTS_FLAG } from "Apps/CollectorProfile/Utils/featureFlags"
import { RedirectException } from "found"

describe("collectorProfileRoutes sales route", () => {
  const salesRoute = collectorProfileRoutes[0].children?.find(route => {
    return route.path === "sales"
  })

  const renderSales = ({ isEnabled }: { isEnabled: boolean }) => {
    const featureFlags = {
      isEnabled: jest.fn(() => isEnabled),
      getVariant: jest.fn(),
    }
    const Component = () => <div>Sales</div>

    const result = () => {
      return salesRoute?.render?.({
        Component,
        props: {},
        match: { context: { featureFlags } },
      } as any)
    }

    return { featureFlags, result }
  }

  it("redirects to the collector profile when the flag is off", () => {
    const { featureFlags, result } = renderSales({ isEnabled: false })

    expect(result).toThrow(RedirectException)
    expect(featureFlags.isEnabled).toHaveBeenCalledWith(
      C2C_SELLER_PAYMENTS_FLAG,
    )
  })

  it("renders the component when the flag is on", () => {
    const { result } = renderSales({ isEnabled: true })

    expect(result()).toBeTruthy()
  })
})
