import { graphql } from "react-relay"
import * as Schema from "v2/System/Analytics/Schema"
import { createTestEnv } from "v2/DevTools/createTestEnv"

import { auctionRoutes_RegisterQueryRawResponse } from "v2/__generated__/auctionRoutes_RegisterQuery.graphql"
import {
  RegisterQueryResponseFixture,
  RegisterQueryResponseFixtureWithVerifiedUser,
  RegisterQueryResponseFixtureWithoutVerificationNeeded,
} from "../../__fixtures__/routes_RegisterQuery"
import { createBidderSuccessful } from "../__fixtures__/MutationResults/createBidder"
import {
  createCreditCardAndUpdatePhoneFailed,
  createCreditCardAndUpdatePhoneSuccessful,
} from "../__fixtures__/MutationResults/createCreditCardAndUpdatePhone"
import { stripeTokenResponse } from "../__fixtures__/Stripe"
import { RegisterRouteFragmentContainer } from "../Register"
import { RegisterTestPage, ValidFormValues } from "./Utils/RegisterTestPage"
import { mockLocation, resetMockLocation } from "v2/DevTools/mockLocation"
import { mockStripe } from "v2/DevTools/mockStripe"

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

const { _mockStripe } = require("@stripe/stripe-js")

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://example.com",
  },
}))

const setupTestEnv = (
  defaultData: auctionRoutes_RegisterQueryRawResponse = RegisterQueryResponseFixture
) => {
  return createTestEnv({
    Component: RegisterRouteFragmentContainer,
    TestPage: RegisterTestPage,
    defaultData,
    defaultMutationResults: {
      createBidder: {},
      createCreditCard: {},
      updateMyUserProfile: {},
    },
    query: graphql`
      query RegisterValidTestQuery @raw_response_type @relay_test_operation {
        sale(id: "example-auction-id") {
          ...Register_sale
        }
        me {
          ...Register_me
        }
      }
    `,
  })
}

describe("Routes/Register", () => {
  beforeAll(() => {
    mockLocation()
  })

  beforeEach(() => {
    mockPostEvent.mockReset()
    resetMockLocation()
  })

  it("emits a RegistrationSubmitFailed analytics event and halts submission", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.submitForm()

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      auction_slug: RegisterQueryResponseFixture.sale?.slug,
      auction_state: RegisterQueryResponseFixture.sale?.status,
      context_page: Schema.PageName.AuctionRegistrationPage,
      error_messages: [
        "You must agree to the Conditions of Sale",
        "Address is required",
        "City is required",
        "Name is required",
        "Postal code is required",
        "State is required",
        "Telephone is required",
      ],
      sale_id: RegisterQueryResponseFixture?.sale?.internalID,
      user_id: RegisterQueryResponseFixture?.me?.internalID,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(env.mutations.mockFetch).not.toBeCalled()
    expect(window.location.assign).not.toBeCalled()
  })

  it("displays the identity verification message on the credit card form if a sale requires it and user isn't verified", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    expect(page.text()).toContain(
      "This auction requires Artsy to verify your identity before bidding."
    )
  })

  it("does not display the identity verification message on the credit card form if a sale requires it and user is verified", async () => {
    const env = setupTestEnv(RegisterQueryResponseFixtureWithVerifiedUser)
    const page = await env.buildPage()

    expect(page.text()).not.toContain(
      "This auction requires Artsy to verify your identity before bidding."
    )
  })

  it("does not display the identity verification message on the credit card form if a sale does not require it", async () => {
    const env = setupTestEnv(
      RegisterQueryResponseFixtureWithoutVerificationNeeded
    )
    const page = await env.buildPage()

    expect(page.text()).not.toContain(
      "This auction requires Artsy to verify your identity before bidding."
    )
  })

  it("successfully adds a credit card and registers the user as a bidder", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    _mockStripe().createToken.mockResolvedValueOnce(stripeTokenResponse)

    env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneSuccessful)
    env.mutations.useResultsOnce(createBidderSuccessful)

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(mockPostEvent).toHaveBeenCalledTimes(1)
    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitted,
      auction_slug: RegisterQueryResponseFixture.sale?.slug,
      auction_state: RegisterQueryResponseFixture.sale?.status,
      bidder_id: createBidderSuccessful.createBidder?.bidder?.internalID,
      context_page: Schema.PageName.AuctionRegistrationPage,
      sale_id: RegisterQueryResponseFixture.sale?.internalID,
      user_id: RegisterQueryResponseFixture.me?.internalID,
    })

    expect(window.location.assign).toHaveBeenCalledWith(
      `/auction/${RegisterQueryResponseFixture.sale?.slug}/confirm-registration`
    )
  })

  it("displays an error message if the `createCreditCard` mutation fails", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    _mockStripe().createToken.mockResolvedValueOnce(stripeTokenResponse)
    env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneFailed)

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(page.text()).toMatch(
      "Your card was declined. Please contact your bank or use a different card."
    )

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      auction_slug: RegisterQueryResponseFixture.sale?.slug,
      auction_state: RegisterQueryResponseFixture.sale?.status,
      context_page: Schema.PageName.AuctionRegistrationPage,
      error_messages: [
        "Your card was declined. Please contact your bank or use a different card.",
      ],
      sale_id: RegisterQueryResponseFixture.sale?.internalID,
      user_id: RegisterQueryResponseFixture.me?.internalID,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(window.location.assign).not.toBeCalled()
  })

  it.skip("displays an error modal if the `createBidder` mutation fails", () => {
    // pending("until we can mimic Gravity-provided `createBidder` errors")
  })

  it("validates against an empty phone number", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    const address = Object.assign({}, ValidFormValues)
    address.phoneNumber = "    "

    await page.fillAddressForm(address)
    await page.update()
    await page.submitForm()

    expect(page.text()).toMatch("Telephone is required")
  })

  it("displays an error message when the input in the credit card field is missing", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    _mockStripe().createToken.mockResolvedValueOnce({
      error: { message: "Your card number is incomplete." },
    })

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(page.text()).toContain("Your card number is incomplete.")
  })

  it("displays an error message when Stripe Element throws an error", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    _mockStripe().createToken.mockRejectedValueOnce(
      new TypeError("Network request failed")
    )

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(page.text()).toContain(
      "Something went wrong. Please try again or contact support@artsy.net."
    )
  })
})
