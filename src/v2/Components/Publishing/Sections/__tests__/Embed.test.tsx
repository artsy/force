import { Embeds } from "v2/Components/Publishing/Fixtures/Components"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Embed } from "../Embed"

it("renders properly", () => {
  const embed = renderer.create(<Embed section={Embeds[0]} />).toJSON()
  expect(embed).toMatchSnapshot()
})
