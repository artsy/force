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
import { RouterLink } from "System/Components/RouterLink"
import { ShowBanner_show$data } from "__generated__/ShowBanner_show.graphql"

const STATUS_LABELS = {
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
  show: ShowBanner_show$data
  selected?: boolean
  withAnimation?: boolean
}

const ShowBanner: React.FC<ShowBannerProps> = ({
  show,
  selected = false,
  withAnimation,
  ...rest
}) => {
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

  const [active, setActive] = useState(!withAnimation)

  useEffect(() => {
    if (withAnimation && selected !== active) {
      setActive(selected)
    }
  }, [withAnimation, selected, active])

  return (
    <GridColumns width="100%" gridRowGap={[4, 2]} {...rest}>
      <Column span={6}>
        <FadeBox opacity={active ? 1 : 0}>
          <Text textTransform="capitalize" variant="sm-display" mb={1}>
            {[STATUS_LABELS[status ?? ""], isFairBooth ? "fair booth" : "show"]
              .filter(Boolean)
              .join(" ")}
          </Text>

          <RouterLink to={href} textDecoration="none">
            {name && <Text variant="xl">{name}</Text>}

            {exhibitionPeriod && (
              <Text color="black60" variant="lg-display">
                {exhibitionPeriod}
              </Text>
            )}

            {location && location.city && (
              <Text
                color="black60"
                variant="lg-display"
                textTransform="capitalize"
              >
                {location.city}
              </Text>
            )}

            {description && (
              <Text variant="sm" mt={1}>
                <ReadMore maxChars={280} content={description} />
              </Text>
            )}
          </RouterLink>
          {href && (
            <GridColumns mt={[2, 4]}>
              <Column span={6}>
                <Button
                  width="100%"
                  // @ts-ignore
                  as={RouterLink}
                  to={href}
                >
                  View More
                </Button>
              </Column>
            </GridColumns>
          )}
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
                style={{
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
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
        medium: cropped(
          width: 910
          height: 480
          version: ["main", "normalized", "larger", "large"]
        ) {
          src
          srcSet
        }
      }
    }
  `,
})
