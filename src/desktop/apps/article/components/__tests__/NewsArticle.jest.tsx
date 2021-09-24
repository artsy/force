import React from "react"
import { mount, shallow } from "enzyme"
import { NewsArticle } from "../NewsArticle"
import { NewsArticle as NewsArticleFixture } from "@artsy/reaction/dist/Components/Publishing/Fixtures/Articles"
import { SystemContextProvider } from "@artsy/reaction/dist/Artsy"

describe("InfiniteScrollArticle", () => {
  let props

  const getWrapper = (passedProps = props) => {
    return mount(
      <SystemContextProvider user={null}>
        <NewsArticle {...passedProps} />
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    props = {
      article: NewsArticleFixture,
      isMobile: false,
      isTruncated: true,
      isFirstArticle: true,
      nextArticle: {
        id: "1234",
        published_at: "5678",
      },
      onDateChange: jest.fn(),
      onActiveArticleChange: jest.fn(),
    }

    window.history.replaceState = jest.fn()
  })

  it("renders the article", () => {
    const component = getWrapper()
    expect(component.html()).toMatch("NewsLayout")
  })

  it("#onExpand pushes article url to browser and updates articles state", () => {
    const component = getWrapper()
    const instance = component.find(NewsArticle).instance() as NewsArticle
    instance.onExpand()

    expect(instance.state.isTruncated).toBeFalsy()
    expect(window.history.replaceState).toBeCalledWith(
      {},
      "594a7e2254c37f00177c0ea9",
      "/news/news-article"
    )
  })

  describe("#setMetadata", () => {
    it("sets default news metadata", () => {
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.setMetadata()
      expect(window.history.replaceState).toBeCalledWith({}, "news", "/news")
    })

    it("#sets article metadata", () => {
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.setMetadata({
        slug: "some-slug",
        thumbnail_title: "Some title",
        id: "123",
      })
      expect(window.history.replaceState).toBeCalledWith(
        {},
        "123",
        "/news/some-slug"
      )
    })
  })

  describe("#onEnter", () => {
    it("does not push url to browser if it is not scrolling into an article", () => {
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.onEnter({
        currentPosition: "outside",
        previousPosition: "above",
      })
      expect(window.history.replaceState).not.toBeCalled()
    })

    it("calls onDateChange if waypoint is triggered inside", () => {
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.onEnter({
        currentPosition: "inside",
        previousPosition: "above",
      })
      expect(props.onDateChange).toBeCalledWith(props.article.published_at)
    })

    it("pushes /news to browser if it is scrolling into a truncated article", () => {
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.onEnter({
        currentPosition: "inside",
        previousPosition: "above",
      })
      expect(window.history.replaceState).toBeCalledWith({}, "news", "/news")
    })

    it("pushes the article if it is scrolling into a non-truncated article", () => {
      props.isTruncated = false
      const instance = shallow(
        <NewsArticle {...props} />
      ).instance() as NewsArticle
      instance.onEnter({
        currentPosition: "inside",
        previousPosition: "above",
      })

      expect(window.history.replaceState).toBeCalledWith(
        {},
        "594a7e2254c37f00177c0ea9",
        "/news/news-article"
      )
    })

    it("calls #onActiveArticleChange if it is mobile", () => {
      props.isMobile = true
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.onEnter({
        currentPosition: "inside",
        previousPosition: "above",
      })
      expect(props.onActiveArticleChange).toBeCalled()
    })
  })

  describe("#onLeave", () => {
    it("changes the date if there is a next article on leave", () => {
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.onLeave({
        currentPosition: "above",
        previousPosition: "inside",
      })
      expect(props.onDateChange).toBeCalledWith("5678")
    })

    it("calls #onActiveArticleChange if it is mobile", () => {
      props.isMobile = true
      const instance = getWrapper().find(NewsArticle).instance() as NewsArticle
      instance.onLeave({
        currentPosition: "above",
        previousPosition: "inside",
      })
      expect(props.onActiveArticleChange).toBeCalledWith("1234")
    })
  })
})
