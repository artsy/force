import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { FixedBackground } from "../FixedBackground"

const imageURL = "https://foo.com/image.png"
const videoURL = "https://foo.com/video.mp4"

describe("FixedBackground", () => {
  it("renders the provided background color if no image available", () => {
    const component = renderer
      .create(<FixedBackground backgroundColor={"red"} />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("renders the provided background image", () => {
    const component = renderer
      .create(
        <FixedBackground backgroundColor={"red"} backgroundUrl={imageURL} />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("ignores video for now", () => {
    const component = renderer
      .create(
        <FixedBackground backgroundColor={"red"} backgroundUrl={videoURL} />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
