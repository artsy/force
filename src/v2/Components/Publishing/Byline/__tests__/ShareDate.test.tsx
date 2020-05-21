import { StandardArticle } from "v2/Components/Publishing/Fixtures/Articles"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ShareDate } from "../ShareDate"

it("renders ShareDate properly", () => {
  const share = renderer
    .create(<ShareDate article={StandardArticle} />)
    .toJSON()
  expect(share).toMatchSnapshot()
})
