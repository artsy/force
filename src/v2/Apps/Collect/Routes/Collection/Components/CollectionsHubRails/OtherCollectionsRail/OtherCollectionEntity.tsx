import { Box, color, Flex, ResponsiveImage, Serif } from "@artsy/palette"
import { OtherCollectionEntity_member } from "v2/__generated__/OtherCollectionEntity_member.graphql"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"

export interface CollectionProps {
  member: OtherCollectionEntity_member
  itemNumber: number
}

export const OtherCollectionEntity: React.FC<CollectionProps> = ({
  itemNumber,
  member,
}) => {
  const { slug, thumbnail, title } = member
  const { trackEvent } = useTracking()

  const handleClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.OtherCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      type: Schema.Type.Thumbnail,
      destination_path: `${sd.APP_URL}/collection/${slug}`,
      item_number: itemNumber,
    })
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
  OtherCollectionEntity,
  {
    member: graphql`
      fragment OtherCollectionEntity_member on MarketingCollection {
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
  margin-right: 10px;

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
