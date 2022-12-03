import {
  ClickableProps,
  Box,
  Clickable,
  Flex,
  ChevronIcon,
  Text,
  Spacer,
} from "@artsy/palette"
import { useState } from "react"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
interface ExpandableProps extends ClickableProps {
  label: string
  expanded?: boolean
  children: React.ReactNode
}

/**
 * A toggleable component used to show / hide content.
 * Stolen from Palette's Expandable component, which wasn't quite flexible
 * enough for our needs.
 */
export const SidebarExpandable: React.FC<ExpandableProps> = ({
  label,
  expanded: defaultExpanded,
  children,
  disabled,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const { trackEvent } = useTracking()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setExpanded(prevExpanded => !prevExpanded)
    trackEvent({
      action: ActionType.toggledAccordion,
      context_module: ContextModule.artworkSidebar,
      context_owner_type: OwnerType.artwork,
      subject: label,
      expand: !expanded,
    })
    onClick && onClick(event)
  }

  return (
    <Box>
      <Clickable
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        disabled={disabled}
        aria-expanded={expanded}
        onClick={handleClick}
        my={2}
      >
        <Flex flex={1} display="flex" alignItems="center">
          <Text variant="sm-display">{label}</Text>
        </Flex>

        {!disabled && (
          <ChevronIcon
            direction={expanded ? "up" : "down"}
            width={14}
            height={14}
            ml={1}
            mr={1}
            aria-hidden="true"
          />
        )}
      </Clickable>

      {expanded &&
        (typeof children === "function"
          ? children({ setExpanded, expanded })
          : children)}
      <Spacer y={2} />
    </Box>
  )
}
