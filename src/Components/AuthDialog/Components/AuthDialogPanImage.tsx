import { Box, Image, useResizeObserver } from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { resized } from "Utils/resized"
import type {
  AuthDialogPanImageQuery,
  AuthDialogPanImageQuery$data,
} from "__generated__/AuthDialogPanImageQuery.graphql"
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Blurhash } from "react-blurhash"
import { graphql } from "react-relay"
import styled, { keyframes } from "styled-components"

type AuthDialogPanImageProps = {
  url?: string | null
  aspectRatio?: number | null
  blurhash?: string | null
}

const AuthDialogPanImage: FC<AuthDialogPanImageProps> = ({
  url,
  aspectRatio,
  blurhash,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true)

  if (!url || !aspectRatio) {
    return null
  }

  return (
    <Box
      display={["none", "block"]}
      width="100%"
      height="100%"
      position="relative"
      overflow="hidden"
    >
      {isImageLoading &&
        (blurhash ? (
          <Blurhash
            hash={blurhash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
            aria-hidden="true"
          />
        ) : (
          <Box bg="mono10" width="100%" height="100%" />
        ))}

      <MovingImageMeasured
        src={url}
        aspectRatio={aspectRatio}
        display={isImageLoading ? "none" : "block"}
        onLoad={() => {
          setIsImageLoading(false)
        }}
        onError={() => setIsImageLoading(false)}
      />
    </Box>
  )
}

const MovingImage = styled(Image)<{ $pan: ReturnType<typeof keyframes> }>`
  position: absolute;
  top: 0;
  left: 0;
  max-width: none;
  max-height: none;
  backface-visibility: hidden;
  transform: translateZ(0);

  animation: ${({ $pan }) => $pan} var(--dur, 16s) linear infinite;
  will-change: transform;
`

const MovingImageMeasured: FC<{
  src: string
  aspectRatio: number
  display: string
  onLoad: () => void
  onError: () => void
}> = ({ src, aspectRatio, display, onLoad, onError }) => {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportGeometry, setViewportGeometry] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  const height = 760 * 1.1
  const width = height * aspectRatio

  const handleOnViewportResize = useCallback(() => {
    if (!viewportRef.current) {
      return
    }

    setViewportGeometry({
      top: viewportRef.current.offsetTop,
      left: viewportRef.current.offsetLeft,
      width: viewportRef.current.offsetWidth,
      height: viewportRef.current.offsetHeight,
    })
  }, [])

  useResizeObserver({
    target: viewportRef,
    onResize: handleOnViewportResize,
  })

  const tx = Math.max(0, width - viewportGeometry.width)
  const ty = Math.max(0, height - viewportGeometry.height)
  const durationSec = 250
  const pan = useMemo(() => makeClockwisePan(tx, ty), [tx, ty])

  // Calculate overflow and set CSS vars
  useEffect(() => {
    if (!tx || !ty) return

    viewportRef.current?.style.setProperty("--tx", `${tx}px`)
    viewportRef.current?.style.setProperty("--ty", `${ty}px`)
  }, [tx, ty])

  viewportRef.current?.style.setProperty("--dur", `${durationSec}s`)

  return (
    <Box
      overflow="hidden"
      position="relative"
      ref={viewportRef}
      width="100%"
      height="100%"
    >
      <MovingImage
        $pan={pan}
        {...resized(src, { width, quality: 90 })}
        width={width}
        height={height}
        alt=""
        fetchPriority="high"
        display={display}
        style={{ objectFit: "cover" }}
        onLoad={onLoad}
        onError={onError}
      />
    </Box>
  )
}

const makeClockwisePan = (tx: number, ty: number) => {
  const t = Math.max(0, tx)
  const u = Math.max(0, ty)

  // If there's no room to move, don't animate
  if (t === 0 && u === 0) {
    return keyframes`0%, 100% { transform: translate(0px, 0px); }`
  }

  // Calculate diagonal distance for 45-degree transitions
  const diagonalLength = Math.min(t, u) * 0.3
  const diagonalDistance = Math.sqrt(2) * diagonalLength

  // Update denominator to include diagonal segments with correct distances
  const denom = 2 * (t + u - 2 * diagonalLength) + 4 * diagonalDistance

  // If one axis is zero, avoid NaNs and make it a 2-point loop on that axis
  if (u === 0) {
    return keyframes`
      0%   { transform: translate(0px, 0px); }
      50%  { transform: translate(${-t}px, 0px); }
      100% { transform: translate(0px, 0px); }
    `
  }

  if (t === 0) {
    return keyframes`
      0%   { transform: translate(0px, 0px); }
      50%  { transform: translate(0px, ${-u}px); }
      100% { transform: translate(0px, 0px); }
    `
  }

  // dynamic percentages for smooth transitions
  const horizontalSegment = t - diagonalLength
  const verticalSegment = u - diagonalLength

  // cumulative distances for proper timing
  const d1 = horizontalSegment
  const d2 = d1 + diagonalDistance
  const d3 = d2 + verticalSegment
  const d4 = d3 + diagonalDistance
  const d5 = d4 + horizontalSegment
  const d6 = d5 + diagonalDistance
  const d7 = d6 + verticalSegment

  const p1 = (100 * d1) / denom
  const p2 = (100 * d2) / denom
  const p3 = (100 * d3) / denom
  const p4 = (100 * d4) / denom
  const p5 = (100 * d5) / denom
  const p6 = (100 * d6) / denom
  const p7 = (100 * d7) / denom

  return keyframes`
    0%   { transform: translate(${-diagonalLength}px, 0px); }
    ${p1}%  { transform: translate(${-t + diagonalLength}px, 0px); }
    ${p2}%  { transform: translate(${-t}px, ${-diagonalLength}px); }
    ${p3}%  { transform: translate(${-t}px, ${-u + diagonalLength}px); }
    ${p4}%  { transform: translate(${-t + diagonalLength}px, ${-u}px); }
    ${p5}%  { transform: translate(${-diagonalLength}px, ${-u}px); }
    ${p6}%  { transform: translate(0px, ${-u + diagonalLength}px); }
    ${p7}%  { transform: translate(0px, ${-diagonalLength}px); }
    100% { transform: translate(${-diagonalLength}px, 0px); }
  `
}

export const AuthDialogPanImageQueryRenderer: FC = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  return (
    <SystemQueryRenderer<AuthDialogPanImageQuery>
      query={graphql`
        query AuthDialogPanImageQuery($nodeId: ID!) {
          node(id: $nodeId) {
            __typename

            ... on Artwork {
              image {
                url(version: "main")
                aspectRatio
                blurhash
              }
            }

            ... on Gene {
              image {
                url(version: "main")
                aspectRatio
                blurhash
              }
            }

            ... on Artist {
              coverArtwork {
                image {
                  url(version: "main")
                  aspectRatio
                  blurhash
                }
              }
            }

            ... on Sale {
              coverImage {
                url(version: "main")
                aspectRatio
                blurhash
              }
            }
          }
        }
      `}
      variables={{ nodeId: options.nodeId }}
      render={({ error, props }) => {
        if (error) {
          console.error("[Auth]: Error loading artwork for signup modal", error)
          return null
        }

        if (!props || !props.node) {
          return <Box width="100%" height="100%" />
        }

        const image = getImage(props.node)

        if (!image) {
          return null
        }

        return <AuthDialogPanImage {...image} />
      }}
    />
  )
}

const getImage = (node: NonNullable<AuthDialogPanImageQuery$data["node"]>) => {
  if (node.__typename === "Artwork" || node.__typename === "Gene") {
    return node.image
  }

  if (node.__typename === "Artist") {
    return node.coverArtwork?.image
  }

  if (node.__typename === "Sale") {
    return node.coverImage
  }

  return null
}
