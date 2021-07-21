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

const Title = styled(Text).attrs({
  variant: "title",
})`
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

          <Title color="white100" p={2} pt={9}>
            {title}
          </Title>
        </Figure>
      )}

      {!img && title && (
        <Text variant="title" color="black100" my={2}>
          <RouterLink to={href}>{title || "—"}</RouterLink>
        </Text>
      )}

      <Flex flexDirection={size === "large" ? ["column", "row"] : "column"}>
        {subtitle && (
          <HTML variant="mediumText" html={subtitle} mt={2} flexBasis="50%" />
        )}

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
        subtitle(format: HTML)
        description(format: HTML)
        image {
          # 4:5
          small: cropped(width: 400, height: 500, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # 4:5
          medium: cropped(width: 546, height: 683, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # 16:9
          large: cropped(width: 1112, height: 626, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # ?:?
          full: resized(width: 1112, height: 1112, version: ["main", "wide"]) {
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
