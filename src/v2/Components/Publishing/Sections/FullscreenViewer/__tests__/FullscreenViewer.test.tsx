import { Images } from "v2/Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  FullscreenViewer,
  FullscreenViewerContainer,
} from "../FullscreenViewer"

it("renders properly", () => {
  const onClose = jest.fn()
  const viewer = renderer
    .create(<FullscreenViewer images={Images} show onClose={onClose} />)
    .toJSON()
  expect(viewer).toMatchSnapshot()
})

it("closes the viewer on ESC keydown", () => {
  const onClose = jest.fn()
  const viewer = mount(
    <FullscreenViewer images={Images} show onClose={onClose} />
  )
  viewer
    .find(FullscreenViewerContainer)
    .at(0)
    .simulate("keyDown", { keyCode: 27 })
  expect(onClose).toBeCalled()
})
