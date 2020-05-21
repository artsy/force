import { Images } from "v2/Components/Publishing/Fixtures/Components"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ImageSetPreviewClassic } from "../ImageSetPreviewClassic"

it("renders properly", () => {
  const imageset = renderer
    .create(<ImageSetPreviewClassic images={Images} />)
    .toJSON()
  expect(imageset).toMatchSnapshot()
})
