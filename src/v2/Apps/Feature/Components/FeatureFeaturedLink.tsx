import React from "react"
import styled from "styled-components"
import {
  Flex,
  FlexProps,
  HTML,
  ResponsiveImage,
  Text,
  color,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FeatureFeaturedLink_featuredLink } from "v2/__generated__/FeatureFeaturedLink_featuredLink.graphql"

const Figure = styled(RouterLink)`
  display: block;
  position: relative;

  /* Inset border */
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: box-shadow 250ms;
  }

  &:hover::after {
    box-shadow: inset 0 0 0 1px ${color("black100")};
  }
`

const Title = styled(Text)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.25) 100%
  );
`

export interface FeatureFeaturedLinkProps extends FlexProps {
  size: "small" | "medium" | "large"
  featuredLink: FeatureFeaturedLink_featuredLink
}

export const FeatureFeaturedLink: React.FC<FeatureFeaturedLinkProps> = ({
  size,
  featuredLink,
  featuredLink: { href, title, subtitle, description, image },
  ...rest
}) => {
  return (
    <Flex flexDirection="column" {...rest}>
      {image ? (
        <Figure to={href}>
          <ResponsiveImage
            maxWidth="100%"
            src={image[size].src}
            ratio={image[size].height / image[size].width}
            style={{ backgroundColor: color("black10") }}
          />

          <Title variant="title" color="white100" p={2} pt={9}>
            {title}
          </Title>
        </Figure>
      ) : (
        <Text variant="title" color="black100" my={2}>
          <RouterLink to={href}>{title || "—"}</RouterLink>
        </Text>
      )}

      <Flex flexDirection={size === "large" ? ["column", "row"] : "column"}>
        {subtitle && (
          <Flex mt={2} flexBasis="50%">
            <HTML variant="mediumText" html={subtitle} />
          </Flex>
        )}

        {description && (
          <Flex mt={1} flexBasis="50%">
            <HTML variant="text" html={description} />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export const FeatureFeaturedLinkFragmentContainer = createFragmentContainer(
  FeatureFeaturedLink,
  {
    featuredLink: graphql`
      fragment FeatureFeaturedLink_featuredLink on FeaturedLink {
        href
        title
        subtitle(format: HTML)
        description(format: HTML)
        image {
          # 4:5 - 400×500 native max dimensions * 2 for retina
          small: cropped(width: 800, height: 1000, version: ["wide"]) {
            src: url
            width
            height
          }
          # 4:5 - 546×682.5 native max dimensions * 2 for retina
          medium: cropped(width: 1092, height: 1365, version: ["wide"]) {
            src: url
            width
            height
          }
          # 16:9 - 1112×626 native max dimensions * 2 for retina
          large: cropped(width: 2224, height: 1252, version: ["wide"]) {
            src: url
            width
            height
          }
        }
      }
    `,
  }
)
