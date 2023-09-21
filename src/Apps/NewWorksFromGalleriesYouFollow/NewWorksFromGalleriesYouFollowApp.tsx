import { Box, Button, Spacer, Text } from "@artsy/palette"

import { MetaTags } from "Components/MetaTags"
import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { NewWorksFromGalleriesYouFollowApp_me$data } from "__generated__/NewWorksFromGalleriesYouFollowApp_me.graphql"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { ContextModule, AuthContextModule } from "@artsy/cohesion"
import { LogInPrompt } from "Apps/Components/LogInPrompt"

export interface NewWorksFromGalleriesYouFollowAppProps {
  me: NewWorksFromGalleriesYouFollowApp_me$data
  relay: RelayPaginationProp
}

const NewWorksFromGalleriesYouFollowApp: FC<NewWorksFromGalleriesYouFollowAppProps> = ({
  me,
  relay,
}) => {
  const [isLoading, setLoading] = useState(false)

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(25, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  const artworksConnection = me?.newWorksFromGalleriesYouFollowConnection

  return (
    <>
      <MetaTags
        title="New Works from Galleries You Follow | Artsy"
        pathname="/new-works-from-galleries-you-follow"
      />

      <Spacer y={4} />

      <Text variant="xl" as="h1">
        New Works from Galleries You Follow
      </Text>

      <Spacer y={4} />

      <LogInPrompt
        contextModule={
          ContextModule.newWorksByGalleriesYouFollowRail as AuthContextModule
        }
      />

      {artworksConnection?.totalCount ? (
        <>
          <ArtworkGrid
            artworks={artworksConnection}
            columnCount={[2, 3, 3, 4]}
            to={artwork => `/artwork/${artwork.internalID}`}
            onLoadMore={handleLoadMore}
          />

          {relay.hasMore() && (
            <Box textAlign="center" mt={4}>
              <Button onClick={handleLoadMore} loading={isLoading}>
                Show More
              </Button>
            </Box>
          )}
        </>
      ) : me ? (
        <Text variant="lg" mt={4} color="black60">
          Nothing yet.
        </Text>
      ) : null}
    </>
  )
}

export const NewWorksFromGalleriesYouFollowAppPaginationContainer = createPaginationContainer(
  NewWorksFromGalleriesYouFollowApp,
  {
    me: graphql`
      fragment NewWorksFromGalleriesYouFollowApp_me on Me
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 25 }
          cursor: { type: "String" }
        ) {
        newWorksFromGalleriesYouFollowConnection(first: $count, after: $cursor)
          @connection(
            key: "NewWorksFromGalleriesYouFollowApp_newWorksFromGalleriesYouFollowConnection"
          ) {
          ...ArtworkGrid_artworks
          totalCount
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query NewWorksFromGalleriesYouFollowAppQuery(
        $count: Int!
        $cursor: String
      ) {
        me {
          ...NewWorksFromGalleriesYouFollowApp_me
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
