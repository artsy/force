import { OfferTestQueryRawResponse } from "v2/__generated__/OfferTestQuery.graphql"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { graphql } from "react-relay"
import { UntouchedOfferOrderPriceHidden } from "../../../__tests__/Fixtures/Order"
import { initialOfferSuccess } from "../__fixtures__/MutationResults"
import { OfferFragmentContainer } from "../Offer"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.unmock("react-tracking")
jest.unmock("react-relay")
const testOfferHiddenPrice: OfferTestQueryRawResponse["order"] = {
  ...UntouchedOfferOrderPriceHidden,
  internalID: "1234",
  __isCommerceOrder: "",
}

describe("an offer on the work with price hidden", () => {
  const { buildPage, mutations } = createTestEnv({
    Component: OfferFragmentContainer,
    TestPage: OrderAppTestPage,
    defaultData: {
      order: testOfferHiddenPrice,
    },
    defaultMutationResults: {
      ...initialOfferSuccess,
    },
    query: graphql`
      query Offer2TestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "1234567") {
          ...Offer_order
        }
      }
    `,
  })

  let page: OrderAppTestPage
  beforeEach(async () => {
    page = await buildPage({
      mockData: {
        order: {
          ...testOfferHiddenPrice,
          price: "",
        },
      },
    })
  })

  it("shows no modal warning when an offer made on work with hidden price", async () => {
    await page.setOfferAmount(2)
    await page.clickSubmit()
    await page.expectButtonSpinnerWhenSubmitting()
    await page.expectNoModal()
    expect(mutations.mockFetch).toHaveBeenCalled()
  })
})
