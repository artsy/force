import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import {
  AuctionResultsFilterContextProvider,
  initialAuctionResultsFilterState,
  useAuctionResultsFilterContext,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"

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
      initialAuctionResultsFilterState({
        startDate: null,
        endDate: null,
      })
    )

    // Sets year filters to a wide range in case the data is not provided
    expect(context.filters?.["createdAfterYear"]).toEqual(0)
    expect(context.filters?.["createdBeforeYear"]).toEqual(10000)
    expect(context.filters?.["allowEmptyCreatedDates"]).toEqual(true)
    expect(context.filters?.["saleEndYear"]).toEqual(null)
    expect(context.filters?.["saleStartYear"]).toEqual(null)
    expect(context.aggregations).toEqual([])
  })

  describe("behaviors", () => {
    describe("when not in staged mode", () => {
      it("#setFilter", () => {
        return new Promise<void>(done => {
          getWrapper()
          act(() => {
            context.setFilter?.("page", 10)
            setTimeout(() => {
              expect(context.filters?.page).toEqual(10)
              done()
            })
          })
        })
      })

      it("#setFilter resets pagination", () => {
        return new Promise<void>(done => {
          getWrapper({
            filters: {
              page: 10,
            },
          })
          act(() => {
            expect(context.filters?.page).toEqual(10)
            context.setFilter?.("sort", "relevant")
            setTimeout(() => {
              expect(context.filters?.page).toEqual(1)
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
            context.setFilter?.("page", 10)
            setTimeout(() => {
              expect(context.filters?.page).toEqual(10)
              act(() => {
                context.unsetFilter?.("page")
                setTimeout(() => {
                  expect(context.filters?.page).toEqual(1)
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
              page: 10,
              sort: "relevant",
            },
          })
          act(() => {
            expect(context.filters?.page).toEqual(10)
            context.unsetFilter?.("sort")
            setTimeout(() => {
              expect(context.filters?.page).toEqual(1)
              done()
            })
          })
        })
      })

      it("#resetFilters", () => {
        getWrapper({
          filters: {
            ...initialAuctionResultsFilterState({
              startDate: null,
              endDate: null,
            }),
            organizations: [],
          },
        })
        expect(context.filters?.organizations).toEqual([])

        act(() => {
          context.resetFilters?.()
          setTimeout(() => {
            expect(context.filters).toEqual(
              initialAuctionResultsFilterState({
                startDate: null,
                endDate: null,
              })
            )
          })
        })
      })
    })

    describe("when in staged mode", () => {
      beforeAll(() => {
        let filters = {
          ...initialAuctionResultsFilterState?.({
            startDate: null,
            endDate: null,
          }),
          categories: ["painting"],
        }

        getWrapper({ filters })
        act(() => {
          context.setShouldStageFilterChanges?.(true)
          context.setFilters?.(filters)
        })
      })

      test("#setFilter sets only staged filters", () => {
        act(() => {
          context.setFilter?.("categories", "sculpture")
        })
        expect(context.filters?.categories).not.toEqual("sculpture")
        expect(context.stagedFilters?.categories).toEqual("sculpture")
      })

      test("#unsetFilter unsets only staged filters", () => {
        act(() => {
          context.unsetFilter?.("categories")
        })
        expect(context.filters?.categories).toEqual(["painting"])
        expect(context.stagedFilters?.categories).not.toEqual(["painting"])
      })

      test("#resetFilters resets only staged filters", () => {
        act(() => {
          context.resetFilters?.()
        })
        expect(context.filters).not.toEqual({
          ...initialAuctionResultsFilterState?.({
            startDate: null,
            endDate: null,
          }),
          reset: true,
        })
        expect(context.stagedFilters).toEqual({
          ...initialAuctionResultsFilterState?.({
            startDate: null,
            endDate: null,
          }),
          reset: true,
        })
      })

      test("#currentlySelectedFilters returns the staged filters", () => {
        act(() => {
          context.setFilter?.("categories", "photography")
        })
        expect(context.currentlySelectedFilters?.()).toEqual(
          context.stagedFilters
        )
      })
    })
  })
})
