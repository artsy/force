import { act, renderHook } from "@testing-library/react-hooks"
import { useCareerHighlightConfig } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"

describe("CareerHighlightsModalConfig", () => {
  it("should move through the list", async () => {
    const { result } = renderHook(useCareerHighlightConfig, {
      initialProps: {
        availableCareerHighlights: [
          "BIENNIAL",
          "SOLO_SHOW",
          "GROUP_SHOW",
          "PROMO",
        ],
        onClose: jest.fn(),
      },
    })

    expect(result.current.current).toEqual("BIENNIAL")
    act(() => result.current.next())

    expect(result.current.current).toEqual("SOLO_SHOW")
    act(() => result.current.next())

    expect(result.current.current).toEqual("GROUP_SHOW")
    act(() => result.current.next())

    expect(result.current.current).toEqual("PROMO")
  })

  it("should start from the middle when index is specified", async () => {
    const { result } = renderHook(useCareerHighlightConfig, {
      initialProps: {
        availableCareerHighlights: [
          "BIENNIAL",
          "SOLO_SHOW",
          "GROUP_SHOW",
          "PROMO",
        ],
        onClose: jest.fn(),
        pageIndex: 2,
      },
    })

    expect(result.current.current).toEqual("GROUP_SHOW")
    act(() => result.current.back())

    expect(result.current.current).toEqual("SOLO_SHOW")
    act(() => result.current.next())

    expect(result.current.current).toEqual("GROUP_SHOW")
    act(() => result.current.next())

    expect(result.current.current).toEqual("PROMO")
  })
})
