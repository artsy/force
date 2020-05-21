import {
  Box,
  color,
  Flex,
  ResponsiveImage,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { FeaturedCollectionsRails_collectionGroup } from "v2/__generated__/FeaturedCollectionsRails_collectionGroup.graphql"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import { Truncator } from "v2/Components/Truncator"
import currency from "currency.js"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"
import { Media } from "v2/Utils/Responsive"

interface Props {
  collectionGroup: FeaturedCollectionsRails_collectionGroup
}

export const renderCarousel = (
  members,
  trackArrowClick,
  carouselHeight: string
) => {
  return (
    <Carousel
      height={carouselHeight}
      options={{
        wrapAround: sd.IS_MOBILE ? true : false,
        pageDots: false,
      }}
      data={members}
      render={(slide, slideIndex) => {
        return (
          <FeaturedCollectionEntity member={slide} itemNumber={slideIndex} />
        )
      }}
      onArrowClick={() => trackArrowClick()}
    />
  )
}

export const FeaturedCollectionsRails: React.FC<Props> = ({
  collectionGroup,
}) => {
  const { members, name } = collectionGroup
  const { trackEvent } = useTracking()

  const trackArrowClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.FeaturedCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      context_page: Schema.PageName.CollectionPage,
      type: Schema.Type.Button,
      subject: Schema.Subject.ClickedNextButton,
    })
  }

  return (
    <FeaturedCollectionsContainer>
      <Serif size="5" mt={3}>
        {name}
      </Serif>
      <Media lessThan="md">
        {renderCarousel(members, trackArrowClick, "430px")}
      </Media>
      <Media greaterThanOrEqual="md">
        {renderCarousel(members, trackArrowClick, "500px")}
      </Media>
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
  const { description, price_guidance, slug, thumbnail, title } = member
  const { trackEvent } = useTracking()
  const formattedPrice = currency(price_guidance, {
    separator: ",",
    precision: 0,
  }).format()

  const handleClick = () => {
    trackEvent({
      action_type: Schema.ActionType.Click,
      context_page: Schema.PageName.CollectionPage,
      context_module: Schema.ContextModule.FeaturedCollectionsRail,
      context_page_owner_type: Schema.OwnerType.Collection,
      type: Schema.Type.Thumbnail,
      destination_path: `${sd.APP_URL}/collection/${slug}`,
      item_number: itemNumber,
    })
  }

  const getTruncatedDescription = (lines: number) => {
    return (
      <Truncator
        maxLineCount={lines}
        ReadMoreLink={() => {
          return (
            <>
              {`... `}
              <ReadMoreLink size="2" weight="medium" display="inline">
                Read more
              </ReadMoreLink>
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
    <Container p={2} m={1} width={["261px", "261px", "355px", "355px"]}>
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
        <Serif size="4" mt={1} maxWidth={["246px", "100%"]}>
          <Truncator maxLineCount={1}>{title}</Truncator>
        </Serif>
        {price_guidance && (
          <Sans size="2" color="black60">{`From $${formattedPrice}`}</Sans>
        )}
        <ExtendedSerif size="3" mt={1}>
          <Media lessThan="md">{getTruncatedDescription(4)}</Media>
          <Media greaterThan="sm">{getTruncatedDescription(3)}</Media>
        </ExtendedSerif>
      </StyledLink>
    </Container>
  )
}

export const FeaturedCollectionsRailsContainer = createFragmentContainer(
  FeaturedCollectionsRails,
  {
    collectionGroup: graphql`
      fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          slug
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

  ${Container} {
    &:first-of-type {
      margin-left: 2px;
    }
  }
`

const ExtendedSerif = styled(Serif)`
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

export const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 100%;
  }
`

export const StyledLink = styled(RouterLink)`
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration: none;
  }
`

const ReadMoreLink = styled(Sans)`
    text-decoration: underline;
`
