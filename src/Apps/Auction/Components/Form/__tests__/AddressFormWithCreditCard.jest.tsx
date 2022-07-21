import { mount } from "enzyme"
import { AddressFormWithCreditCard } from "../AddressFormWithCreditCard"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"

jest.mock("Apps/Auction/Hooks/useFormContext")

jest.mock("Components/CreditCardInput", () => ({
  CreditCardInput: () => null,
}))
jest.mock("../AddressForm", () => ({
  AddressForm: () => null,
}))

describe("AddressFormWithCreditCard", () => {
  const mockUseFormContext = useFormContext as jest.Mock
  const setFieldTouched = jest.fn()
  const setFieldValue = jest.fn()
  const setFieldError = jest.fn()

  const getWrapper = () => {
    return mount(<AddressFormWithCreditCard />)
  }

  beforeAll(() => {
    mockUseFormContext.mockImplementation(() => {
      return {
        setFieldTouched,
        setFieldValue,
        setFieldError,
        touched: {},
      }
    })
  })

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("CreditCardInput")).toHaveLength(1)
    expect(wrapper.find("AddressForm")).toHaveLength(1)
  })

  describe("credit card error handling", () => {
    it("sets touched on change", () => {
      const wrapper = getWrapper()
      const onChange = wrapper.find("CreditCardInput").prop("onChange") as any
      onChange({ complete: false })
      expect(setFieldTouched).toHaveBeenCalledWith("creditCard", true)
    })

    it("sets field error on error", () => {
      const wrapper = getWrapper()
      const onChange = wrapper.find("CreditCardInput").prop("onChange") as any
      onChange({ error: { message: "error" } })
      expect(setFieldValue).toHaveBeenCalledWith("creditCard", false)
      expect(setFieldError).toHaveBeenCalledWith("creditCard", "error")
    })

    it("if credit card not complete, set credit card field to false", () => {
      const wrapper = getWrapper()
      const onChange = wrapper.find("CreditCardInput").prop("onChange") as any
      onChange({ complete: false })
      expect(setFieldValue).toHaveBeenCalledWith("creditCard", false)
    })

    it("if credit card complete, set credit card field to true", () => {
      const wrapper = getWrapper()
      const onChange = wrapper.find("CreditCardInput").prop("onChange") as any
      onChange({ complete: true })
      expect(setFieldValue).toHaveBeenCalledWith("creditCard", true)
    })
  })
})
