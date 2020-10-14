import React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "v2/Utils/getENV"

import { ArtistConsignMeta_artist } from "v2/__generated__/ArtistConsignMeta_artist.graphql"
import { get } from "v2/Utils/get"

interface ArtistConsignMeta {
  artist: ArtistConsignMeta_artist
}

export const ArtistConsignMeta: React.FC<ArtistConsignMeta> = props => {
  const {
    artist: { name, href, targetSupply },
  } = props

  const imageURL = get(
    targetSupply,
    p => p.microfunnel.artworks[0].artwork.image.imageURL
  )

  const appURL = getENV("APP_URL")
  const title = `Sell Works by ${name}`
  const description = `Learn more about the market for ${name} works and receive a price estimate. Submit a work from ${name} for consignment, and our experts will guide you through selling with an auction house, gallery, or private collector.`

  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      {imageURL && <Meta name="thumbnail" content={imageURL} />}
      <Meta property="twitter:description" content={description} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:url" content={`${appURL}${href}/consign`} />
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
            artworks {
              artwork {
                image {
                  imageURL: url(version: "medium")
                }
              }
            }
          }
        }
      }
    `,
  }
)
