import { Pill, PillProps } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import {
  ActionType,
  ContextModule,
  SelectedSearchSuggestionQuickNavigationItem,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

type Label = SelectedSearchSuggestionQuickNavigationItem["label"]

interface QuickNavigationItemProps {
  label: Label
  to: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const QuickNavigationItem: FC<QuickNavigationItemProps & PillProps> = ({
  label,
  to,
  onClick,
  onMouseDown,
  ...rest
}) => {
  const { trackEvent } = useTracking()

  const track = () => {
    const event: SelectedSearchSuggestionQuickNavigationItem = {
      context_module: ContextModule.header,
      destination_path: to,
      action: ActionType.selectedSearchSuggestionQuickNavigationItem,
      label,
    }

    trackEvent(event)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    track()
    onClick?.(event)
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    onMouseDown?.(event)
  }

  return (
    <Pill
      as={RouterLink}
      // @ts-ignore
      to={to}
      mt={1}
      mr={1}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...rest}
    >
      {label}
    </Pill>
  )
}
