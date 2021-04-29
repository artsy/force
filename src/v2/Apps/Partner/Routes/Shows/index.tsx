import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { Shows_partner } from "v2/__generated__/Shows_partner.graphql"
import { Column, GridColumns } from "@artsy/palette"
import {
  ShowBannerFragmentContainer,
  ShowCardFragmentContainer,
} from "../../Components/PartnerShows"

interface PartnerShowsProps {
  partner: Shows_partner
}

export const Shows: React.FC<PartnerShowsProps> = ({
  partner,
}): JSX.Element => {
  const {
    showsConnection: { edges: shows },
    featured: { edges: featuredShows },
  } = partner

  return (
    <>
      {featuredShows.length > 0 &&
        featuredShows[0].node &&
        featuredShows[0].node.isFeatured && (
          <ShowBannerFragmentContainer mt={4} show={featuredShows[0].node} />
        )}
      //TODO: implementing of shows tab in progress
      <GridColumns mt={6} gridRowGap={[2, 4]}>
        {shows.map(({ node: show }) => {
          return (
            <Column key={show.internalID} span={3}>
              <ShowCardFragmentContainer show={show} />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ShowsFragmentContainer = createFragmentContainer(Shows, {
  partner: graphql`
    fragment Shows_partner on Partner
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 18 }
        last: { type: "Int" }
        after: { type: "String" }
        before: { type: "String" }
      ) {
      featured: showsConnection(
        first: 1
        status: ALL
        sort: FEATURED_DESC_END_AT_DESC
        isDisplayable: true
      ) {
        edges {
          node {
            isFeatured
            ...ShowBanner_show
          }
        }
      }
      slug
      showsConnection(
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        edges {
          node {
            internalID
            ...ShowCard_show
          }
        }
      }
    }
  `,
})
