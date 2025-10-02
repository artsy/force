import { Box, type BoxProps, Clickable, Message } from "@artsy/palette"
import type * as React from "react"
import styled from "styled-components"

interface ArtworkGridEmptyStateProps extends BoxProps {
  onClearFilters?: () => void
}

export const ArtworkGridEmptyState: React.FC<
  React.PropsWithChildren<ArtworkGridEmptyStateProps>
> = ({ onClearFilters, ...rest }) => (
  <Box width="100%" {...rest}>
    <Message width="100%">
      There aren‘t any works available that meet the following criteria at this
      time.{" "}
      {onClearFilters && (
        <>
          Change your filter criteria to view more works.{" "}
          <ResetFilterLink textDecoration="underline" onClick={onClearFilters}>
            Clear all filters
          </ResetFilterLink>
          .
        </>
      )}
    </Message>
  </Box>
)

export const ResetFilterLink = styled(Clickable)``

ResetFilterLink.displayName = "ResetFilterLink"
