import { ConfirmBidValidTestQueryRawResponse } from "v2/__generated__/ConfirmBidValidTestQuery.graphql"
import {
  createCreditCardAndUpdatePhoneFailed,
  createCreditCardAndUpdatePhoneSuccessful,
} from "../__fixtures__/MutationResults/createCreditCardAndUpdatePhone"
import deepMerge from "deepmerge"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { Location, Match } from "found"
import { graphql } from "react-relay"
import { Select } from "@artsy/palette"

import { auctionRoutes_ConfirmBidQueryResponse } from "v2/__generated__/auctionRoutes_ConfirmBidQuery.graphql"
import { ConfirmBidQueryResponseFixture } from "v2/Apps/Auction/__fixtures__/routes_ConfirmBidQuery"
import { bidderPositionQuery } from "v2/Apps/Auction/Operations/BidderPositionQuery"
import { AnalyticsSchema } from "v2/System/Analytics"
import { createMockFetchQuery } from "v2/DevTools/createMockNetworkLayer"
import { TrackingProp } from "react-tracking"
import {
  confirmBidBidderPositionQueryWithOutbid,
  confirmBidBidderPositionQueryWithPending,
  confirmBidBidderPositionQueryWithWinning,
  createBidderPositionFailed,
  createBidderPositionSuccessful,
  createBidderPositionSuccessfulAndBidder,
  createBidderPositionWithBidderNotQualified,
  createBidderPositionWithErrorBidNotPlaced,
  createBidderPositionWithLiveBiddingStarted,
} from "../__fixtures__/MutationResults/createBidderPosition"
import { stripeTokenResponse } from "../__fixtures__/Stripe"
import { ConfirmBidRouteFragmentContainer } from "../ConfirmBid"
import { ConfirmBidTestPage } from "./Utils/ConfirmBidTestPage"
import { ValidFormValues } from "./Utils/RegisterTestPage"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { mockLocation, resetMockLocation } from "v2/DevTools/mockLocation"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.mock("v2/Apps/Auction/Operations/BidderPositionQuery", () => ({
  bidderPositionQuery: jest.fn(),
}))

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

jest.mock("@stripe/stripe-js", () => {
  let mock = null
  return {
    loadStripe: () => {
      if (mock === null) {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        mock = mockStripe()
      }
      return mock
    },
    _mockStripe: () => mock,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    _mockReset: () => (mock = mockStripe()),
  }
})

const { _mockStripe, _mockReset } = require("@stripe/stripe-js")

const mockBidderPositionQuery = bidderPositionQuery as jest.Mock

const mockEnablePriceTransparency = jest.fn()

const mockedLocation: Partial<Location> = {
  query: {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    bid: null,
  },
}

const setupTestEnv = ({
  location = mockedLocation,
}: {
  location?: Partial<Location>
} = {}) => {
  mockLocation(location)
  return createTestEnv({
    Component: (
      props: auctionRoutes_ConfirmBidQueryResponse & { tracking: TrackingProp }
    ) => (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      <ConfirmBidRouteFragmentContainer
        match={{ location } as Match}
        {...props}
      />
    ),
    TestPage: ConfirmBidTestPage,
    defaultData: ConfirmBidQueryResponseFixture as ConfirmBidValidTestQueryRawResponse,
    defaultMutationResults: {
      createBidderPosition: {},
      createCreditCard: {},
      updateMyUserProfile: {},
    },
    query: graphql`
      query ConfirmBidValidTestQuery @raw_response_type {
        artwork(id: "artwork-id") {
          ...LotInfo_artwork
          internalID
          slug
          saleArtwork(saleID: "example-auction-id") {
            ...LotInfo_saleArtwork
            ...BidForm_saleArtwork
            internalID
            slug
            sale {
              registrationStatus {
                internalID
                qualifiedForBidding
              }
              internalID
              slug
              name
              isClosed
              isRegistrationClosed
            }
          }
        }
        me {
          internalID
          hasQualifiedCreditCards
          ...ConfirmBid_me
        }
      }
    `,
  })
}

describe("Routes/ConfirmBid", () => {
  beforeAll(() => {
    mockLocation({ search: "" })
  })

  beforeEach(() => {
    mockEnablePriceTransparency.mockReset()
    mockEnablePriceTransparency.mockReturnValue(false)

    _mockReset()
    mockPostEvent.mockReset()
    mockBidderPositionQuery.mockReset()
    resetMockLocation()
  })

  describe("for registered users", () => {
    it("allows the user to place a bid without agreeing to terms", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionSuccessful)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithPending
      )

      await page.submitForm()

      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "ConfirmBidCreateBidderPositionMutation",
        }),
        {
          input: {
            artworkID: "artworkid",
            maxBidAmountCents: 5000000,
            saleID: "saleid",
          },
        }
      )

      expect(mockBidderPositionQuery).toHaveBeenCalledTimes(1)
      expect(mockBidderPositionQuery.mock.calls[0][1]).toEqual({
        bidderPositionID: "positionid",
      })

      mockBidderPositionQuery.mockReset()
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithWinning
      )

      await new Promise(resolve => setTimeout(resolve, 1001))
      expect(mockBidderPositionQuery).toHaveBeenCalledTimes(1)
      expect(mockBidderPositionQuery.mock.calls[0][1]).toEqual({
        bidderPositionID: "pending-bidder-position-id-from-polling",
      })
      expect(window.location.assign).toHaveBeenCalledWith(
        `/artwork/${ConfirmBidQueryResponseFixture.artwork?.slug}`
      )
    })

    it("displays buyer's premium and subtotal", async () => {
      mockEnablePriceTransparency.mockReturnValue(true)

      const env = setupTestEnv()

      const page = await env.buildPage({
        mockData: deepMerge(ConfirmBidQueryResponseFixture, {
          artwork: {
            saleArtwork: {
              calculatedCost: {
                bidAmount: {
                  display: "$50,000",
                },
                buyersPremium: {
                  display: "$10,000",
                },
                subtotal: {
                  display: "$60,000",
                },
              },
            },
          },
        }),
      })

      expect(page.text()).toContain("Summary")
      expect(page.text()).toContain("Your max bid$50,000")
      expect(page.text()).toContain("Buyer's Premium$10,000")
      expect(page.text()).toContain("Subtotal$60,000")
    })

    it("updates buyer's premium and subtotal when a different bid is selected", async () => {
      mockEnablePriceTransparency.mockReturnValue(true)

      const env = setupTestEnv()

      const page = await env.buildPage({
        mockData: deepMerge(ConfirmBidQueryResponseFixture, {
          artwork: {
            saleArtwork: {
              calculatedCost: {
                bidAmount: {
                  display: "$50,000",
                },
                buyersPremium: {
                  display: "$10,000",
                },
                subtotal: {
                  display: "$60,000",
                },
              },
            },
          },
        }),
      })

      expect(page.text()).toContain("Your max bid$50,000")

      env.mockQuery.mockReset()
      env.mockQuery.mockImplementation(
        createMockFetchQuery({
          mockData: deepMerge(ConfirmBidQueryResponseFixture, {
            artwork: {
              saleArtwork: {
                calculatedCost: {
                  bidAmount: {
                    display: "$60,000",
                  },
                  buyersPremium: {
                    display: "$12,000",
                  },
                  subtotal: {
                    display: "$72,000",
                  },
                },
              },
            },
          }),
        })
      )

      await page.selectBidAmount("6000000")
      await page.update()

      expect(page.text()).toContain("Summary")
      expect(page.text()).toContain("Your max bid$60,000")
      expect(page.text()).toContain("Buyer's Premium$12,000")
      expect(page.text()).toContain("Subtotal$72,000")
    })

    it("tracks a success event to Segment", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessful)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "existing-bidder-id",
        bidder_position_id: "winning-bidder-position-id-from-polling",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks a max bid selected event to Segment", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      await page.selectBidAmount("6000000")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.SelectedMaxBid,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "existing-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        selected_max_bid_minor: "6000000",
        user_id: "my-user-id",
      })
    })

    it("displays an error message when the sale is already closed", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionFailed)

      await page.submitForm()

      const modalContent = page.find(ErrorModal).text()

      expect(modalContent).toContain("Sale Closed")
      expect(modalContent).toContain(
        "This sale had been closed. Please browse other open sales."
      )
      expect(window.location.assign).not.toHaveBeenCalled()
    })

    it("displays an error message when the live sale has already started", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionWithLiveBiddingStarted)

      await page.submitForm()

      const modalContent = page.find(ErrorModal).text()

      expect(modalContent).toContain("Live Auction in Progress")
      expect(modalContent).toContain(
        "Continue to the live sale to place your bid."
      )
      expect(window.location.assign).not.toHaveBeenCalled()
    })

    it("displays an error message when the mutation throws a JS error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.mockNetworkFailureOnce()

      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.find(ErrorModal).text()).toContain(
        "Something went wrong. Please try again"
      )
    })

    it("displays an error message when polling receives a non-success status", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.find(Select).text()).toContain(
        "Your bid wasn't high enough. Please select a higher bid."
      )
    })

    it("tracks an error when the mutation returns a GraphQL error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(createBidderPositionFailed)

      await page.submitForm()

      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "ConfirmBidCreateBidderPositionMutation",
        }),
        {
          input: {
            artworkID: "artworkid",
            maxBidAmountCents: 5000000,
            saleID: "saleid",
          },
        }
      )

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "existing-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Lot closed"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error when the mutation throws a JS error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.mockNetworkFailureOnce()

      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "existing-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["JavaScript error: failed to fetch"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error when polling receives a non-success status", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "existing-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Your bid wasn’t high enough"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })
  })

  describe("for unregistered users with a credit card on file", () => {
    const FixtureForUnregisteredUserWithCreditCard = deepMerge(
      ConfirmBidQueryResponseFixture,
      {
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
            },
          },
        },
        me: {
          hasQualifiedCreditCards: true,
        },
      }
    )

    it("allows the user to place a bid after agreeing to terms", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })

      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.agreeToTerms()
      await page.submitForm()

      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "ConfirmBidCreateBidderPositionMutation",
        }),
        {
          input: {
            artworkID: "artworkid",
            maxBidAmountCents: 5000000,
            saleID: "saleid",
          },
        }
      )
    })

    it("tracks registration submitted and success events to Segment", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(2)
      expect(mockPostEvent.mock.calls[0][0]).toEqual({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitted,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "new-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
      expect(mockPostEvent.mock.calls[1][0]).toEqual({
        action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "new-bidder-id",
        bidder_position_id: "winning-bidder-position-id-from-polling",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("displays an error when user did not agree to terms but tried to submit", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })

      await page.submitForm()

      expect(env.mutations.mockFetch).not.toBeCalled()
      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain("You must agree to the Conditions of Sale")
    })

    it("tracks a registration submitted event and an error without bidder id when the mutation returns a GraphQL error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionFailed)

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(2)
      expect(mockPostEvent.mock.calls[0][0]).toEqual({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitted,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
      expect(mockPostEvent.mock.calls[1][0]).toEqual({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Lot closed"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error without bidder id when the mutation throws a JS error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.mockNetworkFailureOnce()

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["JavaScript error: failed to fetch"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks a registration submitted event and an error with bidder id when polling receives a non-success status", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(2)
      expect(mockPostEvent.mock.calls[0][0]).toEqual({
        action_type: AnalyticsSchema.ActionType.RegistrationSubmitted,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "new-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
      expect(mockPostEvent.mock.calls[1][0]).toEqual({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "new-bidder-id",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Your bid wasn’t high enough"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("takes the user back to the /auction/:sale_slug/confirm-registration page when BIDDER_NOT_QUALIFIED is returned", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionWithBidderNotQualified)

      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).toHaveBeenCalledWith(
        "/auction/saleslug/confirm-registration"
      )
    })

    it("takes the user back to the /auction/:sale_slug/confirm-registration page when ERROR is returned with 'Bid not placed'", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionWithErrorBidNotPlaced)

      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).toHaveBeenCalledWith(
        "/auction/saleslug/confirm-registration"
      )
    })

    it("does not track registration submitted twice when newly registered bidder places two bids on the same page", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithCreditCard,
      })
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithOutbid
      )

      await page.agreeToTerms()
      await page.submitForm()

      mockPostEvent.mockClear()
      mockBidderPositionQuery.mockReset()
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidSubmitted,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: "new-bidder-id",
        bidder_position_id: "winning-bidder-position-id-from-polling",
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })
  })

  describe("for unregistered users without credit cards", () => {
    const FixtureForUnregisteredUserWithoutCreditCard = deepMerge(
      ConfirmBidQueryResponseFixture,
      {
        artwork: {
          saleArtwork: {
            sale: {
              registrationStatus: null,
            },
          },
        },
        me: {
          hasQualifiedCreditCards: false,
        },
      }
    )

    it("renders a form with a pre-selected country", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      expect(page.find("select").at(1).props().value).toMatch("US")
    })

    it("allows the user to place a bid after agreeing to terms", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      _mockStripe().createToken.mockResolvedValueOnce(stripeTokenResponse)
      env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneSuccessful)
      env.mutations.useResultsOnce(createBidderPositionSuccessfulAndBidder)
      mockBidderPositionQuery.mockResolvedValueOnce(
        confirmBidBidderPositionQueryWithWinning
      )

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(_mockStripe().createToken).toHaveBeenCalledWith(null, {
        address_city: "New York",
        address_country: "United States",
        address_line1: "123 Example Street",
        address_line2: "Apt 1",
        address_state: "NY",
        address_zip: "10012",
        name: "Example Name",
      })
      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "CreateCreditCardAndUpdatePhoneMutation",
        }),
        {
          creditCardInput: { token: "tok_abcabcabcabcabcabcabc" },
          profileInput: { phone: "+1 555 212 7878" },
        }
      )
      expect(env.mutations.mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "ConfirmBidCreateBidderPositionMutation",
        }),
        {
          input: {
            artworkID: "artworkid",
            maxBidAmountCents: 5000000,
            saleID: "saleid",
          },
        }
      )

      expect(mockBidderPositionQuery).toHaveBeenCalledTimes(1)
      expect(mockBidderPositionQuery.mock.calls[0][1]).toEqual({
        bidderPositionID: "positionid",
      })
      expect(window.location.assign).toHaveBeenCalledWith(
        `/artwork/${ConfirmBidQueryResponseFixture.artwork?.slug}`
      )
    })

    it("displays an error when user did not add his/her address", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      _mockStripe().createToken.mockResolvedValueOnce(stripeTokenResponse)

      const address = Object.assign({}, ValidFormValues)
      address.phoneNumber = "    "

      await page.fillAddressForm(address)
      await page.agreeToTerms()
      await page.submitForm()

      expect(page.text()).toMatch("Telephone is required")
      expect(env.mutations.mockFetch).not.toBeCalled()
      expect(window.location.assign).not.toHaveBeenCalled()
    })

    it("displays an error as the user types invalid input", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      page
        .find(CreditCardInput)
        .props()
        .onChange({ error: { message: "Your card number is invalid." } } as any)

      expect(page.text()).toContain("Your card number is invalid.")
    })

    it("displays an error when the input in the credit card field is invalid", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      _mockStripe().createToken.mockResolvedValueOnce({
        error: { message: "Your card number is incomplete." },
      })

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain("Your card number is incomplete.")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Your card number is incomplete."],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("displays an error when Stripe Element throws an error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      _mockStripe().createToken.mockRejectedValueOnce(
        new TypeError("Network request failed")
      )

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.find(ErrorModal).text()).toContain(
        "Something went wrong. Please try again"
      )

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["JavaScript error: Network request failed"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("displays an error when CreateCreditCardAndUpdatePhoneMutation returns an error", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      _mockStripe().createToken.mockResolvedValueOnce(stripeTokenResponse)
      env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneFailed)

      await page.fillFormWithValidValues()
      await page.agreeToTerms()
      await page.submitForm()

      expect(window.location.assign).not.toHaveBeenCalled()
      expect(page.text()).toContain(
        "Your card was declined. Please contact your bank or use a different card."
      )

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toBeCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: [
          "Your card was declined. Please contact your bank or use a different card.",
        ],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })

    it("tracks an error when there are validation errors in the form", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: FixtureForUnregisteredUserWithoutCreditCard,
      })

      _mockStripe().createToken.mockResolvedValueOnce(stripeTokenResponse)

      const address = Object.assign({}, ValidFormValues)
      address.phoneNumber = "    "

      await page.fillAddressForm(address)
      await page.agreeToTerms()
      await page.submitForm()

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenCalledWith({
        action_type: AnalyticsSchema.ActionType.ConfirmBidFailed,
        artwork_slug: "artworkslug",
        auction_slug: "saleslug",
        bidder_id: undefined,
        context_page: AnalyticsSchema.PageName.AuctionConfirmBidPage,
        error_messages: ["Telephone is required"],
        sale_id: "saleid",
        user_id: "my-user-id",
      })
    })
  })

  describe("preselected bid amounts", () => {
    it("pre-fills the bid select box with a value from the query string that is available in increments", async () => {
      const specialSelectedBidAmount = "7000000"

      const env = setupTestEnv({
        location: { query: { bid: specialSelectedBidAmount } },
      })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe(
        specialSelectedBidAmount
      )
    })

    it("pre-fills the bid select box with the highest increment if the value is higher than what is available", async () => {
      const specialSelectedBidAmount = "42000000"

      const env = setupTestEnv({
        location: { query: { bid: specialSelectedBidAmount } },
      })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })

    it("pre-fills the bid select box with the lowest increment if the value is lower than what is available", async () => {
      const specialSelectedBidAmount = "420000"

      const env = setupTestEnv({
        location: { query: { bid: specialSelectedBidAmount } },
      })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })

    it("pre-fills the bid select box with the lowest increment if the value is not a number", async () => {
      const specialSelectedBidAmount = "50 thousand and 00/100 dollars"

      const env = setupTestEnv({
        location: { query: { bid: specialSelectedBidAmount } },
      })
      const page = await env.buildPage()

      expect(page.selectBidAmountInput.props().value).toBe("5000000")
    })
  })
})
