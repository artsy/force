import {
  Box,
  Carousel,
  CarouselCell,
  type CarouselCellProps,
  CarouselRail,
  type CarouselRailProps,
  Flex,
  Image,
} from "@artsy/palette"
import {
  COLUMN_WIDTH,
  DEFAULT_IMAGES,
  getResizedAuthDialogImagePlaceholder,
  getResizedAuthDialogImages,
} from "Components/AuthDialog/Utils/authDialogConstants"
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
import styled from "styled-components"
import { useCursor } from "use-cursor"

const CAROUSEL_INTERVAL = 4000

export const AuthDialogImageCarousel: FC = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { index, setCursor } = useCursor({ max: DEFAULT_IMAGES.length })

  const stopAutoPlay = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (isLoading) {
      return
    }

    intervalRef.current = setInterval(
      () => setCursor(prevCursor => prevCursor + 1),
      CAROUSEL_INTERVAL,
    )

    return stopAutoPlay
  }, [setCursor, stopAutoPlay, isLoading])

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
            {isLoading ? (
              <>
                <link
                  rel="preload"
                  as="image"
                  href={images[0].src}
                  imageSrcSet={images[0].srcSet}
                  fetchPriority="high"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
                <Image
                  {...getResizedAuthDialogImagePlaceholder()}
                  width="100%"
                  height="100%"
                  fetchPriority="high"
                  alt=""
                  style={{ objectFit: "cover", filter: "blur(10px)" }}
                />
              </>
            ) : (
              <Image
                {...img}
                width="100%"
                height="100%"
                lazyLoad={index !== 0}
                alt=""
                style={{ objectFit: "cover" }}
              />
            )}
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
