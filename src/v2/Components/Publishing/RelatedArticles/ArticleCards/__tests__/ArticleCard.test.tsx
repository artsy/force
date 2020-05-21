import { Date } from "v2/Components/Publishing/Byline/Date"
import {
  SeriesArticle,
  StandardArticle,
  VideoArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { IconVideoPlay } from "v2/Components/Publishing/Icon/IconVideoPlay"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { ArticleCard, ArticleCardContainer } from "../ArticleCard"

describe("ArticleCard", () => {
  let videoArticle
  let props
  let editProps

  beforeEach(() => {
    videoArticle = cloneDeep(VideoArticle)

    props = {
      article: cloneDeep(StandardArticle),
      series: cloneDeep(SeriesArticle),
      tracking: {
        trackEvent: jest.fn(),
      } as any,
    }

    editProps = extend(cloneDeep(props), {
      editDate: EditableChild("date"),
      editDescription: EditableChild("description"),
      editImage: EditableChild("image"),
      editTitle: EditableChild("title"),
    })
  })

  const getWrapper = (passedProps = props) => {
    return mount(<ArticleCard {...passedProps} />)
  }

  it("renders an article properly", () => {
    const component = renderer.create(<ArticleCard {...props} />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders an article with unpublished media properly", () => {
    props.article = videoArticle
    const component = renderer.create(<ArticleCard {...props} />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("renders an article with children properly", () => {
    editProps.article = videoArticle
    const component = renderer.create(<ArticleCard {...editProps} />).toJSON()

    expect(component).toMatchSnapshot()
  })

  it("Renders media duration and play icon if article has media and is published", () => {
    props.article = videoArticle
    props.article.media.published = true
    const component = getWrapper()

    expect(component.find(IconVideoPlay).length).toBe(1)
    expect(component.text()).toMatch("02:28")
  })

  it("Renders coming soon and available date if article has media and is unpublished", () => {
    props.article = videoArticle
    props.article.media.published = false
    const component = getWrapper()

    expect(component.find(IconVideoPlay).length).toBe(0)
    expect(component.text()).not.toMatch("03:12")
    expect(component.text()).toMatch("Coming Soon")
    expect(component.text()).toMatch("Available")
  })

  it("Renders publish date if layout does not have media", () => {
    const component = getWrapper()

    expect(component.find(IconVideoPlay).length).toBe(0)
    expect(component.text()).not.toMatch("Coming Soon")
    expect(component.text()).toMatch("May 19, 2017")
  })

  it("Renders publish date if layout does not have media values", () => {
    const component = getWrapper()

    expect(component.find(IconVideoPlay).length).toBe(0)
    expect(component.text()).not.toMatch("Coming Soon")
    expect(component.text()).toMatch("May 19, 2017")
  })

  it("Does not render byline if article has media", () => {
    props.article = videoArticle
    const component = getWrapper()

    expect(component.find(".author").length).toBe(0)
  })

  it("Renders short media release_date if present and media is unpublished", () => {
    props.article = videoArticle
    props.article.media.published = false
    const component = getWrapper()

    expect(component.text()).toMatch("AvailableAug 2017")
  })

  it("Renders the media release_date if present and media is published", () => {
    props.article = videoArticle
    const component = getWrapper()
    const renderedDate = component
      .find(Date)
      .at(0)
      .text()

    expect(renderedDate).toBe("Aug 28, 2017")
  })

  it("Renders short article.published_at date if no release_date and media is present and unpublished", () => {
    props.article = videoArticle
    props.article.media.published = false
    delete props.article.media.release_date
    const component = getWrapper()

    expect(component.text()).toMatch("AvailableJul 2017")
  })

  it("Renders article.published_at date if no release_date and media is present and published", () => {
    props.article = videoArticle
    props.article.media.published = true
    delete props.article.media.release_date
    const component = getWrapper()
    const renderedDate = component
      .find(Date)
      .at(0)
      .text()

    expect(renderedDate).toBe("Jul 28, 2017")
  })

  it("Renders editable fields if present", () => {
    props = editProps
    props.article = videoArticle
    const component = getWrapper()

    expect(component.text()).toMatch("Child date")
    expect(component.text()).toMatch("Child description")
    expect(component.text()).toMatch("Child image")
    expect(component.text()).toMatch("Child title")
  })

  describe("Analytics", () => {
    it("tracks article card click", () => {
      const component = getWrapper()
      component
        .find(ArticleCardContainer)
        .first()
        .simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "Click",
        label: "Related article card",
      })
    })
  })
})
