import * as React from "react"
import styled from "styled-components"
import {
  Flex,
  FlexProps,
  Image,
  HTML,
  ResponsiveBox,
  Text,
  Spacer,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { FeatureFeaturedLink_featuredLink$data } from "__generated__/FeatureFeaturedLink_featuredLink.graphql"
import { themeGet } from "@styled-system/theme-get"

export type FeaturedLinkSize = "small" | "medium" | "large" | "full"

export interface FeatureFeaturedLinkProps extends FlexProps {
  size: FeaturedLinkSize
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
        <Text variant="lg-display" color="black100" my={2}>
          <RouterLink to={href}>{title || "—"}</RouterLink>
        </Text>
      )}

      <Flex flexDirection={size === "large" ? ["column", "row"] : "column"}>
        <Spacer y={1} />

        {subtitle && (
          <Text variant="xs" fontWeight="bold">
            {subtitle}
          </Text>
        )}

        <Text variant="lg-display" mt={0.5} lineClamp={3}>
          {title}
        </Text>

        {description &&
          (size === "full" ? (
            <HTML
              variant="lg-display"
              color="black60"
              mt={1}
              html={description}
            />
          ) : (
            <HTML variant="sm" color="black60" mt={0.5} html={description} />
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

const Figure = styled(RouterLink)<RouterLinkProps>`
  &:hover + div {
    color: ${themeGet("colors.blue100")};
  }
`
