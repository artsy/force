import { Box, Image } from "@artsy/palette"
import React from "react"
import { useLayoutEffect } from "react"
import { useState } from "react"
import { wait } from "./util"

interface ViewInRoomTransitionProps {
  children({ onMount }: { onMount(): void }): JSX.Element
}

export const ViewInRoomTransition: React.FC<ViewInRoomTransitionProps> = ({
  children,
}) => {
  const [transitionState, setTransitionState] = useState<{
    src?: string
    srcSet?: string
    from?: DOMRect
    to?: DOMRect
  }>({})

  const [transitionStage, setTransitionStage] = useState<
    "PENDING" | "TRANSITION" | "DONE"
  >("PENDING")

  const [isMounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const run = async () => {
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

    if (isMounted) run()
  }, [isMounted])

  return (
    <>
      {/* Crops children in order to improve performance */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        overflow="hidden"
        style={{
          opacity: transitionStage !== "PENDING" ? 1 : 0,
          transition: "opacity 500ms",
          transitionDelay: "100ms",
        }}
      >
        {children({ onMount: () => setMounted(true) })}
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
