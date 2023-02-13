import {
  Children,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  useState,
} from "react"
import {
  ProgressDots,
  Spacer,
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperRail,
  SwiperRailProps,
} from "@artsy/palette"

interface HeroCarouselSmallProps {
  progressbarVariant?: "dot" | "dash"
  onChange?: (index) => void
}

export const HeroCarouselSmall: FC<HeroCarouselSmallProps> = ({
  children,
  progressbarVariant,
  onChange,
}) => {
  const length = Children.count(children)

  const [index, setIndex] = useState(0)

  const handleChange = index => {
    if (onChange) {
      onChange(index)
    }

    setIndex(index)
  }

  const displayWithDots = progressbarVariant === "dot"

  return (
    <>
      <Swiper
        borderRadius={3}
        snap="center"
        Cell={Cell}
        Rail={Rail}
        onChange={handleChange}
      >
        {children}
      </Swiper>

      {length > 1 && (
        <>
          <Spacer y={2} />

          <ProgressDots
            variant={displayWithDots ? "dot" : "dash"}
            amount={length}
            activeIndex={index}
          />
        </>
      )}
    </>
  )
}

const Cell: ForwardRefExoticComponent<SwiperCellProps> = forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
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

const Rail: FC<SwiperRailProps> = props => {
  return <SwiperRail {...props} display="block" />
}
