import {
  Box,
  BoxProps,
  Button,
  Column,
  GridColumns,
  Image,
  media,
  ReadMore,
  Text,
} from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ShowBanner_show } from "v2/__generated__/ShowBanner_show.graphql"

const statusLabelsMap = {
  running: "current",
  upcoming: "upcoming",
  closed: "past",
}

const FadeBox = styled(Box)`
  transition: opacity 0.5s;

  ${media.sm`
    opacity: 1;
  `};
`

const SlideBox = styled(Box)`
  transition: right 0.5s;
  position: absolute;

  ${media.sm`
    opacity: 1;
    right: 0;
  `};
`

interface ShowBannerProps extends BoxProps {
  show: ShowBanner_show
  selected?: boolean
  withAnimation?: boolean
}

const ShowBanner: React.FC<ShowBannerProps> = ({
  show,
  selected,
  withAnimation,
  ...rest
}): JSX.Element => {
  const {
    coverImage,
    name,
    isFairBooth,
    location,
    exhibitionPeriod,
    status,
    description,
    href,
  } = show
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const showType = `${statusLabelsMap[status]} ${
    isFairBooth ? "fair booth" : "show"
  }`
  const [active, setActive] = useState(!withAnimation)

  useEffect(() => {
    if (withAnimation && selected !== active) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setActive(selected)
    }
  }, [withAnimation, selected])

  return (
    <GridColumns width="100%" gridRowGap={[3, 2]} {...rest}>
      <Column span={6}>
        <FadeBox opacity={active ? 1 : 0}>
          <Text textTransform="capitalize" variant="mediumText" mb={1}>
            {showType}
          </Text>
          <RouterLink to={href} textDecoration="none">
            {name && <Text variant="largeTitle">{name}</Text>}
            {exhibitionPeriod && (
              <Text color="black60" variant="title">
                {exhibitionPeriod}
              </Text>
            )}
            {location && location.city && (
              <Text
                color="black60"
                variant="subtitle"
                textTransform="capitalize"
              >
                {location.city}
              </Text>
            )}
            {description && (
              <Text mt={1}>
                <ReadMore maxChars={280} content={description} />
              </Text>
            )}
          </RouterLink>

          <GridColumns mt={[2, 3]}>
            <Column span={6}>
              <RouterLink to={href}>
                <Button width="100%">View More</Button>
              </RouterLink>
            </Column>
          </GridColumns>
        </FadeBox>
      </Column>
      {coverImage && coverImage.medium && (
        <Column height={[280, 480]} position="relative" span={6}>
          <SlideBox
            width="100%"
            opacity={active ? 1 : 0}
            right={active || !selected ? 0 : "-100%"}
          >
            <RouterLink to={href}>
              <Image
                src={coverImage.medium.src}
                srcSet={coverImage.medium.srcSet}
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                alt={name}
                width="100%"
                height={[280, 480]}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </RouterLink>
          </SlideBox>
        </Column>
      )}
    </GridColumns>
  )
}

export const ShowBannerFragmentContainer = createFragmentContainer(ShowBanner, {
  show: graphql`
    fragment ShowBanner_show on Show {
      slug
      name
      href
      isFairBooth
      exhibitionPeriod
      status
      description
      location {
        city
      }
      coverImage {
        medium: cropped(width: 600, height: 480) {
          src
          srcSet
        }
      }
    }
  `,
})
