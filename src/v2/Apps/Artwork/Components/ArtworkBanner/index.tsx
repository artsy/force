import { ArtworkBanner_artwork } from "v2/__generated__/ArtworkBanner_artwork.graphql"
import { ArtworkBannerQuery } from "v2/__generated__/ArtworkBannerQuery.graphql"
import { SystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { Banner } from "./Banner"

export interface ArtworkBannerProps {
  artwork: ArtworkBanner_artwork
}

export const ArtworkBanner: React.SFC<ArtworkBannerProps> = props => {
  const { context, partner, sale } = props.artwork

  if (!context) {
    return null
  }

  switch (context.__typename) {
    case "Sale": {
      // @ts-expect-error STRICT_NULL_CHECK
      const auctionImage = get(sale, s => s.is_auction && s.cover_image.url)

      if (!sale) {
        return null
      }

      return (
        <Banner
          // @ts-expect-error STRICT_NULL_CHECK
          imageUrl={auctionImage}
          // @ts-expect-error STRICT_NULL_CHECK
          initials={partner && partner.initials}
          meta="In auction"
          // @ts-expect-error STRICT_NULL_CHECK
          name={context.name}
          // Do not display partner name for benefit or gallery auctions
          // @ts-expect-error STRICT_NULL_CHECK
          subHeadline={
            sale.isBenefit || sale.isGalleryAuction
              ? null
              : partner && partner.name
          }
          // @ts-expect-error STRICT_NULL_CHECK
          href={context.href}
        />
      )
    }
    case "Fair": {
      // @ts-expect-error STRICT_NULL_CHECK
      const fairImage = get(context, c => c.profile.icon.img.url)
      // @ts-expect-error STRICT_NULL_CHECK
      const initials = get(context, c => c.profile.initials)
      return (
        <Banner
          imageUrl={fairImage}
          // @ts-expect-error STRICT_NULL_CHECK
          initials={initials}
          meta="At fair"
          // @ts-expect-error STRICT_NULL_CHECK
          name={context.name}
          // @ts-expect-error STRICT_NULL_CHECK
          subHeadline={partner && partner.name}
          // @ts-expect-error STRICT_NULL_CHECK
          href={context.href}
        />
      )
    }
    case "Show": {
      // @ts-expect-error STRICT_NULL_CHECK
      const showImage = get(context, c => c.thumbnail.img.url)
      let showLine = "In current show"
      if (context.status === "upcoming") {
        showLine = "In upcoming show"
      } else if (context.status === "closed") {
        showLine = "In past show"
      }
      return (
        <Banner
          imageUrl={showImage}
          // @ts-expect-error STRICT_NULL_CHECK
          initials={partner && partner.initials}
          meta={showLine}
          // @ts-expect-error STRICT_NULL_CHECK
          name={context.name}
          // @ts-expect-error STRICT_NULL_CHECK
          subHeadline={partner && partner.name}
          // @ts-expect-error STRICT_NULL_CHECK
          href={context.href}
        />
      )
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
          initials
        }
        sale {
          is_auction: isAuction
          isBenefit
          isGalleryAuction
          cover_image: coverImage {
            url(version: "square")
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
              initials
              icon {
                img: resized(width: 70, height: 70, version: "square") {
                  url
                }
              }
            }
          }
          ... on Show {
            name
            href
            status
            thumbnail: coverImage {
              img: resized(width: 70, height: 70, version: "square") {
                url
              }
            }
          }
        }
      }
    `,
  }
)

export const ArtworkBannerQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<ArtworkBannerQuery>
      environment={relayEnvironment}
      variables={{ artworkID }}
      query={graphql`
        query ArtworkBannerQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ArtworkBanner_artwork
          }
        }
      `}
      render={renderWithLoadProgress(ArtworkBannerFragmentContainer)}
    />
  )
}
