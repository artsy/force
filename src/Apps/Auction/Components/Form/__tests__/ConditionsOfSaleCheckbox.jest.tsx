import { mount } from "enzyme"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"
import { ConditionsOfSaleCheckbox } from "Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { useFeatureFlag } from "System/useFeatureFlag"
import { render, screen } from "@testing-library/react"

jest.mock("Apps/Auction/Hooks/useFormContext")
jest.mock("System/useFeatureFlag")

describe("ConditionsOfSaleCheckbox", () => {
  const mockUseFormContext = useFormContext as jest.Mock
  const setFieldTouched = jest.fn()
  const setFieldValue = jest.fn()
  const formProps = {
    setFieldTouched,
    setFieldValue,
    touched: {},
    values: {},
    errors: {},
  }

  const getWrapper = () => {
    return mount(<ConditionsOfSaleCheckbox />)
  }

  beforeAll(() => {
    mockUseFormContext.mockImplementation(() => {
      return formProps
    })
  })

  it("renders the disclaimer", () => {
    render(<ConditionsOfSaleCheckbox />)

    expect(screen.getByTestId("disclaimer")).toHaveTextContent(
      "I agree to Artsy's General Terms and Conditions of Sale. I understand that all bids are binding and may not be retracted."
    )
    expect(
      screen.getByRole("link", {
        name: "General Terms and Conditions of Sale",
      })
    ).toHaveAttribute("href", "/terms")
  })

  it("shows error message if error", () => {
    mockUseFormContext.mockImplementation(() => {
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
    const wrapper = getWrapper()
    expect(wrapper.text()).toContain("error message")
  })

  it("calls handleCheckboxSelect when clicked", () => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").simulate("click")
    expect(setFieldTouched).toHaveBeenCalledWith("agreeToTerms")
    expect(setFieldValue).toHaveBeenCalledWith("agreeToTerms", true)
  })
})
