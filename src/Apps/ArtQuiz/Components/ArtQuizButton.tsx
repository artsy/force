import { Clickable, ClickableProps } from "@artsy/palette"
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react"
import { useMode } from "Utils/Hooks/useMode"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import CloseIcon from "@artsy/icons/CloseIcon"

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

export type ArtQuizButtonRef = { triggerAnimation(): void }

export const ArtQuizButton = forwardRef(
  (
    { variant, children, onClick, ...rest }: ArtQuizButtonProps,
    forwardedRef: Ref<ArtQuizButtonRef>
  ) => {
    const [mode, setMode] = useMode<Mode>("Pending")

    const nodeRef = useRef<HTMLButtonElement | null>(null)
    const animationRef = useRef<Animation | null>(null)

    const triggerAnimation = useCallback(async () => {
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
    }, [setMode])

    useImperativeHandle(
      forwardedRef,
      () => {
        return { triggerAnimation }
      },
      [triggerAnimation]
    )

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      // Click executes immediately
      onClick(event)

      triggerAnimation()
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
          <HeartStrokeIcon width={40} height={40} title="" />
        )}
      </Clickable>
    )
  }
)
