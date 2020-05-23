import { Box, color, Serif } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "v2/__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { ArtistSeriesRailContainer as ArtistSeriesEntity } from "./ArtistSeriesEntity"

export interface ArtistSeriesRailProps {
  collectionGroup: ArtistSeriesRail_collectionGroup
}
export const ArtistSeriesRail: React.FC<ArtistSeriesRailProps> = ({
  collectionGroup,
}) => {
  const { members, name } = collectionGroup
  const { trackEvent } = useTracking()

  const trackArrowClick = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.ArtistCollectionsRail,
      context_page_owner_type: AnalyticsSchema.OwnerType.Collection,
      context_page: AnalyticsSchema.PageName.CollectionPage,
      type: AnalyticsSchema.Type.Button,
      subject: AnalyticsSchema.Subject.ClickedNextButton,
    })
  }

  return (
    <Content mt={2} py={3}>
      <Serif size="5" mb={1}>
        {name}
      </Serif>
      <Carousel
        height="250px"
        options={{
          wrapAround: sd.IS_MOBILE ? true : false,
          pageDots: false,
        }}
        data={members}
        render={(slide, slideIndex) => {
          return (
            <ArtistSeriesEntity
              member={slide}
              itemNumber={slideIndex}
              key={slide.slug}
            />
          )
        }}
        onArrowClick={() => trackArrowClick()}
      />
    </Content>
  )
}

const Content = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 85%;
  }
`

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesRail,
  {
    collectionGroup: graphql`
      fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          slug
          ...ArtistSeriesEntity_member
        }
      }
    `,
  }
)
