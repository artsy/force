import { parseVimeoMessage } from "Components/LoopingVimeoVideo/utils/vimeo"
import { type RefObject, useCallback, useEffect, useReducer } from "react"

const VIMEO_ORIGIN = "https://player.vimeo.com"
const EVENTS = ["play", "pause", "error"]

// A background video that has not played this long after the iframe mounted
// is treated as broken.
const START_TIMEOUT_MS = 8000

type PlayerStatus =
  | "Loading"
  | "AutoplayBlocked"
  | "Playing"
  | "Paused"
  | "Failed"

type PlayerAction =
  | { type: "Play" }
  | { type: "Pause" }
  | { type: "BlockAutoplay" }
  | { type: "Fail" }
  | { type: "TimeOut" }

const reducer = (status: PlayerStatus, action: PlayerAction): PlayerStatus => {
  // A broken player stays broken
  if (status === "Failed") {
    return status
  }

  switch (action.type) {
    case "Play":
      return "Playing"

    case "Pause":
      return status === "Playing" ? "Paused" : status

    case "BlockAutoplay":
      return status === "Loading" ? "AutoplayBlocked" : status

    case "Fail":
      return "Failed"

    // Only a player that is still loading can time out
    case "TimeOut":
      return status === "Loading" ? "Failed" : status
  }
}

/**
 * Drives a Vimeo iframe over its postMessage protocol, as Vimeo's player.js
 * does. `src` is a dependency so the listener follows the iframe when it is
 * recreated.
 */
export const useVimeoPlayer = ({
  iframeRef,
  src,
  shouldAutoplay,
}: {
  iframeRef: RefObject<HTMLIFrameElement>
  src: string | null
  shouldAutoplay: boolean
}) => {
  const [status, dispatch] = useReducer(reducer, "Loading")

  const post = useCallback(
    (message: { method: string; value?: string }) => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify(message),
        VIMEO_ORIGIN,
      )
    },
    [iframeRef],
  )

  useEffect(() => {
    if (!src) return

    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== VIMEO_ORIGIN ||
        event.source !== iframeRef.current?.contentWindow
      ) {
        return
      }

      const message = parseVimeoMessage(event.data)

      if (!message) {
        return
      }

      switch (message.event) {
        case "ready":
          EVENTS.forEach(value => {
            post({ method: "addEventListener", value })
          })
          break
        case "play":
          dispatch({ type: "Play" })
          break
        case "pause":
          dispatch({ type: "Pause" })
          break
        case "error":
          // Browsers refuse a play() without a user gesture; the button can
          // still start the video, so that is not a broken player.
          if (message.errorName === "NotAllowedError") {
            dispatch({ type: "BlockAutoplay" })
          } else {
            dispatch({ type: "Fail" })
          }
          break
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [src, iframeRef, post])

  useEffect(() => {
    if (!src || !shouldAutoplay) return

    // A blocked autoplay will never start on its own, but the button can
    // still start it, so only a player that is still loading times out.
    const timeout = setTimeout(() => {
      dispatch({ type: "TimeOut" })
    }, START_TIMEOUT_MS)

    return () => {
      clearTimeout(timeout)
    }
  }, [src, shouldAutoplay])

  const play = useCallback(() => post({ method: "play" }), [post])
  const pause = useCallback(() => post({ method: "pause" }), [post])

  return {
    isPlaying: status === "Playing",
    hasStarted: status === "Playing" || status === "Paused",
    hasFailed: status === "Failed",
    play,
    pause,
  }
}
