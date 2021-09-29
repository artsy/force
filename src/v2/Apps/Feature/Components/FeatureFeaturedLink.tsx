import React from "react"
import styled from "styled-components"
import {
  Col,
  Flex,
  FlexProps,
  Grid,
  HTML,
  HTMLProps,
  ResponsiveBox,
  ResponsiveBoxProps,
  Row,
  Text,
  color,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FeatureFeaturedLink_featuredLink } from "v2/__generated__/FeatureFeaturedLink_featuredLink.graphql"
import { themeGet } from "@styled-system/theme-get"

const FullHTML = styled(HTML)<HTMLProps>`
  > blockquote {
    font-size: ${themeGet("fontSizes.size10")};
    font-family: ${themeGet("fonts.serif")};
    letter-spacing: ${themeGet("letterSpacings.tight")};
    line-height: ${themeGet("lineHeights.solid")};

    @media (max-width: ${themeGet("breakpoints.xs")}) {
      font-size: ${themeGet("fontSizes.size8")};
    }
  }
`

const ResponsiveImage = styled(ResponsiveBox)<ResponsiveBoxProps>`
  img {
    width: 100%;
    height: 100%;
  }
`

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

export interface FeatureFeaturedLinkProps extends FlexProps {
  size: "small" | "medium" | "large" | "full"
  featuredLink: FeatureFeaturedLink_featuredLink
}

export const FeatureFeaturedLink: React.FC<FeatureFeaturedLinkProps> = ({
  size,
  featuredLink,
  featuredLink: { href, title, subtitle, description, image },
  ...rest
}) => {
  const img = image && image[size]

  return (
    <Flex flexDirection="column" {...rest}>
      {img && (
        <Figure to={href}>
          <ResponsiveImage
            // @ts-expect-error STRICT_NULL_CHECK
            aspectWidth={img.width}
            // @ts-expect-error STRICT_NULL_CHECK
            aspectHeight={img.height}
            maxWidth="100%"
            bg="black10"
          >
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            <img src={img.src} srcSet={img.srcSet} alt={title} />
          </ResponsiveImage>
        </Figure>
      )}

      {!img && title && (
        <Text variant="title" color="black100" my={2}>
          <RouterLink to={href}>{title || "—"}</RouterLink>
        </Text>
      )}

      <Flex flexDirection={size === "large" ? ["column", "row"] : "column"}>
        {subtitle && (
          <Text my={1} variant={["xs", "xs"]} textTransform="uppercase">
            {subtitle}
          </Text>
        )}

        <Text variant="xl">{title}</Text>

        {description &&
          (size === "full" ? (
            <Grid>
              <Row>
                <Col sm={8} mx="auto">
                  <FullHTML variant="largeTitle" html={description} mt={1} />
                </Col>
              </Row>
            </Grid>
          ) : (
            <HTML variant="text" html={description} mt={1} flexBasis="50%" />
          ))}
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
        subtitle
        description(format: HTML)
        image {
          # 9:16
          small: cropped(width: 335, height: 240, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # 4:5
          medium: cropped(width: 452, height: 324, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # 16:9
          large: cropped(width: 904, height: 648, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # ?:?
          full: resized(width: 1085, height: 777, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)
