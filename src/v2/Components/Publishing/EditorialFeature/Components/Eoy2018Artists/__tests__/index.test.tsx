import { mount } from "enzyme"
import React from "react"

import { ArticleProps } from "v2/Components/Publishing/Article"
import { Byline } from "v2/Components/Publishing/Byline/Byline"
import { Eoy2018Artists as Eoy2018ArtistsFixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Eoy2018Artists"
import { Nav } from "v2/Components/Publishing/Nav/Nav"
import { ArticleCards } from "v2/Components/Publishing/RelatedArticles/ArticleCards/ArticleCards"
import { ImageSetPreview } from "v2/Components/Publishing/Sections/ImageSetPreview"
import { Text } from "v2/Components/Publishing/Sections/Text"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { Eoy2018ArticleHeader } from "../ArticleHeader"
import { ArtistHeaderSection, Eoy2018Artists } from "../index"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("EditorialFeature", () => {
  let props: ArticleProps
  const getWrapper = (passedProps = props) => {
    return mount(<Eoy2018Artists {...passedProps} showTooltips={false} />)
  }

  beforeEach(() => {
    props = {
      article: Eoy2018ArtistsFixture as ArticleData,
      customEditorial: "EOY_2018_ARTISTS",
    }
  })

  describe("Rendering", () => {
    it("Renders nav", () => {
      const component = getWrapper()
      expect(component.find(Nav).length).toBe(1)
    })

    it("Renders page header", () => {
      const component = getWrapper()
      expect(component.find(Eoy2018ArticleHeader).length).toBe(1)
    })

    it("Renders artist header sections", () => {
      const component = getWrapper()
      const firstSection = component
        .find(ArtistHeaderSection)
        .at(0)
        .html()

      expect(component.find(ArtistHeaderSection).length).toBe(20)
      expect(firstSection).toMatch(
        "<h1>Kerry James Marshall</h1><h2>B. 1955, Birmingham, Alabama</h2><h2>Lives and works in Chicago</h2>"
      )
      expect(firstSection).toMatch("Kerry_crop.jpg")
    })

    it("Renders intro and byline", () => {
      const component = getWrapper()
      expect(
        component
          .find(Byline)
          .at(0)
          .text()
      ).toMatch("Artsy Editors")
      expect(
        component
          .find(Text)
          .at(0)
          .text()
      ).toMatch("Whether they were experimenting with floating sculptures")
    })

    it("Renders sections", () => {
      const component = getWrapper()
      expect(component.find(Text).length).toBe(42)
      expect(component.find(ImageSetPreview).length).toBe(20)
    })

    it("Renders related articles", () => {
      const component = getWrapper()
      expect(component.find(ArticleCards).length).toBe(1)
      expect(component.find(ArticleCards).text()).toBe(
        "The People Who Defined Visual Culture in 2018From Donald Glover and Hiro Murai to teamLab, Artsy’s editors select the people who had the biggest impact in changing the visual landscape this year.Artsy EditorsDec 19, 2018"
      )
    })
  })

  it("#getHeaderSections returns an array of header sections", () => {
    const component = getWrapper().instance() as Eoy2018Artists
    const headers = component.getHeaderSections()
    const firstSection = headers[0]

    expect(headers).toHaveLength(20)
    expect(firstSection.section.body).toMatch("<h1>Kerry James Marshall</h1>")
    expect(firstSection.imageSection.images[0].url).toMatch("Kerry_crop.jpg")
  })

  it("#sectionIsHeader knows if a section is a header", () => {
    const component = getWrapper().instance() as Eoy2018Artists

    expect(component.sectionIsHeader(props.article.sections[0])).toBeFalsy()
    expect(component.sectionIsHeader(props.article.sections[1])).toBeTruthy()
  })
})
