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
import styled, { keyframes } from "styled-components"
import { useCursor } from "use-cursor"

export const AuthDialogLeftPanel: FC<React.PropsWithChildren> = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  const newSignupEnabled = useFlag("onyx_new-signup-modal")

  if (!newSignupEnabled) {
    return (
      <Box display={["none", "block"]} width="100%">
        <Image
          {...resized(IMAGE.src, { width: MODAL_WIDTH / 2 })}
          width="100%"
          height="100%"
          lazyLoad
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>
    )
  }

  console.log("cb::options", options)

  if (!!options.image?.url && !!options.image?.aspectRatio) {
    return (
      <Box
        display={["none", "block"]}
        width="100%"
        height="100%"
        position="relative"
        overflow="hidden"
      >
        <MovingImageMeasured
          src={options.image.url}
          aspectRatio={options.image.aspectRatio}
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

const CAROUSEL_INTERVAL = 5000
const COLUMN_WIDTH =
  MODAL_WIDTH / 2 - Number.parseInt(THEME.space["2"].replace("px", ""))
// const PARTNER_IMAGE = {
//   width: MODAL_WIDTH,
//   height: IMAGE_HEIGHT,
//   src: "https://files.artsy.net/images/signup-gallery.png",
// }
const PX_PER_SEC = 200

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
}> = ({ src, aspectRatio }) => {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [viewportGeometry, setViewportGeometry] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  const width = (MODAL_WIDTH / 2) * 1.8
  const height = width / aspectRatio

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
  const total = 2 * (tx + ty)
  console.log("cb::total", { total, tx, ty, delta: total / PX_PER_SEC })
  const durationSec = Math.max(10, total / PX_PER_SEC)
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
        style={{ objectFit: "cover" }}
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

  const denom = 2 * (t + u)

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

  const p1 = (100 * t) / denom
  const p3 = (100 * (2 * t + u)) / denom

  return keyframes`
    0%   { transform: translate(0px, 0px); }
    ${p1}%  { transform: translate(${-t}px, 0px); }
    50%  { transform: translate(${-t}px, ${-u}px); }
    ${p3}%  { transform: translate(0px, ${-u}px); }
    100% { transform: translate(0px, 0px); }
  `
}
