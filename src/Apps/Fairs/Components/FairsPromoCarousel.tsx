import { Children, useEffect, useState } from "react"
import * as React from "react"
import {
  Carousel,
  Clickable,
  CarouselRail,
  CarouselCell,
  BoxProps,
} from "@artsy/palette"

export interface CarouselProps extends BoxProps {
  children: JSX.Element | JSX.Element[]
  arrowHeight?: number
  onChange?(index: number): void
  onPageCountChange?(count: number): void
}

interface FairsPromoCarouselProps {
  children: CarouselProps["children"]
  duration?: number
}

export const FairsPromoCarousel: React.FC<FairsPromoCarouselProps> = ({
  children,
  duration = 5000,
}) => {
  const [interacted, setInteracted] = useState(false)
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (interacted) return
      setCursor(prevIndex => prevIndex + 1)
    }, duration)

    return () => {
      clearInterval(interval)
    }
  }, [duration, interacted])

  const initialIndex = cursor % Children.count(children)

  return (
    <Carousel
      initialIndex={initialIndex}
      Next={({
        children: _children,
        disabled: _disabled,
        onClick,
        ...rest
      }) => (
        <Clickable
          position="absolute"
          top={0}
          zIndex={1}
          width="100%"
          height="100%"
          cursor="e-resize"
          onClick={event => {
            setInteracted(true)
            onClick?.(event)
          }}
          {...rest}
        />
      )}
      Previous={() => <></>}
      Rail={props => <CarouselRail {...props} display="block" />}
      Cell={React.forwardRef((props, ref) => (
        <CarouselCell
          {...props}
          ref={ref as any}
          display="inline-flex"
          width="100%"
          pr={0}
        />
      ))}
    >
      {children}
    </Carousel>
  )
}
