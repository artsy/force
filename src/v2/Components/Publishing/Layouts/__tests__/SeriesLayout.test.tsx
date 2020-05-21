import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { DisplayAd } from "v2/Components/Publishing/Display/DisplayAd"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesLayout } from "../SeriesLayout"

jest.mock("Artsy/Analytics/useTracking")

describe("series layout", () => {
  const trackEvent = jest.fn()
  const renderComponent = () => {
    return renderer.create(<SeriesLayout {...props} />)
  }
  const mountComponent = () => {
    return mount(<SeriesLayout {...props} />)
  }
  let props

  beforeEach(() => {
    props = {
      article: SeriesArticle,
      relatedArticles: [VideoArticle, StandardArticle],
      isSeries: true,
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  it("renders a series", () => {
    const seriesLayout = renderComponent().toJSON()

    expect(seriesLayout).toMatchSnapshot()
  })

  it("renders a sponsored series", () => {
    props.article = SeriesArticleSponsored

    const sponsoredSeries = renderComponent().toJSON()

    expect(sponsoredSeries).toMatchSnapshot()
  })

  it("renders a display ad when series", () => {
    const component = mountComponent()

    expect(component.find(DisplayAd).length).toBe(1)
  })
})
