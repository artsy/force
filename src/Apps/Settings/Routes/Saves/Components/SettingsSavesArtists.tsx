import {
  Box,
  Button,
  Join,
  Skeleton,
  SkeletonText,
  Spacer,
  Sup,
  Text,
} from "@artsy/palette"
import {
  ArtistRailFragmentContainer,
  ARTIST_RAIL_PLACEHOLDER,
} from "Components/ArtistRail"
import { FC, Fragment, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { SettingsSavesArtistsQuery } from "__generated__/SettingsSavesArtistsQuery.graphql"
import { SettingsSavesArtists_me$data } from "__generated__/SettingsSavesArtists_me.graphql"

interface SettingsSavesArtistsProps {
  me: SettingsSavesArtists_me$data
  relay: RelayPaginationProp
}

const SettingsSavesArtists: FC<SettingsSavesArtistsProps> = ({ me, relay }) => {
  const [loading, setLoading] = useState(false)

  const connection = me.followsAndSaves?.artistsConnection
  const followedArtists = extractNodes(me.followsAndSaves?.artistsConnection)
  const total = connection?.totalCount ?? 0

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(4, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Followed Artists {total > 0 && <Sup color="brand">{total}</Sup>}
      </Text>

      {followedArtists.length > 0 ? (
        <>
          <Join separator={<Spacer y={4} />}>
            {followedArtists.map(({ internalID, artist }) => {
              if (!artist) return null

              return (
                <ArtistRailFragmentContainer key={internalID} artist={artist} />
              )
            })}
          </Join>

          {relay.hasMore() && (
            <Box textAlign="center" mt={4}>
              <Button onClick={handleClick} loading={loading}>
                Show More
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Text variant={["md", "lg"]} color="black60">
          Nothing yet.
        </Text>
      )}
    </>
  )
}

export const SETTINGS_SAVES_ARTISTS_QUERY = graphql`
  query SettingsSavesArtistsQuery($after: String) {
    me {
      ...SettingsSavesArtists_me @arguments(after: $after)
    }
  }
`

export const SettingsSavesArtistsPaginationContainer = createPaginationContainer(
  SettingsSavesArtists,
  {
    me: graphql`
      fragment SettingsSavesArtists_me on Me
        @argumentDefinitions(after: { type: "String" }) {
        followsAndSaves {
          artistsConnection(first: 4, after: $after)
            @connection(key: "SettingsSavesArtists_artistsConnection") {
            totalCount
            edges {
              node {
                internalID
                artist {
                  ...ArtistRail_artist
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: SETTINGS_SAVES_ARTISTS_QUERY,
  }
)

const SETTINGS_SAVES_ARTISTS_PLACEHOLDER = (
  <>
    <Skeleton>
      <SkeletonText variant={["md", "lg"]} mb={4}>
        Followed Artists
      </SkeletonText>
    </Skeleton>

    <Join separator={<Spacer y={4} />}>
      {[...new Array(4)].map((_, i) => {
        return <Fragment key={i}>{ARTIST_RAIL_PLACEHOLDER}</Fragment>
      })}
    </Join>
  </>
)

export const SettingsSavesArtistsQueryRenderer = () => {
  return (
    <SystemQueryRenderer<SettingsSavesArtistsQuery>
      lazyLoad
      placeholder={SETTINGS_SAVES_ARTISTS_PLACEHOLDER}
      query={SETTINGS_SAVES_ARTISTS_QUERY}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return SETTINGS_SAVES_ARTISTS_PLACEHOLDER
        }

        return <SettingsSavesArtistsPaginationContainer me={props.me} />
      }}
    />
  )
}
