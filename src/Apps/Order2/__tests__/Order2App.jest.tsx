import { render } from "@testing-library/react"
import { useVariant } from "@unleash/proxy-client-react"
import { CHECKOUT_REDESIGN_FLAG } from "Apps/Order/redirects"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { Order2App } from "../Order2App"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
  useVariant: jest.fn(),
}))

jest.mock("System/Hooks/useTrackFeatureVariant", () => ({
  useTrackFeatureVariantOnMount: jest.fn(),
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    router: {
      addNavigationListener: jest.fn(() => jest.fn()),
    },
    match: {},
  }),
}))

jest.mock("System/Router/Utils/routeUtils", () => ({
  findCurrentRoute: jest.fn(() => ({})),
}))

const mockUseVariant = useVariant as jest.Mock
const mockUseTrackFeatureVariantOnMount =
  useTrackFeatureVariantOnMount as jest.Mock

describe("Order2App", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("tracks the experiment variant on mount", () => {
    mockUseVariant.mockReturnValue({ enabled: true, name: "experiment" })
    render(<Order2App>children</Order2App>)
    expect(mockUseTrackFeatureVariantOnMount).toHaveBeenCalledWith({
      experimentName: CHECKOUT_REDESIGN_FLAG,
      variantName: "experiment",
    })
  })

  it("tracks the control variant on mount", () => {
    mockUseVariant.mockReturnValue({ enabled: true, name: "control" })
    render(<Order2App>children</Order2App>)
    expect(mockUseTrackFeatureVariantOnMount).toHaveBeenCalledWith({
      experimentName: CHECKOUT_REDESIGN_FLAG,
      variantName: "control",
    })
  })

  it("tracks disabled variant when flag is off", () => {
    mockUseVariant.mockReturnValue({ enabled: false, name: "disabled" })
    render(<Order2App>children</Order2App>)
    expect(mockUseTrackFeatureVariantOnMount).toHaveBeenCalledWith({
      experimentName: CHECKOUT_REDESIGN_FLAG,
      variantName: "disabled",
    })
  })
})
