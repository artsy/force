import { mount, ReactWrapper } from "enzyme"
import {
  PhoneNumberInput,
  PhoneNumberInputProps,
} from "Components/PhoneNumberInput/PhoneNumberInput"
import { getPhoneNumberInformation } from "Components/PhoneNumberInput/getPhoneNumberInformation"
import { Input, Select } from "@artsy/palette"

jest.mock("react-relay")

jest.mock("System/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({ relayEnvironment: {} }),
}))

jest.mock("../getPhoneNumberInformation", () => ({
  ...jest.requireActual("../getPhoneNumberInformation"),
  getPhoneNumberInformation: jest.fn(),
}))

const mockGetPhoneNumberInformation = getPhoneNumberInformation as jest.Mock

const mockOnPhoneNumberValidation = jest.fn()

const mockUsPhoneNumber = {
  isValid: true,
  international: "+1 415-555-0133",
  national: "(415) 555-0133",
  originalNumber: "(415) 555-0133",
}

const phoneNumberProps: PhoneNumberInputProps = {
  phoneNumber: mockUsPhoneNumber,
  onPhoneNumberValidation: mockOnPhoneNumberValidation,
}

const renderPhoneNumberInput = (props?: Partial<PhoneNumberInputProps>) => {
  const inputProps = { ...phoneNumberProps, ...(props || {}) }
  return mount(<PhoneNumberInput {...inputProps} />)
}

describe("PhoneNumberInput", () => {
  let wrapper: ReactWrapper

  it("renders correctly", () => {
    wrapper = renderPhoneNumberInput()

    expect(wrapper.find(Input).prop("value")).toBe("(415) 555-0133")
    expect(wrapper.find(Select).prop("selected")).toBe("us")
  })

  it("renders correctly with French number", () => {
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

  describe("fires the passed onPhoneNumberValidation with correct params", () => {
    beforeEach(() => {
      wrapper = renderPhoneNumberInput()
    })

    beforeAll(() => {
      mockGetPhoneNumberInformation.mockResolvedValue(mockUsPhoneNumber)
    })

    it("when input change", () => {
      wrapper
        .find("input[name='phone']")
        .simulate("change", { target: { value: "(415) 555-0133" } })

      expect(mockOnPhoneNumberValidation).toHaveBeenCalled()
      expect(mockOnPhoneNumberValidation).toHaveBeenLastCalledWith({
        ...mockUsPhoneNumber,
        region: "us",
      })
    })

    it("when select change", () => {
      wrapper.find("select[name='countryCode']").simulate("change", {
        target: {
          value: "fr",
        },
      })

      wrapper.update()
      expect(mockOnPhoneNumberValidation).toHaveBeenCalled()
    })
  })
})
