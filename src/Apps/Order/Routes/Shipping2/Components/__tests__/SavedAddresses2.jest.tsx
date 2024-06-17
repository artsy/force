import { useTracking } from "react-tracking"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { fireEvent, screen, within } from "@testing-library/react"
import {
  SavedAddresses2,
  SavedAddressesProps,
} from "Apps/Order/Routes/Shipping2/Components/SavedAddresses2"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import userEvent from "@testing-library/user-event"
import { Formik } from "formik"
import {
  FulfillmentType,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { MockBoot } from "DevTools/MockBoot"
import { fillAddressForm } from "Components/__tests__/Utils/addressForm2"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { SavedAddresses2TestQuery } from "__generated__/SavedAddresses2TestQuery.graphql"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.setTimeout(10000)

let testProps: Omit<SavedAddressesProps, "me">
let mockShippingContext: ShippingContextProps
const mockFormikSubmit = jest.fn()
const mockExecuteUserAddressAction = jest.fn()

jest.mock("Apps/Order/Routes/Shipping2/Hooks/useShippingContext", () => {
  return {
    useShippingContext: jest.fn(() => mockShippingContext),
  }
})

jest.mock("Apps/Order/Routes/Shipping2/Hooks/useUserAddressUpdates", () => {
  return {
    useUserAddressUpdates: () => ({
      executeUserAddressAction: mockExecuteUserAddressAction,
    }),
  }
})

const TestWrapper = ({ children }) => (
  <MockBoot>
    <Analytics contextPageOwnerId={"order-id"}>
      <Formik<ShipValues>
        initialValues={{
          attributes: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
            name: "",
            phoneNumber: "",
            postalCode: "",
            region: "",
          },
          fulfillmentType: FulfillmentType.SHIP,
          meta: {},
        }}
        onSubmit={mockFormikSubmit}
      >
        {children}
      </Formik>
    </Analytics>
  </MockBoot>
)

const { renderWithRelay } = setupTestWrapperTL<SavedAddresses2TestQuery>({
  Component: props => {
    return (
      <TestWrapper>
        <SavedAddresses2 {...testProps} />
      </TestWrapper>
    )
  },
  query: graphql`
    query SavedAddresses2TestQuery {
      me {
        email # need something for the wrapper to render
      }
    }
  `,
})

describe("Saved Addresses", () => {
  const trackEvent = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()

    testProps = {
      active: true,
      onSelect: jest.fn(),
    }
    mockShippingContext = ({
      meData: {
        addressList: basicAddressList,
      },
      orderData: {
        availableShippingCountries: ["US"],
        savedFulfillmentDetails: { selectedSavedAddressID: "2" },
      },
      state: {
        isPerformingOperation: false,
        selectedSavedAddressID: "2",
        shippingFormMode: "saved_addresses",
      },
      actions: {
        setIsPerformingOperation: jest.fn(),
        setSelectedSavedAddressID: jest.fn(),
      },
    } as unknown) as ShippingContextProps
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  it("renders the addresses on the page", async () => {
    renderWithRelay({
      Me: () => ({
        addressConnection: basicAddressList,
      }),
    })
    const savedAddresses = screen.getAllByTestId("savedAddress")
    expect(savedAddresses).toHaveLength(2)
    expect(savedAddresses.map(address => address.textContent)).toEqual([
      "Test Name1 Main StMadrid, Spain, 28001555-555-5555Edit",
      "Test Name401 BroadwayFloor 25New York, NY, US, 10013422-424-4242Edit",
    ])
  })

  it("calls the onSelect prop when the user clicks an address", async () => {
    renderWithRelay({
      Me: () => ({
        addressConnection: basicAddressList,
      }),
    })
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
    mockShippingContext.state.selectedSavedAddressID = "2"
    renderWithRelay({
      Me: () => ({
        addressConnection: basicAddressList,
      }),
    })

    const savedAddresses = screen.getAllByTestId("savedAddress")

    expect(savedAddresses[0]).not.toBeChecked()
    expect(savedAddresses[1]).toBeChecked()

    await flushPromiseQueue()
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })

  describe("Creating a new address", () => {
    it("loads the address modal in new address mode", async () => {
      renderWithRelay({
        Me: () => ({
          addressConnection: basicAddressList,
        }),
      })

      expect(screen.queryByText("Add address")).not.toBeInTheDocument()

      const addAddressButton = screen.getByText("Add a new address")
      await userEvent.click(addAddressButton)

      expect(await screen.findByText("Add address")).toBeInTheDocument()

      const nameInput = screen.getByPlaceholderText("Full name")
      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveDisplayValue("")

      const streetInput = screen.getByPlaceholderText("Street address")
      expect(streetInput).toBeInTheDocument()
      expect(streetInput).toHaveDisplayValue("")
    })

    it("tracks an analytics event when the user clicks the add address button", async () => {
      renderWithRelay({
        Me: () => ({
          addressConnection: basicAddressList,
        }),
      })
      const addAddressButton = screen.getByText("Add a new address")
      await userEvent.click(addAddressButton)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedAddNewShippingAddress",
        context_module: "ordersShipping",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-shipping",
      })
    })

    // Test takes too long to run
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("calls the parent formik context onSubmit when the user saves a new address", async () => {
      let startTime = Date.now()
      const logTime = (label: string) => {
        console.log(label, Date.now() - startTime)
        startTime = Date.now()
      }
      logTime("start")

      renderWithRelay({
        Me: () => ({
          addressConnection: basicAddressList,
        }),
      })
      logTime("rendered")

      const validAddress = {
        name: "Test Name",
        addressLine1: "1 Main St",
        addressLine2: "Basement",
        city: "Madrid",
        region: "NY",
        postalCode: "28001",
        country: "ES",
        phoneNumber: "555-555-5555",
      }
      const addAddressButton = screen.getByText("Add a new address")
      await userEvent.click(addAddressButton)
      logTime("clicked button")

      screen.getByText("Add address")
      logTime("found modal, filling")

      await fillAddressForm(validAddress)

      await flushPromiseQueue()
      logTime("filled")

      mockExecuteUserAddressAction.mockResolvedValueOnce({
        data: { ...validAddress },
      })
      logTime("resolved")

      await userEvent.click(screen.getByText("Save"))

      await flushPromiseQueue()
      logTime("clicked save")

      expect(testProps.onSelect).toHaveBeenCalledWith(
        expect.objectContaining(validAddress)
      )
      logTime("asserted")

      await flushPromiseQueue()

      expect(testProps.onSelect).toHaveBeenCalledTimes(1)
    })
  })

  describe("Editing an address", () => {
    it("loads the address modal in edit mode", async () => {
      renderWithRelay({
        Me: () => ({
          addressConnection: basicAddressList,
        }),
      })

      expect(screen.queryByText("Edit address")).not.toBeInTheDocument()

      const savedAddresses = screen.getAllByTestId("savedAddress")
      const editAddressButton = within(savedAddresses[0]).getByText("Edit")

      // have to use fireEvent because the button (a styled `Text`) does not appear as clickable
      await fireEvent.click(editAddressButton)

      expect(await screen.findByText("Edit address")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Test Name")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("Street address")).toHaveValue(
        "1 Main St"
      )
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
