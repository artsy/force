import { SystemContextProvider } from "v2/System"
import { ReactWrapper, mount } from "enzyme"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { OfferNote } from "../OfferNote"
import { mediator } from "lib/mediator"
import { useInquiry } from "v2/Components/Inquiry/useInquiry"

const simulateTyping = (wrapper: ReactWrapper, text: string) => {
  const textArea = wrapper.find("textarea")
  // @ts-ignore
  textArea.getDOMNode().value = text
  textArea.simulate("change")
}

jest.mock("v2/Components/Inquiry/useInquiry")

describe("OfferNote", () => {
  const onChange = jest.fn()
  const showInquiry = jest.fn()

  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
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

    const twoHundredAs = new Array(200).fill("a").join("")
    expect(twoHundredAs.length).toBe(200)
    simulateTyping(wrapper, twoHundredAs)

    expect(onChange).toHaveBeenCalledWith({
      value: twoHundredAs,
      exceedsCharacterLimit: false,
    })

    const twoHundredAndOneAs = new Array(201).fill("a").join("")
    simulateTyping(wrapper, twoHundredAndOneAs)

    expect(onChange).toHaveBeenCalledWith({
      value: twoHundredAndOneAs,
      exceedsCharacterLimit: true,
    })
  })

  it("has a title and description and a character limit", () => {
    const text = getWrapper().text()
    expect(text).toContain("Note (optional)")
    expect(text).toContain(
      "Use this note to add any additional context about your offer"
    )
    expect(text).toContain(
      "Please do not share personal information in this field"
    )
    expect(text).toContain("0 / 1000 max")
  })

  it("has a different description for counteroffers", () => {
    const text = getWrapper({ counteroffer: true }).text()
    expect(text).toContain(
      "Use this note to add any additional context about your counteroffer"
    )
  })
})
