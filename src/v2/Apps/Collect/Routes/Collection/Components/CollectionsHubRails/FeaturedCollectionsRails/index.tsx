import { Box, Flex, ResponsiveImage, Spacer, Text, color } from "@artsy/palette"
import { FeaturedCollectionsRails_collectionGroup } from "v2/__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Carousel } from "v2/Components/Carousel"
import { Truncator } from "v2/Components/Truncator"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { Media } from "v2/Utils/Responsive"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup: { members, name },
}) => {
  return (
    <FeaturedCollectionsContainer>
      <Text variant="subtitle" pt={3} pb={2}>
        {name}
      </Text>

      <Carousel>
        {members.map((slide, slideIndex) => {
          return (
            <FeaturedCollectionEntity
              key={slide.slug}
              member={slide}
              itemNumber={slideIndex}
            />
          )
        })}
      </Carousel>

      <Spacer pb={2} />
    </FeaturedCollectionsContainer>
  )
}

interface FeaturedCollectionEntityProps {
  member: any
  itemNumber: number
}

export const FeaturedCollectionEntity: React.FC<FeaturedCollectionEntityProps> = ({
  itemNumber,
  member,
}) => {
  const { description, price_guidance, slug, id, thumbnail, title } = member
  const formattedPrice = currency(price_guidance, {
    separator: ",",
    precision: 0,
  }).format()

  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.featuredCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      })
    )
  }

  const getTruncatedDescription = (lines: number) => {
    return (
      <Truncator
        maxLineCount={lines}
        ReadMoreLink={() => {
          return (
            <>
              {`... `}
              <ReadMoreLink display="inline">Read more</ReadMoreLink>
            </>
          )
        }}
      >
        <>
          {description && (
            <span dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </>
      </Truncator>
    )
  }

  return (
    <Container p={2} width={["261px", "261px", "355px", "355px"]}>
      <StyledLink to={`/collection/${slug}`} onClick={handleClick}>
        <Flex height={["190px", "190px", "280px", "280px"]}>
          <FeaturedImage
            src={resize(thumbnail, {
              width: 500,
              height: 500,
              quality: 80,
              convert_to: "jpg",
            })}
          />
        </Flex>
        <Text variant="subtitle" mt={1} maxWidth={["246px", "100%"]}>
          <Truncator maxLineCount={1}>{title}</Truncator>
        </Text>
        {price_guidance && (
          <Text variant="small" color="black60">
            {`From $${formattedPrice}`}
          </Text>
        )}
        {/* TODO: fix this truncation/overflow issue properly, rather than this overflow:hidden Box */}
        <Box style={{ overflow: "hidden" }}>
          <ExtendedText mt={1}>
            <Media lessThan="md">{getTruncatedDescription(4)}</Media>
            <Media greaterThan="sm">{getTruncatedDescription(3)}</Media>
          </ExtendedText>
        </Box>
      </StyledLink>
    </Container>
  )
}

export const FeaturedCollectionsRailsContainer = createFragmentContainer(
  FeaturedCollectionsRails as React.FC<Props>,
  {
    collectionGroup: graphql`
      fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          id
          slug
          title
          description
          price_guidance: priceGuidance
          thumbnail
        }
      }
    `,
  }
)

const Container = styled(Box)`
  border: 1px solid ${color("black10")};
  border-radius: 2px;

  &:hover {
    text-decoration: none;
    border: 1px solid ${color("black60")};
  }
`

const FeaturedCollectionsContainer = styled(Box)`
  border-top: 1px solid ${color("black10")};
`

const ExtendedText = styled(Text)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
    }
  }
`
export const FeaturedImage = styled(ResponsiveImage)`
  background-position: top;
`

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
  }
`

const ReadMoreLink = styled(Text).attrs({ variant: "mediumText" })`
  text-decoration: underline;
`
