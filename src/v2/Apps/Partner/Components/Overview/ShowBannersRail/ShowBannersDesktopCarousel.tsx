import React from "react"
import { Carousel, CarouselCell, CarouselRail } from "@artsy/palette"
import { ShowBannerFragmentContainer } from "../../PartnerShows"
import { usePartnerShowBannersContext } from "v2/Apps/Partner/Utils/PartnerShowBannersContex"
import { ShowBannersDesktopCarousel_shows } from "v2/__generated__/ShowBannersDesktopCarousel_shows.graphql"
import { createFragmentContainer, graphql } from "react-relay"

export interface ShowBannersDesktopCarouselProps {
  shows: ShowBannersDesktopCarousel_shows
  onChange?(index: number): void
}

const ShowBannersDesktopCarousel: React.FC<ShowBannersDesktopCarouselProps> = ({
  shows,
  onChange,
}) => {
  const { currentPage, previousPage } = usePartnerShowBannersContext()

  return (
    <Carousel
      onChange={onChange}
      Cell={React.forwardRef((props, ref) => {
        return (
          <CarouselCell
            {...props}
            ref={ref as any}
            display="inline-flex"
            width="100%"
            pr={0}
          />
        )
      })}
      Rail={props => {
        return <CarouselRail {...props} transition="none" display="block" />
      }}
    >
      {shows.map((show, i) => {
        return (
          <ShowBannerFragmentContainer
            withAnimation={currentPage !== previousPage}
            selected={i === currentPage}
            key={show.id}
            show={show}
          />
        )
      })}
    </Carousel>
  )
}

export const ShowBannersDesktopCarouselFragmentContainer = createFragmentContainer(
  ShowBannersDesktopCarousel,
  {
    shows: graphql`
      fragment ShowBannersDesktopCarousel_shows on Show @relay(plural: true) {
        id
        ...ShowBanner_show
      }
    `,
  }
)
