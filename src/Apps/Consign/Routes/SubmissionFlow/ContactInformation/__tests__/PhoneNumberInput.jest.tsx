import { mount, ReactWrapper } from "enzyme"
import {
  PhoneNumberInput,
  PhoneNumberInputProps,
} from "../Components/PhoneNumberInput"
import { Input, Select } from "@artsy/palette"

const handlePhoneNumberChange = jest.fn()

const phoneNumberProps: PhoneNumberInputProps = {
  phoneNumber: {
    isValid: true,
    national: "(415) 555-0132",
    regionCode: "us",
  },
  onChange: handlePhoneNumberChange,
}

const renderPhoneNumberInput = (props?: Partial<PhoneNumberInputProps>) => {
  const inputProps = { ...phoneNumberProps, ...(props || {}) }
  return mount(<PhoneNumberInput {...inputProps} />)
}

describe("PhoneNumberInput", () => {
  let wrapper: ReactWrapper

  it("renders correctly", () => {
    wrapper = renderPhoneNumberInput()

    expect(wrapper.find(Input).prop("value")).toBe("(415) 555-0132")
    expect(wrapper.find(Select).prop("selected")).toBe("us")
  })

  it("renders correctly with Franch number", () => {
    wrapper = renderPhoneNumberInput({
      phoneNumber: {
        isValid: true,
        national: "01 45 45 32 45",
        regionCode: "fr",
      },
    })

    expect(wrapper.find(Input).prop("value")).toBe("01 45 45 32 45")
    expect(wrapper.find(Select).prop("selected")).toBe("fr")
  })

  it("renders correctly if phone number invalid", () => {
    wrapper = renderPhoneNumberInput({
      phoneNumber: {
        isValid: false,
      },
    })

    expect(wrapper.find(Input).prop("value")).toBe("")
    expect(wrapper.find(Select).prop("selected")).toBe("us")
  })

  describe("runs on change if", () => {
    beforeEach(() => {
      wrapper = renderPhoneNumberInput()
    })

    it("input change", () => {
      wrapper
        .find("input[name='phone']")
        .simulate("change", { target: { value: "(415) 555-1111" } })

      expect(handlePhoneNumberChange).toHaveBeenCalled()
      expect(handlePhoneNumberChange).toHaveBeenCalledWith(
        "us",
        "(415) 555-1111"
      )
    })

    it("select change", () => {
      wrapper.find("select[name='countryCode']").simulate("change", {
        target: {
          value: "fr",
        },
      })

      wrapper.update()

      expect(handlePhoneNumberChange).toHaveBeenCalled()
      expect(handlePhoneNumberChange).toHaveBeenCalledWith(
        "fr",
        "(415) 555-0132"
      )
    })
  })
})
