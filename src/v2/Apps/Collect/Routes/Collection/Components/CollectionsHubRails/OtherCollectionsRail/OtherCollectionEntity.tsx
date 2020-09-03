import { Box, Flex, ResponsiveImage, Serif, color } from "@artsy/palette"
import { OtherCollectionEntity_member } from "v2/__generated__/OtherCollectionEntity_member.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { CollectionContextTrackingArgs } from "v2/Apps/Collect/Routes/Collection"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"

export interface CollectionProps {
  member: OtherCollectionEntity_member
  itemNumber: number
  trackingData: CollectionContextTrackingArgs
}

export const OtherCollectionEntity: React.FC<CollectionProps> = ({
  itemNumber,
  member,
  trackingData: {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  },
}) => {
  const { id, slug, thumbnail, title } = member
  const { trackEvent } = useTracking()

  const handleClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.otherCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      })
    )
  }

  return (
    <StyledLink to={`/collection/${slug}`} onClick={handleClick}>
      <Flex alignItems="center" height="60px">
        {thumbnail && (
          <ImageContainer>
            <ThumbnailImage
              src={resize(thumbnail, {
                width: 60,
                height: 60,
                convert_to: "jpg",
              })}
            />
          </ImageContainer>
        )}
        <Box>
          <TitleContainer size="3" px={2}>
            {title}
          </TitleContainer>
        </Box>
      </Flex>
    </StyledLink>
  )
}

export const OtherCollectionsRailsContainer = createFragmentContainer(
  OtherCollectionEntity as React.FC<CollectionProps>,
  {
    member: graphql`
      fragment OtherCollectionEntity_member on MarketingCollection {
        id
        slug
        thumbnail
        title
      }
    `,
  }
)

export const StyledLink = styled(RouterLink)`
  display: block;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border: 1px solid ${color("black10")};
  border-radius: 2px;

  &:hover {
    text-decoration: none;
    border: 1px solid ${color("black60")};
  }
`

export const ImageContainer = styled(Box)`
  height: 60px;
  width: 60px;
`

export const ThumbnailImage = styled(ResponsiveImage)`
  background-size: cover;
  border-radius: 2px 1px 1px 2px;
`

const TitleContainer = styled(Serif)`
  width: max-content;
  white-space: nowrap;
`
