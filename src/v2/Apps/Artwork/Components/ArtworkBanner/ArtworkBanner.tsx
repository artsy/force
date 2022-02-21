import { ArtworkBanner_artwork$data } from "v2/__generated__/ArtworkBanner_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  ChevronIcon,
  Column,
  Flex,
  GridColumns,
  Image,
  Text,
} from "@artsy/palette"
import { TopContextBar } from "v2/Components/TopContextBar"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface ArtworkBannerProps {
  artwork: ArtworkBanner_artwork$data
}

export const ArtworkBanner: React.FC<ArtworkBannerProps> = props => {
  const bannerProps = computeBannerProps(props)

  if (!bannerProps) {
    return null
  }

  const { image, meta, name, subHeadline, href } = bannerProps
  const isShow = props.artwork?.context?.__typename === "Show"

  return (
    <TopContextBar>
      <RouterLink to={href} display="block" textDecoration="none">
        <GridColumns>
          <Column span={8}>
            <Flex alignItems="center">
              {isShow ? (
                <ChevronIcon direction="left" height="14px" mr={1} />
              ) : (
                image && (
                  <Image
                    src={image.src}
                    srcSet={image.srcSet}
                    width={image.width}
                    height={image.height}
                    mr={1}
                    alt=""
                  />
                )
              )}

              <Text variant="xs" lineHeight={1} lineClamp={2}>
                {[name, subHeadline].filter(Boolean).join(" - ")}

                <Box as="span" display="inline-block" color="black60" ml={0.5}>
                  {meta}
                </Box>
              </Text>
            </Flex>
          </Column>
        </GridColumns>
      </RouterLink>
    </TopContextBar>
  )
}

const computeBannerProps = (props: ArtworkBannerProps) => {
  const { context, partner, sale } = props.artwork

  if (!context) {
    return null
  }

  switch (context.__typename) {
    case "Sale": {
      if (!sale) {
        return null
      }

      return {
        image: sale.coverImage?.cropped,
        meta: "In auction",
        name: context.name,
        subHeadline:
          sale.isBenefit || sale.isGalleryAuction ? null : partner?.name,
        href: context.href,
      }
    }
    case "Fair": {
      return {
        image: context.profile?.icon?.cropped,
        meta: "At fair",
        name: context.name,
        subHeadline: partner?.name,
        href: context.href,
      }
    }
    case "Show": {
      let meta = "In current show"
      if (context.status === "upcoming") {
        meta = "In upcoming show"
      } else if (context.status === "closed") {
        meta = "In past show"
      }

      return {
        image: context.thumbnail?.cropped,
        meta,
        name: context.name,
        subHeadline: partner?.name,
        href: context.href,
      }
    }
    default: {
      return null
    }
  }
}

export const ArtworkBannerFragmentContainer = createFragmentContainer(
  ArtworkBanner,
  {
    artwork: graphql`
      fragment ArtworkBanner_artwork on Artwork {
        partner {
          name
        }
        sale {
          isAuction
          isBenefit
          isGalleryAuction
          coverImage {
            cropped(width: 30, height: 30, version: "square") {
              src
              srcSet
              width
              height
            }
          }
        }
        context {
          __typename
          ... on Sale {
            name
            href
          }
          ... on Fair {
            name
            href
            profile {
              icon {
                cropped(width: 30, height: 30, version: "square") {
                  src
                  srcSet
                  width
                  height
                }
              }
            }
          }
          ... on Show {
            name
            href
            status
            thumbnail: coverImage {
              cropped(width: 30, height: 30, version: "square") {
                src
                srcSet
                width
                height
              }
            }
          }
        }
      }
    `,
  }
)
