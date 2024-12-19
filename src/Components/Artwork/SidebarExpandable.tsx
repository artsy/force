import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Expandable, type ExpandableProps } from "@artsy/palette"
import { useTracking } from "react-tracking"

export const SidebarExpandable: React.FC<
  React.PropsWithChildren<Pick<ExpandableProps, "label" | "children">>
> = ({ label, children }) => {
  const { trackEvent } = useTracking()

  const handleToggle = (isExpanded: boolean) => {
    trackEvent({
      action: ActionType.toggledAccordion,
      context_module: ContextModule.artworkSidebar,
      context_owner_type: OwnerType.artwork,
      subject: label,
      expand: isExpanded,
    })
  }

  return (
    <Expandable label={label} borderColor="black10" onToggle={handleToggle}>
      {children}
    </Expandable>
  )
}
