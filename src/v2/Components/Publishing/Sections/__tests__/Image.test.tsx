import { Images } from "v2/Components/Publishing/Fixtures/Components"
import {
  EditableChild,
  WrapperWithFullscreenContext,
} from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Image } from "../Image"
import { ViewFullscreen } from "../ViewFullscreen"

describe("Image", () => {
  const renderSnapshot = _props => {
    return renderer
      .create(WrapperWithFullscreenContext(<Image {..._props} />))
      .toJSON()
  }

  const mountWrapper = _props => {
    return mount(WrapperWithFullscreenContext(<Image {..._props} />))
  }
  let props

  describe("snapshots", () => {
    it("renders properly", () => {
      props = {
        image: Images[1],
      }
      const image = renderSnapshot(props)
      expect(image).toMatchSnapshot()
    })

    it("renders a long caption properly", () => {
      props = {
        image: Images[2],
      }
      const image = renderSnapshot(props)
      expect(image).toMatchSnapshot()
    })

    it("renders a react child as caption properly", () => {
      const image = renderer
        .create(
          WrapperWithFullscreenContext(
            <Image image={Images[2]}>{EditableChild("A React child.")}</Image>
          )
        )
        .toJSON()
      expect(image).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    beforeEach(() => {
      props = {}
    })

    it("renders a fullscreen button if linked", () => {
      props = {
        image: Images[2],
        linked: true,
      }
      const component = mountWrapper(props)
      expect(component.find(ViewFullscreen).length).toBe(1)
    })

    it("does not render a fullscreen button if not linked", () => {
      props = {
        image: Images[2],
        linked: false,
      }
      const component = mountWrapper(props)
      expect(component.find(ViewFullscreen).length).toBe(0)
    })

    it("renders editCaption if present", () => {
      props = {
        image: Images[2],
        editCaption: () => EditableChild("editCaption"),
      }
      const component = mountWrapper(props)
      expect(component.text()).toMatch("editCaption")
    })

    it("renders a child if present", () => {
      const component = mount(
        WrapperWithFullscreenContext(
          <Image image={Images[2]}>{EditableChild("A React child.")}</Image>
        )
      )
      expect(component.text()).toMatch("A React child.")
    })

    it("adds imagesLoaded class if props.editing", () => {
      props = {
        image: Images[2],
        editing: true,
      }
      const component = mountWrapper(props)
      expect(component.html()).toMatch("BlockImage__container image-loaded")
    })

    it("adds imagesLoaded class if props.editCaption", () => {
      props = {
        image: Images[2],
        editCaption: jest.fn(),
      }
      const component = mountWrapper(props)
      expect(component.html()).toMatch("BlockImage__container image-loaded")
    })

    it("does not add imagesLoaded class if props.editing is false", () => {
      props = {
        image: Images[2],
      }
      const component = mountWrapper(props)
      expect(component.html()).not.toMatch("BlockImage__container image-loaded")
    })
  })
})
