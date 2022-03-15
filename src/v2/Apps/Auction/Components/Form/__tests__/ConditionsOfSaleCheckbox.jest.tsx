import { mount } from "enzyme"
import { useFormContext } from "v2/Apps/Auction/Hooks/useFormContext"
import { ConditionsOfSaleCheckbox } from "../ConditionsOfSaleCheckbox"

jest.mock("v2/Apps/Auction/Hooks/useFormContext")

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

  beforeEach(() => {
    mockUseFormContext.mockImplementation(() => {
      return formProps
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Checkbox")).toHaveLength(1)
    expect(wrapper.text()).toContain("Agree to Conditions of Sale")
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
