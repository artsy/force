import React from "react"
import { Swiper, SwiperCell, SwiperRail } from "@artsy/palette"
import { ShowBannerFragmentContainer } from "../../PartnerShows"
import { ShowBannersMobileCarousel_shows } from "v2/__generated__/ShowBannersMobileCarousel_shows.graphql"
import { createFragmentContainer, graphql } from "react-relay"

export interface MobileCarouselProps {
  shows: ShowBannersMobileCarousel_shows
  onChange?(index: number): void
}

const ShowBannersMobileCarousel: React.FC<MobileCarouselProps> = ({
  shows,
  onChange,
}) => {
  return (
    <Swiper
      onChange={onChange}
      mx={-1}
      snap="start"
      Cell={React.forwardRef((props, ref) => {
        return (
          <SwiperCell
            {...props}
            ref={ref as any}
            display="inline-flex"
            width="100%"
            px={1}
          />
        )
      })}
      Rail={props => {
        return <SwiperRail {...props} display="block" />
      }}
    >
      {shows.map((show, i) => {
        return <ShowBannerFragmentContainer key={show.id} show={show} />
      })}
    </Swiper>
  )
}

export const ShowBannersMobileCarouselFragmentContainer = createFragmentContainer(
  ShowBannersMobileCarousel,
  {
    shows: graphql`
      fragment ShowBannersMobileCarousel_shows on Show @relay(plural: true) {
        id
        ...ShowBanner_show
      }
    `,
  }
)
