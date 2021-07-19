import { Box, BoxProps, Image, ResponsiveBox, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FairsFairBanner_fair } from "v2/__generated__/FairsFairBanner_fair.graphql"

const Overlay = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 250ms;

  &:hover {
    opacity: 1;
  }
`

interface FairsFairBannerProps extends BoxProps {
  fair: FairsFairBanner_fair
}

const FairsFairBanner: React.FC<FairsFairBannerProps> = ({ fair, ...rest }) => {
  const banner =
    fair.image &&
    (fair.bannerSize === "x-large" ? fair.image.large : fair.image.small)

  const icon = fair?.profile?.icon?.resized

  return (
    <Box {...rest}>
      <RouterLink
        to={fair.href}
        style={{ display: "block", textDecoration: "none" }}
        aria-label={`Go to ${fair.name}`}
      >
        {banner && (
          <ResponsiveBox
            position="relative"
            aspectWidth={banner.width}
            aspectHeight={banner.height}
            maxWidth="100%"
            borderRadius={2}
            overflow="hidden"
          >
            <Image
              width="100%"
              height="100%"
              src={banner.src}
              srcSet={banner.srcSet}
              // @ts-expect-error STRICT_NULL_CHECK
              alt={fair.name}
              lazyLoad
            />

            <Overlay>
              <Text variant="subtitle" m={3} color="white100">
                Explore the event
              </Text>
            </Overlay>
          </ResponsiveBox>
        )}

        <Box display="flex" alignItems="center">
          {icon && (
            <Box mr={3}>
              <Image
                width={icon.width}
                height={icon.height}
                src={icon.src}
                srcSet={icon.srcSet}
                alt={`Logo of ${fair.name}`}
              />
            </Box>
          )}

          <Box my={3}>
            <Text>{fair.name}</Text>

            <Text>
              {fair.startAt} – {fair.endAt}
            </Text>
          </Box>
        </Box>
      </RouterLink>
    </Box>
  )
}

export const FairsFairBannerFragmentContainer = createFragmentContainer(
  FairsFairBanner,
  {
    fair: graphql`
      fragment FairsFairBanner_fair on Fair {
        href
        name
        startAt(format: "MMM Do")
        endAt(format: "MMM Do YYYY")
        bannerSize
        image {
          large: cropped(width: 1112, height: 477, version: ["wide"]) {
            src
            srcSet
            width
            height
          }
          small: cropped(width: 556, height: 313, version: ["wide"]) {
            src
            srcSet
            width
            height
          }
        }
        profile {
          icon {
            resized(width: 80, height: 80, version: "square140") {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
