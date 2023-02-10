import {
  Children,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  useCallback,
  useEffect,
  useRef,
} from "react"
import {
  Box,
  Carousel,
  CarouselCell,
  CarouselCellProps,
  CarouselRail,
  CarouselRailProps,
  Flex,
  FullBleed,
  ProgressDots,
  ShelfNext,
  ShelfPrevious,
  Spacer,
} from "@artsy/palette"
import { useCursor } from "use-cursor"
import { useNextPrevious } from "Utils/Hooks/useNextPrevious"

interface HeroCarouselLargeProps {
  children: React.ReactNode
  fullBleed?: boolean
  progressbarVariant?: "dot" | "dash"
  onChange?: (index) => void
}

export const HeroCarouselLarge: React.FC<HeroCarouselLargeProps> = ({
  children,
  fullBleed = true,
  progressbarVariant,
  onChange,
}) => {
  const length = Children.count(children)

  const {
    index,
    handleNext: onNext,
    handlePrev: onPrev,
    setCursor,
  } = useCursor({ max: length })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopAutoPlay = () => {
    intervalRef.current && clearInterval(intervalRef.current)
  }

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setCursor(prevCursor => prevCursor + 1),
      10000
    )

    return stopAutoPlay
  }, [setCursor])

  const handleNext = useCallback(() => {
    onNext()
    stopAutoPlay()
  }, [onNext])

  const handlePrev = useCallback(() => {
    onPrev()
    stopAutoPlay()
  }, [onPrev])

  const handleClick = (index: number) => {
    setCursor(index)
    stopAutoPlay()
  }

  const { containerRef } = useNextPrevious({
    onNext: handleNext,
    onPrevious: handlePrev,
  })

  if (!children) return null

  const displayWithDots = progressbarVariant === "dot"

  return (
    <div ref={containerRef as any}>
      {fullBleed ? (
        <FullBleed>
          <Carousel
            Cell={Cell}
            Rail={Rail}
            Next={Disable}
            Previous={Disable}
            initialIndex={index}
          >
            {children}
          </Carousel>
        </FullBleed>
      ) : (
        <Flex flexDirection="row">
          {displayWithDots && (
            <ShelfPrevious alignSelf="center" onClick={handlePrev} />
          )}
          <Carousel
            Cell={Cell}
            Rail={Rail}
            Next={Disable}
            Previous={Disable}
            initialIndex={index}
          >
            {children}
          </Carousel>
          {displayWithDots && (
            <ShelfNext alignSelf="center" onClick={handleNext} />
          )}
        </Flex>
      )}

      {length > 1 && (
        <>
          <Spacer y={2} />

          <Flex alignItems="center">
            <Box flex={1}>
              <ProgressDots
                variant={progressbarVariant ? progressbarVariant : "dash"}
                amount={length}
                activeIndex={index}
                onClick={handleClick}
              />
            </Box>

            {!displayWithDots && (
              <>
                <Spacer x={2} />

                <ShelfPrevious onClick={handlePrev} />

                <Spacer x={1} />

                <ShelfNext onClick={handleNext} />
              </>
            )}
          </Flex>
        </>
      )}
    </div>
  )
}

const Cell: ForwardRefExoticComponent<CarouselCellProps> = forwardRef(
  (props, ref) => {
    return (
      <CarouselCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        width="100%"
        verticalAlign="top"
        pr={0}
      />
    )
  }
)

const Rail: FC<CarouselRailProps> = props => {
  return <CarouselRail {...props} display="block" />
}

const Disable: FC = () => {
  return <></>
}
