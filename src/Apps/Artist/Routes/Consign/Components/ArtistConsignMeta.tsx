import * as React from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "Utils/getENV"
import { ArtistConsignMeta_artist$data } from "__generated__/ArtistConsignMeta_artist.graphql"
import { get } from "Utils/get"
import { MetaTags } from "Components/MetaTags"

interface ArtistConsignMetaProps {
  artist: ArtistConsignMeta_artist$data
}

export const ArtistConsignMeta: React.FC<ArtistConsignMetaProps> = props => {
  const {
    artist: { name, href, targetSupply },
  } = props

  const imageURL = get(
    targetSupply,
    p => p?.microfunnel?.artworksConnection?.edges?.[0]?.node?.image?.imageURL
  )

  const title = `Sell Works by ${name}`
  const description = `Learn more about the market for ${name} works and receive a price estimate. Submit a work from ${name} for consignment, and our experts will guide you through selling with an auction house, gallery, or private collector.`

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        pathname={`${href}/consign`}
        imageURL={imageURL}
      />

      <Meta
        property="og:type"
        content={`${getENV("FACEBOOK_APP_NAMESPACE")}:artwork`}
      />
    </>
  )
}

export const ArtistConsignMetaFragmentContainer = createFragmentContainer(
  ArtistConsignMeta,
  {
    artist: graphql`
      fragment ArtistConsignMeta_artist on Artist {
        name
        href
        targetSupply {
          microfunnel {
            artworksConnection {
              edges {
                node {
                  image {
                    imageURL: url(version: "medium")
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
