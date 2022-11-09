import { Box, BoxProps, Clickable, Message } from "@artsy/palette"
import { Sticky } from "Components/Sticky"
import * as React from "react"
import styled from "styled-components"

interface ArtworkGridEmptyStateProps extends BoxProps {
  onClearFilters?: () => void
}

export const ArtworkGridEmptyState: React.FC<ArtworkGridEmptyStateProps> = ({
  onClearFilters,
  ...rest
}) => (
  <Box width="100%" {...rest}>
    <Sticky>
      {({ stuck }) => {
        return (
          <Box pt={stuck ? 1 : 0}>
            <Message width="100%">
              There aren't any works available that meet the following criteria
              at this time.{" "}
              {onClearFilters && (
                <>
                  Change your filter criteria to view more works.{" "}
                  <ResetFilterLink
                    textDecoration="underline"
                    onClick={onClearFilters}
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
