import { Box } from "@artsy/palette"
import { FC, useEffect, useRef } from "react"

interface RetrospectiveProgressBarProps {
  active: boolean
  duration: number
  onComplete: () => void
}

export const RetrospectiveProgressBar: FC<RetrospectiveProgressBarProps> = ({
  active,
  duration,
  onComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (!active) return

    const animation = ref.current.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      {
        duration,
        easing: "linear",
        fill: "forwards",
      }
    )

    animation.addEventListener("finish", onComplete)

    return () => {
      animation.removeEventListener("finish", onComplete)
    }
  }, [active, duration, onComplete])

  return (
    <Box height="2px" width="100%" bg="blue10">
      <Box
        ref={ref as any}
        width="100%"
        height="100%"
        bg="brand"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </Box>
  )
}
