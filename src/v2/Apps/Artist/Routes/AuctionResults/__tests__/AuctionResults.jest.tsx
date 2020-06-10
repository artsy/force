import { AuctionResults_Test_QueryRawResponse } from "v2/__generated__/AuctionResults_Test_Query.graphql"
import { AuctionResultsFixture } from "v2/Apps/__tests__/Fixtures/Artist/Routes/AuctionResultsFixture"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "v2/Apps/Artist/Routes/AuctionResults"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Breakpoint } from "v2/Utils/Responsive"
import { openAuthModal } from "v2/Utils/openAuthModal"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/Utils/openAuthModal")

describe("AuctionResults", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: AuctionResultsRoute,
      query: graphql`
        query AuctionResults_Test_Query($artistID: String!) @raw_response_type {
          artist(id: $artistID) {
            ...AuctionResults_artist
          }
        }
      `,
      mockData: AuctionResultsFixture as AuctionResults_Test_QueryRawResponse,
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  const trackEvent = jest.fn()
  const mockOpenAuthModal = openAuthModal as jest.Mock

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    mockOpenAuthModal.mockImplementation(() => {
      return
    })
  })
  afterEach(() => {
    trackEvent.mockReset()
  })

  describe("trigger auth modal for filtering and pagination", () => {
    beforeEach(async () => {
      wrapper = await getWrapper()
    })
    afterEach(() => {
      mockOpenAuthModal.mockReset()
    })

    it("calls auth modal for 1st pagination but not for 2nd", done => {
      const pagination = wrapper.find("Pagination")
      pagination
        .find("button")
        .at(1)
        .simulate("click")

      setTimeout(() => {
        expect(mockOpenAuthModal).toHaveBeenCalledTimes(1)
      })

      pagination
        .find("button")
        .at(2)
        .simulate("click")

      setTimeout(() => {
        // expect no new call
        expect(mockOpenAuthModal).toHaveBeenCalledTimes(1)
        done()
      })
    })

    it("calls auth modal for 1st medium selection but not for 2nd", done => {
      const filter = wrapper.find("MediumFilter")
      const checkboxes = filter.find("Checkbox")

      checkboxes.at(1).simulate("click")
      setTimeout(() => {
        expect(openAuthModal).toHaveBeenCalledTimes(1)
      })

      checkboxes.at(2).simulate("click")
      setTimeout(() => {
        // expect no new call
        expect(openAuthModal).toHaveBeenCalledTimes(1)
        done()
      })
    })
  })

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("SelectSmall").length).toBe(1)
      expect(wrapper.find("Pagination").length).toBe(1)
      expect(wrapper.find("ArtistAuctionResultItem").length).toBe(10)
    })

    it("renders the proper count", () => {
      expect(wrapper.html()).toContain("Showing 830 results")
    })

    it("renders either realized price or price not avail", () => {
      expect(wrapper.html()).toContain(
        "Price not available" || "Realized price"
      )
    })

    it("renders proper select options", () => {
      const html = wrapper.find("SelectSmall").html()
      expect(html).toContain("Most recent")
      expect(html).toContain("Estimate")
      expect(html).toContain("Sale price")
    })

    describe("collapsed details", () => {
      it("opens the collapse", () => {
        wrapper
          .find("ArrowDownIcon")
          .first()
          .simulate("click")
        wrapper.update()
        const html = wrapper.html()
        const data =
          AuctionResultsFixture.artist.auctionResultsConnection.edges[0].node
        expect(html).toContain("Artwork Info")
        expect(html).toContain(data.dimension_text)
        expect(html).toContain(data.description)
      })
    })

    describe("user interactions", () => {
      const defaultRelayParams = {
        first: 10,
        after: null,
        artistID: "pablo-picasso",
        organizations: [],
        sort: "DATE_DESC",
      }
      let refetchSpy
      beforeEach(async () => {
        wrapper = await getWrapper()
        refetchSpy = jest.spyOn(
          (wrapper.find("AuctionResultsContainer").props() as any).relay,
          "refetch"
        )
      })
      describe("pagination", () => {
        it("triggers relay refetch with after, and re-shows sign up to see price", done => {
          const pagination = wrapper.find("Pagination")

          pagination
            .find("button")
            .at(1)
            .simulate("click")

          setTimeout(() => {
            expect(refetchSpy).toHaveBeenCalledTimes(1)
            expect(refetchSpy.mock.calls[0][0]).toEqual(
              expect.objectContaining({
                ...defaultRelayParams,
                after: "YXJyYXljb25uZWN0aW9uOjk=",
              })
            )
            done()
          })

          wrapper.update()
          const html = wrapper.html()
          expect(html).toContain("Sign up to see price")
        })
      })
      describe("filters", () => {
        describe("medium filter", () => {
          it("triggers relay refetch with medium list, and re-shows sign up to see price", done => {
            const filter = wrapper.find("MediumFilter")

            const checkboxes = filter.find("Checkbox")

            checkboxes.at(1).simulate("click")

            checkboxes.at(2).simulate("click")

            checkboxes.at(1).simulate("click")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(3)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  categories: ["Work on Paper"],
                })
              )
              expect(refetchSpy.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  categories: ["Work on Paper", "Sculpture"],
                })
              )
              expect(refetchSpy.mock.calls[2][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  categories: ["Sculpture"],
                })
              )

              expect(trackEvent).toHaveBeenCalledTimes(3)
              expect(trackEvent.mock.calls[0][0]).toEqual({
                action_type: "Auction results filter params changed",
                context_page: "Artist Auction Results",
                changed: { categories: ["Work on Paper"] },
                current: {
                  categories: ["Work on Paper"],
                  pageAndCursor: { page: 1, cursor: null },
                  sort: "DATE_DESC",
                  organizations: [],
                  sizes: [],
                  createdAfterYear: 1880,
                  createdBeforeYear: 1973,
                  earliestCreatedYear: 1880,
                  latestCreatedYear: 1973,
                  allowEmptyCreatedDates: true,
                },
              })

              wrapper.update()
              const html = wrapper.html()
              expect(html).toContain("Sign up to see price")

              done()
            })
          })
        })
        describe("auction house filter", () => {
          it("triggers relay refetch with organization list, and re-shows sign up to see price", done => {
            const filter = wrapper.find("AuctionHouseFilter")

            const checkboxes = filter.find("Checkbox")

            checkboxes.at(1).simulate("click")

            checkboxes.at(2).simulate("click")

            checkboxes.at(1).simulate("click")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(3)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  organizations: ["Christie's"],
                })
              )
              expect(refetchSpy.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  organizations: ["Christie's", "Phillips"],
                })
              )
              expect(refetchSpy.mock.calls[2][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  organizations: ["Phillips"],
                })
              )

              wrapper.update()
              const html = wrapper.html()
              expect(html).toContain("Sign up to see price")

              done()
            })
          })
        })
        describe("size filter", () => {
          it("triggers relay refetch with size list and tracks events, and re-shows sign up to see price", done => {
            const filter = wrapper.find("SizeFilter")

            const checkboxes = filter.find("Checkbox")

            checkboxes.at(1).simulate("click")

            checkboxes.at(2).simulate("click")

            checkboxes.at(1).simulate("click")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(3)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  sizes: ["MEDIUM"],
                })
              )
              expect(refetchSpy.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  sizes: ["MEDIUM", "LARGE"],
                })
              )
              expect(refetchSpy.mock.calls[2][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  sizes: ["LARGE"],
                })
              )

              expect(trackEvent).toHaveBeenCalledTimes(3)
              expect(trackEvent.mock.calls[0][0]).toEqual({
                action_type: "Auction results filter params changed",
                context_page: "Artist Auction Results",
                changed: { sizes: ["MEDIUM"] },
                current: {
                  sizes: ["MEDIUM"],
                  pageAndCursor: { page: 1, cursor: null },
                  sort: "DATE_DESC",
                  organizations: [],
                  categories: [],
                  createdAfterYear: 1880,
                  createdBeforeYear: 1973,
                  earliestCreatedYear: 1880,
                  latestCreatedYear: 1973,
                  allowEmptyCreatedDates: true,
                },
              })

              wrapper.update()
              const html = wrapper.html()
              expect(html).toContain("Sign up to see price")

              done()
            })
          })
        })
        describe("year created filter", () => {
          const value = v => ({ target: { value: `${v}` } })
          it("triggers relay refetch with created years and tracks events, and re-shows sign up to see price", () => {
            const filter = wrapper.find("YearCreated")
            const selects = filter.find("select")

            act(() => {
              selects.at(0).simulate("change", value(1900))
              selects.at(1).simulate("change", value(1960))
            })

            expect(refetchSpy).toHaveBeenCalledTimes(2)

            expect(refetchSpy.mock.calls[1][0]).toEqual(
              expect.objectContaining({
                ...defaultRelayParams,
                createdAfterYear: 1900,
                createdBeforeYear: 1960,
                earliestCreatedYear: 1880,
                latestCreatedYear: 1973,
              })
            )

            wrapper.update()
            const html = wrapper.html()
            expect(html).toContain("Sign up to see price")
          })
        })
      })

      describe("sort", () => {
        it("triggers relay refetch with correct params, and re-shows sign up to see price", done => {
          const sort = wrapper.find("SortSelect SelectSmall")

          sort
            .find("option")
            .at(1)
            .simulate("change")

          setTimeout(() => {
            expect(refetchSpy).toHaveBeenCalledTimes(1)
            expect(refetchSpy.mock.calls[0][0]).toEqual(
              expect.objectContaining({
                ...defaultRelayParams,
                sort: "ESTIMATE_AND_DATE_DESC",
              })
            )

            wrapper.update()
            const html = wrapper.html()
            expect(html).toContain("Sign up to see price")

            done()
          })
        })
      })
    })
  })
})
