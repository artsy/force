import { mount } from "enzyme"
import React from "react"
import { FullScreenProvider } from "../FullScreenProvider"
import { withFullScreen } from "../withFullScreen"

describe("withFullScreen", () => {
  it("injects fullscreen provider props", done => {
    const Child = withFullScreen(props => {
      expect(Object.keys(props).sort()).toEqual([
        "closeViewer",
        "onViewFullscreen",
        "openViewer",
        "slideIndex",
        "viewerIsOpen",
      ])
      done()
      return <div />
    })

    mount(
      <FullScreenProvider>
        <Child />
      </FullScreenProvider>
    )
  })
})
