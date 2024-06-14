import { act, fireEvent, screen, within } from "@testing-library/react"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultsRoute"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistAuctionResults_Test_Query$rawResponse } from "__generated__/ArtistAuctionResults_Test_Query.graphql"
import { MockPayloadGenerator } from "relay-test-utils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { useAuthDialog } from "Components/AuthDialog"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Components/Pagination/useComputeHref")
jest.mock("System/Router/Utils/catchLinks", () => ({
  userIsForcingNavigation: () => false,
}))
jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("Components/AuthDialog/useAuthDialog", () => ({
  useAuthDialog: jest.fn().mockReturnValue({ showAuthDialog: jest.fn() }),
}))

describe("AuctionResults", () => {
  let breakpoint
  const trackEvent = jest.fn()
  const mockedResolver = {
    Artist: () => ({
      ...AuctionResultsFixture.artist,
    }),
  }

  beforeAll(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: {
        location: {
          query: {},
        },
      },
    }))
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({}))
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot breakpoint={breakpoint}>
        <AuctionResultsRoute {...props} />
      </MockBoot>
    ),
    query: graphql`
      query ArtistAuctionResults_Test_Query($artistID: String!)
        @raw_response_type {
        artist(id: $artistID) {
          ...ArtistAuctionResultsRoute_artist
        }
      }
    `,
    variables: {
      artistID: "pablo-picasso",
    },
  })

  describe("trigger auth modal for filtering and pagination", () => {
    const mockUseAuthDialog = useAuthDialog as jest.Mock

    it("calls auth modal for 1st pagination but not for 2nd", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      renderWithRelay(mockedResolver)
      const navigation = screen.getByRole("navigation")
      const links = within(navigation).getAllByRole("link")
      expect(links).toHaveLength(6)

      fireEvent.click(links[2])
      expect(showAuthDialog).toHaveBeenCalledTimes(1)
      fireEvent.click(links[3])
      expect(showAuthDialog).toHaveBeenCalledTimes(1)
    })

    it("calls auth modal for 1st category selection but not for 2nd", () => {
      const showAuthDialog = jest.fn()
      mockUseAuthDialog.mockImplementation(() => ({ showAuthDialog }))

      let operationVariables
      const { env } = renderWithRelay(mockedResolver)

      const checkboxes = screen.getAllByRole("checkbox")
      fireEvent.click(checkboxes[2])
      act(() => {
        env.mock.resolveMostRecentOperation(operation => {
          operationVariables = operation.request.variables
          return MockPayloadGenerator.generate(operation, mockedResolver)
        })
      })

      expect(operationVariables.categories).toContain("Work on Paper")
      expect(showAuthDialog).toHaveBeenCalledTimes(1)

      fireEvent.click(checkboxes[3])
      act(() => {
        env.mock.resolveMostRecentOperation(operation => {
          operationVariables = operation.request.variables
          return MockPayloadGenerator.generate(operation, mockedResolver)
        })
      })

      expect(showAuthDialog).toHaveBeenCalledTimes(1)
      expect(operationVariables.categories).toContain("Sculpture")
    })
  })

  describe("general behavior", () => {
    it("renders proper elements", () => {
      renderWithRelay(mockedResolver)

      expect(screen.getByText("Upcoming Auctions")).toBeInTheDocument()
      expect(screen.getByText("2 results")).toBeInTheDocument()
      expect(screen.getByText("Past Auctions")).toBeInTheDocument()
      expect(screen.getByText("5 results")).toBeInTheDocument()

      const navigation = screen.getByRole("navigation")
      const links = within(navigation).getAllByRole("link")
      expect(links).toHaveLength(6)

      const sortSelect = screen.getAllByRole("combobox")[0]
      const options = within(sortSelect).getAllByRole("option")
      expect(options[0]).toHaveTextContent("Sale Date (Most recent)")
      expect(options[1]).toHaveTextContent("Estimate")
      expect(options[2]).toHaveTextContent("Sale price")

      expect(screen.getAllByRole("img")).toHaveLength(10)
    })

    describe("For Logged in users", () => {
      beforeEach(() => {
        ;(useSystemContext as jest.Mock).mockImplementation(() => ({
          user: { name: "Logged In", email: "loggedin@example.com" },
        }))
      })

      it("renders either price, awaiting results, bought in, or price not available", () => {
        renderWithRelay(mockedResolver)

        expect(screen.getAllByText("$20,000")).toHaveLength(2)
        expect(screen.getAllByText("Awaiting results")).toHaveLength(2)
        expect(screen.getAllByText("Bought In")).toHaveLength(2)
      })

      it("renders price in original currency and in USD only if currency is not USD", () => {
        renderWithRelay({
          Artist: () => ({
            ...AuctionResultsFixture.artist,
          }),
        })

        expect(screen.getAllByText("€12,000 • $15,000")).toHaveLength(2)
        expect(screen.getAllByText("$20,000")).toHaveLength(2)
      })
    })

    describe("For Logged Out users", () => {
      beforeEach(() => {
        ;(useSystemContext as jest.Mock).mockImplementation(() => ({
          user: null,
        }))
      })
      it('Shows "Sign Up to see estimate/price" in place of price for unauthenticated users', () => {
        renderWithRelay(mockedResolver)
        expect(screen.getAllByText("Sign up to see estimate")).toHaveLength(4)
        expect(screen.getAllByText("Sign up to see price")).toHaveLength(16)
      })
    })

    describe("sets filters from URL query", () => {
      beforeAll(async () => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          match: {
            location: {
              query: {
                hide_upcoming: true,
                categories: ["Painting"],
                sizes: ["SMALL", "LARGE"],
                currency: "USD",
                organizations: ["Phillips", "Bonhams", "Artsy Auction"],
              },
            },
          },
        }))
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

      it("sets filters from query", () => {
        renderWithRelay(mockedResolver)

        const checkedCheckboxes = screen.getAllByRole("checkbox", {
          checked: true,
        })

        const radioElements = screen.getAllByRole("radio", {
          checked: true,
        })

        expect(checkedCheckboxes).toHaveLength(10)
        expect(checkedCheckboxes[0]).toHaveTextContent("Hide upcoming auctions")
        expect(checkedCheckboxes[1]).toHaveTextContent("Painting")
        expect(checkedCheckboxes[2]).toHaveTextContent("Small (under 40cm)")
        expect(checkedCheckboxes[3]).toHaveTextContent("Large (over 100cm)")
        expect(checkedCheckboxes[4]).toHaveTextContent(
          "Include unspecified dates"
        )
        expect(checkedCheckboxes[5]).toHaveTextContent(
          "Include unknown and unavailable prices"
        )
        expect(checkedCheckboxes[6]).toHaveTextContent(
          "Include unspecified sale dates"
        )
        expect(checkedCheckboxes[7]).toHaveTextContent("Phillips")
        expect(checkedCheckboxes[8]).toHaveTextContent("Bonhams")
        expect(checkedCheckboxes[9]).toHaveTextContent("Artsy Auction")

        expect(radioElements).toHaveLength(2)
        expect(radioElements[0]).toHaveTextContent("cm")
        expect(radioElements[1]).toHaveTextContent("USD")
      })
    })

    describe("user interactions", () => {
      describe("pagination", () => {
        // FIXME: SWC_COMPILER_MIGRATION
        it.skip("triggers relay refetch with after, and re-shows sign up to see price", async () => {
          const { env } = renderWithRelay(mockedResolver)
          let operationVariables

          const navigation = screen.getByRole("navigation")
          const checkboxes = screen.getAllByRole("checkbox")
          fireEvent.click(checkboxes[1])
          fireEvent.click(within(navigation).getAllByRole("link")[1])

          act(() => {
            env.mock.resolveMostRecentOperation(operation => {
              operationVariables = operation.request.variables
              return MockPayloadGenerator.generate(operation, mockedResolver)
            })
          })

          expect(screen.getAllByText("Sign up to see price")).toHaveLength(10)
          expect(
            operationVariables.categories.includes("Work on Paper")
          ).toBeTruthy()
          expect(operationVariables.after).toBe("cursor2")
        })
      })

      describe("filters", () => {
        describe("medium filter", () => {
          it("triggers relay refetch with medium list, and re-shows sign up to see price", () => {
            const { env } = renderWithRelay(mockedResolver)

            const checkboxes = screen.getAllByRole("checkbox")
            fireEvent.click(checkboxes[2])
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })

            fireEvent.click(checkboxes[3])
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })

            fireEvent.click(checkboxes[4])
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })

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
              saleEndYear: null,
              saleStartYear: null,
              sizes: [],
              page: 1,
              sort: "DATE_DESC",
              allowEmptyCreatedDates: true,
              createdAfterYear: 1979,
              createdBeforeYear: 1991,
            })
          })
        })

        describe("keyword filter", () => {
          // FIXME: SWC_COMPILER_MIGRATION
          it.skip("triggers relay refetch with keyword filter, and re-shows sign up to see price", () => {
            renderWithRelay(mockedResolver)
            fireEvent.change(screen.getByRole("textbox"), {
              target: { value: "test-keyword" },
            })

            expect(screen.getAllByText("Sign up to see price")).toHaveLength(10)
          })
        })

        describe("auction house filter", () => {
          it("triggers relay refetch with organization list, and re-shows sign up to see price", () => {
            let operationVariables
            const { env } = renderWithRelay(mockedResolver)

            fireEvent.click(
              screen.getAllByText("Christie's", { exact: false })[0]
            )
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })
            expect(operationVariables.organizations).toContain("Christie's")

            fireEvent.click(
              screen.getAllByText("Phillips", { exact: false })[0]
            )
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })
            expect(operationVariables.organizations).toContain("Phillips")

            fireEvent.click(
              screen.getAllByText("Christie's", { exact: false })[0]
            )
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })
            expect(operationVariables.organizations).not.toContain("Christie's")
            expect(operationVariables.organizations).toContain("Phillips")
          })
        })
        describe("size filter", () => {
          it("triggers relay refetch with size list and tracks events, and re-shows sign up to see price", () => {
            let operationVariables
            const { env } = renderWithRelay(mockedResolver)

            fireEvent.click(screen.getByText("Medium (40 – 100cm)"))
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })
            expect(operationVariables.sizes).toContain("MEDIUM")

            fireEvent.click(screen.getByText("Large (over 100cm)"))
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })
            expect(operationVariables.sizes).toContain("MEDIUM")
            expect(operationVariables.sizes).toContain("LARGE")

            fireEvent.click(screen.getByText("Medium (40 – 100cm)"))
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })
            expect(operationVariables.sizes).not.toContain("MEDIUM")
            expect(operationVariables.sizes).toContain("LARGE")
          })
        })

        describe("year created filter", () => {
          it("triggers relay refetch with created years and tracks events, and re-shows sign up to see price", () => {
            let operationVariables
            const { env } = renderWithRelay(mockedResolver)

            const comboboxes = screen.getAllByRole("combobox")
            fireEvent.change(comboboxes[1], { target: { value: "1979" } })
            fireEvent.change(comboboxes[2], { target: { value: "1980" } })
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })

            expect(operationVariables.createdAfterYear).toBe(1979)
            expect(operationVariables.createdBeforeYear).toBe(1980)
          })
        })

        describe("hide upcoming filter", () => {
          it("triggers relay refetch with state", () => {
            let operationVariables
            const { env } = renderWithRelay(mockedResolver)

            const checkboxes = screen.getAllByRole("checkbox")
            fireEvent.click(checkboxes[0])
            act(() => {
              env.mock.resolveMostRecentOperation(operation => {
                operationVariables = operation.request.variables
                return MockPayloadGenerator.generate(operation, mockedResolver)
              })
            })

            expect(operationVariables.state).toBe("PAST")
          })
        })
      })

      describe("sort", () => {
        it("triggers relay refetch with correct params, and re-shows sign up to see price", () => {
          let operationVariables
          const { env } = renderWithRelay(mockedResolver)

          const comboboxes = screen.getAllByRole("combobox")
          fireEvent.change(comboboxes[0], {
            target: { value: "ESTIMATE_AND_DATE_DESC" },
          })
          act(() => {
            env.mock.resolveMostRecentOperation(operation => {
              operationVariables = operation.request.variables
              return MockPayloadGenerator.generate(operation, mockedResolver)
            })
          })

          expect(operationVariables.sort).toBe("ESTIMATE_AND_DATE_DESC")
        })
      })
    })
  })
})

// FIXME: Should not be using fixtures
const AuctionResultsFixture: ArtistAuctionResults_Test_Query$rawResponse = {
  artist: {
    internalID: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28",
    id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    slug: "pablo-picasso",
    name: "Pablo Picasso",
    meta: {
      description:
        "Find out about Pablo Picasso’s auction history, past sales, and current market value. Browse Artsy’s Price Database for recent auction results from the artist.`",
      title: "Pablo Picasso - Auction Results and Sales Data | Artsy",
    },
    statuses: {
      auctionLots: true,
    },
    pastAuctionResults: {
      totalCount: 2,
    },
    upcomingAuctionResults: {
      totalCount: 5,
    },
    sidebarAggregations: {
      aggregations: [
        { slice: "SIMPLE_PRICE_HISTOGRAM", counts: [] },
        {
          slice: "CURRENCIES_COUNT",
          counts: [{ name: "USD", value: "USD", count: 100 }],
        },
        {
          slice: "LOTS_BY_SALE_YEAR",
          counts: [{ name: "1880", value: "1880", count: 100 }],
        },
        {
          slice: "LOTS_BY_CREATED_YEAR",
          counts: [
            { name: "1979", value: "1979", count: 100 },
            { name: "1980", value: "1980", count: 100 },
            { name: "1990", value: "1990", count: 300 },
            { name: "1990", value: "1991", count: 300 },
          ],
        },
      ],
    },
    auctionResultsConnection: {
      pageInfo: { hasNextPage: true, endCursor: "cursor4" },
      pageCursors: {
        around: [
          { cursor: "cursor1", page: 1, isCurrent: true },
          { cursor: "cursor2", page: 2, isCurrent: false },
          { cursor: "cursor3", page: 3, isCurrent: false },
          { cursor: "cursor4", page: 4, isCurrent: false },
        ],
        first: null,
        last: {
          cursor: "cursor4",
          page: 83,
          isCurrent: false,
        },
        previous: null,
      },
      totalCount: 830,
      edges: [
        {
          node: {
            internalID: "123",
            artist: null,
            title: "Oiseau fantastique",
            dimension_text: "27.2 x 21.1 cm",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/xACxJ_uIHApai3JP9odtZg/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/xACxJ_uIHApai3JP9odtZg/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            categoryText: "Work on Paper",
            isUpcoming: true,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "124",
            artist: null,
            title: "Mandoline sur une table",
            dimension_text: "82.2 x 100.4 cm",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/lmY_wowdeGi__ZtKVHV8Dw/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/lmY_wowdeGi__ZtKVHV8Dw/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "125",
            artist: null,
            title: "Tête d'homme",
            dimension_text: "51.2 x 34.2 cm",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/AI6P5qi0Xq7Efs9d6HMt4A/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/AI6P5qi0Xq7Efs9d6HMt4A/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "126",
            artist: null,
            title: "Picador et taureau (A.R. 197)",
            dimension_text: "23.5 cm.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/B3EtIMtH8XnDmt1KBD6VhQ/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/B3EtIMtH8XnDmt1KBD6VhQ/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "127",
            artist: null,
            title: "Colombe à la lucarne (A.R. 78)",
            dimension_text: "15 3/8 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/rLyB6jNe0lQ8fF6EEQ61wg/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/rLyB6jNe0lQ8fF6EEQ61wg/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "128",
            artist: null,
            title: "Scène de plage (A.R. 391)",
            dimension_text: "10 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/46t-8KytTjCwYPw17E7U6w/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/46t-8KytTjCwYPw17E7U6w/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
            date_text: "1881-1973",
            saleDate: "2020-02-05T19:00:00Z",
            currency: "USD",
            price_realized: {
              display: "$NaN",
              display_usd: "$NaN",
              cents_usd: 0,
            },
            boughtIn: true,
            performance: { mid: "-50.21%" },
            estimate: { display: "$2,500 - 3,500" },
            id: "QXVjdGlvblJlc3VsdDoyNDY2Nw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "129",
            artist: null,
            title: "Tête de femme couronnée de fleurs (A.R. 236)",
            dimension_text: "9 1/8 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/eivcrcx7PVnvmKZzOQosXA/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/eivcrcx7PVnvmKZzOQosXA/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "130",
            artist: null,
            title: "Femme (A.R. 297)",
            dimension_text: "13 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/-ZlQnxE8T8MsVRGjSSwaXw/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/-ZlQnxE8T8MsVRGjSSwaXw/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "131",
            artist: null,
            title: "Taureau dans l'arène (A.R. 80)",
            dimension_text: "37.6 cm.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/3nGESp60mCg0xygJ4bvjcA/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/3nGESp60mCg0xygJ4bvjcA/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
            date_text: "1881-1973",
            saleDate: "2025-02-05T19:00:00Z",
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
            isUpcoming: false,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
        {
          node: {
            internalID: "132",
            artist: null,
            title: "Visage de femme (A.R. 192)",
            dimension_text: "13 3/8 in.",
            organization: "Christie's",
            images: {
              thumbnail: {
                cropped: {
                  src:
                    "https://d32dm0rphc51dk.cloudfront.net/Db93v-hdsJjCV6XHFUfn2g/thumbnail.jpg",
                  srcSet:
                    "https://d32dm0rphc51dk.cloudfront.net/Db93v-hdsJjCV6XHFUfn2g/thumbnail.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
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
            estimate: { display: null },
            id: "QXVjdGlvblJlc3VsdDoyNDYyNw==",
            mediumText: "oil on canvas",
            categoryText: "Painting",
            isUpcoming: true,
            lotNumber: "1",
            saleTitle: "Post-War and Contemporary Art Day Sale",
            location: "London",
          },
        },
      ],
    },
  },
}
