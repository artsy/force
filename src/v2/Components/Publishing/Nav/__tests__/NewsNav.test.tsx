import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsNav } from "../NewsNav"

describe("NewsNav", () => {
  it("renders NewsNav", () => {
    const nav = renderer.create(<NewsNav date="2017-06-29T15:00:00.000Z" />)
    expect(nav).toMatchSnapshot()
  })
})
