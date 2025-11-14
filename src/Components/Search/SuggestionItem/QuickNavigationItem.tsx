import { RouterLink } from "System/Components/RouterLink"
import {
  ActionType,
  ContextModule,
  type SelectedSearchSuggestionQuickNavigationItem,
} from "@artsy/cohesion"
import { Pill, type PillProps } from "@artsy/palette"
import type { FC } from "react"
import { useTracking } from "react-tracking"

interface QuickNavigationItemProps {
  /**
   * Expand union for new options as needed (would need to update Cohesion's schema)
   */
  label: "Auction Results"
  to: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const QuickNavigationItem: FC<
  React.PropsWithChildren<QuickNavigationItemProps & PillProps>
> = ({ label, to, onClick, onMouseDown, ...rest }) => {
  const { trackEvent } = useTracking()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onClick?.(event)

    const payload: SelectedSearchSuggestionQuickNavigationItem = {
      action: ActionType.selectedSearchSuggestionQuickNavigationItem,
      context_module: ContextModule.header,
      destination_path: to,
      label,
    }

    trackEvent(payload)
  }

  // AutocompleteInput utilizes onMouseDown to handle selection typically.
  // These links are not part of normal option selection so we want to prevent that
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <Pill
      as={RouterLink}
      // @ts-expect-error
      to={to}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...rest}
    >
      {label}
    </Pill>
  )
}
