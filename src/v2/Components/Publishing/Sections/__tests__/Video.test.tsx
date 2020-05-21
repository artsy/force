import { Videos } from "v2/Components/Publishing/Fixtures/Components"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Video } from "../Video"

it("renders properly", () => {
  const video = renderer.create(<Video section={Videos[0]} />).toJSON()
  expect(video).toMatchSnapshot()
})
