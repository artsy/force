import * as React from "react"
import {
  Box,
  BoxProps,
  HTML,
  Join,
  Spacer,
  Text,
  FullBleed,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderFull_feature$data } from "__generated__/FeatureHeaderFull_feature.graphql"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
} from "Components/FullBleedHeader/FullBleedHeader"

export interface FeatureHeaderFullProps extends BoxProps {
  feature: FeatureHeaderFull_feature$data
}

export const FeatureHeaderFull: React.FC<FeatureHeaderFullProps> = ({
  feature: { name, subheadline, fullImage: image },
  ...rest
}) => {
  const hasImage = !!image?.url
  return (
    <Box {...rest}>
      {hasImage ? (
        <FullBleedHeader src={image.url}>
          <FullBleedHeaderOverlay
            alignItems="flex-start"
            flexDirection="column"
            color="white100"
            p={4}
          >
            <Text as="h1" variant={["xl", "xxl"]}>
              {name}
            </Text>

            {subheadline && (
              <Text
                variant={["md", "lg-display"]}
                color="rgba(255, 255, 255, 0.8)"
              >
                {subheadline}
              </Text>
            )}
          </FullBleedHeaderOverlay>
        </FullBleedHeader>
      ) : (
        <FullBleed px={4} pt={4}>
          <Join separator={<Spacer y={1} />}>
            <Text variant={["xl", "xxl"]} as="h1" textAlign="center">
              {name}
            </Text>

            {subheadline && (
              <HTML
                variant="sm-display"
                textAlign="center"
                html={subheadline}
              />
            )}
          </Join>
        </FullBleed>
      )}
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
          url(version: ["main", "source", "wide"])
        }
      }
    `,
  }
)
