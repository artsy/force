/* eslint-disable jest/no-done-callback */
import { ArtistAuctionResults_Test_QueryRawResponse } from "v2/__generated__/ArtistAuctionResults_Test_Query.graphql"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "v2/Apps/Artist/Routes/AuctionResults/ArtistAuctionResultsRoute"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import { act } from "react-dom/test-utils"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Breakpoint } from "v2/Utils/Responsive"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { Pagination } from "v2/Components/Pagination"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("lodash/debounce", () => jest.fn(e => e))
jest.mock("v2/Utils/openAuthModal")
jest.mock("v2/Components/Pagination/useComputeHref")
jest.mock("v2/System/Router/Utils/catchLinks", () => ({
  userIsForcingNavigation: () => false,
}))
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

import { useRouter } from "v2/System/Router/useRouter"

describe("AuctionResults", () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: {
        location: {
          query: {},
        },
      },
    }))
  })

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: AuctionResultsRoute,
      query: graphql`
        query ArtistAuctionResults_Test_Query($artistID: String!)
          @raw_response_type {
          artist(id: $artistID) {
            ...ArtistAuctionResultsRoute_artist
          }
        }
      `,
      mockData: AuctionResultsFixture as ArtistAuctionResults_Test_QueryRawResponse,
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
      const pagination = wrapper.find(Pagination)
      pagination.find("a").at(1).simulate("click")

      setTimeout(() => {
        expect(mockOpenAuthModal).toHaveBeenCalledTimes(1)
      })

      pagination.find("a").at(2).simulate("click")

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
      expect(wrapper.find("select")).toHaveLength(3) // year created earliest, year created latest, sale date
      expect(wrapper.find(Pagination).length).toBe(1)
      expect(wrapper.find("ArtistAuctionResultItem").length).toBe(10)
    })

    it("renders either realized price, bought in, or price not avail", () => {
      const html = wrapper.html()
      expect(html).toContain("Price not available")
      expect(html).toContain("Bought in")
      expect(html).toContain("Realized Price")
    })

    it("renders price in original currency and in USD only if currency is not USD", () => {
      const html = wrapper.html()
      expect(html).toContain("€12,000")
      expect(html).toContain("$15,000")

      expect(html.match("20,000")?.length).toEqual(1)
    })

    it("renders proper select options", () => {
      const html = wrapper.find("select").first().html()
      expect(html).toContain("Most recent")
      expect(html).toContain("Estimate")
      expect(html).toContain("Sale price")
    })

    describe("sets filters from URL query", () => {
      beforeAll(async () => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          match: {
            location: {
              query: {
                categories: ["Painting"],
                sizes: ["SMALL", "LARGE"],
                organizations: ["Phillips"],
              },
            },
          },
        }))

        wrapper = await getWrapper()
      })

      afterAll(() => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          match: {
            location: {
              query: {},
            },
          },
        }))
      })

      it("sets filters from query", async () => {
        const MediumCheckbox = wrapper.find("[testID='medium-filter-Painting']")
        expect(
          MediumCheckbox.getElements().map(checkbox => checkbox.props.selected)
        ).toEqual([true, true])

        const SmallCheckbox = wrapper.find("[testID='size-filter-SMALL']")
        expect(
          SmallCheckbox.getElements().map(checkbox => checkbox.props.selected)
        ).toEqual([true, true])

        const LargeCheckbox = wrapper.find("[testID='size-filter-LARGE']")
        expect(
          LargeCheckbox.getElements().map(checkbox => checkbox.props.selected)
        ).toEqual([true, true])

        const OtherCheckbox = wrapper.find("[testID='medium-filter-Sculpture']")
        expect(
          OtherCheckbox.getElements().map(checkbox => checkbox.props.selected)
        ).toEqual([false, false])
      })
    })

    describe("collapsed details", () => {
      it("opens the collapse", () => {
        wrapper.find("ArrowDownIcon").first().simulate("click")
        wrapper.update()
        const html = wrapper.html()
        const data =
          AuctionResultsFixture.artist?.auctionResultsConnection?.edges?.[0]
            ?.node
        expect(html).toContain("Artwork Info")
        expect(html).toContain(data?.dimension_text)
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
          const pagination = wrapper.find(Pagination)

          pagination.find("a").at(1).simulate("click")

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
              expect(trackEvent.mock.calls[0][0]).toMatchObject({
                action_type: "Auction results filter params changed",
                context_page: "Artist Auction Results",
                // `changed` & `current` supplied as JSON blobs
              })

              const { changed, current } = trackEvent.mock.calls[0][0]

              expect(JSON.parse(changed)).toMatchObject({
                categories: ["Work on Paper"],
              })

              expect(JSON.parse(current)).toMatchObject({
                categories: ["Work on Paper"],
                organizations: [],
                sizes: [],
                pageAndCursor: { page: 1, cursor: null },
                sort: "DATE_DESC",
                allowEmptyCreatedDates: true,
                createdAfterYear: 1880,
                createdBeforeYear: 1973,
              })

              wrapper.update()
              const html = wrapper.html()
              expect(html).toContain("Sign up to see price")

              done()
            })
          })
        })
        describe("keyword filter", () => {
          it("triggers relay refetch with keyword filter, and re-shows sign up to see price", done => {
            const filter = wrapper.find("KeywordFilter")

            const input = filter.find("input")

            const setInputValue = (
              inputWrapper: ReactWrapper,
              value: string,
              setSelectionRangeMock = jest.fn()
            ) => {
              ;(inputWrapper.getDOMNode() as any).value = value
              ;(inputWrapper.getDOMNode() as any).setSelectionRange = setSelectionRangeMock
              inputWrapper.simulate("change")
            }

            setInputValue(input, "test-keyword")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(1)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  keyword: "test-keyword",
                })
              )

              wrapper.update()
              const html = wrapper.html()
              expect(html).toContain("Sign up to see price")

              done()
            })
          })
        })
        describe("auction house filter", () => {
          it("triggers relay refetch with organization list, and re-shows sign up to see price", done => {
            const checkboxes = wrapper
              .find("AuctionHouseFilter")
              .find("Checkbox")

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
              expect(trackEvent.mock.calls[0][0]).toMatchObject({
                action_type: "Auction results filter params changed",
                context_page: "Artist Auction Results",
                // `changed` & `current` supplied as JSON blobs
              })

              const { changed, current } = trackEvent.mock.calls[0][0]

              expect(JSON.parse(changed)).toMatchObject({
                sizes: ["MEDIUM"],
              })

              expect(JSON.parse(current)).toMatchObject({
                sizes: ["MEDIUM"],
                pageAndCursor: { page: 1, cursor: null },
                sort: "DATE_DESC",
                organizations: [],
                categories: [],
                createdAfterYear: 1880,
                createdBeforeYear: 1973,
                allowEmptyCreatedDates: true,
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
          const sort = wrapper.find("SortSelect select")

          sort.find("option").at(1).simulate("change")

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

const AuctionResultsFixture: ArtistAuctionResults_Test_QueryRawResponse = {
  artist: {
    internalID: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
    id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    slug: "pablo-picasso",
    name: "Pablo Picasso",
    auctionResultsConnection: {
      pageInfo: { hasNextPage: true, endCursor: "YXJyYXljb25uZWN0aW9uOjk=" },
      pageCursors: {
        around: [
          { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
          { cursor: "YXJyYXljb25uZWN0aW9uOjk=", page: 2, isCurrent: false },
          { cursor: "YXJyYXljb25uZWN0aW9uOjE5", page: 3, isCurrent: false },
          { cursor: "YXJyYXljb25uZWN0aW9uOjI5", page: 4, isCurrent: false },
        ],
        first: null,
        last: {
          cursor: "YXJyYXljb25uZWN0aW9uOjgxOQ==",
          page: 83,
          isCurrent: false,
        },
        previous: null,
      },
      totalCount: 830,
      createdYearRange: {
        startAt: 1880,
        endAt: 1973,
      },
      edges: [
        {
          node: {
            title: "Oiseau fantastique",
            dimension_text: "27.2 x 21.1 cm",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/xACxJ_uIHApai3JP9odtZg/thumbnail.jpg",
              },
            },
            description:
              "Pablo Picasso (1881-1973)\n\nOiseau fantastique\n\nfelt-tip pen on paper\n\n10 ¾ x 8 3/8 in. (27.2 x 21.1 cm.)\n\nDrawn in 1952",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "3%" },
            estimate: { display: "$40,000 - 60,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDk2Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Mandoline sur une table",
            dimension_text: "82.2 x 100.4 cm",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/lmY_wowdeGi__ZtKVHV8Dw/thumbnail.jpg",
              },
            },
            description:
              "Pablo Picasso (1881-1973)\n\nMandoline sur une table\n\nsigned 'Picasso' (lower right)\n\noil on canvas\n\n32 3/8 x 39 ½ in. (82.2 x 100.4 cm.)\n\nPainted in 1922",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00-05:00",
            currency: "EUR",
            price_realized: {
              display: "€12,000",
              display_usd: "$15,000",
              cents_usd: 15000,
            },
            boughtIn: false,
            performance: { mid: "-3%" },
            estimate: { display: "$4,000,000 - 6,000,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDc3Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Tête d'homme",
            dimension_text: "51.2 x 34.2 cm",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/AI6P5qi0Xq7Efs9d6HMt4A/thumbnail.jpg",
              },
            },
            description:
              "Pablo Picasso (1881-1973)\n\nTête d'homme\n\ninscribed and dated 'Boisgeloup 10 juillet XXXIV' (upper right)\n\npencil on paper\n\n20 1/8 x 13 ½ in. (51.2 x 34.2 cm.)\n\nDrawn in Boisgeloup on 10 July 1934",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$20,000",
              display_usd: "$20,000",
              cents_usd: 20000,
            },
            boughtIn: false,
            performance: { mid: "-7.4%" },
            estimate: { display: "$500,000 - 700,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDc1Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Picador et taureau (A.R. 197)",
            dimension_text: "23.5 cm.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/B3EtIMtH8XnDmt1KBD6VhQ/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\nPicador et taureau _(A.R. 197)_\n\ndated '25.9.53.' (in reverse; lower center); stamped and numbered 'Madoura Plein Feu/Empreinte Originale de Picasso/29/200' (underneath)\n\nwhite earthenware ceramic plate with black oxide, colored engobe and glaze\n\nDiameter: 9 ¼ in. (23.5 cm.)\n\nConceived on 25 September 1953 and executed in a numbered edition of 200",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "30%" },
            estimate: { display: "$3,500 - 4,500" },
            id: "QXVjdGlvblJlc3VsdDoyNDY4Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Colombe à la lucarne (A.R. 78)",
            dimension_text: "15 3/8 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/rLyB6jNe0lQ8fF6EEQ61wg/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\nColombe à la lucarne _(A.R. 78)_\n\nstamped, marked and numbered 'Madoura Plein Feu/Edition Picasso/193/200/Edition Picasso/Madoura' (underneath)\n\nwhite earthenware ceramic plate, partially engraved, with colored engobe and glaze\n\nLength: 15 3/8 in. (39 cm.)\n\nConceived in 1949 and executed in a numbered edition of 200",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "200%" },
            estimate: { display: "$6,000 - 8,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDY3Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Scène de plage (A.R. 391)",
            dimension_text: "10 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/46t-8KytTjCwYPw17E7U6w/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\nScène de plage _(A.R. 391)_\n\nstamped 'Madoura Plein Feu/Empreinte Originale de Picasso' (on the reverse)\n\nwhite earthenware ceramic plaque with black engobe and white glaze\n\nDiameter: 10 in. (25.3 cm.)\n\nConceived in 1956 and executed in an edition of 450",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "-50.21%" },
            estimate: { display: "$2,500 - 3,500" },
            id: "QXVjdGlvblJlc3VsdDoyNDY2Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Tête de femme couronnée de fleurs (A.R. 236)",
            dimension_text: "9 1/8 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/eivcrcx7PVnvmKZzOQosXA/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\nTête de femme couronnée de fleurs _(A.R. 236)_\n\nsigned and dated 'Picasso/20.3.54.' (on the side); numbered '18/50/6.' (underneath)\n\nwhite earthenware ceramic vase, partially engraved, with white engobe\n\nHeight: 9 1/8 in. (23 cm.)\n\nConceived on 20 March 1954 and executed in a numbered edition of 50",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "3%" },
            estimate: { display: "$18,000 - 25,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDY1Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Femme (A.R. 297)",
            dimension_text: "13 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/-ZlQnxE8T8MsVRGjSSwaXw/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\nFemme _(A.R. 297)_\n\nstamped 'Edition Picasso/Madoura Plein Feu/Edition Picasso' (underneath)\n\nwhite earthenware ceramic pitcher with colored engobe and glaze\n\nHeight: 13 in. (33 cm.)\n\nConceived in 1955 and executed in an edition of 100",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "7%" },
            estimate: { display: "$10,000 - 15,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDY0Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Taureau dans l'arène (A.R. 80)",
            dimension_text: "37.6 cm.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/3nGESp60mCg0xygJ4bvjcA/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\n_Taureau dans l'arène _(A.R. 80)\n\nstamped and marked 'Madoura Plein Feu/D'Après Picasso/Edition Picasso /GR' (underneath)\n\nwhite earthenware ceramic plate, partially engraved, with colored engobe and glaze\n\nLength: 14 ¾ in. (37.6 cm.)\n\nConceived in 1948 and executed in an edition of 450",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: false,
            performance: { mid: "-9%" },
            estimate: { display: "$7,000 - 10,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDYzNw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
        {
          node: {
            title: "Visage de femme (A.R. 192)",
            dimension_text: "13 3/8 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/Db93v-hdsJjCV6XHFUfn2g/thumbnail.jpg",
              },
            },
            description:
              "PABLO PICASSO (1881-1973)\n\nVisage de femme _(A.R. 192)_\n\nstamped, marked and numbered 'Edition Picasso/Madoura Plein Feu/Edition Picasso/99/200/Madoura' (underneath)\n\nwhite earthenware ceramic pitcher, partially engraved, with colored engobe and glaze\n\nHeight: 13 3/8 in. (34 cm.)\n\nConceived on 7 July 1953 and executed in a numbered edition of 200",
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: true,
            performance: { mid: "3%" },
            estimate: { display: "$7,000 - 10,000" },
            id: "QXVjdGlvblJlc3VsdDoyNDYyNw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
          },
        },
      ],
    },
  },
}
