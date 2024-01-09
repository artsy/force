import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AddressModal } from "Apps/Order/Routes/Shipping2/Components/AddressModal2"
import { RootTestPage } from "DevTools/RootTestPage"
import { userAddressMutation } from "Apps/__tests__/Fixtures/Order/MutationResults"
import { SavedAddressItem } from "Apps/Order/Routes/Shipping2/Components/SavedAddressItem2"
import { useTracking } from "react-tracking"
import { AnalyticsCombinedContextProvider } from "System/Analytics/AnalyticsContext"
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import {
  SavedAddresses2,
  SavedAddressesProps,
} from "Apps/Order/Routes/Shipping2/Components/SavedAddresses2"
import { DeepPartial } from "Utils/typeSupport"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import userEvent from "@testing-library/user-event"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("Apps/Order/Routes/Shipping2/Components/AddressModal2", () => ({
  AddressModal: jest.fn(() => "<MockedAddressModal />"),
}))

let testProps: SavedAddressesProps
let mockShippingContext: ShippingContextProps

jest.mock("Apps/Order/Routes/Shipping2/Hooks/useShippingContext", () => {
  return {
    useShippingContext: jest.fn(() => mockShippingContext),
  }
})

// mock useFormikContext isSubmitting property to false
jest.mock("formik", () => ({
  useFormikContext: () => ({
    isSubmitting: false,
  }),
}))

class SavedAddressesTestPage extends RootTestPage {
  async selectEdit() {
    this.find(`[data-testid="editAddressInShipping"]`)
      .first()
      .simulate("click", { preventDefault: () => {} })
    await this.update()
  }
}

const renderTree = (props = testProps) => {
  const wrapper = render(<SavedAddresses2 {...testProps} />)
  return { wrapper }
}

describe("Saved Addresses", () => {
  const trackEvent = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    testProps = {
      active: true,
      onSelect: jest.fn(),
    }
    mockShippingContext = {
      orderData: {
        availableShippingCountries: ["US"],
        savedFulfillmentDetails: { selectedSavedAddressID: "2" },
      },
      meData: {
        addressList: basicAddressList,
      },
    } as ShippingContextProps
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  it("renders the addresses on the page", async () => {
    renderTree()
    const savedAddresses = screen.getAllByTestId("savedAddress")
    expect(savedAddresses).toHaveLength(2)
    expect(savedAddresses.map(address => address.textContent)).toEqual([
      "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit",
      "Test Name401 BroadwayFloor 25New York, NY, US, 10013422-424-4242Edit",
    ])
  })

  it("calls the onSelect prop when the user clicks an address", async () => {
    renderTree()
    const savedAddresses = screen.getAllByTestId("savedAddress")
    savedAddresses[0].click()
    expect(testProps.onSelect).toHaveBeenCalledTimes(1)
    expect(testProps.onSelect).toHaveBeenCalledWith({
      addressLine1: "1 Main St",
      addressLine2: "",
      addressLine3: "",
      city: "Madrid",
      country: "Spain",
      internalID: "1",
      isDefault: false,
      name: "Test Name",
      phoneNumber: "555-555-5555",
      postalCode: "28001",
      region: "",
    })
  })

  it("renders with an address pre-selected, but doesn't automatically save anything", async () => {
    mockShippingContext.orderData.savedFulfillmentDetails!.selectedSavedAddressID =
      "2"
    renderTree()

    const savedAddresses = screen.getAllByTestId("savedAddress")
    savedAddresses.forEach((address, index) => {
      console.log(address.outerHTML)
    })

    expect(savedAddresses[0]).not.toBeChecked()
    expect(savedAddresses[1]).toBeChecked()

    await flushPromiseQueue()
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })

  it("passes the correct props to the AddressModal on edit", async () => {
    renderTree()

    await flushPromiseQueue()
    expect(AddressModal).toHaveBeenCalledTimes(1)
    // expect(AddressModal).toHaveBeenLastCalledWith({
    //   addressModalAction: null,
    //   closeModal: expect.any(Function),
    //   onSuccess: expect.any(Function),
    // })
    const savedAddresses = screen.getAllByTestId("savedAddress")
    const editAddressButton = within(savedAddresses[0]).getByText("Edit")

    // have to use fireEvent because the button (a styled `Text`) does not appear as clickable
    await fireEvent.click(editAddressButton)

    expect(AddressModal).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        addressModalAction: {
          address: {
            addressLine1: "1 Main St",
            addressLine2: "",
            addressLine3: "",
            city: "Madrid",
            country: "Spain",
            internalID: "1",
            isDefault: false,
            name: "Test Name",
            phoneNumber: "555-555-5555",
            postalCode: "28001",
            region: "",
          },
          type: "edit",
        },
      }),
      {}
    )
  })
})

describe.skip("Saved Addresses(old)", () => {
  const trackEvent = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    testProps = {
      active: true,
      onSelect: jest.fn(),
    }
    mockShippingContext = {
      orderData: {
        availableShippingCountries: ["US"],
        savedFulfillmentDetails: { selectedSavedAddressID: "2" },
      },
      meData: {
        addressList: basicAddressList,
      },
    }
  })
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <AnalyticsCombinedContextProvider contextPageOwnerId="example-order-id">
          <SavedAddresses2 {...props} />
        </AnalyticsCombinedContextProvider>
      )
    },
    query: graphql`
      query SavedAddresses2Mutation_Test_Query @relay_test_operation {
        me {
          ...SavedAddresses2_me
        }
      }
    `,
  })

  describe("Saved Addresses mutations", () => {
    it("edits the saved addresses after calling edit address mutation", async () => {
      const { wrapper } = renderTree()
      const page = new SavedAddressesTestPage(wrapper)
      page.selectEdit()
      const addresses = page.find(SavedAddressItem).first().text()
      expect(addresses).toBe(
        "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit"
      )
    })
  })

  describe("Saved Addresses", () => {
    it("add address modal with expected props", async () => {
      const { wrapper } = getWrapper(
        {
          Me: () => ({
            addressConnection: mockAddressConnection,
          }),
        },
        { active: true }
      )
      const button = wrapper.find("[data-testid='shippingButton']").first()
      expect(wrapper.find(AddressModal).props().modalAction).toBeNull()
      button.simulate("click")
      await wrapper.update()

      expect(wrapper.find(AddressModal).props().modalAction).toEqual({
        type: "createUserAddress",
      })
    })
    it("edit address modal with expected props", async () => {
      const { wrapper } = getWrapper(
        {
          Me: () => ({
            addressConnection: mockAddressConnection,
          }),
        },
        { active: true }
      )

      const savedAddressItem = wrapper.find(SavedAddressItem).first()
      expect(wrapper.find(AddressModal).props().modalAction).toBeNull()

      savedAddressItem.props().handleClickEdit()
      await wrapper.update()

      expect(wrapper.find(AddressModal).props().modalAction).toEqual({
        type: "editUserAddress",
        address: expect.objectContaining({
          internalID: "1",
        }),
      })
    })

    it("render an add address button", () => {
      const { wrapper } = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      expect(
        wrapper.find("[data-testid='shippingButton']").first()
      ).toHaveLength(1)
    })

    describe("when clicking on the add address button", () => {
      it("tracks an analytics event", async () => {
        const { wrapper } = getWrapper({
          Me: () => ({
            addressConnection: mockAddressConnection,
          }),
        })

        await wrapper.update()
        wrapper.find("[data-testid='shippingButton']").first().simulate("click")

        expect(trackEvent).toHaveBeenCalledWith({
          action: "clickedAddNewShippingAddress",
          context_module: "ordersShipping",
          context_page_owner_id: "example-order-id",
          context_page_owner_type: "orders-shipping",
        })
      })
    })

    it("renders radio buttons with addresses", async () => {
      const { wrapper } = getWrapper({
        Me: () => ({
          addressConnection: mockAddressConnection,
        }),
      })
      const radios = wrapper.find("Radio")

      expect(radios.length).toBe(2)
      await waitFor(() => {
        expect(radios.map(radio => radio.props().value)).toEqual(["1", "2"])
        expect(radios.map(radio => radio.props().selected)).toEqual([
          false,
          true,
        ])
        expect(radios.map(radio => radio.text())).toEqual([
          "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit",
          "Test Name401 BroadwayFloor 25New York, NY, US, 10013422-424-4242Edit",
        ])
      })
    })
  })
})

const basicAddressList = [
  {
    internalID: "1",
    addressLine1: "1 Main St",
    addressLine2: "",
    addressLine3: "",
    city: "Madrid",
    country: "Spain",
    isDefault: false,
    name: "Test Name",
    phoneNumber: "555-555-5555",
    postalCode: "28001",
    region: "",
  },
  {
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
  },
]
