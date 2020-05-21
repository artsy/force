import { Images } from "v2/Components/Publishing/Fixtures/Components"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Caption } from "../Caption"

it("renders an artwork caption properly", () => {
  const caption = renderer
    .create(<Caption section={Images[0]} total={10} index={2} open />)
    .toJSON()
  expect(caption).toMatchSnapshot()
})

it("renders an image caption properly", () => {
  const caption = renderer
    .create(<Caption section={Images[1]} total={10} index={3} open />)
    .toJSON()
  expect(caption).toMatchSnapshot()
})

it("toggles the caption on mobile to hide", () => {
  const context = { onToggleCaption: jest.fn() }
  const caption = mount(
    <Caption section={Images[0]} total={10} index={2} open />,
    {
      childContextTypes: context,
      context,
    }
  )
  const node = caption.find(".fullscreen-viewer__caption-toggle").at(0)
  expect(node.text()).toBe("Hide")
  node.simulate("click")
  expect(context.onToggleCaption.mock.calls.length).toBeGreaterThan(0)
})

it("toggles the caption on mobile to view", () => {
  const context = { onToggleCaption: jest.fn() }
  const caption = mount(
    <Caption section={Images[0]} total={10} index={2} open={false} />,
    {
      childContextTypes: context,
      context,
    }
  )
  const node = caption.find(".fullscreen-viewer__caption-toggle").at(0)
  expect(node.text()).toBe("View Caption")
  node.simulate("click")
  expect(context.onToggleCaption.mock.calls.length).toBeGreaterThan(0)
})
