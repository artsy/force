import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import {
  ArtworkFilterContextProvider,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"

describe("ArtworkFilterContext", () => {
  let context: ReturnType<typeof useArtworkFilterContext>

  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...props}>
        <TestComponent />
      </ArtworkFilterContextProvider>
    )
  }

  const TestComponent = () => {
    context = useArtworkFilterContext()
    return null
  }

  it("boots with default filters", async () => {
    getWrapper()
    expect(context.filters).toEqual(initialArtworkFilterState)
  })

  it("takes a custom ZeroState", () => {
    const ZeroState = () => <div />
    getWrapper({ ZeroState })
    expect(context.ZeroState).toEqual(ZeroState)
  })

  describe("behaviors", () => {
    it("#onArtworkBrickClick", () => {
      const spy = jest.fn()
      getWrapper({ onArtworkBrickClick: spy })
      context.onArtworkBrickClick(null, null)
      expect(spy).toHaveBeenCalled()
    })

    it("#onFilterClick", () => {
      const spy = jest.fn()
      getWrapper({ onFilterClick: spy })
      context.onFilterClick("color", "purple", initialArtworkFilterState)
      expect(spy).toHaveBeenCalledWith(
        "color",
        "purple",
        initialArtworkFilterState
      )
    })

    it("#hasFilters", () => {
      getWrapper()
      expect(context.hasFilters).toBe(false)
      act(() => {
        context.setFilter("page", 10)
      })
      expect(context.hasFilters).toBe(true)
    })

    it("#isDefaultValue", () => {
      getWrapper()
      expect(context.isDefaultValue("sort")).toEqual(true)
    })

    it("#rangeToTuple", () => {
      getWrapper()
      expect(context.rangeToTuple("height")).toEqual([1, 120])
    })

    it("#setFilter", () => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
      })
      expect(context.filters.page).toEqual(10)
    })

    it("#setFilter resets pagination", () => {
      getWrapper({
        filters: {
          page: 10,
        },
      })
      act(() => {
        expect(context.filters.page).toEqual(10)
        context.setFilter("sort", "relevant")
      })
      expect(context.filters.page).toEqual(1)
    })

    it("#unsetFilter", () => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
      })
      expect(context.filters.page).toEqual(10)
      act(() => {
        context.unsetFilter("page")
      })
      expect(context.filters.page).toEqual(1)
    })

    it("#unsetFilter resets pagination", () => {
      getWrapper({
        filters: {
          page: 10,
          sort: "relevant",
        },
      })
      act(() => {
        expect(context.filters.page).toEqual(10)
        context.unsetFilter("sort")
      })
      expect(context.filters.page).toEqual(1)
    })

    it("#resetFilters", () => {
      getWrapper({
        filters: {
          ...initialArtworkFilterState,
          acquireable: true,
          at_auction: true,
        },
      })
      expect(context.filters.acquireable).toEqual(true)
      expect(context.filters.atAuction).toEqual(true)

      act(() => {
        context.resetFilters()
      })
      expect(context.filters).toEqual({
        ...initialArtworkFilterState,
        reset: true,
      })
    })
  })
})
