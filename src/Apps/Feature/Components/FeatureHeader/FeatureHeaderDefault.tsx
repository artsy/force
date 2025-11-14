import { useFullBleedHeaderHeight } from "Components/FullBleedHeader/FullBleedHeader"
import { Box, Flex, FullBleed, HTML, Image, Text } from "@artsy/palette"
import type { FeatureHeaderDefault_feature$data } from "__generated__/FeatureHeaderDefault_feature.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface FeatureHeaderDefaultProps {
  feature: FeatureHeaderDefault_feature$data
}

export const FeatureHeaderDefault: React.FC<
  React.PropsWithChildren<FeatureHeaderDefaultProps>
> = ({ feature: { name, subheadline, defaultImage: image } }) => {
  const height = useFullBleedHeaderHeight()

  return (
    <FullBleed display="flex" flexDirection={["column-reverse", "row"]}>
      <Flex
        flexDirection="column"
        justifyContent="flex-end"
        flex={1}
        p={[2, 4]}
      >
        <Box>
          <Text as="h1" variant={["xl", "xxl"]}>
            {name}
          </Text>

          {subheadline && (
            <HTML
              variant={["md", "lg-display"]}
              color="mono60"
              html={subheadline}
            />
          )}
        </Box>
      </Flex>

      {image?.resized && (
        <Box flex={1} bg="mono10">
          <Image
            src={image.resized.src}
            srcSet={image.resized.srcSet}
            width="100%"
            height={height}
            style={{ objectFit: "cover" }}
            alt=""
            lazyLoad
          />
        </Box>
      )}
    </FullBleed>
  )
}

export const FeatureHeaderDefaultFragmentContainer = createFragmentContainer(
  FeatureHeaderDefault,
  {
    feature: graphql`
      fragment FeatureHeaderDefault_feature on Feature {
        name
        subheadline(format: HTML)
        defaultImage: image {
          resized(width: 900, version: ["main", "source", "wide"]) {
            src
            srcSet
          }
        }
      }
    `,
  },
)
