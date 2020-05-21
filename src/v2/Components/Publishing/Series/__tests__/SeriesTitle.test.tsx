import {
  SeriesArticle,
  SeriesArticleSponsored,
} from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { PartnerBlock } from "v2/Components/Publishing/Partner/PartnerBlock"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesTitle } from "../SeriesTitle"

it("renders a series title properly", () => {
  const component = renderer
    .create(<SeriesTitle article={SeriesArticle} />)
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a sponsored series title properly", () => {
  const component = renderer
    .create(<SeriesTitle article={SeriesArticleSponsored} />)
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("renders a series with children properly", () => {
  const component = renderer
    .create(
      <SeriesTitle article={SeriesArticle} editTitle={EditableChild("title")} />
    )
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("Renders partner block for a sponsored series", () => {
  const component = mount(<SeriesTitle article={SeriesArticleSponsored} />)
  expect(component.find(PartnerBlock).length).toBe(1)
})

it("Does not render partner block for an unsponsored series", () => {
  const component = mount(<SeriesTitle article={SeriesArticle} />)
  expect(component.find(PartnerBlock).length).toBe(0)
})

it("Renders children if present", () => {
  const component = mount(
    <SeriesTitle article={SeriesArticle} editTitle={EditableChild("title")} />
  )
  expect(component.text()).toMatch("Child title")
})
