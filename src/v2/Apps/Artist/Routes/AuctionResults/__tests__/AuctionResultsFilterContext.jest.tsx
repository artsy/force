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
    expect(context.filters).toEqual(
      initialAuctionResultsFilterState(null, null)
    )
  })

  describe("behaviors", () => {
    it("#setFilter", () => {
      return new Promise<void>(done => {
        getWrapper()
        act(() => {
          context.setFilter?.("pageAndCursor", { page: 10, cursor: null })
          setTimeout(() => {
            expect(context.filters?.pageAndCursor).toEqual({
              page: 10,
              cursor: null,
            })
            done()
          })
        })
      })
    })

    it("#setFilter resets pagination", () => {
      return new Promise<void>(done => {
        getWrapper({
          filters: {
            pageAndCursor: { page: 10, cursor: null },
          },
        })
        act(() => {
          expect(context.filters?.pageAndCursor?.page).toEqual(10)
          context.setFilter?.("sort", "relevant")
          setTimeout(() => {
            expect(context.filters?.pageAndCursor).toEqual({
              page: 1,
              cursor: null,
            })
            done()
          })
        })
      })
    })

    describe("#setFilter for allowEmptyCreatedDates", () => {
      it("should set allowEmptyCreatedDates to false", () => {
        return new Promise<void>(done => {
          getWrapper({
            filters: {
              allowEmptyCreatedDates: true,
            },
          })
          act(() => {
            context.setFilter?.("allowEmptyCreatedDates", false)
            setTimeout(() => {
              expect(context.filters?.allowEmptyCreatedDates).toEqual(false)
              done()
            })
          })
        })
      })
    })

    describe("#setFilter for createdAfterYear", () => {
      it("should set createdBeforeYear if it is not already provided", () => {
        return new Promise<void>(done => {
          getWrapper({
            latestCreatedYear: 2000,
          })
          act(() => {
            context.setFilter?.("createdAfterYear", 1990)
            setTimeout(() => {
              expect(context.filters?.createdAfterYear).toEqual(1990)
              expect(context.filters?.createdBeforeYear).toEqual(2000)
              done()
            })
          })
        })
      })

      it("should set createdBeforeYear to its value if createdBeforeYear is less", () => {
        return new Promise<void>(done => {
          getWrapper({
            filters: {
              createdBeforeYear: 2000,
            },
          })
          act(() => {
            context.setFilter?.("createdAfterYear", 2001)
            setTimeout(() => {
              expect(context.filters?.createdAfterYear).toEqual(2001)
              expect(context.filters?.createdBeforeYear).toEqual(2001)
              done()
            })
          })
        })
      })
    })

    describe("#setFilter for createdBeforeYear", () => {
      it("should set createdAfterYear if it is not already provided", () => {
        return new Promise<void>(done => {
          getWrapper({
            earliestCreatedYear: 1990,
          })
          act(() => {
            context.setFilter?.("createdBeforeYear", 2000)
            setTimeout(() => {
              expect(context.filters?.createdBeforeYear).toEqual(2000)
              expect(context.filters?.createdAfterYear).toEqual(1990)
              done()
            })
          })
        })
      })

      it("should set createdAfterYear to its value if createdAfterYear is greater", () => {
        return new Promise<void>(done => {
          getWrapper({
            filters: {
              createdAfterYear: 2000,
            },
          })
          act(() => {
            context.setFilter?.("createdBeforeYear", 1990)
            setTimeout(() => {
              expect(context.filters?.createdBeforeYear).toEqual(1990)
              expect(context.filters?.createdAfterYear).toEqual(1990)
              done()
            })
          })
        })
      })
    })

    it("#unsetFilter", () => {
      return new Promise<void>(done => {
        getWrapper()
        act(() => {
          context.setFilter?.("pageAndCursor", { page: 10, cursor: null })
          setTimeout(() => {
            expect(context.filters?.pageAndCursor?.page).toEqual(10)
            act(() => {
              context.unsetFilter?.("pageAndCursor")
              setTimeout(() => {
                expect(context.filters?.pageAndCursor).toEqual({
                  page: 1,
                  cursor: null,
                })
                done()
              })
            })
          })
        })
      })
    })

    it("#unsetFilter resets pagination", () => {
      return new Promise<void>(done => {
        getWrapper({
          filters: {
            pageAndCursor: { page: 10, cursor: null },
            sort: "relevant",
          },
        })
        act(() => {
          expect(context.filters?.pageAndCursor?.page).toEqual(10)
          context.unsetFilter?.("sort")
          setTimeout(() => {
            expect(context.filters?.pageAndCursor).toEqual({
              page: 1,
              cursor: null,
            })
            done()
          })
        })
      })
    })

    it("#resetFilters", () => {
      getWrapper({
        filters: {
          ...initialAuctionResultsFilterState(null, null),
          organizations: [],
        },
      })
      expect(context.filters?.organizations).toEqual([])

      act(() => {
        context.resetFilters?.()
        setTimeout(() => {
          expect(context.filters).toEqual(
            initialAuctionResultsFilterState(null, null)
          )
        })
      })
    })
  })
})
