import { ConditionsOfSaleCheckbox } from "Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Apps/Auction/Hooks/useAuctionFormContext")

describe("ConditionsOfSaleCheckbox", () => {
  const mockuseAuctionFormContext = useAuctionFormContext as jest.Mock
  const setFieldTouched = jest.fn()
  const setFieldValue = jest.fn()
  const formProps = {
    setFieldTouched,
    setFieldValue,
    touched: {},
    values: {},
    errors: {},
  }

  beforeEach(() => {
    mockuseAuctionFormContext.mockImplementation(() => formProps)
    jest.clearAllMocks()
  })

  it("shows error message if error", () => {
    mockuseAuctionFormContext.mockImplementation(() => {
      return {
        ...formProps,
        touched: {
          agreeToTerms: true,
        },
        errors: {
          agreeToTerms: "error message",
        },
      }
    })
    render(<ConditionsOfSaleCheckbox />)
    expect(screen.getByText("error message")).toBeInTheDocument()
  })

  it("calls handleCheckboxSelect when clicked", () => {
    render(<ConditionsOfSaleCheckbox />)
    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)
    expect(setFieldTouched).toHaveBeenCalledWith("agreeToTerms")
    expect(setFieldValue).toHaveBeenCalledWith("agreeToTerms", true)
  })
})
