import React from "react"
import { graphql } from "react-relay"

import { MarketDataSummaryContentsQuery } from "v2/__generated__/MarketDataSummaryContentsQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import MarketDataSummary from "./MarketDataSummary"

export interface Props extends SystemContextProps {
  artistID: string
}

class MarketDataSummaryContents extends React.Component<Props, null> {
  render() {
    const { artistID, relayEnvironment } = this.props
    return (
      <QueryRenderer<MarketDataSummaryContentsQuery>
        environment={relayEnvironment}
        query={graphql`
          query MarketDataSummaryContentsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...MarketDataSummary_artist
            }
          }
        `}
        variables={{ artistID }}
        render={({ props }) => {
          if (props) {
            return <MarketDataSummary artist={props.artist} />
          } else {
            return null
          }
        }}
      />
    )
  }
}

export const Contents = withSystemContext(MarketDataSummaryContents)
