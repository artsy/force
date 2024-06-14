import { Box, Button, Join, Separator } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ShowsCurrentShowsQuery } from "__generated__/ShowsCurrentShowsQuery.graphql"
import { ShowsCurrentShows_viewer$data } from "__generated__/ShowsCurrentShows_viewer.graphql"
import {
  ShowsCurrentShowFragmentContainer,
  ShowsCurrentShowPlaceholder,
} from "./ShowsCurrentShow"

interface ShowsCurrentShowsProps {
  viewer: ShowsCurrentShows_viewer$data
  relay: RelayPaginationProp
}

const ShowsCurrentShows: React.FC<ShowsCurrentShowsProps> = ({
  viewer,
  relay,
}) => {
  const shows = extractNodes(viewer.showsConnection)

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(10, error => {
      if (error) console.error(error)

      setLoading(false)
    })
  }

  return (
    <>
      <Join separator={<Separator my={6} />}>
        {shows.map(show => {
          return (
            <ShowsCurrentShowFragmentContainer
              key={show.internalID}
              show={show}
            />
          )
        })}

        {relay.hasMore() && (
          <Box textAlign="center">
            <Button
              onClick={handleClick}
              loading={loading}
              disabled={!relay.hasMore()}
            >
              Show More
            </Button>
          </Box>
        )}
      </Join>
    </>
  )
}

const SHOWS_CURRENT_SHOWS_QUERY = graphql`
  query ShowsCurrentShowsQuery($first: Int, $after: String) {
    viewer {
      ...ShowsCurrentShows_viewer @arguments(first: $first, after: $after)
    }
  }
`

const ShowsCurrentShowsPaginationContainer = createPaginationContainer(
  ShowsCurrentShows,
  {
    viewer: graphql`
      fragment ShowsCurrentShows_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
        showsConnection(
          first: $first
          after: $after
          displayable: true
          atAFair: false
          sort: END_AT_ASC
          status: CURRENT
          hasLocation: true
        ) @connection(key: "ShowsCurrentShowsQuery_showsConnection") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              internalID
              ...ShowsCurrentShow_show
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getVariables(_, { cursor: after }, { first }) {
      return { after, first }
    },
    getConnectionFromProps(props) {
      return props.viewer.showsConnection
    },
    query: SHOWS_CURRENT_SHOWS_QUERY,
  }
)

const SHOWS_CURRENT_SHOWS_PLACEHOLDER = (
  <Join separator={<Separator my={6} />}>
    <ShowsCurrentShowPlaceholder />
    <ShowsCurrentShowPlaceholder />
    <ShowsCurrentShowPlaceholder />
  </Join>
)

export const ShowsCurrentShowsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ShowsCurrentShowsQuery>
      lazyLoad
      environment={relayEnvironment}
      query={SHOWS_CURRENT_SHOWS_QUERY}
      placeholder={SHOWS_CURRENT_SHOWS_PLACEHOLDER}
      variables={{ first: 10 }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return SHOWS_CURRENT_SHOWS_PLACEHOLDER
        }

        if (props.viewer) {
          return <ShowsCurrentShowsPaginationContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
