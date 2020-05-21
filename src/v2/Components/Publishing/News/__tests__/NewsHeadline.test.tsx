import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

import { NewsArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { NewsHeadline } from "../NewsHeadline"

it("renders a news headline properly", () => {
  const component = renderer
    .create(<NewsHeadline article={NewsArticle} />)
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a headline with children properly", () => {
  const component = renderer
    .create(
      <NewsHeadline article={NewsHeadline} editTitle={EditableChild("title")} />
    )
    .toJSON()
  expect(component).toMatchSnapshot()
})
