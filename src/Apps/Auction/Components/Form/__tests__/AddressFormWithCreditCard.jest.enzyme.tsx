import { AddressFormWithCreditCard } from "Apps/Auction/Components/Form/AddressFormWithCreditCard"
import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { mount } from "enzyme"

jest.mock("Apps/Auction/Hooks/useAuctionFormContext")

jest.mock("Components/CreditCardInput", () => ({
  CreditCardInput: () => null,
}))
jest.mock("Components/Address/AddressFormFields", () => ({
  AddressFormFields: () => null,
}))

describe("AddressFormWithCreditCard", () => {
  const mockuseAuctionFormContext = useAuctionFormContext as jest.Mock
  const setFieldTouched = jest.fn()
  const setFieldValue = jest.fn()
  const setFieldError = jest.fn()

  const getWrapper = () => {
    return mount(<AddressFormWithCreditCard />)
  }

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

  it("renders correct components", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("CreditCardInput")).toHaveLength(1)
    expect(wrapper.find("AddressFormFields")).toHaveLength(1)
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
