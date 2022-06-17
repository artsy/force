import { OfferTestQueryRawResponse } from "v2/__generated__/OfferTestQuery.graphql"
import { graphql } from "react-relay"
import { UntouchedOfferOrderPriceHidden } from "../../../__tests__/Fixtures/Order"
import { OfferFragmentContainer } from "../Offer"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { initialOfferSuccess } from "../__fixtures__/MutationResults"

jest.unmock("react-tracking")
jest.unmock("react-relay")

const mockCommitMutation = jest.fn()
jest.mock("v2/Apps/Order/Utils/commitMutation", () => ({
  ...jest.requireActual("../../Utils/commitMutation"),
  injectCommitMutation: Component => props => (
    <Component {...props} commitMutation={mockCommitMutation} />
  ),
}))

const mockShowErrorDialog = jest.fn()
jest.mock("v2/Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const testOfferHiddenPrice: OfferTestQueryRawResponse["order"] = {
  ...UntouchedOfferOrderPriceHidden,
  internalID: "1234",
  __isCommerceOrder: "",
}

describe("an offer on the work with price hidden", () => {
  let isCommittingMutation

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <OfferFragmentContainer {...props} router={{ push: jest.fn() }} />
      </MockBoot>
    ),
    query: graphql`
      query Offer2TestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "1234567") {
          ...Offer_order
        }
      }
    `,
  })

  beforeEach(async () => {
    jest.clearAllMocks()
    isCommittingMutation = false
  })

  it("shows no modal warning when an offer made on work with hidden price", async () => {
    mockCommitMutation.mockResolvedValue(initialOfferSuccess)
    let wrapper = getWrapper({
      CommerceOrder: () => ({
        ...testOfferHiddenPrice,
        price: "",
      }),
    })
    let page = new OrderAppTestPage(wrapper)

    await page.setOfferAmount(2)
    await page.clickSubmit()
    expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    expect(mockShowErrorDialog).not.toHaveBeenCalled()
  })
})
