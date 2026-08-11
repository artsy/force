import { Skeleton } from "@artsy/palette"
import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "Components/Cells/CellArtist"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { AISearchArtistsRailQuery } from "__generated__/AISearchArtistsRailQuery.graphql"
import type { FC } from "react"
import { graphql } from "react-relay"

const PLACEHOLDER_COUNT = 6

interface AISearchArtistsRailProps {
  /** Gravity internalIDs, in the order the agent ranked them */
  artistIDs: string[]
  title: string
  subTitle?: string
}

export const AISearchArtistsRail: FC<AISearchArtistsRailProps> = ({
  artistIDs,
  title,
  subTitle,
}) => {
  const placeholder = <AISearchArtistsRailPlaceholder title={title} />

  return (
    <SystemQueryRenderer<AISearchArtistsRailQuery>
      placeholder={placeholder}
      query={graphql`
        query AISearchArtistsRailQuery($artistIDs: [String], $first: Int!) {
          artistsConnection(ids: $artistIDs, first: $first) {
            edges {
              node {
                internalID
                ...CellArtist_artist
              }
            }
          }
        }
      `}
      variables={{ artistIDs, first: artistIDs.length }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return placeholder
        }

        const artists = extractNodes(props.artistsConnection)
          .slice()
          .sort((a, b) => {
            return (
              artistIDs.indexOf(a.internalID) - artistIDs.indexOf(b.internalID)
            )
          })

        if (artists.length === 0) {
          return null
        }

        return (
          <Rail
            alignItems="flex-start"
            title={title}
            subTitle={subTitle}
            getItems={() => {
              return artists.map(artist => {
                return (
                  <CellArtistFragmentContainer
                    key={artist.internalID}
                    artist={artist}
                  />
                )
              })
            }}
          />
        )
      }}
    />
  )
}

const AISearchArtistsRailPlaceholder: FC<{ title: string }> = ({ title }) => {
  return (
    <Skeleton>
      <Rail
        alignItems="flex-start"
        title={title}
        getItems={() => {
          return [...new Array(PLACEHOLDER_COUNT)].map((_, i) => {
            return <CellArtistPlaceholder key={i} />
          })
        }}
      />
    </Skeleton>
  )
}
