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

  const onMouseOver = () => {
    setZoomed(true)
  }

  const onMouseOut = () => {
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
          transition: "transform 0.2s ease-out",
          transform: zoomed ? `scale(1.5)` : `scale(1.0)`,
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
