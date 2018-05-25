import React from 'react'
import { ArtistArtworks } from './ArtistArtworks'
import { createFragmentContainer, graphql } from 'react-relay'

export const ArtistRoute = createFragmentContainer(
  ({ artist, children }) => {
    return (
      <div>
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>

        {children}

        <ArtistArtworks artworks={artist.artworks} />
      </div>
    )
  },
  graphql`
    fragment ArtistRoute_artist on Artist {
      id
      name
      bio
      artworks {
        ...ArtistArtworks_artworks
      }
    }
  `
)
