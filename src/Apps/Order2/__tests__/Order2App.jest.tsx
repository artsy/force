import { render } from "@testing-library/react"
import { useVariant } from "@unleash/proxy-client-react"
import { CHECKOUT_REDESIGN_FLAG } from "Apps/Order/redirects"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { useRouter } from "System/Hooks/useRouter"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"
import { getENV } from "Utils/getENV"
import { Order2App } from "../Order2App"

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
  useVariant: jest.fn(),
}))

jest.mock("System/Hooks/useTrackFeatureVariant", () => ({
  useTrackFeatureVariantOnMount: jest.fn(),
}))

jest.mock("System/Hooks/useRouter")
jest.mock("System/Router/Utils/routeUtils")
jest.mock("Utils/getENV")

const mockUseVariant = useVariant as jest.Mock
const mockUseTrackFeatureVariantOnMount =
  useTrackFeatureVariantOnMount as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockFindCurrentRoute = findCurrentRoute as jest.Mock
const mockGetENV = getENV as jest.Mock

type TransitionHandler = (
  newLocation: { pathname?: string; action?: string } | null,
) => boolean | string

let transitionHandler: TransitionHandler | null = null

describe("Order2App", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    transitionHandler = null
    mockUseVariant.mockReturnValue({ enabled: false, name: "control" })
    mockFindCurrentRoute.mockReturnValue({})
    mockGetENV.mockReturnValue(false)
    mockUseRouter.mockReturnValue({
      router: {
        addNavigationListener: jest.fn((handler: TransitionHandler) => {
          transitionHandler = handler
          return jest.fn()
        }),
      },
      match: {},
    })
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

  describe("leaving the order flow", () => {
    const leaveTransition = { pathname: "/artwork/foo", action: "POP" }

    beforeEach(() => {
      mockFindCurrentRoute.mockReturnValue({ shouldWarnBeforeLeaving: true })
    })

    it("warns before leaving on desktop", () => {
      mockGetENV.mockReturnValue(false) // IS_MOBILE
      render(<Order2App>children</Order2App>)

      expect(transitionHandler?.(leaveTransition)).toBe(
        "Are you sure you want to leave? Your changes will not be saved.",
      )
    })

    it("exits cleanly without warning on mobile web (swipe-back)", () => {
      mockGetENV.mockReturnValue(true) // IS_MOBILE
      render(<Order2App>children</Order2App>)

      expect(transitionHandler?.(leaveTransition)).toBe(true)
    })

    it("never warns when navigating within the order flow", () => {
      mockGetENV.mockReturnValue(false)
      render(<Order2App>children</Order2App>)

      expect(
        transitionHandler?.({
          pathname: "/orders2/123/checkout",
          action: "POP",
        }),
      ).toBe(true)
    })
  })
})
