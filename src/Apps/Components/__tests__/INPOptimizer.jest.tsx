import { renderHook } from "@testing-library/react"
import { useEnableINPOptimizer } from "Apps/Components/INPOptimizer"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { getENV } from "Utils/getENV"
import { useRouter } from "found"

jest.mock("found", () => ({
  useRouter: jest.fn(),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))
jest.mock("Utils/device", () => ({
  isServer: false,
}))
jest.mock("Utils/getENV", () => ({
  // For `getENV("IS_MOBILE")
  getENV: jest.fn().mockReturnValue(true),
}))

describe("useEnableINPOptimizer", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock
  const mockGetEnv = getENV as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("returns false if the feature flag is disabled", () => {
    mockUseFeatureFlag.mockReturnValue(false)
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          state: {},
          action: "PUSH",
          pathname: "/artwork/some-id",
        },
      },
    })

    const { result } = renderHook(() => useEnableINPOptimizer())
    expect(result.current).toBe(false)
  })

  it("returns false if disableINPOptimizer is true in location state", () => {
    mockUseFeatureFlag.mockReturnValue(true)
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          state: { disableINPOptimizer: true },
          action: "PUSH",
          pathname: "/artwork/some-id",
        },
      },
    })

    const { result } = renderHook(() => useEnableINPOptimizer())
    expect(result.current).toBe(false)
  })

  it("returns false if navigation action is POP", () => {
    mockUseFeatureFlag.mockReturnValue(true)
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          state: {},
          action: "POP",
          pathname: "/artwork/some-id",
        },
      },
    })

    const { result } = renderHook(() => useEnableINPOptimizer())
    expect(result.current).toBe(false)
  })

  it("returns true for valid paths when all conditions are met", () => {
    mockGetEnv.mockReturnValue(true)
    mockUseFeatureFlag.mockReturnValue(true)
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          state: {},
          action: "PUSH",
          pathname: "/artwork/some-id",
        },
      },
    })

    const { result } = renderHook(() => useEnableINPOptimizer())
    expect(result.current).toBe(true)
  })

  it("returns false for invalid paths even if all other conditions are met", () => {
    mockUseFeatureFlag.mockReturnValue(true)
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          state: {},
          action: "PUSH",
          pathname: "/invalid-path",
        },
      },
    })

    const { result } = renderHook(() => useEnableINPOptimizer())
    expect(result.current).toBe(false)
  })

  it("returns false if desktop", () => {
    mockGetEnv.mockReturnValue(false)

    mockUseFeatureFlag.mockReturnValue(true)
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          state: {},
          action: "PUSH",
          pathname: "/invalid-path",
        },
      },
    })

    const { result } = renderHook(() => useEnableINPOptimizer())
    expect(result.current).toBe(false)
  })
})
