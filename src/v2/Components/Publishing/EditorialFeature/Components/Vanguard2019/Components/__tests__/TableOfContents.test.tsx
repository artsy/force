import { mount } from "enzyme"
import React from "react"

import { Emerging1 } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/Emerging"
import { GettingTheirDue1 } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/GettingTheirDue"
import { NewlyEstablished1 } from "v2/Components/Publishing/EditorialFeature/Components/Vanguard2019/Blobs/NewlyEstablished"
import { Vanguard2019Fixture } from "v2/Components/Publishing/EditorialFeature/Fixtures/Vanguard2019"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { SeriesContainer, VanguardTableOfContents } from "../TableOfContents"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("Vanguard2019", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<VanguardTableOfContents {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: Vanguard2019Fixture as ArticleData,
      onChangeSection: jest.fn(),
    }
  })

  describe("Rendering", () => {
    it("Renders expected content", () => {
      const component = getWrapper()
      expect(component.text()).toMatch("Table of Contents")
      expect(component.text()).toMatch("IEmerging")
      expect(component.text()).toMatch("IINewly Established")
      expect(component.text()).toMatch("IIIGetting Their Due")
    })

    it("Calls #onChangeSection when clicking links", () => {
      const component = getWrapper()
      component
        .find(SeriesContainer)
        .at(0)
        .simulate("click")
      expect(props.onChangeSection).toBeCalledWith("emerging")
    })

    it("Renders blob SVGs", () => {
      const component = getWrapper()
      expect(component.find("svg").length).toBe(3)
      expect(component.find(Emerging1).length).toBe(1)
      expect(component.find(GettingTheirDue1).length).toBe(1)
      expect(component.find(NewlyEstablished1).length).toBe(1)
    })
  })
})
