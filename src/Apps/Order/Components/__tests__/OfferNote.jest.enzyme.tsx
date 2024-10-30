import { SystemContextProvider } from "System/Contexts/SystemContext"
import { ReactWrapper, mount } from "enzyme"
import { ExtractProps } from "Utils/ExtractProps"
import { OfferNote } from "Apps/Order/Components/OfferNote"
import { useInquiry } from "Components/Inquiry/useInquiry"

const simulateTyping = (wrapper: ReactWrapper, text: string) => {
  const textArea = wrapper.find("textarea")
  // @ts-ignore
  textArea.getDOMNode().value = text
  textArea.simulate("change")
}

jest.mock("Components/Inquiry/useInquiry")

describe("OfferNote", () => {
  const onChange = jest.fn()
  const showInquiry = jest.fn()

  beforeEach(() => {
    ;(useInquiry as jest.Mock).mockImplementation(() => ({ showInquiry }))
  })

  afterEach(() => {
    onChange.mockReset()
    showInquiry.mockReset()
  })

  const getWrapper = (props: Partial<ExtractProps<typeof OfferNote>> = {}) => {
    return mount(
      <SystemContextProvider>
        <OfferNote onChange={onChange} artworkId="artwork-id" {...props} />
      </SystemContextProvider>
    )
  }

  it("calls onChange with appropriate change events", () => {
    const wrapper = getWrapper()

    simulateTyping(wrapper, "hello world")

    expect(onChange).toHaveBeenCalledWith({
      value: "hello world",
      exceedsCharacterLimit: false,
    })
  })

  it("has a title and description", () => {
    const text = getWrapper().text()
    expect(text).toContain("Note (recommended)")
    expect(text).toContain(
      "Add additional information to help the gallery to evaluate your offer."
    )
  })
})
