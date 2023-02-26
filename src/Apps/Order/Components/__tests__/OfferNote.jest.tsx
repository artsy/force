import { SystemContextProvider } from "System/SystemContext"
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

    const oneThousand = new Array(1000).fill("a").join("")
    expect(oneThousand.length).toBe(1000)
    simulateTyping(wrapper, oneThousand)

    expect(onChange).toHaveBeenCalledWith({
      value: oneThousand,
      exceedsCharacterLimit: false,
    })

    const oneThousandAndOneAs = new Array(1001).fill("a").join("")
    simulateTyping(wrapper, oneThousandAndOneAs)

    expect(onChange).toHaveBeenCalledWith({
      value: oneThousandAndOneAs,
      exceedsCharacterLimit: true,
    })
  })

  it("has a title and description and a character limit", () => {
    const text = getWrapper().text()
    expect(text).toContain("Note (optional)")
    expect(text).toContain(
      "For your own safety, please do not share personal information."
    )
    expect(text).toContain("1000 characters remaining")
  })
})
