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

    it("#hasFilters", done => {
      getWrapper()
      expect(context.hasFilters).toBe(false)
      act(() => {
        context.setFilter("page", 10)
        setTimeout(() => {
          expect(context.hasFilters).toBe(true)
          done()
        })
      })
    })

    it("#isDefaultValue", () => {
      getWrapper()
      expect(context.isDefaultValue("sort")).toEqual(true)
    })

    it("#rangeToTuple", () => {
      getWrapper()
      expect(context.rangeToTuple("height")).toEqual([1, 120])
    })

    it("#setFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setTimeout(() => {
          expect(context.filters.page).toEqual(10)
          done()
        })
      })
    })

    it("#setFilter resets pagination", done => {
      getWrapper({
        filters: {
          page: 10,
        },
      })
      act(() => {
        expect(context.filters.page).toEqual(10)
        context.setFilter("sort", "relevant")
        setTimeout(() => {
          expect(context.filters.page).toEqual(1)
          done()
        })
      })
    })

    it("#unsetFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("page", 10)
        setTimeout(() => {
          expect(context.filters.page).toEqual(10)
          act(() => {
            context.unsetFilter("page")
            setTimeout(() => {
              expect(context.filters.page).toEqual(1)
              done()
            })
          })
        })
      })
    })

    it("#unsetFilter resets pagination", done => {
      getWrapper({
        filters: {
          page: 10,
          sort: "relevant",
        },
      })
      act(() => {
        expect(context.filters.page).toEqual(10)
        context.unsetFilter("sort")
        setTimeout(() => {
          expect(context.filters.page).toEqual(1)
          done()
        })
      })
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
        setTimeout(() => {
          expect(context.filters).toEqual(initialArtworkFilterState)
        })
      })
    })
  })
})
