import * as React from "react"
import styled from "styled-components"
import { Flex, HTML, Text, FullBleed } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderDefault_feature$data } from "v2/__generated__/FeatureHeaderDefault_feature.graphql"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

const Container = styled(Flex)`
  width: 100%;
  flex: 1;
`

const Figure = styled(Flex)`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
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
  feature: FeatureHeaderDefault_feature$data
}

export const FeatureHeaderDefault: React.FC<FeatureHeaderDefaultProps> = ({
  feature: { name, subheadline, defaultImage: image },
}) => {
  const { desktop } = useNavBarHeight()

  if (image) {
    return (
      <FullBleed>
        <Container
          display={["block", "flex"]}
          height={["auto", !!image ? `calc(95vh - ${desktop}px)` : "50vh"]}
        >
          <Figure height={["50vh", "auto"]} backgroundColor="black10">
            <picture>
              <source srcSet={image.sm?.srcSet} media="(max-width: 400px)" />
              <source srcSet={image.md?.srcSet} media="(max-width: 1200px)" />
              <source srcSet={image.lg?.srcSet} media="(min-width: 1200px)" />
              <Image src={image.sm?.src} alt={name} loading="lazy" />
            </picture>
          </Figure>

          <Meta p={4} flexBasis={image ? "50%" : "100%"}>
            <Text variant="xxl" as="h1" textAlign="center">
              {name}
            </Text>
            {subheadline && (
              <HTML variant="md" html={subheadline} textAlign="center" mt={1} />
            )}
          </Meta>
        </Container>
      </FullBleed>
    )
  }

  return (
    <Text as="h1" variant={["xl", "xxl"]} mb={1} mt={4}>
      {name}
    </Text>
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
