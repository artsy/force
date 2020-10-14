import React from "react"
import { graphql } from "react-relay"

import * as Schema from "v2/Artsy/Analytics/Schema"
import { createTestEnv } from "v2/DevTools/createTestEnv"

import { routes_RegisterQueryRawResponse } from "v2/__generated__/routes_RegisterQuery.graphql"
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
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { mockLocation } from "v2/DevTools/mockLocation"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

jest.mock("react-stripe-elements", () => {
  const stripeMock = {
    createToken: jest.fn(),
  }

  return {
    Elements: ({ children }) => children,
    StripeProvider: ({ children }) => children,
    CardElement: ({ onReady, hidePostalCode, ...props }) => <div {...props} />,
    __stripeMock: stripeMock,
    injectStripe: Component => props => (
      <Component stripe={stripeMock} {...props} />
    ),
  }
})

const createTokenMock = require("react-stripe-elements").__stripeMock
  .createToken as jest.Mock

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://example.com",
  },
}))

const setupTestEnv = (
  defaultData: routes_RegisterQueryRawResponse = RegisterQueryResponseFixture
) => {
  return createTestEnv({
    TestPage: RegisterTestPage,
    Component: RegisterRouteFragmentContainer,
    query: graphql`
      query RegisterValidTestQuery @raw_response_type {
        sale(id: "example-auction-id") {
          ...Register_sale
        }
        me {
          ...Register_me
        }
      }
    `,
    defaultData,
    defaultMutationResults: {
      createCreditCard: {},
      createBidder: {},
      updateMyUserProfile: {},
    },
  })
}

describe("Routes/Register ", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}
  })

  beforeEach(() => {
    mockLocation()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("emits a RegistrationSubmitFailed analytics event and halts submission", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    await page.submitForm()

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      context_page: Schema.PageName.AuctionRegistrationPage,
      auction_slug: RegisterQueryResponseFixture.sale.slug,
      auction_state: RegisterQueryResponseFixture.sale.status,
      error_messages: [
        "You must agree to the Conditions of Sale",
        "Name is required",
        "Address is required",
        "City is required",
        "State is required",
        "Postal code is required",
        "Telephone is required",
      ],
      sale_id: RegisterQueryResponseFixture.sale.internalID,
      user_id: RegisterQueryResponseFixture.me.internalID,
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

    createTokenMock.mockResolvedValue(stripeTokenResponse)

    env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneSuccessful)
    env.mutations.useResultsOnce(createBidderSuccessful)

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitted,
      context_page: Schema.PageName.AuctionRegistrationPage,
      auction_slug: RegisterQueryResponseFixture.sale.slug,
      auction_state: RegisterQueryResponseFixture.sale.status,
      bidder_id: createBidderSuccessful.createBidder.bidder.internalID,
      sale_id: RegisterQueryResponseFixture.sale.internalID,
      user_id: RegisterQueryResponseFixture.me.internalID,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(window.location.assign).toHaveBeenCalledWith(
      `/auction/${RegisterQueryResponseFixture.sale.slug}/confirm-registration`
    )
  })

  it("displays an error message if the `createCreditCard` mutation fails", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    createTokenMock.mockResolvedValue(stripeTokenResponse)
    env.mutations.useResultsOnce(createCreditCardAndUpdatePhoneFailed)

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(page.text()).toMatch(
      "Your card was declined. Please contact your bank or use a different card."
    )

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      context_page: Schema.PageName.AuctionRegistrationPage,
      auction_slug: RegisterQueryResponseFixture.sale.slug,
      auction_state: RegisterQueryResponseFixture.sale.status,
      error_messages: [
        "Your card was declined. Please contact your bank or use a different card.",
      ],
      sale_id: RegisterQueryResponseFixture.sale.internalID,
      user_id: RegisterQueryResponseFixture.me.internalID,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(window.location.assign).not.toBeCalled()
  })

  it("displays an error modal if the `createBidder` mutation fails", async () => {
    pending("until we can mimic Gravity-provided `createBidder` errors")
  })

  it("validates against an empty phone number", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    const address = Object.assign({}, ValidFormValues)
    address.phoneNumber = "    "

    await page.fillAddressForm(address)
    await page.submitForm()

    expect(page.text()).toMatch("Telephone is required")
  })

  it("displays an error message as the user types invalid input", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    page
      .find(CreditCardInput)
      .props()
      .onChange({ error: { message: "Your card number is invalid." } } as any)

    expect(page.text()).toContain("Your card number is invalid.")
  })

  it("displays an error message when the input in the credit card field is missing", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    createTokenMock.mockResolvedValue({
      error: { message: "Your card number is incomplete." },
    })

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(page.text()).toContain("Your card number is incomplete.")
  })

  it("displays an error message when Stripe Element throws an error", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    createTokenMock.mockRejectedValue(new TypeError("Network request failed"))

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(page.text()).toContain(
      "Something went wrong. Please try again or contact support@artsy.net."
    )
  })
})
