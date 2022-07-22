import { Box, Image } from "@artsy/palette"
import * as React from "react"
import { useLayoutEffect } from "react"
import { useState } from "react"
import { wait } from "Utils/wait"

const transitionDelayMs = 100
const transitionDurationMs = 500

enum TransitionStage {
  Pending,
  Transition,
  Done,
  Error,
}

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

  const [transitionStage, setTransitionStage] = useState<TransitionStage>(
    TransitionStage.Pending
  )
  const [isMounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const run = async () => {
      const imgFrom = document.getElementById(
        "transitionFrom--ViewInRoom"
      ) as HTMLImageElement | null

      const imgTo = document.getElementById(
        "transitionTo--ViewInRoom"
      ) as HTMLImageElement | null

      if (!imgFrom || !imgTo) {
        setTransitionStage(TransitionStage.Error)
        return
      }

      setTransitionState({
        src: imgFrom.src,
        srcSet: imgFrom.srcset,
        from: imgFrom.getBoundingClientRect(),
        to: imgTo.getBoundingClientRect(),
      })

      await wait(transitionDelayMs)
      setTransitionStage(TransitionStage.Transition)

      await wait(transitionDurationMs)
      setTransitionStage(TransitionStage.Done)
    }

    if (isMounted) run()
  }, [isMounted])

  if (transitionStage === TransitionStage.Error) {
    return null
  }

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
          opacity: transitionStage !== TransitionStage.Pending ? 1 : 0,
          transition: `opacity ${transitionDurationMs}ms`,
          transitionDelay: `${transitionDelayMs}ms`,
        }}
      >
        {children({ onMount: () => setMounted(true) })}
      </Box>

      {transitionStage !== TransitionStage.Done &&
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
              transition: `left ${transitionDurationMs}ms, top ${transitionDurationMs}ms, width ${transitionDurationMs}ms, height ${transitionDurationMs}ms, opacity ${
                transitionDurationMs * 2
              }s`,

              ...(transitionStage !== TransitionStage.Pending
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
