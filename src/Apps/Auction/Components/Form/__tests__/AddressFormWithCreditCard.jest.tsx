import { AddressFormWithCreditCard } from "Apps/Auction/Components/Form/AddressFormWithCreditCard"
import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { render } from "@testing-library/react"

jest.mock("Apps/Auction/Hooks/useAuctionFormContext")

jest.mock("Components/CreditCardInput", () => ({
  CreditCardInput: ({ onChange }: any) => (
    <div data-testid="credit-card-input">
      <button
        type="button"
        onClick={() => onChange({ complete: false })}
        data-testid="incomplete-cc"
      >
        Incomplete
      </button>
      <button
        type="button"
        onClick={() => onChange({ complete: true })}
        data-testid="complete-cc"
      >
        Complete
      </button>
      <button
        type="button"
        onClick={() => onChange({ error: { message: "error" } })}
        data-testid="error-cc"
      >
        Error
      </button>
    </div>
  ),
}))
jest.mock("Components/Address/AddressFormFields", () => ({
  AddressFormFields: () => <div data-testid="address-form-fields" />,
}))

describe("AddressFormWithCreditCard", () => {
  const mockuseAuctionFormContext = useAuctionFormContext as jest.Mock
  const setFieldTouched = jest.fn()
  const setFieldValue = jest.fn()
  const setFieldError = jest.fn()

  beforeAll(() => {
    mockuseAuctionFormContext.mockImplementation(() => {
      return {
        setFieldTouched,
        setFieldValue,
        setFieldError,
        touched: {},
      }
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders correct components", () => {
    const { getByTestId } = render(<AddressFormWithCreditCard />)
    expect(getByTestId("credit-card-input")).toBeInTheDocument()
    expect(getByTestId("address-form-fields")).toBeInTheDocument()
  })

  describe("credit card error handling", () => {
    it("sets touched on change", () => {
      const { getByTestId } = render(<AddressFormWithCreditCard />)
      getByTestId("incomplete-cc").click()
      expect(setFieldTouched).toHaveBeenCalledWith("creditCard", true)
    })

    it("sets field error on error", () => {
      const { getByTestId } = render(<AddressFormWithCreditCard />)
      getByTestId("error-cc").click()
      expect(setFieldValue).toHaveBeenCalledWith("creditCard", false)
      expect(setFieldError).toHaveBeenCalledWith("creditCard", "error")
    })

    it("if credit card not complete, set credit card field to false", () => {
      const { getByTestId } = render(<AddressFormWithCreditCard />)
      getByTestId("incomplete-cc").click()
      expect(setFieldValue).toHaveBeenCalledWith("creditCard", false)
    })

    it("if credit card complete, set credit card field to true", () => {
      const { getByTestId } = render(<AddressFormWithCreditCard />)
      getByTestId("complete-cc").click()
      expect(setFieldValue).toHaveBeenCalledWith("creditCard", true)
    })
  })
})
