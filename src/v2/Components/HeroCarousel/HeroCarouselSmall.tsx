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

export const HeroCarouselSmall: FC = ({ children }) => {
  const length = Children.count(children)

  const [index, setIndex] = useState(0)

  return (
    <>
      <Swiper
        borderRadius={3}
        snap="center"
        Cell={Cell}
        Rail={Rail}
        onChange={setIndex}
      >
        {children}
      </Swiper>

      {length > 1 && (
        <>
          <Spacer mt={2} />

          <ProgressDots variant="dash" amount={length} activeIndex={index} />
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
