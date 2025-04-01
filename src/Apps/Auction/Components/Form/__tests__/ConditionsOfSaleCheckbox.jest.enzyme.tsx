import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { mount } from "enzyme"

import { ConditionsOfSaleCheckbox } from "Apps/Auction/Components/Form/ConditionsOfSaleCheckbox"

jest.mock("Apps/Auction/Hooks/useAuctionFormContext")
jest.mock("@unleash/proxy-client-react")

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

  const getWrapper = () => {
    return mount(<ConditionsOfSaleCheckbox />)
  }

  beforeAll(() => {
    mockuseAuctionFormContext.mockImplementation(() => {
      return formProps
    })
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
