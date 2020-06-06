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

    describe("staged filter changes", () => {
      beforeEach(() => {
        let filters = {
          ...initialArtworkFilterState,
          medium: "painting",
        }

        // init a 'real' filter state
        getWrapper({ filters })

        // copy that to a 'staged' filter state
        act(() => {
          context.setStagedFilters(filters)
        })
      })

      describe("when not in staged mode", () => {
        beforeEach(() => {
          act(() => {
            context.setShouldStageFilterChanges(false)
          })
        })

        test("#setFilter sets only 'real' filters", () => {
          act(() => {
            context.setFilter("medium", "jewelry")
          })
          expect(context.filters.medium).toEqual("jewelry")
          expect(context.stagedFilters.medium).not.toEqual("jewelry")
        })

        test("#unsetFilter unsets only 'real' filters", () => {
          act(() => {
            context.unsetFilter("medium")
          })
          expect(context.filters.medium).not.toEqual("painting")
          expect(context.stagedFilters.medium).toEqual("painting")
        })

        test("#resetFilters resets only 'real' filters", () => {
          act(() => {
            context.resetFilters()
          })
          expect(context.filters).toEqual({
            ...initialArtworkFilterState,
            reset: true,
          })
          expect(context.stagedFilters).not.toEqual({
            ...initialArtworkFilterState,
            reset: true,
          })
        })

        test("#currentlySelectedFilters returns the 'real' filters", () => {
          act(() => {
            context.setFilter("medium", "design")
          })
          expect(context.currentlySelectedFilters()).toEqual(context.filters)
        })
      })

      describe("when in staged mode", () => {
        beforeEach(() => {
          act(() => {
            context.setShouldStageFilterChanges(true)
          })
        })

        test("#setFilter sets only staged filters", () => {
          act(() => {
            context.setFilter("medium", "jewelry")
          })
          expect(context.filters.medium).not.toEqual("jewelry")
          expect(context.stagedFilters.medium).toEqual("jewelry")
        })

        test("#unsetFilter unsets only staged filters", () => {
          act(() => {
            context.unsetFilter("medium")
          })
          expect(context.filters.medium).toEqual("painting")
          expect(context.stagedFilters.medium).not.toEqual("painting")
        })

        test("#resetFilters resets only staged filters", () => {
          act(() => {
            context.resetFilters()
          })
          expect(context.filters).not.toEqual({
            ...initialArtworkFilterState,
            reset: true,
          })
          expect(context.stagedFilters).toEqual({
            ...initialArtworkFilterState,
            reset: true,
          })
        })

        test("#currentlySelectedFilters returns the staged filters", () => {
          act(() => {
            context.setFilter("medium", "design")
          })
          expect(context.currentlySelectedFilters()).toEqual(
            context.stagedFilters
          )
        })
      })

      describe("regardless of mode", () => {
        test("#setFilters replaces only the 'real' filters", () => {
          act(() => {
            context.setFilters({
              ...initialArtworkFilterState,
              medium: "jewelry",
            })
          })

          expect(context.filters.medium).toEqual("jewelry")
          expect(context.stagedFilters.medium).not.toEqual("jewelry")
        })

        test("#setStagedFilters replaces only the staged filters", () => {
          act(() => {
            context.setStagedFilters({
              ...initialArtworkFilterState,
              medium: "jewelry",
            })
          })

          expect(context.filters.medium).not.toEqual("jewelry")
          expect(context.stagedFilters.medium).toEqual("jewelry")
        })
      })
    })
  })
})
