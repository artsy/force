import { Link } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { ReactWrapper, mount } from "enzyme"
import React from "react"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { OfferNote } from "../OfferNote"
import { mediator } from "lib/mediator"

const simulateTyping = (wrapper: ReactWrapper, text: string) => {
  const textArea = wrapper.find("textarea")
  // @ts-ignore
  textArea.getDOMNode().value = text
  textArea.simulate("change")
}

describe("OfferNote", () => {
  const onChange = jest.fn()
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
  })

  const getWrapper = (props: Partial<ExtractProps<typeof OfferNote>> = {}) =>
    mount(
      <SystemContextProvider>
        <OfferNote onChange={onChange} artworkId="artwork-id" {...props} />
      </SystemContextProvider>
    )
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
    expect(text).toContain("0 / 200 max")
  })

  it("has a different description for counteroffers", () => {
    const text = getWrapper({ counteroffer: true }).text()
    expect(text).toContain(
      "Use this note to add any additional context about your counteroffer"
    )
  })

  it("has a link to ask a specialist things", () => {
    const wrapper = getWrapper()
    const link = wrapper.find(Link)
    expect(link.text()).toContain("ask our specialists")

    link.simulate("click")

    expect(mediator.trigger).toHaveBeenCalledWith(
      "openOrdersContactArtsyModal",
      {
        artworkId: "artwork-id",
      }
    )
  })
})
