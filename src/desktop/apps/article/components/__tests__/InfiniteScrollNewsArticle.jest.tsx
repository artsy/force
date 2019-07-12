import React from "react"
import { shallow } from "enzyme"
import { InfiniteScrollNewsArticle } from "../InfiniteScrollNewsArticle"
import { NewsArticle } from "reaction/Components/Publishing/Fixtures/Articles"
import { extend, times } from "lodash"
import { data as sd } from "sharify"
import moment from "moment"
const fixtures = require("desktop/test/helpers/fixtures.coffee")

jest.mock("../FollowButton", () => ({
  setupFollows: jest.fn(),
  setupFollowButtons: jest.fn(),
}))
const mockSetupFollows = require("../FollowButton").setupFollows as jest.Mock

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))
const mockPositronql = require("desktop/lib/positronql").positronql as jest.Mock

jest.mock("desktop/components/cookies/index.coffee", () => ({
  get: jest.fn(),
}))
const mockCookies = require("desktop/components/cookies/index.coffee")
  .get as jest.Mock

jest.mock("desktop/lib/mediator.coffee", () => ({
  trigger: jest.fn(),
}))
const mockMediator = require("desktop/lib/mediator.coffee").trigger as jest.Mock

jest.useFakeTimers()

describe("InfiniteScrollNewsArticle", () => {
  let props
  let nextArticle

  const getWrapper = (passedProps = props) => {
    return shallow(<InfiniteScrollNewsArticle {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: NewsArticle,
      articles: [NewsArticle],
      isMobile: false,
    }

    nextArticle = {
      layout: "news",
      id: "456",
      slug: "next-news-article",
      published_at: "2017-05-19T13:09:18.567Z",
    }

    sd.CURRENT_USER = { id: "123" }
  })

  it("sets up follow buttons", () => {
    getWrapper()
    expect(mockSetupFollows).toBeCalled()
  })

  it("#hasNewDate returns true if article date is different from previous article", () => {
    props.articles.push(nextArticle)
    const instance = getWrapper().instance() as InfiniteScrollNewsArticle
    const hasNewDate = instance.hasNewDate(nextArticle, 1)
    expect(hasNewDate).toBeTruthy()
  })

  it("fetches more articles at the end of the page", async () => {
    const data = {
      articles: [
        extend({}, fixtures.article, {
          slug: "foobar",
          layout: "news",
          channel_id: "123",
          id: "678",
        }),
      ],
    }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    const instance = component.instance() as InfiniteScrollNewsArticle
    await instance.fetchNextArticles()
    component.update()

    expect(mockPositronql).toBeCalled()
    expect(component.find("#article-root").children().length).toBe(5)
  })

  it("injects read more after the sixth article", async () => {
    const data = {
      articles: times(6, () => {
        return extend({}, fixtures.article, {
          slug: "foobar",
          layout: "news",
          channel_id: "123",
          id: "678",
        })
      }),
      relatedArticlesCanvas: times(4, () => {
        return extend({}, fixtures.article, {
          slug: "related-article",
          channel_id: "123",
          id: "456",
        })
      }),
    }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    const instance = component.instance() as InfiniteScrollNewsArticle
    await instance.fetchNextArticles()
    component.update()

    expect(component.html()).toMatch("More from Artsy Editorial")
  })

  it("#onActiveArticleChange sets the activeArticle", () => {
    const component = getWrapper()
    const instance = component.instance() as InfiniteScrollNewsArticle
    instance.onActiveArticleChange("1234")

    expect(component.state().activeArticle).toBe("1234")
  })

  describe("Auth Modal", () => {
    it("does not call showAuthModal when the user is signed in", () => {
      mockCookies.mockReturnValue(null)
      const component = getWrapper()
      const instance = component.instance() as InfiniteScrollNewsArticle
      instance.showAuthModal = jest.fn()
      instance.componentDidMount()

      expect(instance.showAuthModal).not.toBeCalled()
    })

    it("does not call showAuthModal if the user has dismissed the modal", () => {
      mockCookies.mockReturnValue(1)
      const component = getWrapper()
      const instance = component.instance() as InfiniteScrollNewsArticle
      instance.showAuthModal = jest.fn()
      instance.componentDidMount()

      expect(instance.showAuthModal).not.toBeCalled()
    })

    it("calls showAuthModal when the user is not signed in and has not dismissed", () => {
      mockCookies.mockReturnValue(null)
      sd.CURRENT_USER = null
      const component = getWrapper()
      const instance = component.instance() as InfiniteScrollNewsArticle
      instance.showAuthModal = jest.fn()
      instance.componentDidMount()

      expect(instance.showAuthModal).toBeCalled()
    })
  })

  it("triggers mediator with correct args", () => {
    mockPositronql.mockReturnValue(Promise.resolve({ articles: [] }))
    mockCookies.mockReturnValue(null)
    const component = getWrapper()
    component.update()
    window.dispatchEvent(new Event("scroll"))
    jest.runAllTimers()
    const registerOptions = {
      mode: "signup",
      intent: "Viewed editorial",
      signupIntent: "signup",
      trigger: "timed",
      triggerSeconds: 2,
      copy: "Sign up for the Best Stories in Art and Visual Culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
    }

    expect(mockMediator).toBeCalledWith("open:auth", registerOptions)
  })

  describe("/news - news index", () => {
    beforeEach(() => {
      delete props.article
    })

    it("renders list", () => {
      const component = getWrapper()
      expect(component.find("#article-root").children().length).toBe(3)
      expect(component.html()).toMatch("NewsLayout")
    })

    it("sets up state without props.article", () => {
      const component = getWrapper()
      expect(component.state().offset).toBe(6)
      expect(component.state().date).toBe(props.articles[0].published_at)
    })
  })

  describe("#getDateField", () => {
    it("Returns published_at if present", () => {
      const instance = getWrapper().instance() as InfiniteScrollNewsArticle
      const getDateField = instance.getDateField(props.article)
      expect(getDateField).toBe(props.article.published_at)
    })

    it("Returns scheduled_publish_at if no published_at", () => {
      const published_at = props.article.published_at
      props.article.scheduled_publish_at = published_at
      delete props.article.published_at
      const instance = getWrapper().instance() as InfiniteScrollNewsArticle
      const getDateField = instance.getDateField(props.article)

      expect(getDateField).toBe(published_at)
    })

    it("Returns today for articles with no date field", () => {
      const today = moment()
        .toISOString()
        .substring(0, 10)
      delete props.article.published_at
      delete props.article.scheduled_publish_at
      const instance = getWrapper().instance() as InfiniteScrollNewsArticle
      const getDateField = instance.getDateField(props.article).substring(0, 10)

      expect(getDateField).toBe(today)
    })
  })

  describe("#onDateChange", () => {
    it("it sets date if it has a new one", () => {
      const component = getWrapper()
      const instance = component.instance() as InfiniteScrollNewsArticle
      instance.onDateChange("2018-07-20T17:19:55.909Z")
      expect(component.state().date).toBe("2018-07-20T17:19:55.909Z")
    })

    it("it doesn't set date if it hasn't changed", () => {
      const component = getWrapper()
      const instance = component.instance() as InfiniteScrollNewsArticle
      instance.setState = jest.fn()
      instance.onDateChange(component.state().date)
      expect(instance.setState).not.toBeCalled()
    })
  })
})
