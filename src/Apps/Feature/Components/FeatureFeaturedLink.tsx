import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import {
  Flex,
  type FlexProps,
  HTML,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { FeatureFeaturedLink_featuredLink$data } from "__generated__/FeatureFeaturedLink_featuredLink.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

export type FeaturedLinkSize = "small" | "medium" | "large" | "full"

export interface FeatureFeaturedLinkProps extends FlexProps {
  size: FeaturedLinkSize
  featuredLink: FeatureFeaturedLink_featuredLink$data
}

export const FeatureFeaturedLink: React.FC<
  React.PropsWithChildren<FeatureFeaturedLinkProps>
> = ({
  size,
  featuredLink,
  featuredLink: { href, title, subtitle, description, image },
  ...rest
}) => {
  const img = image && image[size]

  return (
    <Flex flexDirection="column" {...rest}>
      <Figure to={href} display="block" textDecoration="none">
        {img && (
          <ResponsiveBox
            aspectWidth={img.width ?? 0}
            aspectHeight={img.height ?? 0}
            maxWidth="100%"
            bg="mono10"
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
        )}

        {!img && title && (
          <Text variant="lg-display" color="mono100" my={2}>
            {title || "—"}
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
        </Flex>
      </Figure>
      {description &&
        (size === "full" ? (
          <HTML variant="lg-display" color="mono60" mt={1} html={description} />
        ) : (
          <HTML variant="sm" color="mono60" mt={0.5} html={description} />
        ))}
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
          small: cropped(width: 670, height: 480, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # 4:5
          medium: cropped(width: 904, height: 648, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # 16:9
          large: cropped(width: 1808, height: 1296, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
          # ?:?
          full: resized(width: 2170, height: 1554, version: ["main", "wide"]) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  },
)

const Figure = styled(RouterLink)<RouterLinkProps>`
  &:hover {
    color: ${themeGet("colors.blue100")};
  }
`
