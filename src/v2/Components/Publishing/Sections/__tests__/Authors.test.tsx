import { Authors } from "v2/Components/Publishing/Fixtures/Components"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Authors as AuthorInfo } from "../Authors"

it("renders properly", () => {
  const authors = renderer.create(<AuthorInfo authors={Authors} />).toJSON()
  expect(authors).toMatchSnapshot()
})
