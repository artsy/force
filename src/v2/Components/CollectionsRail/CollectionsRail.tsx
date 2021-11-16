import { Box, Flex, Sans, Spacer, space } from "@artsy/palette"
import { CollectionsRail_collections } from "v2/__generated__/CollectionsRail_collections.graphql"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { pMedia } from "v2/Components/Helpers"
import { once } from "lodash"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import Events from "v2/Utils/Events"
import { CollectionEntityFragmentContainer as CollectionEntity } from "./CollectionEntity"

interface CollectionRailsProps {
  collections: CollectionsRail_collections
}

/**
 *
 * TODO: Replace Helper Media with palette Media when a/b test closes.
 *
 */
const RailsWrapper = styled(Flex)`
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
  flex-direction: column;

  ${pMedia.xl`
    padding: ${space(4)}px;
  `};
  ${pMedia.sm`
    padding: ${space(4)}px ${space(2)}px;
  `};
`

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class CollectionsRail extends Component<CollectionRailsProps> {
  @track({
    action_type: Schema.ActionType.Impression,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Article,
  })
  trackImpression() {
    // noop
  }

  render() {
    const { collections } = this.props
    return (
      <RailsWrapper pb={3}>
        <Waypoint onEnter={once(this.trackImpression.bind(this))} />
        <Sans size={["6", "8"]}>Shop works from curated collections</Sans>
        <Spacer mb={3} />
        <Flex flexWrap="wrap">
          {collections.map((collection, index) => {
            const shouldAddPadding = index % 2 === 0
            return (
              <Box
                width={["100%", "50%"]}
                key={index}
                pr={[0, shouldAddPadding ? 2 : 0]}
              >
                <CollectionEntity collection={collection} />
              </Box>
            )
          })}
        </Flex>
      </RailsWrapper>
    )
  }
}

export const CollectionsRailFragmentContainer = createFragmentContainer(
  CollectionsRail,
  {
    collections: graphql`
      fragment CollectionsRail_collections on MarketingCollection
        @relay(plural: true) {
        ...CollectionEntity_collection
      }
    `,
  }
)
