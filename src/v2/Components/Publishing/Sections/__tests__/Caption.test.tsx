import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Caption } from "../Caption"

it("renders a saved caption properly", () => {
  const embed = renderer
    .create(<Caption caption="<p>This is a saved caption</p>" />)
    .toJSON()
  expect(embed).toMatchSnapshot()
})

it("renders a child even if a caption is provided", () => {
  const embed = renderer
    .create(
      <Caption caption="<p>This is a saved caption</p>">
        <div>Here is a passed child</div>
      </Caption>
    )
    .toJSON()
  expect(embed).toMatchSnapshot()
})
