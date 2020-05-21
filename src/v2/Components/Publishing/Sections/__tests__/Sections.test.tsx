import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { DisplayAd } from "v2/Components/Publishing/Display/DisplayAd"
import {
  FeatureArticle,
  NonSponsoredFeatureArticle,
  SponsoredFeatureArticle,
  StandardArticle,
} from "v2/Components/Publishing/Fixtures/Articles"
import { WrapperWithFullscreenContext } from "v2/Components/Publishing/Fixtures/Helpers"
import {
  ImageCollection,
  ImageCollectionProps,
} from "v2/Components/Publishing/Sections/ImageCollection"
import { SectionData } from "v2/Components/Publishing/Typings"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, defer } from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import { SectionContainer } from "../SectionContainer"
import { Sections } from "../Sections"

jest.mock("isomorphic-fetch")

jest.mock("react-lines-ellipsis/lib/html", () => {
  // tslint:disable:no-shadowed-variable
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

jest.mock("Artsy/Analytics/useTracking")

declare const global: any
const renderSnapshot = props => {
  return renderer
    .create(WrapperWithFullscreenContext(<Sections {...props} />))
    .toJSON()
}

const mountWrapper = props => {
  return mount(WrapperWithFullscreenContext(<Sections {...props} />))
}

describe("Sections", () => {
  const trackEvent = jest.fn()

  let props

  beforeEach(() => {
    props = {
      article: StandardArticle,
      DisplayPanel: () => <div>hi!</div>,
      isMobile: true,
    }
      ; (useTracking as jest.Mock).mockImplementation(() => {
        return {
          trackEvent,
        }
      })
  })

  describe("snapshots tests", () => {
    it("renders properly", () => {
      props.isMobile = false
      const sections = renderSnapshot(props)
      expect(sections).toMatchSnapshot()
    })
  })

  describe("unit tests", () => {
    const originalConsoleError = console.error

    afterAll(() => {
      console.error = originalConsoleError
    })

    it("doesnt throw an error on invalid markup", () => {
      console.error = jest.fn()

      expect(() => {
        const article = cloneDeep(StandardArticle)
        article.sections = [
          {
            type: "text",
            body: "<p>busted",
          },
        ]
        props.article = article
        mountWrapper(props)
        expect(console.error).toHaveBeenCalled()
      }).not.toThrowError()
    })

    it("does not inject if feature", () => {
      const article = cloneDeep(StandardArticle)
      article.layout = "feature"
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
      props.article = article
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(false)
      expect(spy).not.toHaveBeenCalled()
    })

    it("does not inject if desktop", () => {
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")
      props.isMobile = false
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(false)
      expect(spy).not.toHaveBeenCalled()
    })

    it("if mobile, sets flag to inject display", () => {
      const element = document.createElement("div")
      element.id = "__mobile_display_inject__"
      document.getElementById = () => element
      const spy = jest.spyOn(Sections.prototype, "mountDisplayToMarker")

      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.state.shouldInjectMobileDisplay).toEqual(true)
      expect(spy).toHaveBeenCalled()
    })

    it("injects a display panel marker after the second paragraph", () => {
      const { injectDisplayPanelMarker } = Sections.prototype
      const scope = {
        displayInjectId: "__to_replace__",
        props: {
          article: { id: "234" },
        },
      }
      const body = injectDisplayPanelMarker.call(
        scope,
        ["<p>hello</p>", "<p>how are you</p>", "<p>how are you</p>"].join("")
      )

      expect(body).toContain("__mobile_display_inject__234")
    })

    it("#getContentStartIndex returns the index of first text section if feature", () => {
      props.article = FeatureArticle
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.getContentStartIndex()).toBe(0)
    })

    it("#getContentEndIndex returns the index of last text section", () => {
      props.article = FeatureArticle
      const wrapper = mountWrapper(props)
        .childAt(0)
        .instance() as any
      expect(wrapper.getContentEndIndex()).toBe(11)
    })

    it("injects display ads if feature", () => {
      props.article = FeatureArticle
      props.isMobile = false
      const wrapper = mountWrapper(props)
      expect(wrapper.find(DisplayAd).length).toBe(2)
    })

    it("injects one additional display ad if standard", () => {
      props.isMobile = false
      const wrapper = mountWrapper(props)

      expect(wrapper.find(DisplayAd).length).toBe(1)
    })

    it("does not inject display ads on features if hideAd props is passed", () => {
      props.article = FeatureArticle
      props.isMobile = false
      props.hideAds = true
      const wrapper = mountWrapper(props)
      expect(wrapper.find(DisplayAd).length).toBe(0)
    })

    it("injects display ads with correct targeting data if not sponsored feature", () => {
      props.article = NonSponsoredFeatureArticle
      props.isMobile = false
      props.isSponsored = false
      const wrapper = mountWrapper(props)

      expect(
        wrapper
          .find(DisplayAd)
          .first()
          .props().targetingData
      ).toEqual({
        is_testing: true,
        page_type: "feature",
        post_id: "594a7e2254c37f00177c0ea9",
        tags: "Creativity",
      })
    })

    it("injects display ads with correct targeting data if sponsored feature", () => {
      props.article = NonSponsoredFeatureArticle
      props.isMobile = false
      props.isSponsored = true
      const wrapper = mountWrapper(props)

      expect(
        wrapper
          .find(DisplayAd)
          .first()
          .props().targetingData
      ).toEqual({
        is_testing: true,
        page_type: "sponsorfeature",
        post_id: "594a7e2254c37f00177c0ea9",
        tags: "Creativity",
      })
    })

    it("injects display ads after correct sections if feature", () => {
      props.article = NonSponsoredFeatureArticle
      props.isMobile = false
      const wrapper = mountWrapper(props)

      const ads = wrapper.find(DisplayAd)
      expect(ads.length).toBe(2)

      let ad = ads.at(0).props()
      expect(ad.adUnit).toBe("Desktop_Leaderboard1")
      expect(ad.adDimension).toBe("970x250")

      ad = ads.at(1).props()
      expect(ad.adUnit).toBe("Desktop_Leaderboard2")
      expect(ad.adDimension).toBe("970x250")
    })

    it("injects display ads after correct sections if feature on mobile", () => {
      props.article = NonSponsoredFeatureArticle
      props.isMobile = true
      const wrapper = mountWrapper(props)

      const ads = wrapper.find(DisplayAd)
      expect(ads.length).toBe(2)

      let ad = ads.at(0).props()
      expect(ad.adUnit).toBe("Mobile_InContentLB1")
      expect(ad.adDimension).toBe("300x50")

      ad = ads.at(1).props()
      expect(ad.adUnit).toBe("Mobile_InContentLB2")
      expect(ad.adDimension).toBe("300x50")
    })

    it("injects display ads after correct sections if sponsored feature on mobile", () => {
      props.article = SponsoredFeatureArticle
      props.isMobile = true
      props.isSponsored = true
      const wrapper = mountWrapper(props)

      const ads = wrapper.find(DisplayAd)
      expect(ads.length).toBe(2)

      let ad = ads.at(0).props()
      expect(ad.adUnit).toBe("Mobile_InContentLB1")
      expect(ad.adDimension).toBe("300x250")

      ad = ads.at(1).props()
      expect(ad.adUnit).toBe("Mobile_InContentLB2")
      expect(ad.adDimension).toBe("300x250")
    })

    it("injects correctly sized display ads if standard article on mobile", () => {
      props.article = StandardArticle
      props.isMobile = true
      const wrapper = mountWrapper(props)

      const ads = wrapper.find(DisplayAd)
      expect(ads.length).toBe(1)

      const ad = ads.at(0).props()

      expect(ad.adUnit).toBe("Desktop_RightRail1")
      expect(ad.adDimension).toBe("300x250")
    })
  })

  describe("isTruncatedAt", () => {
    it("shows all sections by default", () => {
      const wrapper = mountWrapper(props)
      expect(wrapper.find(SectionContainer).length).toBe(19)
    })

    it("limits sections to isTruncatedAt index when passed", () => {
      props.isTruncatedAt = 3
      const wrapper = mountWrapper(props)
      expect(wrapper.find(SectionContainer).length).toBe(4)
    })
  })

  describe("Images targetHeight", () => {
    it("Returns default targetHeight and size", () => {
      props.article = FeatureArticle

      const wrapper = mountWrapper(props)
      const imageProps = wrapper
        .find(ImageCollection)
        .at(0)
        .props() as ImageCollectionProps
      expect(imageProps.targetHeight).toBe(500)
      expect(imageProps.size.width).toBe(680)
    })

    it("Returns default targetHeight if mobile and customWidth is passed", () => {
      props.article = FeatureArticle
      props.customWidth = 900

      const wrapper = mountWrapper(props)
      const imageProps = wrapper
        .find(ImageCollection)
        .at(0)
        .props() as ImageCollectionProps
      expect(imageProps.targetHeight).toBe(500)
      expect(imageProps.size.width).toBe(900)
    })

    it("Increases image targetHeight and size if a wide customWidth is passed", () => {
      props.article = FeatureArticle
      props.customWidth = 900
      props.isMobile = false

      const wrapper = mountWrapper(props)
      const imageProps = wrapper
        .find(ImageCollection)
        .at(0)
        .props() as ImageCollectionProps
      expect(imageProps.targetHeight).toBe(750)
      expect(imageProps.size.width).toBe(900)
    })
  })

  describe("SocialEmbed", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              html: "<blockquote>Instagram</blockquote>",
            }),
        })
      )
    })

    afterEach(() => {
      global.fetch.mockClear()
    })

    it("Renders social embed section", done => {
      const sections = [
        {
          type: "social_embed",
          url: "https://instagram.com/p/965246051107164160",
          layout: "column_width",
        },
      ] as SectionData[]
      props.article = StandardArticle
      props.isMobile = false
      props.article.sections = sections
      const component = mount(<Sections {...props} />)

      defer(() => {
        expect(component.html()).toContain("Instagram")
        done()
      }, 10)
    })
  })
})
