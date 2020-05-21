import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

import { ArticleProps } from "v2/Components/Publishing/Article"
import { Eoy2018Artists as Eoy2018ArtistsFixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Eoy2018Artists"
import { Eoy2018Culture as Eoy2018CultureFixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Eoy2018Culture"
import { FeatureArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { FeatureLayout } from "v2/Components/Publishing/Layouts/FeatureLayout"
import { TooltipsData } from "v2/Components/Publishing/ToolTip/TooltipsDataLoader"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { Eoy2018Artists } from "../Components/Eoy2018Artists"
import { Eoy2018Culture } from "../Components/Eoy2018Culture"
import { EditorialFeature } from "../EditorialFeature"

jest.mock("isomorphic-fetch")
declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("EditorialFeature", () => {
  let props: ArticleProps
  const getWrapper = (passedProps = props) => {
    return mount(
      <TooltipsData article={props.article} onOpenAuthModal={jest.fn()}>
        <EditorialFeature {...passedProps} />
      </TooltipsData>
    )
  }

  const getSnapshot = (passedProps = props) => {
    return renderer.create(
      <EditorialFeature {...passedProps} showTooltips={false} isTest />
    )
  }

  beforeEach(() => {
    props = {
      article: FeatureArticle,
    }
  })

  it("Renders template for feature layout by default", () => {
    props.customEditorial = "COOL_ARTICLE"
    const component = getWrapper(props)
    expect(component.find(FeatureLayout)).toBeTruthy()
  })

  describe("EOY_2018_ARTISTS", () => {
    beforeEach(() => {
      props = {
        article: Eoy2018ArtistsFixture as ArticleData,
        customEditorial: "EOY_2018_ARTISTS",
      }
    })

    it("Renders template for EOY_2018_ARTISTS article", () => {
      const component = getWrapper()
      expect(component.find(Eoy2018Artists)).toBeTruthy()
    })

    it("Matches snapshot", () => {
      const component = getSnapshot()
      expect(component).toMatchSnapshot()
    })
  })

  describe("EOY_2018_CULTURE", () => {
    beforeEach(() => {
      props = {
        article: Eoy2018CultureFixture as ArticleData,
        customEditorial: "EOY_2018_CULTURE",
      }
    })

    it("Renders template for EOY_2018_CULTURE article", () => {
      const component = getWrapper()
      expect(component.find(Eoy2018Culture)).toBeTruthy()
    })

    it("Matches snapshot", () => {
      const component = getSnapshot()
      expect(component).toMatchSnapshot()
    })
  })
})
