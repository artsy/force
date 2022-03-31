import { Image as BaseImage, ImageProps, Box } from "@artsy/palette"
import { useRef, useState } from "react"
import styled from "styled-components"

interface ArtworkImageProps extends ImageProps {
  shouldZoomOnHover?: boolean
}

type Position = number | null

interface Positions {
  x: Position
  y: Position
}

const defaultPositions: Positions = {
  x: null,
  y: null,
}
const ENTER_TIMEOUT_DELAY = 200
const SCALE = 1.75
const SCALE_DURATION = 0.15

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  shouldZoomOnHover,
  ...rest
}) => {
  if (shouldZoomOnHover) {
    return <ZoomScrollImage {...rest} />
  }

  return <Image {...rest} />
}

const ZoomScrollImage: React.FC<ImageProps> = props => {
  const [zoomed, setZoomed] = useState(false)
  const [positions, setPositions] = useState<Positions>(defaultPositions)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onMouseOver = () => {
    timeoutRef.current = setTimeout(() => {
      setZoomed(true)
    }, ENTER_TIMEOUT_DELAY)
  }

  const onMouseOut = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setZoomed(false)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) {
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - containerRect.left
    const y = e.clientY - containerRect.top

    setPositions({
      x,
      y,
    })
  }

  return (
    <Box
      position="relative"
      overflow="hidden"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      ref={containerRef as any}
    >
      <Image
        {...props}
        style={{
          ...props.style,
          transformOrigin: getTransformOrigin(positions),
          transition: `transform ${SCALE_DURATION}s ease-out`,
          transform: zoomed ? `scale(${SCALE})` : `scale(1.0)`,
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

const getTransformOrigin = (positions: Positions) => {
  if (positions.x === null && positions.y === null) {
    return "center center"
  }

  return `${positions.x}px ${positions.y}px`
}
