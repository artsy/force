import * as React from "react"
import { Box, BoxProps, Image, ResponsiveBox, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { FairsFairBanner_fair$data } from "__generated__/FairsFairBanner_fair.graphql"
import { themeGet } from "@styled-system/theme-get"

const Overlay = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  background: ${themeGet("effects.overlayGradient")};
  opacity: 0;
  transition: opacity 250ms;

  > div {
    transition: transform 250ms;
    transform: translateY(25%);
  }

  &:hover {
    opacity: 1;

    > div {
      transform: translateY(0);
    }
  }
`

interface FairsFairBannerProps extends BoxProps {
  fair: FairsFairBanner_fair$data
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
        display="block"
        textDecoration="none"
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
              alt=""
              lazyLoad
            />

            <Overlay>
              <Text variant="lg-display" m={4} color="white100">
                Explore the event
              </Text>
            </Overlay>
          </ResponsiveBox>
        )}

        <Box display="flex" alignItems="center" mt={1}>
          {icon && (
            <Box mr={2}>
              <Image
                width={icon.width}
                height={icon.height}
                src={icon.src}
                srcSet={icon.srcSet}
                alt={`Logo of ${fair.name}`}
              />
            </Box>
          )}

          <Box>
            <Text>{fair.name}</Text>

            <Text>{fair.exhibitionPeriod}</Text>
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
        exhibitionPeriod
        bannerSize
        image {
          large: cropped(width: 1840, height: 790, version: ["wide"]) {
            src
            srcSet
            width
            height
          }
          small: cropped(width: 910, height: 512, version: ["wide"]) {
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
