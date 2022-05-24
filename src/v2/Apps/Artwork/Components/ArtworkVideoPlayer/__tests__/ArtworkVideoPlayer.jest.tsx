import React from "react"
import { render } from "@testing-library/react"
import {
  ArtworkVideoPlayer,
  ArtworkVideoPlayerProps,
} from "../ArtworkVideoPlayer"

describe("ArtworkVideoPlayer", () => {
  const image = { type: "Image" }
  const video = { type: "Video", url: "test-url", height: 360, width: 640 }
  const defaultProps = figures =>
    ({
      activeIndex: 0,
      artwork: {
        figures,
      },
      maxHeight: 800,
    } as ArtworkVideoPlayerProps)

  it("renders with video figure", () => {
    const { container } = render(
      <ArtworkVideoPlayer {...defaultProps([image, video])} />
    )
    expect(container).toBeInTheDocument()
    expect(container.childNodes.length).toBe(1)
  })

  it("does not render without a video figure", () => {
    const { container } = render(<ArtworkVideoPlayer {...defaultProps([])} />)
    expect(container).toBeInTheDocument()
    expect(container.childNodes.length).toBe(0)
  })
})
