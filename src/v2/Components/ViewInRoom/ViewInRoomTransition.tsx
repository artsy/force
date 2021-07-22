import { Box, Image } from "@artsy/palette"
import React from "react"
import { useLayoutEffect } from "react"
import { useState } from "react"
import { wait } from "./util"

export const ViewInRoomTransition: React.FC = ({ children }) => {
  const [transitionState, setTransitionState] = useState<{
    src?: string
    srcSet?: string
    from?: DOMRect
    to?: DOMRect
  }>({})

  const [transitionStage, setTransitionStage] = useState<
    "PENDING" | "TRANSITION" | "DONE"
  >("PENDING")

  useLayoutEffect(() => {
    const run = async () => {
      // TODO: Implement with a mount callback
      await wait(25) // Wait for children to render

      const imgFrom = document.getElementById(
        "transitionFrom--ViewInRoom"
      ) as HTMLImageElement

      const imgTo = document.getElementById(
        "transitionTo--ViewInRoom"
      ) as HTMLImageElement

      setTransitionState({
        src: imgFrom.src,
        srcSet: imgFrom.srcset,
        from: imgFrom.getBoundingClientRect(),
        to: imgTo.getBoundingClientRect(),
      })

      await wait(100)
      setTransitionStage("TRANSITION")

      await wait(500)
      setTransitionStage("DONE")
    }

    run()
  }, [])

  return (
    <>
      <Box
        style={{
          opacity: transitionStage !== "PENDING" ? 1 : 0,
          transition: "opacity 500ms",
          transitionDelay: "100ms",
        }}
      >
        {children}
      </Box>

      {transitionStage !== "DONE" &&
        transitionState.from &&
        transitionState.to && (
          <Image
            src={transitionState.src}
            srcSet={transitionState.srcSet}
            width={transitionState.from.width}
            height={transitionState.from.height}
            style={{
              position: "absolute",
              top: transitionState.from.y,
              left: transitionState.from.x,
              transform: "translateZ(0)",
              transition:
                "left 500ms, top 500ms, width 500ms, height 500ms, opacity 1s",

              ...(transitionStage !== "PENDING"
                ? {
                    width: transitionState.to.width,
                    height: transitionState.to.height,
                    top: transitionState.to.y,
                    left: transitionState.to.x,
                  }
                : {}),
            }}
            alt=""
          />
        )}
    </>
  )
}
