// tslint:disable:no-shadowed-variable

import { Images } from "v2/Components/Publishing/Fixtures/Components"
import { WrapperWithFullscreenContext } from "v2/Components/Publishing/Fixtures/Helpers"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ImageCollection } from "../ImageCollection"

jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

const renderSnapshot = _props => {
  return renderer
    .create(WrapperWithFullscreenContext(<ImageCollection {..._props} />))
    .toJSON()
}

const props = {
  targetHeight: 400,
  gutter: 10,
  images: null,
}
it("renders properly", () => {
  props.images = Images
  const image = renderSnapshot(props)
  expect(image).toMatchSnapshot()
})

it("renders a single image properly", () => {
  props.images = [Images[0]]
  const image = renderSnapshot(props)
  expect(image).toMatchSnapshot()
})
