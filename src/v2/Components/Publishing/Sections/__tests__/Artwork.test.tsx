// tslint:disable:no-shadowed-variable

import { Images } from "v2/Components/Publishing/Fixtures/Components"
import {
  EditableChild,
  WrapperWithFullscreenContext,
} from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Artwork } from "../Artwork"
import { ViewFullscreen } from "../ViewFullscreen"

jest.mock("react-lines-ellipsis/lib/html", () => {
  const React = require("react")
  return () => <div />
})

jest.mock("react-dom/server", () => ({
  renderToStaticMarkup: x => x,
}))

describe("Artwork", () => {
  const renderSnapshot = props => {
    return renderer
      .create(WrapperWithFullscreenContext(<Artwork {...props} />))
      .toJSON()
  }

  const mountWrapper = props => {
    return mount(WrapperWithFullscreenContext(<Artwork {...props} />))
  }

  let props
  beforeEach(() => {
    props = {}
  })

  describe("snapshots", () => {
    it("renders properly", () => {
      props = {
        artwork: Images[0],
      }
      const artwork = renderSnapshot(props)
      expect(artwork).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("renders a fullscreen button if linked", () => {
      props = {
        artwork: Images[0],
        linked: true,
      }
      const component = mountWrapper(props)
      expect(component.find(ViewFullscreen).length).toBe(1)
    })

    it("does not render a fullscreen button if not linked", () => {
      props = {
        artwork: Images[0],
        linked: false,
      }
      const component = mountWrapper(props)
      expect(component.find(ViewFullscreen).length).toBe(0)
    })

    it("renders a child if present", () => {
      const component = mount(
        WrapperWithFullscreenContext(
          <Artwork artwork={Images[0]}>
            {EditableChild("A React child.")}
          </Artwork>
        )
      )
      expect(component.text()).toMatch("A React child.")
    })

    it("adds imagesLoaded class if props.editing", () => {
      props = {
        artwork: Images[0],
        editing: true,
      }
      const component = mountWrapper(props)
      expect(component.html()).toMatch("BlockImage__container image-loaded")
    })

    it("does not add imagesLoaded class if props.editing is false", () => {
      props = {
        artwork: Images[0],
      }
      const component = mountWrapper(props)
      expect(component.html()).not.toMatch("BlockImage__container image-loaded")
    })
  })
})
