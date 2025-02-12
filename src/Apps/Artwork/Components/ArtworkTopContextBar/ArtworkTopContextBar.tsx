import { Box, Stack } from "@artsy/palette"
import { RegistrationAuctionTimerFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/RegistrationAuctionTimer"
import { StructuredData } from "Components/Seo/StructuredData"
import { TopContextBar } from "Components/TopContextBar"
import { getENV } from "Utils/getENV"
import type { ArtworkTopContextBar_artwork$data } from "__generated__/ArtworkTopContextBar_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtworkTopContextBarProps {
  artwork: ArtworkTopContextBar_artwork$data
}

export const ArtworkTopContextBar: React.FC<
  React.PropsWithChildren<ArtworkTopContextBarProps>
> = ({ artwork }) => {
  if (!artwork.artist) {
    return null
  }

  if (artwork.context?.__typename === "Sale") {
    const sale = artwork.context

    return (
      <TopContextBar
        href={sale.href}
        src={sale.coverImage?.url}
        rightContent={<RegistrationAuctionTimerFragmentContainer sale={sale} />}
      >
        <Stack gap={1} flexDirection="row">
          {sale.name}{" "}
          {sale.isBenefit || sale.isGalleryAuction || !sale.isAuction
            ? null
            : `- ${artwork.partner?.name}`}{" "}
          <Box as="span" color="black60">
            {sale.isAuction ? "In auction" : "In sale"}
          </Box>
        </Stack>
      </TopContextBar>
    )
  }

  return (
    <>
      <TopContextBar href={artwork.artist.href} displayBackArrow>
        {artwork.artist.name}
      </TopContextBar>

      <StructuredData
        schemaData={{
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": `${getENV("APP_URL")}${artwork.artist.href}`,
                name: artwork.artist.name,
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@id": `${getENV("APP_URL")}${artwork.href}`,
                name: artwork.title,
              },
            },
          ],
        }}
      />
    </>
  )
}

export const ArtworkTopContextBarFragmentContainer = createFragmentContainer(
  ArtworkTopContextBar,
  {
    artwork: graphql`
      fragment ArtworkTopContextBar_artwork on Artwork {
        href
        title
        artist {
          name
          href
        }
        partner {
          name
        }
        context {
          __typename
          ...RegistrationAuctionTimer_sale
          ... on Sale {
            name
            href
            isAuction
            isBenefit
            isGalleryAuction
            coverImage {
              url
            }
          }
        }
      }
    `,
  },
)
