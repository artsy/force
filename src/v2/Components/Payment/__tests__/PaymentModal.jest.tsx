import { commitMutation as _commitMutation, RelayProp } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { mockStripe } from "v2/DevTools/mockStripe"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentModal, PaymentModalProps } from "../PaymentModal"
import { mount } from "enzyme"
import { validAddress } from "v2/Components/__tests__/Utils/addressForm"
import {
  creatingCreditCardEdgeSuccess,
  creatingCreditCardFailed,
} from "v2/Apps/Order/Routes/__fixtures__/MutationResults"

const errorBoxQuery = "Text[data-test='credit-card-error']"

// needed for modal contentAnimation
const tick = () => new Promise(resolve => setTimeout(resolve, 0))

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

const commitMutation = _commitMutation as jest.Mock<any>

const { _mockStripe, _mockReset, loadStripe } = require("@stripe/stripe-js")

const stripeCallAddress = {
  name: "Artsy UK Ltd",
  address_line1: "14 Gower's Walk",
  address_line2: "Suite 2.5, The Loom",
  address_city: "Whitechapel",
  address_state: "London",
  address_zip: "E1 8PY",
  address_country: "UK",
}

const testPaymentModalProps: PaymentModalProps = {
  me: {
    id: "1234",
    internalID: "1234",
    creditCards: {} as any,
    " $refType": "PaymentSection_me",
  },
  relay: { environment: {} } as RelayProp,
  show: true,
  closeModal: jest.fn(),
}

function getWrapper() {
  const stripePromise = loadStripe("")
  return mount(
    <MockBoot breakpoint="md">
      <Elements stripe={stripePromise}>
        <PaymentModal {...testPaymentModalProps} />
      </Elements>
    </MockBoot>
  )
}

describe("PaymentModal", () => {
  beforeEach(() => {
    commitMutation.mockReset()
    _mockReset()
  })

  it("renders Modal with input fields", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("input").length).toBe(6)
    expect(wrapper.find("select").length).toBe(1)
    expect(wrapper.find("CreditCardInput").length).toBe(1)
  })
  it("creates credit card when form is submitted with valid values", async () => {
    const wrapper = getWrapper()

    _mockStripe().createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(creatingCreditCardEdgeSuccess)
    })

    const formik = wrapper.find("Formik").first()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    formik.props().onSubmit(validAddress as any)

    const stripeCall = await _mockStripe().createToken
    expect(stripeCall).toHaveBeenCalledWith(null, stripeCallAddress)

    await wrapper.update()

    expect(commitMutation.mock.calls[0][1]).toMatchObject({
      variables: {
        input: {
          token: "tokenId",
        },
      },
    })

    expect(wrapper.find(PaymentModal).props().closeModal).toHaveBeenCalled()
  })
  it("shows error when credit card creation fails", async () => {
    const wrapper = getWrapper()

    _mockStripe().createToken.mockReturnValue({
      then: func => func({ error: { message: "Invalid credit card number" } }),
    })

    const formik = wrapper.find("Formik").first()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    formik.props().onSubmit(validAddress as any)

    const stripeCall = await _mockStripe().createToken
    expect(stripeCall).toHaveBeenCalledWith(null, stripeCallAddress)

    expect(commitMutation).not.toHaveBeenCalled()

    await wrapper.update()

    await tick()

    expect(
      wrapper.find("Text[data-test='credit-card-error']").text()
    ).toContain("Invalid credit card number")
  })
  it("shows generic error when mutation fails", async () => {
    let wrapper = getWrapper()

    _mockStripe().createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    commitMutation.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    const formik = wrapper.find("Formik").first()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    formik.props().onSubmit(validAddress as any)

    const stripeCall = await _mockStripe().createToken
    expect(stripeCall).toHaveBeenCalledWith(null, stripeCallAddress)

    await wrapper.update()

    expect(commitMutation.mock.calls[0][1]).toMatchObject({
      variables: {
        input: {
          token: "tokenId",
        },
      },
    })

    await tick()

    expect(wrapper.find(errorBoxQuery).text()).toContain("Failed.")
  })
  it("shows generic error when mutation returns error", async () => {
    let wrapper = getWrapper()

    _mockStripe().createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    commitMutation.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(creatingCreditCardFailed)
    )

    const formik = wrapper.find("Formik").first()
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    formik.props().onSubmit(validAddress as any)

    const stripeCall = await _mockStripe().createToken
    expect(stripeCall).toHaveBeenCalledWith(null, stripeCallAddress)

    await wrapper.update()

    expect(commitMutation.mock.calls[0][1]).toMatchObject({
      variables: {
        input: {
          token: "tokenId",
        },
      },
    })

    await tick()

    expect(wrapper.find(errorBoxQuery).text()).toContain(
      "Failed. Payment error"
    )
  })
})
