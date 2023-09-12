import { ShippingTestQuery$rawResponse } from "__generated__/ShippingTestQuery.graphql"
import { cloneDeep } from "lodash"

import {
  UntouchedBuyOrder,
  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  UntouchedBuyOrderWithShippingQuotes,
} from "Apps/__tests__/Fixtures/Order"
import {
  fillAddressForm,
  validAddress,
} from "Components/__tests__/Utils/addressForm"
import { Input } from "@artsy/palette"
import { graphql } from "react-relay"
import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { updateAddressSuccess } from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import * as updateUserAddress from "Apps/Order/Mutations/UpdateUserAddress"
import {
  settingOrderShipmentSuccess,
  settingOrderArtaShipmentSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ title, children, onClose, footer }) => {
      return (
        <div data-testid="ModalDialog">
          <button onClick={onClose}>close</button>
          {title}
          {children}
          {footer}
        </div>
      )
    },
  }
})

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

const mockShowErrorDialog = jest.fn()
jest.mock("Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const mockCommitMutation = jest.fn()
jest.mock("Apps/Order/Utils/commitMutation", () => ({
  ...jest.requireActual("../../Utils/commitMutation"),
  injectCommitMutation: Component => props => (
    <Component {...props} commitMutation={mockCommitMutation} />
  ),
}))
jest.mock("relay-runtime", () => ({
  ...jest.requireActual("relay-runtime"),
  commitMutation: (...args) => mockCommitMutation(args),
}))

const testOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrder,
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingDomesticFromUSOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingInternationalFromUSTestOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingDomesticFromGermanyOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingInternationalFromGermanyOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const pageInfo = {
  startCursor: "aaa",
  endCursor: "bbb",
  hasNextPage: false,
  hasPreviousPage: false,
}

const emptyTestMe: ShippingTestQuery$rawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  location: {
    id: "123",
    country: "United States",
  },
  addressConnection: {
    totalCount: 0,
    edges: [],
    pageInfo,
  },
}

const testMe: ShippingTestQuery$rawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  location: {
    id: "123",
    country: "United States",
  },
  addressConnection: {
    totalCount: 0,
    edges: [
      {
        node: {
          __typename: "UserAddress",
          internalID: "1",
          addressLine1: "1 Main St",
          addressLine2: "",
          addressLine3: "",
          city: "Madrid",
          country: "ES",
          isDefault: false,
          name: "Test Name",
          phoneNumber: "555-555-5555",
          postalCode: "28001",
          region: "",
          id: "addressID1",
        },
        cursor: "aaa",
      },
      {
        node: {
          __typename: "UserAddress",
          internalID: "2",
          addressLine1: "401 Broadway",
          addressLine2: "Floor 25",
          addressLine3: "",
          city: "New York",
          country: "US",
          isDefault: true,
          name: "Test Name",
          phoneNumber: "422-424-4242",
          postalCode: "10013",
          region: "NY",
          id: "addressID2",
        },
        cursor: "aaa",
      },
    ],
    pageInfo,
  },
}

class ShippingTestPage extends OrderAppTestPage {
  async selectPickupOption() {
    this.find(`[data-test="pickupOption"]`).last().simulate("click")
    await this.update()
  }
}

describe("Shipping", () => {
  const pushMock = jest.fn()
  let isCommittingMutation

  beforeEach(() => {
    isCommittingMutation = false
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <ShippingFragmentContainer
          router={{ push: pushMock } as any}
          order={props.order}
          me={props.me}
          // @ts-ignore
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query ShippingTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Shipping_order
        }
        me {
          ...Shipping_me
        }
      }
    `,
  })

  describe("with saved addresses", () => {})
})
