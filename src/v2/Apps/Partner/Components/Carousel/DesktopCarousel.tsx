import React from "react"
import { Carousel, CarouselCell, CarouselProps } from "@artsy/palette"

export const DesktopCarousel: React.FC<
  CarouselProps & { itemsPerViewport: number }
> = ({ children, itemsPerViewport, ...rest }) => {
  return (
    <Carousel
      Cell={React.forwardRef((props, ref) => {
        return (
          <CarouselCell
            display="inline-flex"
            flexGrow={0}
            flexShrink={0}
            style={{
              boxSizing: "initial",
              flexBasis: `calc((100% - ${
                itemsPerViewport - 1
              } * 20px) / ${itemsPerViewport})`,
            }}
            {...props}
            ref={ref as any}
          />
        )
      })}
      {...rest}
    >
      {children}
    </Carousel>
  )
}
