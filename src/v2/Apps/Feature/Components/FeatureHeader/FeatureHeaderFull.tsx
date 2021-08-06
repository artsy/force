import React from "react"
import styled from "styled-components"
import { Box, BoxProps, HTML, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderFull_feature } from "v2/__generated__/FeatureHeaderFull_feature.graphql"
import { DESKTOP_NAV_BAR_HEIGHT, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"

const Figure = styled(Box)`
  overflow: hidden;

  > picture {
    width: 100%;
    height: 100%;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export interface FeatureHeaderFullProps extends BoxProps {
  feature: FeatureHeaderFull_feature
}

export const FeatureHeaderFull: React.FC<FeatureHeaderFullProps> = ({
  feature: { name, subheadline, fullImage: image },
  ...rest
}) => {
  return (
    <Box {...rest}>
      {image && (
        <Figure
          height={[
            `calc(95vh - ${MOBILE_NAV_HEIGHT}px)`,
            `calc(95vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`,
          ]}
          bg="black10"
        >
          <picture>
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <source srcSet={image.sm.srcSet} media="(max-width: 400px)" />
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <source srcSet={image.md.srcSet} media="(max-width: 1200px)" />
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <source srcSet={image.lg.srcSet} media="(min-width: 1200px)" />
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <Image src={image.sm.src} alt={name} loading="lazy" />
          </picture>
        </Figure>
      )}

      <Box p={4}>
        <Join separator={<Spacer my={1} />}>
          <Text
            variant="largeTitle"
            as="h1"
            fontSize="size10"
            textAlign="center"
          >
            {name}
          </Text>

          {subheadline && (
            <HTML variant="subtitle" textAlign="center" html={subheadline} />
          )}
        </Join>
      </Box>
    </Box>
  )
}

export const FeatureHeaderFullFragmentContainer = createFragmentContainer(
  FeatureHeaderFull,
  {
    feature: graphql`
      fragment FeatureHeaderFull_feature on Feature {
        name
        subheadline(format: HTML)
        fullImage: image {
          sm: cropped(width: 800, height: 400, version: ["main", "wide"]) {
            src
            srcSet
          }
          md: cropped(width: 1200, height: 600, version: ["main", "wide"]) {
            src
            srcSet
          }
          lg: cropped(width: 2000, height: 1000, version: ["main", "wide"]) {
            src
            srcSet
          }
        }
      }
    `,
  }
)
