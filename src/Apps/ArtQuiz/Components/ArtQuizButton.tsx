import {
  Clickable,
  ClickableProps,
  CloseIcon,
  HeartFillIcon,
  HeartIcon,
} from "@artsy/palette"
import React, { FC, useRef } from "react"
import { useMode } from "Utils/Hooks/useMode"

type Mode = "Pending" | "Animating" | "Done"

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

interface ArtQuizButtonProps extends ClickableProps {
  variant: "Like" | "Dislike"
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ArtQuizButton: FC<ArtQuizButtonProps> = ({
  variant,
  children,
  onClick,
  ...rest
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")

  const nodeRef = useRef<HTMLButtonElement | null>(null)
  const animationRef = useRef<Animation | null>(null)

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Click executes immediately
    onClick(event)

    if (!nodeRef.current) return

    // Prevent animation pile ups
    if (animationRef.current) {
      animationRef.current.cancel()
    }

    setMode("Animating")

    // Animation plays on
    animationRef.current = nodeRef.current.animate(
      KEYFRAMES,
      KEYFRAME_ANIMATION_OPTIONS
    )

    await animationRef.current.finished

    setMode("Pending")
  }

  return (
    <Clickable
      ref={nodeRef as any}
      py={4}
      px={6}
      onClick={handleClick}
      aria-label={variant}
      {...rest}
    >
      {variant === "Dislike" && <CloseIcon width={40} height={40} title="" />}

      {variant === "Like" && mode === "Animating" && (
        <HeartFillIcon width={40} height={40} title="" />
      )}

      {variant === "Like" && mode !== "Animating" && (
        <HeartIcon width={40} height={40} title="" />
      )}
    </Clickable>
  )
}
