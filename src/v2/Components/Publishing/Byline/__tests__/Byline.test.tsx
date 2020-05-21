import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { StandardArticle } from "../../Fixtures/Articles"
import { Byline } from "../Byline"

describe("Byline", () => {
  it("renders a byline", () => {
    const byline = renderer.create(
      <Byline article={StandardArticle} layout={"split"} />
    )
    expect(byline).toMatchSnapshot()
  })
})
