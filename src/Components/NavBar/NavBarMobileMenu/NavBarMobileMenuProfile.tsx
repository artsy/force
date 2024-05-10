import { ModalBase, Text } from "@artsy/palette"
import { NavBarUserMenu } from "Components/NavBar/Menus"
import { NavBarMobileMenuIcon } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenu"
import { NavBarMobileMenuItemButton } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuItem"
import { FC } from "react"

interface NavBarMobileMenuProfileProps {
  onClose: () => void
  onNavButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const NavBarMobileMenuProfile: FC<NavBarMobileMenuProfileProps> = ({
  onClose,
  onNavButtonClick,
}) => {
  return (
    <ModalBase dialogProps={{ width: "100%", height: "100%", bg: "white100" }}>
      <Text variant="sm-display" width="100%" onClick={onNavButtonClick}>
        <NavBarMobileMenuItemButton
          position="absolute"
          top={0}
          right={0}
          width={60}
          height={60}
          px={0}
          py={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onClose}
          zIndex={2}
          bg="transparent"
          aria-label="Close menu"
        >
          <NavBarMobileMenuIcon open />
        </NavBarMobileMenuItemButton>

        <NavBarUserMenu />
      </Text>
    </ModalBase>
  )
}
