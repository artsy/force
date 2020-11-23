import React from "react"
import { mount } from "enzyme"
import { TemporaryOffer } from "../TemporaryOffer"
import { Text } from "@artsy/palette"

describe("TemporaryOffer", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the temporary offer before expiration date", () => {
    global.Date.now = jest.fn(() => new Date(2020, 10, 23).getTime())
    const component = mount(<TemporaryOffer />)
    expect(component.find(Text).length).toBe(1)
  })

  it("does not render the temporary offer after it expires", () => {
    global.Date.now = jest.fn(() => new Date(2021, 0, 1, 1).getTime())
    const component = mount(<TemporaryOffer />)
    expect(component.find(Text).length).toBe(0)
  })
})
