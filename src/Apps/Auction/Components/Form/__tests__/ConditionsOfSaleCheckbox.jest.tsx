import { mount } from "enzyme"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"
import { ConditionsOfSaleCheckbox } from "Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"
import { useFeatureFlag } from "System/useFeatureFlag"

jest.mock("Apps/Auction/Hooks/useFormContext")

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

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

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Checkbox")).toHaveLength(1)
    expect(wrapper.text()).toContain(
      "I agree to the Conditions of Sale. I understand that all bids are binding and may not be retracted."
    )
  })

  describe("new terms and conditions enabled", () => {
    beforeEach(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        (f: string) => f === "diamond_new-terms-and-conditions"
      )
    })

    it("renders correct components", () => {
      const wrapper = getWrapper()
      expect(wrapper.find("Checkbox")).toHaveLength(1)
      expect(wrapper.text()).toContain(
        "I agree to Artsy's General Terms and Conditions of Sale. I understand that all bids are binding and may not be retracted."
      )
    })
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

  it("links out to conditions of sale", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain('href="/conditions-of-sale"')
  })
})
