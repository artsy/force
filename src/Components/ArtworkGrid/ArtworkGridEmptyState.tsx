import { Box, type BoxProps, Clickable } from "@artsy/palette"
import { EmptyState } from "Components/EmptyState"
import type * as React from "react"
import styled from "styled-components"

interface ArtworkGridEmptyStateProps extends BoxProps {
  onClearFilters?: () => void
}

export const ArtworkGridEmptyState: React.FC<
  React.PropsWithChildren<ArtworkGridEmptyStateProps>
> = ({ onClearFilters, ...rest }) => (
  <Box width="100%" {...rest}>
    <EmptyState
      title="There aren’t any works available that meet the following criteria at this time."
      description={
        onClearFilters && "Change your filter criteria to view more works."
      }
      action={
        onClearFilters && {
          label: "Clear all filters",
          onClick: onClearFilters,
        }
      }
    />
  </Box>
)

export const ResetFilterLink = styled(Clickable)``

ResetFilterLink.displayName = "ResetFilterLink"
