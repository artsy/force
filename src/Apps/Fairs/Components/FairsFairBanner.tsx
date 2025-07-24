import { Box, type BoxProps, Image, ResponsiveBox, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { RouterLink } from "System/Components/RouterLink"
import type { FairsFairBanner_fair$data } from "__generated__/FairsFairBanner_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface FairsFairBannerProps extends BoxProps {
  fair: FairsFairBanner_fair$data
  lazyLoad?: boolean
}

const FairsFairBanner: React.FC<FairsFairBannerProps> = ({
  fair,
  lazyLoad = true,
  ...rest
}) => {
  const banner = fair.image?.cropped
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
              lazyLoad={lazyLoad}
              fetchPriority={lazyLoad ? "auto" : "high"}
            />

            <Overlay>
              <Text variant="lg-display" m={4} color="mono0">
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
        image {
          cropped(width: 910, height: 512, version: ["wide"]) {
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
  },
)

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
