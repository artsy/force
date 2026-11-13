import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { LoopingVimeoVideo } from "Components/LoopingVimeoVideo/LoopingVimeoVideo"

const VIMEO_ORIGIN = "https://player.vimeo.com"

const PLAYER_URL = "https://player.vimeo.com/video/123456?h=abc"

const mockReducedMotion = (matches: boolean) => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })
}

const getIframe = (element: HTMLElement) => {
  if (!(element instanceof HTMLIFrameElement)) {
    throw new Error("Expected an iframe")
  }

  return element
}

const sendFromVimeo = ({
  frame,
  event,
  data,
}: {
  frame: HTMLElement
  event: string
  data?: object
}) => {
  act(() => {
    window.dispatchEvent(
      new MessageEvent("message", {
        data: JSON.stringify({ event, data }),
        origin: VIMEO_ORIGIN,
        source: getIframe(frame).contentWindow,
      }),
    )
  })
}

const spyOnPostMessage = (frame: HTMLElement) => {
  const { contentWindow } = getIframe(frame)

  if (!contentWindow) {
    throw new Error("Expected the iframe to have a window")
  }

  return jest.spyOn(contentWindow, "postMessage")
}

const sentMessages = (spy: jest.SpyInstance) => {
  return spy.mock.calls.map(([message]) => JSON.parse(message))
}

const renderVideo = (
  props: Partial<React.ComponentProps<typeof LoopingVimeoVideo>> = {},
) => {
  return render(
    <LoopingVimeoVideo
      playerUrl={PLAYER_URL}
      aspectRatio={16 / 9}
      title="Header video"
      {...props}
    />,
  )
}

describe("LoopingVimeoVideo", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  describe("without reduced motion", () => {
    beforeEach(() => mockReducedMotion(false))

    it("embeds a silent, looping, autoplaying background player", async () => {
      renderVideo()

      const frame = await screen.findByTitle("Header video")
      const url = new URL(getIframe(frame).src)

      expect(url.pathname).toBe("/video/123456")
      expect(url.searchParams.get("h")).toBe("abc")
      expect(url.searchParams.get("background")).toBe("1")
      expect(url.searchParams.get("muted")).toBe("1")
      expect(url.searchParams.get("loop")).toBe("1")
      expect(url.searchParams.get("autoplay")).toBe("1")
    })

    it("subscribes to play, pause and error once the player is ready", async () => {
      renderVideo()

      const frame = await screen.findByTitle("Header video")
      const postMessage = spyOnPostMessage(frame)

      sendFromVimeo({ frame, event: "ready" })

      expect(sentMessages(postMessage)).toEqual([
        { method: "addEventListener", value: "play" },
        { method: "addEventListener", value: "pause" },
        { method: "addEventListener", value: "error" },
      ])
      expect(postMessage).toHaveBeenCalledWith(expect.any(String), VIMEO_ORIGIN)
    })

    it("pauses and plays from the button and reports both", async () => {
      const onPlay = jest.fn()
      const onPause = jest.fn()
      renderVideo({ onPlay, onPause })

      const frame = await screen.findByTitle("Header video")
      const postMessage = spyOnPostMessage(frame)

      sendFromVimeo({ frame, event: "play" })
      fireEvent.click(screen.getByRole("button", { name: "Pause video" }))

      expect(sentMessages(postMessage)).toEqual([{ method: "pause" }])
      expect(onPause).toHaveBeenCalledTimes(1)

      sendFromVimeo({ frame, event: "pause" })
      fireEvent.click(screen.getByRole("button", { name: "Play video" }))

      expect(sentMessages(postMessage)).toEqual([
        { method: "pause" },
        { method: "play" },
      ])
      expect(onPlay).toHaveBeenCalledTimes(1)

      sendFromVimeo({ frame, event: "play" })

      expect(
        screen.getByRole("button", { name: "Pause video" }),
      ).toBeInTheDocument()
    })

    it("does not report autoplay", async () => {
      const onPlay = jest.fn()
      renderVideo({ onPlay })

      const frame = await screen.findByTitle("Header video")

      sendFromVimeo({ frame, event: "play" })

      expect(onPlay).not.toHaveBeenCalled()
    })

    it("ignores messages from other origins", async () => {
      renderVideo()

      const frame = getIframe(await screen.findByTitle("Header video"))

      act(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: JSON.stringify({ event: "play" }),
            origin: "https://example.com",
            source: frame.contentWindow,
          }),
        )
      })

      expect(
        screen.getByRole("button", { name: "Play video" }),
      ).toBeInTheDocument()
    })

    it("ignores messages from another window with Vimeo's origin", async () => {
      renderVideo()

      await screen.findByTitle("Header video")

      act(() => {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: JSON.stringify({ event: "play" }),
            origin: VIMEO_ORIGIN,
            source: window,
          }),
        )
      })

      expect(
        screen.getByRole("button", { name: "Play video" }),
      ).toBeInTheDocument()
    })

    describe("when the player breaks", () => {
      afterEach(() => {
        jest.useRealTimers()
      })

      it("reports an error from the player and drops the button", async () => {
        const onError = jest.fn()
        renderVideo({ onError })

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({
          frame,
          event: "error",
          data: { name: "DRMError" },
        })

        expect(onError).toHaveBeenCalledTimes(1)
        expect(
          screen.queryByRole("button", { name: /video/ }),
        ).not.toBeInTheDocument()
      })

      it("keeps the play button when the browser refuses autoplay", async () => {
        jest.useFakeTimers()
        const onError = jest.fn()
        renderVideo({ onError })

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({
          frame,
          event: "error",
          data: { name: "NotAllowedError" },
        })
        act(() => {
          jest.advanceTimersByTime(8000)
        })

        expect(onError).not.toHaveBeenCalled()
        expect(
          screen.getByRole("button", { name: "Play video" }),
        ).toBeInTheDocument()
      })

      it("plays from the button after the browser refused autoplay", async () => {
        renderVideo()

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({
          frame,
          event: "error",
          data: { name: "NotAllowedError" },
        })
        sendFromVimeo({ frame, event: "play" })

        expect(
          screen.getByRole("button", { name: "Pause video" }),
        ).toBeInTheDocument()
      })

      it("drops the button when a playing video errors", async () => {
        const onError = jest.fn()
        renderVideo({ onError })

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({ frame, event: "play" })
        sendFromVimeo({ frame, event: "error", data: { name: "DRMError" } })

        expect(onError).toHaveBeenCalledTimes(1)
        expect(
          screen.queryByRole("button", { name: /video/ }),
        ).not.toBeInTheDocument()
      })

      it("keeps the button gone when a failed player plays later", async () => {
        renderVideo()

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({ frame, event: "error", data: { name: "DRMError" } })
        sendFromVimeo({ frame, event: "play" })

        expect(
          screen.queryByRole("button", { name: /video/ }),
        ).not.toBeInTheDocument()
      })

      it("keeps the pause button when a playing video gets a refusal", async () => {
        renderVideo()

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({ frame, event: "play" })
        sendFromVimeo({
          frame,
          event: "error",
          data: { name: "NotAllowedError" },
        })

        expect(
          screen.getByRole("button", { name: "Pause video" }),
        ).toBeInTheDocument()
      })

      it("still reports an error when a pause arrives before the video plays", async () => {
        jest.useFakeTimers()
        const onError = jest.fn()
        renderVideo({ onError })

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({ frame, event: "pause" })
        act(() => {
          jest.advanceTimersByTime(8000)
        })

        expect(onError).toHaveBeenCalledTimes(1)
      })

      it("reports an error when autoplay never starts", async () => {
        jest.useFakeTimers()
        const onError = jest.fn()
        renderVideo({ onError })

        await screen.findByTitle("Header video")
        act(() => {
          jest.advanceTimersByTime(8000)
        })

        expect(onError).toHaveBeenCalledTimes(1)
      })

      it("does not report an error once the video plays", async () => {
        jest.useFakeTimers()
        const onError = jest.fn()
        renderVideo({ onError })

        const frame = await screen.findByTitle("Header video")
        sendFromVimeo({ frame, event: "play" })
        act(() => {
          jest.advanceTimersByTime(8000)
        })

        expect(onError).not.toHaveBeenCalled()
      })
    })
  })

  describe("with reduced motion", () => {
    beforeEach(() => mockReducedMotion(true))

    afterEach(() => {
      jest.useRealTimers()
    })

    it("does not report an error when the paused video never starts", async () => {
      jest.useFakeTimers()
      const onError = jest.fn()
      renderVideo({ posterUrl: "https://example.com/poster.jpg", onError })

      await screen.findByTitle("Header video")
      act(() => {
        jest.advanceTimersByTime(8000)
      })

      expect(onError).not.toHaveBeenCalled()
      expect(
        screen.getByRole("button", { name: "Play video" }),
      ).toBeInTheDocument()
    })

    it("does not autoplay and shows the poster until play", async () => {
      const onPlay = jest.fn()
      const { container } = renderVideo({
        posterUrl: "https://example.com/poster.jpg",
        onPlay,
      })

      const frame = await screen.findByTitle("Header video")

      expect(new URL(getIframe(frame).src).searchParams.get("autoplay")).toBe(
        "0",
      )
      expect(container.querySelector("img")).toHaveAttribute(
        "src",
        "https://example.com/poster.jpg",
      )
      expect(
        screen.getByRole("button", { name: "Play video" }),
      ).toBeInTheDocument()

      const postMessage = spyOnPostMessage(frame)

      fireEvent.click(screen.getByRole("button", { name: "Play video" }))

      expect(sentMessages(postMessage)).toEqual([{ method: "play" }])
      expect(onPlay).toHaveBeenCalledTimes(1)

      sendFromVimeo({ frame, event: "play" })

      expect(container.querySelector("img")).not.toBeInTheDocument()

      sendFromVimeo({ frame, event: "pause" })

      expect(container.querySelector("img")).not.toBeInTheDocument()
    })

    it("falls back to the Vimeo thumbnail without a poster", async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ thumbnail_url: "https://i.vimeocdn.com/t.jpg" }),
      })

      const { container } = renderVideo()

      await waitFor(() => {
        expect(container.querySelector("img")).toHaveAttribute(
          "src",
          "https://i.vimeocdn.com/t.jpg",
        )
      })
      expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain(
        encodeURIComponent("https://vimeo.com/123456/abc"),
      )
    })

    it("prefers the poster prop to the Vimeo thumbnail", async () => {
      renderVideo({ posterUrl: "https://example.com/poster.jpg" })

      await screen.findByTitle("Header video")

      expect(global.fetch).not.toHaveBeenCalled()
    })
  })
})
