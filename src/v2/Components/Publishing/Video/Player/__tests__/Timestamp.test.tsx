import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Timestamp } from "../Timestamp"

describe("Timestamp", () => {
  it("matches the snapshot", () => {
    const timestamp = renderer
      .create(<Timestamp duration={5000} currentTime={2000} />)
      .toJSON()
    expect(timestamp).toMatchSnapshot()
  })
})
