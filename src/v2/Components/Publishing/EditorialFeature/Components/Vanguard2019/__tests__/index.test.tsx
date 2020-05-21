import { EditorialFeaturesProps } from "v2/Components/Publishing/EditorialFeature/EditorialFeature"
import { Vanguard2019Fixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import { Nav } from "v2/Components/Publishing/Nav/Nav"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { mount } from "enzyme"
import React from "react"
import renderer from "react-test-renderer"
import { VanguardArtistWrapper } from "../Components/ArtistWrapper"
import { VanguardIntroduction } from "../Components/Introduction"
import { VanguardSeriesWrapper } from "../Components/SeriesWrapper"
import {
  SeriesContainer as TocSeriesContainer,
  VanguardTableOfContents,
} from "../Components/TableOfContents"
import { Vanguard2019 } from "../index"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("Vanguard2019", () => {
  let props: EditorialFeaturesProps
  const getWrapper = (passedProps = props) => {
    return mount(<Vanguard2019 {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: Vanguard2019Fixture as ArticleData,
      isTest: true,
    }
  })

  describe("Snapshots", () => {
    it("renders article series snapshot properly", () => {
      const snapshot = renderer.create(<Vanguard2019 {...props} />).toJSON()
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Rendering", () => {
    it("Renders nav", () => {
      const component = getWrapper()
      expect(component.find(Nav).length).toBe(1)
    })

    it("Renders Introduction", () => {
      const component = getWrapper()
      expect(component.find(VanguardIntroduction).length).toBe(1)
    })

    it("Renders TableOfContents", () => {
      const component = getWrapper()
      expect(component.find(VanguardTableOfContents).length).toBe(1)
    })

    it("Renders series articles", () => {
      const component = getWrapper()
      expect(component.find(VanguardSeriesWrapper).length).toBe(3)
    })

    it("Renders artist articles", () => {
      const component = getWrapper()
      expect(component.find(VanguardArtistWrapper).length).toBe(50)
    })
  })

  it("#componentDidMount sets valid slugs and adds scroll listener", () => {
    window.addEventListener = jest.fn()
    const instance = getWrapper().instance() as Vanguard2019
    instance.getValidPaths = jest.fn()
    instance.onChangeSection = jest.fn()
    instance.componentDidMount()

    expect(instance.getValidPaths).toBeCalled()
    expect(window.addEventListener).toBeCalled()
    // FIXME: unable to get equality on bound listener value
  })

  it("#componentWillUnmount removes scroll listener", () => {
    window.removeEventListener = jest.fn()
    const instance = getWrapper().instance() as Vanguard2019
    instance.componentWillUnmount()

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "load",
      instance.handleScrollOnLoad
    )
  })

  describe("#handleScrollOnLoad", () => {
    it("Changes sections and replaces location if valid slug", () => {
      window.history.pushState({}, "", "/series/artsy-vanguard-2019/emerging")
      window.history.replaceState = jest.fn()
      const instance = getWrapper().instance() as Vanguard2019
      instance.onChangeSection = jest.fn()
      instance.handleScrollOnLoad()

      expect(instance.onChangeSection).toBeCalledWith("emerging")
      expect(window.history.replaceState).toBeCalledWith(
        {},
        "",
        "/series/artsy-vanguard-2019"
      )
    })

    it("Removes invalid slug if present", () => {
      window.history.pushState({}, "", "/series/artsy-vanguard-2019/foo")
      window.history.replaceState = jest.fn()
      const instance = getWrapper().instance() as Vanguard2019
      instance.onChangeSection = jest.fn()
      instance.handleScrollOnLoad()

      expect(instance.onChangeSection).not.toBeCalled()
      expect(window.history.replaceState).toBeCalledWith(
        {},
        "",
        "/series/artsy-vanguard-2019"
      )
    })
  })

  it("#getValidPaths creates an array of valid slugs", () => {
    const instance = getWrapper().instance() as Vanguard2019
    expect(instance.validSlugs).toEqual([
      "emerging",
      "victoria-sin",
      "monira-al-qadiri",
      "diedrick-brackens",
      "dineo-seshee-bopape",
      "martine-gutierrez",
      "genesis-belanger",
      "tao-hui",
      "jordan-nassar",
      "geng-xue",
      "meriem-bennani",
      "manuel-solano",
      "lauren-halsey",
      "derek-fordjour",
      "alia-farid",
      "gala-porras-kim",
      "jonathan-lyndon-chase",
      "elle-perez",
      "suki-seokyeong-kang",
      "evelyn-taocheng-wang",
      "jill-mulleady",
      "newly-established",
      "michael-armitage",
      "ebony-g-patterson",
      "lawrence-abu-hamdan",
      "korakrit-arunanondchai",
      "barbara-wagner-benjamin-de-burca",
      "charlotte-prodger",
      "jeffrey-gibson",
      "hao-liang",
      "jacolby-satterwhite",
      "melike-kara",
      "cui-jie",
      "firelei-baez",
      "forensic-architecture",
      "tschabalala-self",
      "harold-ancart",
      "getting-their-due",
      "frank-bowling",
      "zilia-sanchez",
      "fred-eversley",
      "tishan-hsu",
      "howardena-pindell",
      "diane-simpson",
      "lorraine-o-grady",
      "teresa-burga",
      "siah-armajani",
      "mcarthur-binion",
      "beatriz-gonzalez",
      "simone-fattal",
      "vivian-suter",
      "henry-taylor",
      "anna-maria-maiolino",
    ])
  })

  it("#onChangeSection scrolls to section", () => {
    const scrollIntoView = jest.fn()
    const getElementById = jest.fn().mockReturnValue({
      scrollIntoView,
    })
    document.getElementById = getElementById
    const component = getWrapper()
    component
      .find(TocSeriesContainer)
      .at(0)
      .simulate("click")
    expect(getElementById).toBeCalledWith("emerging")
    expect(scrollIntoView).toBeCalled()
  })
})
