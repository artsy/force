import {
  Box,
  Carousel,
  CarouselCell,
  type CarouselCellProps,
  CarouselRail,
  type CarouselRailProps,
  Flex,
  Image,
  THEME,
  useResizeObserver,
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import {
  DEFAULT_IMAGES,
  IMAGE,
  MODAL_WIDTH,
  getResizedAuthDialogGalleryImage,
  getResizedAuthDialogImages,
} from "Components/AuthDialog/Utils/authDialogConstants"
import { resized } from "Utils/resized"
import {
  type FC,
  type ForwardRefExoticComponent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Blurhash } from "react-blurhash"
import styled, { keyframes } from "styled-components"
import { useCursor } from "use-cursor"

export const AuthDialogLeftPanel: FC<React.PropsWithChildren> = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  const [isImageLoading, setIsImageLoading] = useState(true)

  const newSignupEnabled = useFlag("onyx_new-signup-modal")

  if (!newSignupEnabled) {
    return (
      <Box display={["none", "block"]} width="100%">
        <Image
          {...resized(IMAGE.src, { width: MODAL_WIDTH / 2 })}
          width="100%"
          minHeight={760}
          height="100%"
          lazyLoad
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>
    )
  }

  if (!!options.image?.url && !!options.image?.aspectRatio) {
    return (
      <Box
        display={["none", "block"]}
        width="100%"
        height="100%"
        position="relative"
        overflow="hidden"
      >
        {isImageLoading &&
          (options.image?.blurhash ? (
            <Blurhash
              hash={options.image.blurhash}
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
          src={options.image.url}
          aspectRatio={options.image.aspectRatio}
          display={isImageLoading ? "none" : "block"}
          onLoad={() => {
            setIsImageLoading(false)
          }}
          onError={() => setIsImageLoading(false)}
        />
      </Box>
    )
  }

  if (options.galleryImage) {
    return (
      <Box display={["none", "block"]} width="100%" overflow="hidden">
        <Image
          {...getResizedAuthDialogGalleryImage()}
          width="100%"
          height="100%"
          fetchPriority="high"
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>
    )
  }

  return (
    <Box display={["none", "block"]} width="100%" overflow="hidden">
      <ImageSlider />
    </Box>
  )
}

const ImageSlider: FC = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { index, setCursor } = useCursor({ max: DEFAULT_IMAGES.length })

  const stopAutoPlay = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCursor(prevCursor => prevCursor + 1),
      CAROUSEL_INTERVAL,
    )

    return stopAutoPlay
  }, [setCursor, stopAutoPlay])

  const handleClick = (index: number) => {
    setCursor(index)
    stopAutoPlay()
  }

  const images = useMemo(() => getResizedAuthDialogImages(), [])

  return (
    <Flex width={COLUMN_WIDTH} height="100%" position="relative">
      <Carousel
        Cell={Cell}
        Rail={Rail}
        initialIndex={index}
        height="100%"
        display="flex"
      >
        {images.map((img, index) => (
          <Box width={COLUMN_WIDTH} height="100%" key={`signup-img-${img.src}`}>
            <Image
              {...img}
              width="100%"
              height="100%"
              lazyLoad={index !== 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              alt=""
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Carousel>

      <Flex
        position="absolute"
        p={2}
        bottom={0}
        left={0}
        gap={1}
        flexDirection="column"
      >
        <DotIndicators data-active-index={index}>
          {DEFAULT_IMAGES.map((_, dotIndex) => (
            <Dot
              key={dotIndex}
              data-index={dotIndex}
              backgroundColor="mono0"
              onClick={() => handleClick(dotIndex)}
            />
          ))}
        </DotIndicators>
      </Flex>
    </Flex>
  )
}

const Cell: ForwardRefExoticComponent<CarouselCellProps> = forwardRef(
  (props, ref) => {
    return (
      <CarouselCell
        {...props}
        id="cell"
        ref={ref as any}
        display="inline-flex"
        flex={1}
        width="100%"
        height="100%"
        verticalAlign="top"
        pr={0}
      />
    )
  },
)

const Rail: FC<React.PropsWithChildren<CarouselRailProps>> = props => {
  return (
    <CarouselRail
      {...props}
      display="flex"
      height="100%"
      width="100%"
      id="carousel-rail"
    />
  )
}

const DotIndicators = styled(Flex)`
  gap: 8px;
  align-items: center;
`

const Dot = styled(Box)`
  border-radius: 4px;
  cursor: pointer;
  height: 8px;
  transition: width 0.3s ease;
  width: 8px;

  ${DotIndicators}[data-active-index="0"] &[data-index="0"],
  ${DotIndicators}[data-active-index="1"] &[data-index="1"],
  ${DotIndicators}[data-active-index="2"] &[data-index="2"] {
    width: 24px;
  }
`

const CAROUSEL_INTERVAL = 4000
const COLUMN_WIDTH =
  MODAL_WIDTH / 2 - Number.parseInt(THEME.space["2"].replace("px", ""))

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
