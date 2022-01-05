import { graphql } from "react-relay"
import { PaymentSection_Test_Query } from "v2/__generated__/PaymentSection_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PaymentSectionFragmentContainer } from "../Components/PaymentSection"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.unmock("react-relay")

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

const { getWrapper } = setupTestWrapper<PaymentSection_Test_Query>({
  Component: props => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return <PaymentSectionFragmentContainer {...props} />
  },
  query: graphql`
    query PaymentSection_Test_Query @relay_test_operation {
      me {
        ...PaymentSection_me
      }
    }
  `,
})

describe("PaymentSection", () => {
  beforeEach(() => {})
  it("renders saved credit card", () => {
    const wrapper = getWrapper({})

    const savedCreditCardText = wrapper.find("SavedCreditCards").text()

    expect(savedCreditCardText).toContain(
      'credit card•••• <mock-value-for-field-"lastDigits">   Exp 42/42Remove'
    )
  })

  it("opens payment modal when add new payment is clicked", async () => {
    const wrapper = getWrapper({})

    const modalWrapper = wrapper.find("PaymentModal")

    expect(modalWrapper.length).toBe(1)
    expect(modalWrapper.first().prop("show")).toBe(false)

    const addButton = wrapper.find("Button")
    await addButton.first().simulate("click")

    expect(wrapper.find("PaymentModal").last().prop("show")).toBe(true)
  })
})
