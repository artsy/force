import { OtherAuctionsStoryQuery } from "v2/__generated__/OtherAuctionsStoryQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { OtherAuctionsFragmentContainer } from "../OtherAuctions"

const OtherAuctions = ({ size }: { size?: number }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<OtherAuctionsStoryQuery>
      environment={relayEnvironment}
      query={graphql`
        query OtherAuctionsStoryQuery($size: Int!) {
          salesConnection(first: $size, sort: TIMELY_AT_NAME_ASC) {
            # FIXME: Need to pluck just nodes and send as array.
            ...OtherAuctions_salesConnection
          }
        }
      `}
      variables={{ size: size || 20 }}
      render={renderWithLoadProgress(OtherAuctionsFragmentContainer as any)}
    />
  )
}

storiesOf("Apps/Artwork/Components/OtherAuctions", module)
  .add("Other Auctions (default)", () => {
    return (
      <Section title="Responsive Other Auctions">
        <OtherAuctions />
      </Section>
    )
  })
  .add("Other Auctions (many)", () => {
    return (
      <Section title="Responsive Other Auctions">
        <OtherAuctions size={40} />
      </Section>
    )
  })
