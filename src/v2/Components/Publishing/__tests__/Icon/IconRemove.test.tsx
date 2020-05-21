import React from "react"
import renderer from "react-test-renderer"
import { IconRemove } from "../../Icon/IconRemove"

it("renders properly", () => {
  const icon = renderer.create(<IconRemove />).toJSON()
  expect(icon).toMatchSnapshot()
})

it("renders with fill props", () => {
  const icon = renderer.create(<IconRemove background="red" />).toJSON()
  expect(icon).toMatchSnapshot()
})
