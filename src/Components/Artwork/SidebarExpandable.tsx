import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Expandable, type ExpandableProps } from "@artsy/palette"
import { useTracking } from "react-tracking"

export const SidebarExpandable: React.FC<
  { labelTrackingText?: string } & React.PropsWithChildren<
    Pick<ExpandableProps, "label" | "children">
  >
> = ({ label, labelTrackingText, children }) => {
  const { trackEvent } = useTracking()

  const handleToggle = (isExpanded: boolean) => {
    trackEvent({
      action: ActionType.toggledAccordion,
      context_module: ContextModule.artworkSidebar,
      context_owner_type: OwnerType.artwork,
      subject: labelTrackingText ?? label,
      expand: isExpanded,
    })
  }

  return (
    <Expandable label={label} borderColor="mono10" onToggle={handleToggle}>
      {children}
    </Expandable>
  )
}
