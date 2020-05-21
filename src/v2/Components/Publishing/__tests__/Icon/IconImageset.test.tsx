import React from "react"
import renderer from "react-test-renderer"
import { IconImageSet } from "../../Icon/IconImageSet"

it("renders properly", () => {
  const icon = renderer.create(<IconImageSet />).toJSON()
  expect(icon).toMatchSnapshot()
})
