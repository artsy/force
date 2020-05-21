import { mount } from "enzyme"
import React from "react"

import { FullScreenProvider } from "../FullScreenProvider"

describe("FullScreenProvider", () => {
  it("injects props via the render props pattern", done => {
    mount(
      <FullScreenProvider>
        {props => {
          expect(Object.keys(props).sort()).toEqual([
            "closeViewer",
            "onViewFullscreen",
            "openViewer",
            "slideIndex",
            "viewerIsOpen",
          ])
          done()
          return <div />
        }}
      </FullScreenProvider>
    )
  })

  it("renders children", done => {
    const Child = () => {
      done()
      return <div />
    }

    const tree = mount(
      <FullScreenProvider>
        <Child />
      </FullScreenProvider>
    )
    expect(tree.find(Child).length).toEqual(1)
  })

  it("toggles open and closed state", () => {
    const wrapper = mount(
      <FullScreenProvider>
        {props => {
          return <div />
        }}
      </FullScreenProvider>
    )

    const instance = wrapper.instance() as any

    expect(wrapper.state()).toEqual({
      slideIndex: 0,
      viewerIsOpen: false,
    })

    instance.openViewer(1)

    expect(wrapper.state()).toEqual({
      slideIndex: 1,
      viewerIsOpen: true,
    })

    instance.closeViewer()

    expect(wrapper.state()).toEqual({
      slideIndex: 0,
      viewerIsOpen: false,
    })
  })
})
