import { Box, Serif, color } from "@artsy/palette"
import { ArtistSeriesRail_collectionGroup } from "v2/__generated__/ArtistSeriesRail_collectionGroup.graphql"
import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
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

      <Carousel onChange={() => trackArrowClick()}>
        {members.map((slide, slideIndex) => {
          return (
            <ArtistSeriesEntity
              key={slide.slug || slideIndex}
              member={slide}
              itemNumber={slideIndex}
            />
          )
        })}
      </Carousel>
    </Content>
  )
}

const Content = styled(Box)`
  border-top: 1px solid ${color("black10")};
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
