import { Message } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

interface ArtworkGridEmptyStateProps {
  onClearFilters?: () => void
}

export const ArtworkGridEmptyState: React.SFC<ArtworkGridEmptyStateProps> = props => (
  <Message>
    <span>
      There aren't any works available that meet the following criteria at this
      time.
    </span>
    {props.onClearFilters && (
      <span>
        {" "}
        Change your filter criteria to view more works.{" "}
        <ResetFilterLink onClick={props.onClearFilters}>
          Clear all filters
        </ResetFilterLink>
        .
      </span>
    )}
  </Message>
)

export const ResetFilterLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

ResetFilterLink.displayName = "ResetFilterLink"
