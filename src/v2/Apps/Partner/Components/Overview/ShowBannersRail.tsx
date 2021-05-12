import React, { useState } from "react"
import {
  Box,
  BoxProps,
  Carousel,
  CarouselCell,
  CarouselRail,
  ProgressDots,
  Swiper,
  SwiperCell,
  SwiperRail,
} from "@artsy/palette"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ShowBannersRail_partner } from "v2/__generated__/ShowBannersRail_partner.graphql"
import { ShowBannersRailRendererQuery } from "v2/__generated__/ShowBannersRailRendererQuery.graphql"
import { compact, take, uniqBy } from "lodash"
import { ShowBannerFragmentContainer } from "../PartnerShows"
import { useSystemContext } from "v2/Artsy"
import { ShowBannersRailPlaceholder } from "./ShowBannersRailPlaceholder"
import { Media } from "v2/Utils/Responsive"

interface ShowBannersRailProps extends BoxProps {
  partner: ShowBannersRail_partner
}

export const ShowBannersRailContainer: React.FC<{
  children: JSX.Element[]
  onChange?(index: number): void
}> = ({ children, ...rest }) => {
  return (
    <>
      <Media greaterThan="xs">
        <Carousel
          {...rest}
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
          {children}
        </Carousel>
      </Media>
      <Media at="xs">
        <Swiper
          {...rest}
          mx={-1}
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
          {children}
        </Swiper>
      </Media>
    </>
  )
}

const ShowBannersRail: React.FC<ShowBannersRailProps> = ({
  partner,
  ...rest
}) => {
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0)

  if (!partner) return null

  const {
    featuredShow: { edges: featured },
    currentShows: { edges: current },
    upcomingShows: { edges: upcoming },
    pastShows: { edges: past },
  } = partner

  let shows = take(
    uniqBy(compact([...featured, ...current, ...upcoming]), "node.id"),
    10
  )

  // Display past shows only if no Featured, Current, or Upcoming shows.
  if (shows.length === 0) {
    shows = compact(past)
  }

  if (shows.length === 0) {
    return null
  }

  return (
    <Box {...rest}>
      <ShowBannersRailContainer onChange={setCurrentCarouselPage}>
        {shows.map((edge, i) => {
          return (
            <ShowBannerFragmentContainer
              withAnimation
              selected={i === currentCarouselPage}
              key={edge.node.id}
              show={edge.node}
            />
          )
        })}
      </ShowBannersRailContainer>
      <ProgressDots
        mt={[2, 6]}
        activeIndex={currentCarouselPage}
        amount={shows.length}
      />
    </Box>
  )
}

const ShowBannersRailFragmentContainer = createFragmentContainer(
  ShowBannersRail,
  {
    partner: graphql`
      fragment ShowBannersRail_partner on Partner {
        slug
        featuredShow: showsConnection(
          first: 1
          status: ALL
          sort: FEATURED_DESC_END_AT_DESC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBanner_show
            }
          }
        }
        currentShows: showsConnection(
          first: 10
          status: CURRENT
          sort: END_AT_ASC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBanner_show
            }
          }
        }
        upcomingShows: showsConnection(
          first: 10
          status: UPCOMING
          sort: START_AT_ASC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBanner_show
            }
          }
        }
        pastShows: showsConnection(
          first: 2
          status: CLOSED
          sort: END_AT_DESC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBanner_show
            }
          }
        }
      }
    `,
  }
)

export const ShowBannersRailRenderer: React.FC<
  {
    partnerId: string
  } & Omit<ShowBannersRailProps, "partner">
> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<ShowBannersRailRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query ShowBannersRailRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...ShowBannersRail_partner
          }
        }
      `}
      variables={{ partnerId }}
      render={({ error, props }) => {
        if (error || !props)
          return <ShowBannersRailPlaceholder count={10} {...rest} />

        return <ShowBannersRailFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
