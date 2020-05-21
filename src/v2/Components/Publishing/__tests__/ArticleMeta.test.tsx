import { StandardArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import React from "react"
import { ArticleMeta } from "../ArticleMeta"

jest.mock("sharify", () => ({
  data: {
    FACEBOOK_ID: "facebook_id",
  },
}))

describe("ArticleMeta", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<ArticleMeta {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: { ...StandardArticle },
    }
  })

  it("renders title tag", () => {
    const component = getWrapper()
    expect(component.find("title").text()).toBe(
      "New York's Next Art District - Artsy"
    )
  })

  it("renders canonical url", () => {
    const component = getWrapper()
    expect(component.find("[rel='canonical']").props().href).toContain(
      "/article/new-yorks-next-art-district"
    )
  })

  it("renders description", () => {
    const component = getWrapper()
    expect(component.find("[name='description']").props().content).toBe(
      "Land exhibitions, make influential contacts, and gain valuable feedback about your work."
    )
  })

  it("renders amp url if valid layout", () => {
    props.article.featured = true
    props.article.published = true
    const component = getWrapper()
    expect(component.find("[rel='amphtml']").props().href).toContain(
      "/article/new-yorks-next-art-district"
    )
  })

  it("does not render amp url for invalid layout", () => {
    props.article.featured = true
    props.article.published = true
    props.article.layout = "video"
    const component = getWrapper()
    expect(component.find("[rel='amphtml']").length).toBeFalsy()
  })

  describe("Facebook/opengraph", () => {
    it("renders og:title", () => {
      const component = getWrapper()
      expect(component.find("[property='og:title']").props().content).toBe(
        "New York's Next Art District"
      )
    })

    it("renders og:url", () => {
      const component = getWrapper()
      expect(component.find("[property='og:url']").props().content).toContain(
        "/article/new-yorks-next-art-district"
      )
    })

    it("renders og:published_time", () => {
      const component = getWrapper()
      expect(
        component.find("[property='og:published_time']").props().content
      ).toBe("2017-05-19T13:09:18.567Z")
    })

    it("renders og:description", () => {
      const component = getWrapper()
      expect(
        component.find("[property='og:description']").props().content
      ).toBe(
        "Land exhibitions, make influential contacts, and gain valuable feedback about your work."
      )
    })

    it("renders og:image", () => {
      const component = getWrapper()
      expect(component.find("[property='og:image']").props().content).toBe(
        "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg"
      )
    })

    it("renders fb:app_id", () => {
      const component = getWrapper()
      expect(component.find("[property='fb:app_id']").props().content).toBe(
        "facebook_id"
      )
    })

    it("renders article:published_time", () => {
      const component = getWrapper()
      expect(
        component.find("[property='article:published_time']").props().content
      ).toBe("2017-05-19T13:09:18.567Z")
    })
  })

  describe("Twitter", () => {
    it("renders twitter:url", () => {
      const component = getWrapper()
      expect(
        component.find("[property='twitter:url']").props().content
      ).toContain("/article/new-yorks-next-art-district")
    })

    it("renders twitter:description", () => {
      const component = getWrapper()
      expect(
        component.find("[property='twitter:description']").props().content
      ).toBe(
        "Land exhibitions, make influential contacts, and gain valuable feedback about your work."
      )
    })

    it("renders twitter:image", () => {
      const component = getWrapper()
      expect(component.find("[property='twitter:image']").props().content).toBe(
        "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg"
      )
    })

    it("renders twitter:title", () => {
      const component = getWrapper()
      expect(component.find("[name='twitter:title']").props().content).toBe(
        "New York's Next Art District"
      )
    })
  })

  describe("Sailthru", () => {
    beforeEach(() => {
      props.article.published = true
      props.article.email_metadata = {
        headline: "Email headline",
        author: "Email author",
        image_url: "email_image.jpg",
      }
    })

    it("renders sailthru.date", () => {
      const component = getWrapper()
      expect(component.find("[name='sailthru.date']").props().content).toBe(
        "2017-05-19T13:09:18.567Z"
      )
    })

    it("renders sailthru.title", () => {
      const component = getWrapper()
      expect(component.find("[name='sailthru.title']").props().content).toBe(
        "Email headline"
      )
    })

    it("renders sailthru.author", () => {
      const component = getWrapper()
      expect(component.find("[name='sailthru.author']").props().content).toBe(
        "Email author"
      )
    })

    it("renders sailthru.image.full", () => {
      const component = getWrapper()
      expect(
        component.find("[name='sailthru.image.full']").props().content
      ).toContain(
        "?resize_to=fill&src=email_image.jpg&width=1200&height=800&quality=80"
      )
    })

    it("renders sailthru.image.thumb", () => {
      const component = getWrapper()
      expect(
        component.find("[name='sailthru.image.thumb']").props().content
      ).toContain(
        "?resize_to=fill&src=email_image.jpg&width=600&height=400&quality=80"
      )
    })

    it("renders sailthru.tags", () => {
      props.article.featured = true
      props.article.keywords = ["art", "community"]
      const component = getWrapper()
      expect(component.find("[name='sailthru.tags']").props().content).toBe(
        "article, art, community, magazine"
      )
    })
  })

  describe("Keywords", () => {
    beforeEach(() => {
      props.article.keywords = ["art", "community"]
    })

    it("renders news_keywords", () => {
      const component = getWrapper()
      expect(component.find("[property='news_keywords']").props().content).toBe(
        "art, community"
      )
    })

    it("renders keywords", () => {
      const component = getWrapper()
      expect(component.find("[name='keywords']").props().content).toBe(
        "art, community"
      )
    })

    it("renders article:tag", () => {
      const component = getWrapper()
      expect(component.find("[property='article:tag']").props().content).toBe(
        "art, community"
      )
    })

    it("does not render keyword meta tags if no keywords", () => {
      props.article.keywords = []
      const component = getWrapper()
      expect(component.find("[name='keywords']")).toHaveLength(0)
      expect(component.find("[property='news_keywords']")).toHaveLength(0)
      expect(component.find("[property='article:tag']")).toHaveLength(0)
    })
  })

  it("renders a single author", () => {
    const component = getWrapper()
    expect(component.find("[name='author']").props().content).toBe(
      "Casey Lesser"
    )
  })

  it("renders a multiple author", () => {
    props.article.authors.push({
      id: "523783258b3b815f7100055b",
      name: "Alex Forbes",
    })
    const component = getWrapper()
    expect(
      component
        .find("[name='author']")
        .at(0)
        .props().content
    ).toBe("Casey Lesser")
    expect(
      component
        .find("[name='author']")
        .at(1)
        .props().content
    ).toBe("Alex Forbes")
  })

  it("renders contributing_authors if no authors present", () => {
    delete props.article.authors
    const component = getWrapper()
    expect(
      component
        .find("[name='author']")
        .at(0)
        .props().content
    ).toBe("Casey Lesser")
  })

  it("renders noindex if not indexable", () => {
    const component = getWrapper()
    expect(component.find("[name='robots']").props().content).toBe("noindex")
  })

  it("renders responsive styles", () => {
    const component = getWrapper()
    expect(component.find("style").text().length).toBeTruthy()
  })
})
