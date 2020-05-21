import {
  SeriesArticle,
  SeriesArticleCustomSubTitle,
  SeriesArticleSponsored,
} from "v2/Components/Publishing/Fixtures/Articles"
import { EditableChild } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SeriesAbout } from "../SeriesAbout"

describe("SeriesAbout", () => {
  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(<SeriesAbout article={SeriesArticle} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })

    it("Renders with sponsor", () => {
      const component = renderer
        .create(<SeriesAbout article={SeriesArticleSponsored} />)
        .toJSON()
      expect(component).toMatchSnapshot()
    })

    it("Renders with editDescription", () => {
      const component = renderer
        .create(
          <SeriesAbout
            article={SeriesArticle}
            editDescription={EditableChild("description")}
          />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })

    it("Renders with editSubTitle", () => {
      const component = renderer
        .create(
          <SeriesAbout
            article={SeriesArticle}
            editSubTitle={EditableChild("sub_title")}
          />
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Renders PartnerBlock for a sponsored series", () => {
      const component = mount(<SeriesAbout article={SeriesArticleSponsored} />)
      expect(component.find(".PartnerBlock").length).not.toBe(0)
    })

    it("Does not render PartnerBlock for an unsponsored series", () => {
      const component = mount(<SeriesAbout article={SeriesArticle} />)
      expect(component.find(".PartnerBlock").length).toBe(0)
    })

    it("Renders editDescription if present", () => {
      const component = mount(
        <SeriesAbout
          article={SeriesArticle}
          editDescription={EditableChild("description")}
        />
      )
      expect(component.text()).toMatch("Child description")
    })

    it("Renders editSubTitle if present", () => {
      const component = mount(
        <SeriesAbout
          article={SeriesArticle}
          editSubTitle={EditableChild("sub_title")}
        />
      )
      expect(component.text()).toMatch("Child sub_title")
    })

    it("Renders a custom series.sub_title if present", () => {
      const component = mount(
        <SeriesAbout article={SeriesArticleCustomSubTitle} />
      )
      expect(component.text()).toMatch("About this Feature")
    })

    it("Renders 'About the Series' by default", () => {
      const component = mount(<SeriesAbout article={SeriesArticle} />)
      expect(component.text()).toMatch("About the Series")
    })

    it("Tracks click on link in footer", () => {
      const component = mount(
        <SeriesAbout
          article={SeriesArticleSponsored}
          tracking={{ trackEvent: jest.fn() } as any}
        />
      )
      const spy = jest.spyOn(component.props().tracking, "trackEvent")
        ; (component.instance() as any).onClickFooterLink({
          currentTarget: { href: "artsy.net" },
        })

      expect(spy.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          action: "Click",
          destination_path: "artsy.net",
          flow: "Partner Footer CTA",
          type: "external_link",
        })
      )
    })
  })
})
