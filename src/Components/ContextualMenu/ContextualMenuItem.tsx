import { Separator } from "@artsy/palette"
import {
  NavBarMenuItemButton,
  NavBarMenuItemLink,
} from "Components/NavBar/Menus/NavBarMenuItem"

export const ContextualMenuItemButton = NavBarMenuItemButton
export const ContextualMenuItemLink = NavBarMenuItemLink

export const ContextualMenuDivider: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <Separator color="mono10" as="hr" width="100%" />
}
