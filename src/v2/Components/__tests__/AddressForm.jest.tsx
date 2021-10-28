import { useSystemContext } from "v2/System/useSystemContext"
import { userHasLabFeature } from "v2/Utils/user"
import { render, screen } from "@testing-library/react"
import { Formik, FormikConfig } from "formik"
import { MockBoot } from "v2/DevTools"
import { Address, AddressForm, AddressFormProps } from "../AddressForm"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/Utils/user")

describe("AddressForm", () => {
  let emptyValuesMock: { address: Address }
  let onSubmitMock: FormikConfig<{ address: Address }>["onSubmit"]
  const renderAddressForm = (
    props?: AddressFormProps,
    overrideValues?: Partial<Address>
  ) =>
    render(
      <MockBoot>
        <Formik
          onSubmit={onSubmitMock}
          initialValues={{
            address: { ...emptyValuesMock, ...overrideValues! } as Address,
          }}
        >
          <AddressForm {...props} />
        </Formik>
      </MockBoot>
    )

  beforeEach(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { lab_features: [] },
      mediator: { on: jest.fn() },
    }))

    onSubmitMock = jest.fn()

    emptyValuesMock = {
      address: {
        name: "",
        addressLine1: "",
        addressLine2: "",
        country: "US",
        city: "",
        region: "",
        phoneNumber: "",
        postalCode: "",
      },
    }
  })

  it.each<string[]>([
    ["Full name", "Add full name"],
    ["Postal code", "Add postal code"],
    ["Address line 1", "Add street address"],
    ["Address line 2 (optional)", "Add apt, floor, suite, etc."],
    ["City", "Add city"],
    ["State, province, or region", "Add State, province, or region"],
  ])(
    "renders an empty form with expected elements: %s",
    (title, placeholder) => {
      renderAddressForm()

      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    }
  )

  it.each<string[]>([
    ["Add full name", "name", "Jack Carter"],
    ["Add postal code", "postalCode", "12345"],
    ["Add street address", "addressLine1", "123 Test St"],
    ["Add apt, floor, suite, etc.", "addressLine2", "3rd floor"],
    ["Add city", "city", "Eureka"],
    ["Add State, province, or region", "region", "OR"],
    ["Add phone", "phoneNumber", "12345678"],
  ])("renders inputs with initial values: %s", (placeholder, key, value) => {
    renderAddressForm({ showPhoneNumberInput: true }, { [key]: value })

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    expect(screen.getByDisplayValue(value)).toBeInTheDocument()
  })

  describe("Phone number", () => {
    it("renders an input for phone number", () => {
      renderAddressForm({ showPhoneNumberInput: true })

      expect(screen.getByText("Phone number")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("Add phone")).toBeInTheDocument()
      expect(
        screen.queryByText("Required for shipping logistics")
      ).toBeInTheDocument()
      expect(screen.queryByTestId("phoneNumberCountry")).not.toBeInTheDocument()
    })

    it("renders a dropdown for country input when feature flag present", () => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        user: { lab_features: ["Phone Number Validation"] },
        mediator: { on: jest.fn() },
      }))
      ;(userHasLabFeature as jest.Mock).mockImplementation(() => true)

      renderAddressForm({ showPhoneNumberInput: true })

      expect(screen.getByText("Phone number")).toBeInTheDocument()
      expect(
        screen.queryByText("Only used for shipping purposes")
      ).toBeInTheDocument()
      expect(screen.getByTestId("phoneNumberCountry")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("Add phone")).toBeInTheDocument()
    })
  })

  it("renders a form with specific features for billing", () => {
    renderAddressForm({ billing: true, showPhoneNumberInput: true })

    expect(screen.getByText("Name on card")).toBeInTheDocument()
    expect(
      screen.queryByText("Required for shipping logistics")
    ).not.toBeInTheDocument()
  })

  describe("Country select", () => {
    it("locking country to origin uses shipping country", () => {
      renderAddressForm({ domesticOnly: true, shippingCountry: "US" })

      expect(screen.getByText("Country")).toBeInTheDocument()
      expect(screen.getByDisplayValue("United States")).toBeInTheDocument()
      expect(screen.getByText("Domestic shipping only.")).toBeInTheDocument()
    })

    it("locking countries to EU with no preselected country uses shipping country", () => {
      renderAddressForm({
        domesticOnly: true,
        euOrigin: true,
        shippingCountry: "DE",
      })

      expect(screen.getByText("Country")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Germany")).toBeInTheDocument()
      expect(
        screen.getByText("Continental Europe shipping only.")
      ).toBeInTheDocument()
    })

    it("locking countries to EU with a preselected country uses the preselected country", () => {
      renderAddressForm(
        { domesticOnly: true, euOrigin: true },
        { country: "FR" }
      )

      expect(screen.getByText("Country")).toBeInTheDocument()
      expect(screen.getByDisplayValue("France")).toBeInTheDocument()
      expect(
        screen.getByText("Continental Europe shipping only.")
      ).toBeInTheDocument()
    })
  })
})
