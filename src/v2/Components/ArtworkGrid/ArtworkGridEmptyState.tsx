import { Sticky } from "../Sticky"
import { Box, Clickable, Message } from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"

interface ArtworkGridEmptyStateProps {
  onClearFilters?: () => void
}

export const ArtworkGridEmptyState: React.FC<ArtworkGridEmptyStateProps> = props => (
  <Box width="100%" my={1}>
    <Sticky>
      {({ stuck }) => {
        return (
          <Box pt={stuck ? 1 : 0}>
            <Message width="100%">
              <>
                There aren't any works available that meet the following
                criteria at this time.
              </>
              {props.onClearFilters && (
                <>
                  Change your filter criteria to view more works.{" "}
                  <ResetFilterLink
                    textDecoration="underline"
                    onClick={props.onClearFilters}
                  >
                    Clear all filters
                  </ResetFilterLink>
                  .
                </>
              )}
            </Message>
          </Box>
        )
      }}
    </Sticky>
  </Box>
)

export const ResetFilterLink = styled(Clickable)``

ResetFilterLink.displayName = "ResetFilterLink"
