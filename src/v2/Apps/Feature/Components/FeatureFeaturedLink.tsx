import * as React from "react"
import styled from "styled-components"
import {
  Col,
  Flex,
  FlexProps,
  Image,
  Grid,
  HTML,
  HTMLProps,
  ResponsiveBox,
  Row,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "v2/System/Router/RouterLink"
import { FeatureFeaturedLink_featuredLink$data } from "v2/__generated__/FeatureFeaturedLink_featuredLink.graphql"
import { themeGet } from "@styled-system/theme-get"

const Figure = styled(RouterLink)<RouterLinkProps>`
  &:hover + div {
    color: ${themeGet("colors.blue100")};
  }
`

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

export interface FeatureFeaturedLinkProps extends FlexProps {
  size: "small" | "medium" | "large" | "full"
  featuredLink: FeatureFeaturedLink_featuredLink$data
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
          <ResponsiveBox
            aspectWidth={img.width ?? 0}
            aspectHeight={img.height ?? 0}
            maxWidth="100%"
            bg="black10"
          >
            <Image
              src={img.src}
              srcSet={img.srcSet}
              alt={title ?? ""}
              width="100%"
              height="100%"
              lazyLoad
            />
          </ResponsiveBox>
        </Figure>
      )}

      {!img && title && (
        <Text variant="title" color="black100" my={2}>
          <RouterLink to={href}>{title || "—"}</RouterLink>
        </Text>
      )}

      <Flex flexDirection={size === "large" ? ["column", "row"] : "column"}>
        {subtitle && (
          <Text my={1} variant="xs" textTransform="uppercase">
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
        subtitle(format: PLAIN)
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
