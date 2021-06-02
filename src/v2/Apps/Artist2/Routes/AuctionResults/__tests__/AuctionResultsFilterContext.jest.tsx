import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import {
  AuctionResultsFilterContextProvider,
  initialAuctionResultsFilterState,
  useAuctionResultsFilterContext,
} from "../AuctionResultsFilterContext"

describe("AuctionResultsFilterContext", () => {
  let context: ReturnType<typeof useAuctionResultsFilterContext>

  const getWrapper = (props = {}) => {
    return mount(
      <AuctionResultsFilterContextProvider {...props}>
        <TestComponent />
      </AuctionResultsFilterContextProvider>
    )
  }

  const TestComponent = () => {
    context = useAuctionResultsFilterContext()
    return null
  }

  it("boots with default filters", async () => {
    getWrapper()
    expect(context.filters).toEqual(initialAuctionResultsFilterState)
  })

  describe("behaviors", () => {
    // it("#onFilterClick", () => {
    //   const spy = jest.fn()
    //   getWrapper({ onFilterClick: spy })
    //   context.onFilterClick("color", "purple", initialAuctionResultsFilterState)
    //   expect(spy).toHaveBeenCalledWith(
    //     "color",
    //     "purple",
    //     initialAuctionResultsFilterState
    //   )
    // })

    it("#setFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("pageAndCursor", { page: 10, cursor: null })
        setTimeout(() => {
          // @ts-expect-error STRICT_NULL_CHECK
          expect(context.filters.pageAndCursor).toEqual({
            page: 10,
            cursor: null,
          })
          done()
        })
      })
    })

    it("#setFilter resets pagination", done => {
      getWrapper({
        filters: {
          pageAndCursor: { page: 10, cursor: null },
        },
      })
      act(() => {
        // @ts-expect-error STRICT_NULL_CHECK
        expect(context.filters.pageAndCursor.page).toEqual(10)
        context.setFilter("sort", "relevant")
        setTimeout(() => {
          // @ts-expect-error STRICT_NULL_CHECK
          expect(context.filters.pageAndCursor).toEqual({
            page: 1,
            cursor: null,
          })
          done()
        })
      })
    })

    describe("#setFilter for allowEmptyCreatedDates", () => {
      it("should set allowEmptyCreatedDates to false", done => {
        getWrapper({
          filters: {
            allowEmptyCreatedDates: true,
          },
        })
        act(() => {
          context.setFilter("allowEmptyCreatedDates", false)
          setTimeout(() => {
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.allowEmptyCreatedDates).toEqual(false)
            done()
          })
        })
      })
    })

    describe("#setFilter for createdAfterYear", () => {
      it("should set createdBeforeYear if it is not already provided", done => {
        getWrapper({
          filters: {
            latestCreatedYear: 2000,
          },
        })
        act(() => {
          context.setFilter("createdAfterYear", 1990)
          setTimeout(() => {
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdAfterYear).toEqual(1990)
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdBeforeYear).toEqual(2000)
            done()
          })
        })
      })

      it("should set createdBeforeYear to its value if createdBeforeYear is less", done => {
        getWrapper({
          filters: {
            createdBeforeYear: 2000,
          },
        })
        act(() => {
          context.setFilter("createdAfterYear", 2001)
          setTimeout(() => {
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdAfterYear).toEqual(2001)
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdBeforeYear).toEqual(2001)
            done()
          })
        })
      })
    })

    describe("#setFilter for createdBeforeYear", () => {
      it("should set createdAfterYear if it is not already provided", done => {
        getWrapper({
          filters: {
            earliestCreatedYear: 1990,
          },
        })
        act(() => {
          context.setFilter("createdBeforeYear", 2000)
          setTimeout(() => {
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdBeforeYear).toEqual(2000)
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdAfterYear).toEqual(1990)
            done()
          })
        })
      })

      it("should set createdAfterYear to its value if createdAfterYear is greater", done => {
        getWrapper({
          filters: {
            createdAfterYear: 2000,
          },
        })
        act(() => {
          context.setFilter("createdBeforeYear", 1990)
          setTimeout(() => {
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdBeforeYear).toEqual(1990)
            // @ts-expect-error STRICT_NULL_CHECK
            expect(context.filters.createdAfterYear).toEqual(1990)
            done()
          })
        })
      })
    })

    it("#unsetFilter", done => {
      getWrapper()
      act(() => {
        context.setFilter("pageAndCursor", { page: 10, cursor: null })
        setTimeout(() => {
          // @ts-expect-error STRICT_NULL_CHECK
          expect(context.filters.pageAndCursor.page).toEqual(10)
          act(() => {
            context.unsetFilter("pageAndCursor")
            setTimeout(() => {
              // @ts-expect-error STRICT_NULL_CHECK
              expect(context.filters.pageAndCursor).toEqual({
                page: 1,
                cursor: null,
              })
              done()
            })
          })
        })
      })
    })

    it("#unsetFilter resets pagination", done => {
      getWrapper({
        filters: {
          pageAndCursor: { page: 10, cursor: null },
          sort: "relevant",
        },
      })
      act(() => {
        // @ts-expect-error STRICT_NULL_CHECK
        expect(context.filters.pageAndCursor.page).toEqual(10)
        context.unsetFilter("sort")
        setTimeout(() => {
          // @ts-expect-error STRICT_NULL_CHECK
          expect(context.filters.pageAndCursor).toEqual({
            page: 1,
            cursor: null,
          })
          done()
        })
      })
    })

    it("#resetFilters", () => {
      getWrapper({
        filters: {
          ...initialAuctionResultsFilterState,
          organizations: [],
        },
      })
      // @ts-expect-error STRICT_NULL_CHECK
      expect(context.filters.organizations).toEqual([])

      act(() => {
        context.resetFilters()
        setTimeout(() => {
          expect(context.filters).toEqual(initialAuctionResultsFilterState)
        })
      })
    })
  })
})
