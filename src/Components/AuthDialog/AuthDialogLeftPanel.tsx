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
} from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { MODAL_WIDTH } from "Components/AuthDialog/Utils/utils"
import { resized } from "Utils/resized"
import {
  type FC,
  type ForwardRefExoticComponent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react"
import styled from "styled-components"
import { useCursor } from "use-cursor"

export const AuthDialogLeftPanel: FC<React.PropsWithChildren> = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  const img = resized(options.imageUrl ?? IMAGE.src, { width: MODAL_WIDTH / 2 })

  const newSignupEnabled = useFlag("onyx_new-signup-modal")

  console.log("cb::leftPanel", { options })

  if (!newSignupEnabled) {
    return (
      <Box display={["none", "block"]} width="100%">
        <Image
          {...img}
          width="100%"
          height="100%"
          lazyLoad
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>
    )
  }

  if (!!options.imageUrl) {
    return (
      <Box display={["none", "block"]} width="100%" overflow="hidden">
        <Image
          {...img}
          width="100%"
          height="100%"
          fetchPriority={"high"}
          alt=""
          style={{
            objectFit: "cover",
          }}
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

  return (
    <Flex width={COLUMN_WIDTH} height="100%" position="relative">
      <Carousel
        Cell={Cell}
        Rail={Rail}
        initialIndex={index}
        height="100%"
        display="flex"
      >
        {DEFAULT_IMAGES.map((img, index) => (
          <Box width={COLUMN_WIDTH} height="100%" key={`signup-img-${img.src}`}>
            <Image
              {...img}
              width="100%"
              height="100%"
              lazyLoad={index !== 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              alt=""
              style={{
                objectFit: "cover",
              }}
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
const IMAGE_HEIGHT = 2030
const IMAGE = {
  width: MODAL_WIDTH,
  height: IMAGE_HEIGHT,
  src: "https://files.artsy.net/images/2x_Evergreen-Artist-Page-Sign-Up-Modal.jpg",
}
// const PARTNER_IMAGE = {
//   width: MODAL_WIDTH,
//   height: IMAGE_HEIGHT,
//   src: "https://files.artsy.net/images/signup-gallery.png",
// }
const DEFAULT_IMAGES = [
  {
    width: MODAL_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-01-1765895830875.png",
  },
  {
    width: MODAL_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-02-1765895830877.png",
  },
  {
    width: MODAL_WIDTH,
    height: IMAGE_HEIGHT,
    src: "https://files.artsy.net/images/signup-03-1765895830761.png",
  },
]
