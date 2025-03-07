import { StructuredData } from "Components/Seo/StructuredData"
import { TopContextBar } from "Components/TopContextBar"
import { getENV } from "Utils/getENV"
import type { ArtworkTopContextBarBreadcrumb_artwork$data } from "__generated__/ArtworkTopContextBarBreadcrumb_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtworkTopContextBarBreadcrumbProps {
  artwork: ArtworkTopContextBarBreadcrumb_artwork$data
}

export const ArtworkTopContextBarBreadcrumb: React.FC<
  React.PropsWithChildren<ArtworkTopContextBarBreadcrumbProps>
> = ({ artwork }) => {
  if (!artwork.artist) {
    return null
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

export const ArtworkTopContextBarBreadcrumbFragmentContainer =
  createFragmentContainer(ArtworkTopContextBarBreadcrumb, {
    artwork: graphql`
      fragment ArtworkTopContextBarBreadcrumb_artwork on Artwork {
        internalID
        href
        title
        artist {
          name
          href
        }
      }
    `,
  })
