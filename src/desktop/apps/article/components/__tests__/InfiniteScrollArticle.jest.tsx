import React from "react"
import { mount } from "enzyme"
import { SystemContextProvider } from "@artsy/reaction/dist/Artsy"
import { InfiniteScrollArticle } from "../InfiniteScrollArticle"
import {
  StandardArticle,
  ShortStandardArticle,
} from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import { Article } from "@artsy/reaction/dist/Components/Publishing/Article"
import { clone } from "lodash"
import { ArticleData } from "@artsy/reaction/dist/Components/Publishing/Typings"

jest.mock("../FollowButton", () => ({
  setupFollows: jest.fn(),
  setupFollowButtons: jest.fn(),
}))
const mockSetupFollows = require("../FollowButton").setupFollows as jest.Mock

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))
const mockPositronql = require("desktop/lib/positronql").positronql as jest.Mock

describe("InfiniteScrollArticle", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(
      <SystemContextProvider user={null}>
        <InfiniteScrollArticle {...passedProps} showTooltips={false} />
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    props = {
      article: StandardArticle,
      articles: [StandardArticle],
    }
  })

  it("sets up follow buttons", () => {
    getWrapper()
    expect(mockSetupFollows).toBeCalled()
  })

  it("renders the initial article", () => {
    const component = getWrapper()
    expect(component.find(Article).length).toBe(1)
    expect(component.html()).toMatch("StandardLayout")
  })

  it("fetches more articles at the end of the page", () => {
    const data = { articles: [StandardArticle, ShortStandardArticle] }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    const instance = component
      .find(InfiniteScrollArticle)
      .instance() as InfiniteScrollArticle

    return instance.fetchNextArticles().then(() => {
      component.update()
      expect(component.find(Article).length).toBe(3)
    })
  })

  it("renders Related Articles", () => {
    props.article = clone({
      ...StandardArticle,
      relatedArticlesCanvas: [StandardArticle],
      relatedArticlesPanel: [StandardArticle],
    } as ArticleData)
    const component = getWrapper()

    expect(component.html()).toMatch("Related Stories")
    expect(component.html()).toMatch("Further reading")
    expect(component.html()).toMatch("RelatedArticlesPanel")
    expect(component.html()).toMatch("RelatedArticlesCanvas")
  })

  describe("#onEnter", () => {
    beforeEach(() => {
      window.history.replaceState = jest.fn() as jest.Mock
    })
    it("#onEnter does not push url to browser if scrolling down into an article", () => {
      const component = getWrapper()
      const instance = component
        .find(InfiniteScrollArticle)
        .instance() as InfiniteScrollArticle
      instance.onEnter(props.article, {
        previousPosition: "below",
        currentPosition: "inside",
      })

      expect(window.history.replaceState).not.toBeCalled()
    })

    it("#onEnter pushes url to browser if scrolling up into an article", () => {
      const component = getWrapper()
      const instance = component
        .find(InfiniteScrollArticle)
        .instance() as InfiniteScrollArticle
      instance.onEnter(props.article, {
        previousPosition: "above",
        currentPosition: "inside",
      })

      expect(window.history.replaceState).toBeCalledWith(
        {},
        "594a7e2254c37f00177c0ea9",
        "/article/new-yorks-next-art-district"
      )
    })
  })

  describe("#onLeave", () => {
    beforeEach(() => {
      window.history.replaceState = jest.fn() as jest.Mock
    })

    it("#onLeave does not push url to browser if scrolling up into previous article", () => {
      const component = getWrapper()
      const instance = component
        .find(InfiniteScrollArticle)
        .instance() as InfiniteScrollArticle
      instance.onLeave(1, {
        previousPosition: "inside",
        currentPosition: "below",
      })

      expect(window.history.replaceState).not.toBeCalled()
    })

    it("#onLeave pushes next article url to browser if scrolling down into next article", () => {
      const component = getWrapper()
      const instance = component
        .find(InfiniteScrollArticle)
        .instance() as InfiniteScrollArticle
      instance.setState({ articles: [ShortStandardArticle, StandardArticle] })
      instance.onLeave(0, {
        previousPosition: "inside",
        currentPosition: "above",
      })

      expect(window.history.replaceState).toBeCalledWith(
        {},
        "594a7e2254c37f00177c0ea9",
        "/article/new-yorks-next-art-district"
      )
    })
  })
})
