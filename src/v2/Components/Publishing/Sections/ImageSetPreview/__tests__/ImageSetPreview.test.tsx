import {
  ImageSetFull,
  ImageSetMini,
} from "v2/Components/Publishing/Fixtures/Components"
import { WrapperWithFullscreenContext } from "v2/Components/Publishing/Fixtures/Helpers"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ImageSetPreview } from "../ImageSetPreview"

const renderSnapshot = _props => {
  return renderer
    .create(WrapperWithFullscreenContext(<ImageSetPreview {..._props} />))
    .toJSON()
}
const props = { section: null }

it("renders a full image set properly", () => {
  props.section = ImageSetFull
  const imageset = renderSnapshot(props)
  expect(imageset).toMatchSnapshot()
})
it("renders a mini image set properly", () => {
  props.section = ImageSetMini
  const imageset = renderSnapshot(props)
  expect(imageset).toMatchSnapshot()
})
