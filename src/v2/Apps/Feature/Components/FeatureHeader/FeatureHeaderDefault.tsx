import React from "react"
import styled from "styled-components"
import { Flex, HTML, Join, Spacer, Text, color } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderDefault_feature } from "v2/__generated__/FeatureHeaderDefault_feature.graphql"
import { DESKTOP_NAV_BAR_HEIGHT } from "v2/Components/NavBar"

const Container = styled(Flex)`
  width: 100%;
  flex: 1;
  border-bottom: 1px solid ${color("black100")};
`

const Figure = styled(Flex)`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: ${color("black10")};
  overflow: hidden;

  > picture {
    width: 100%;
    height: 100%;
  }
`

const Meta = styled(Flex)`
  flex-shrink: 1;
  flex-grow: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export interface FeatureHeaderDefaultProps {
  feature: FeatureHeaderDefault_feature
}

export const FeatureHeaderDefault: React.FC<FeatureHeaderDefaultProps> = ({
  feature: { name, subheadline, defaultImage: image },
}) => {
  return (
    <Container
      display={["block", "flex"]}
      height={[
        "auto",
        !!image ? `calc(95vh - ${DESKTOP_NAV_BAR_HEIGHT}px)` : "50vh",
      ]}
    >
      {image && (
        <Figure height={["50vh", "auto"]}>
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

      <Meta p={4} flexBasis={image ? "50%" : "100%"}>
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
      </Meta>
    </Container>
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
          sm: cropped(width: 400, height: 400, version: ["main", "wide"]) {
            src
            srcSet
          }
          md: cropped(width: 600, height: 600, version: ["main", "wide"]) {
            src
            srcSet
          }
          lg: cropped(width: 1000, height: 1000, version: ["main", "wide"]) {
            src
            srcSet
          }
        }
      }
    `,
  }
)
