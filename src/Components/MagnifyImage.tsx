import { isTouch } from "Utils/device"
import { Image as BaseImage, Box, type ImageProps } from "@artsy/palette"
import { useRef, useState } from "react"
import styled from "styled-components"

interface MagnifyImageProps extends ImageProps {
  scale?: number
  scaleDuration?: number
}

const ENTER_TIMEOUT_DELAY = 300
const DEFAULT_SCALE = 1.75
const DEFAULT_SCALE_DURATION = 0.15

export const MagnifyImage: React.FC<
  React.PropsWithChildren<MagnifyImageProps>
> = ({
  scale = DEFAULT_SCALE,
  scaleDuration = DEFAULT_SCALE_DURATION,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [transformOrigin, setTransformOrigin] = useState("center center")

  const onMouseOver = () => {
    if (isTouch) {
      return
    }

    timeoutRef.current = setTimeout(() => {
      setZoomed(true)
    }, ENTER_TIMEOUT_DELAY)
  }

  const onMouseOut = () => {
    if (isTouch) {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setZoomed(false)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isTouch) {
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - containerRect.left
    const y = e.clientY - containerRect.top

    requestAnimationFrame(() => {
      setTransformOrigin(`${x}px ${y}px`)
    })
  }

  return (
    <Box
      position="relative"
      overflow="hidden"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      width="100%"
      height="100%"
      ref={containerRef}
    >
      <Image
        {...rest}
        title={undefined} // don't display a tooltip when hovering over the image
        style={{
          ...rest.style,
          transformOrigin,
          transform: zoomed ? `scale(${scale})` : `scale(1.0)`,
          transition: `transform ${scaleDuration}s ease, opacity 0.25s`,
        }}
      />
    </Box>
  )
}

const Image = styled(BaseImage)`
  display: block;
  width: 100%;
  height: 100%;
`
