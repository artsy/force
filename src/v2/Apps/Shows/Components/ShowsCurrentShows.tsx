import { Join, Separator } from "@artsy/palette"
import React from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShowsCurrentShowsQuery } from "v2/__generated__/ShowsCurrentShowsQuery.graphql"
import { ShowsCurrentShows_viewer } from "v2/__generated__/ShowsCurrentShows_viewer.graphql"
import {
  ShowsCurrentShowFragmentContainer,
  ShowsCurrentShowPlaceholder,
} from "./ShowsCurrentShow"

interface ShowsCurrentShowsProps {
  viewer: ShowsCurrentShows_viewer
  relay: RelayPaginationProp
}

const ShowsCurrentShows: React.FC<ShowsCurrentShowsProps> = ({
  viewer,
  relay,
}) => {
  const shows = extractNodes(viewer.showsConnection)

  return (
    <Join separator={<Separator my={6} />}>
      {shows.map(show => {
        return (
          <ShowsCurrentShowFragmentContainer
            key={show.internalID}
            show={show}
          />
        )
      })}
    </Join>
  )
}

const SHOWS_CURRENT_SHOWS_QUERY = graphql`
  query ShowsCurrentShowsQuery {
    viewer {
      ...ShowsCurrentShows_viewer
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
      environment={relayEnvironment}
      query={SHOWS_CURRENT_SHOWS_QUERY}
      placeholder={SHOWS_CURRENT_SHOWS_PLACEHOLDER}
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
