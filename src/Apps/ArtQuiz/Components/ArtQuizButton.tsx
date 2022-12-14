import { Clickable, ClickableProps } from "@artsy/palette"
import React, { FC, useRef } from "react"
import { useMode } from "Utils/Hooks/useMode"
import { wait } from "Utils/wait"

type Mode = "Pending" | "Animating" | "Done"

interface ArtQuizButtonProps extends ClickableProps {
  children: JSX.Element | ((props: { mode: Mode }) => JSX.Element)
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ANIMATION_DURATION = 250

const KEYFRAMES: Keyframe[] = [
  { transform: "scale(1)" },
  { transform: "scale(1.5)" },
  { transform: "scale(1)" },
]

const KEYFRAME_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: ANIMATION_DURATION,
  easing: "ease-out",
  iterations: 1,
}

export const ArtQuizButton: FC<ArtQuizButtonProps> = ({
  children,
  onClick,
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")

  const nodeRef = useRef<HTMLButtonElement | null>(null)
  const animationRef = useRef<Animation | null>(null)

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!nodeRef.current) return

    // Prevent animation pile ups
    if (animationRef.current) {
      animationRef.current.cancel()
    }

    setMode("Animating")

    // Click executes immediately
    onClick(event)

    // Animation plays on
    animationRef.current = nodeRef.current.animate(
      KEYFRAMES,
      KEYFRAME_ANIMATION_OPTIONS
    )

    await animationRef.current.finished

    setMode("Done")

    await wait(ANIMATION_DURATION)

    setMode("Pending")
  }

  return (
    <Clickable ref={nodeRef as any} py={4} px={6} onClick={handleClick}>
      {typeof children === "function" ? children({ mode }) : children}
    </Clickable>
  )
}
