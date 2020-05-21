import { VerticalOrSeriesTitle } from "v2/Components/Publishing/Sections/VerticalOrSeriesTitle"
import { mount } from "enzyme"
import "jest-styled-components"
import { clone } from "lodash"
import React from "react"
import renderer from "react-test-renderer"

import {
  FeatureArticle,
  SeriesArticleSponsored,
  StandardArticle,
} from "v2/Components/Publishing/Fixtures/Articles"

it("renders properly for a feature article", () => {
  const component = renderer
    .create(<VerticalOrSeriesTitle article={FeatureArticle} />)
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("renders properly for a standard article", () => {
  const component = renderer
    .create(<VerticalOrSeriesTitle article={FeatureArticle} />)
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("renders the article vertical", () => {
  const component = mount(<VerticalOrSeriesTitle article={FeatureArticle} />)
  expect(component.text()).toMatch(FeatureArticle.vertical.name)
})

it("renders a series if feature and fullscreen", () => {
  const FeatureSeriesArticle = clone({
    ...FeatureArticle,
    seriesArticle: SeriesArticleSponsored,
  })
  const component = mount(
    <VerticalOrSeriesTitle article={FeatureSeriesArticle} />
  )
  expect(component.text()).toMatch(SeriesArticleSponsored.title)
})

it("renders with props vertical", () => {
  const component = mount(
    <VerticalOrSeriesTitle
      article={StandardArticle}
      vertical="Missing Vertical"
    />
  )
  expect(component.text()).toMatch("Missing Vertical")
})

it("renders with props prefix", () => {
  const component = mount(
    <VerticalOrSeriesTitle article={StandardArticle} prefix="More in " />
  )
  expect(component.text()).toMatch("More in Art Market")
})
