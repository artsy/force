import { Intent, ContextModule } from "@artsy/cohesion"
import {
  Box,
  ChevronIcon,
  CloseIcon,
  color,
  Flex,
  MenuIcon,
  Sans,
  Separator,
} from "@artsy/palette"
import { AnalyticsSchema, useSystemContext } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics"
import { ModalType } from "v2/Components/Authentication/Types"
import { LinkData, MenuData, MenuLinkData } from "v2/Components/NavBar/menuData"
import React from "react"
import styled from "styled-components"
import { getMobileAuthLink } from "v2/Utils/openAuthModal"
import { userHasLabFeature } from "v2/Utils/user"
import { MobileLink } from "./MobileLink"
import {
  NavigatorContextProvider,
  useNavigation,
} from "./NavigatorContextProvider"
interface Props {
  isOpen: boolean
  menuData: MenuData
  onNavButtonClick?: (event) => void
}

export const MobileNavMenu: React.FC<Props> = props => {
  const {
    menuData: {
      links: [artworks, artists],
    },
    onNavButtonClick,
  } = props
  const { user } = useSystemContext()

  return (
    <NavigatorContextProvider>
      <MenuViewport onClick={onNavButtonClick}>
        <AnimatingMenuWrapper isOpen={props.isOpen}>
          <ul>
            <MobileSubmenuLink menu={(artworks as MenuLinkData).menu}>
              {(artworks as MenuLinkData).menu.title}
            </MobileSubmenuLink>

            <MobileSubmenuLink menu={(artists as MenuLinkData).menu}>
              {(artists as MenuLinkData).menu.title}
            </MobileSubmenuLink>
            <MobileLink href="/auctions">Auctions</MobileLink>
            <MobileLink href="/articles">Editorial</MobileLink>
            <MobileLink href="/galleries">Galleries</MobileLink>
            <MobileLink href="/fairs">Fairs</MobileLink>
            <MobileLink href="/shows">Shows</MobileLink>
            <MobileLink href="/institutions">Museums</MobileLink>
            <MobileLink href="/consign">Consign</MobileLink>
            <MobileLink href="/gallery-partnerships">
              Artsy for Galleries
            </MobileLink>
            {user ? <LoggedInLinks /> : <AuthenticateLinks />}
          </ul>
        </AnimatingMenuWrapper>
      </MenuViewport>
    </NavigatorContextProvider>
  )
}

const MenuViewport = styled.nav`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`

export const AnimatingMenuWrapper = styled.div<{
  isOpen: boolean
}>`
  background: white;

  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  z-index: ${p => (p.isOpen ? 9999 : 0)};

  top: 0;
  left: 0; /* might be simpler to just animate this instead of the transform3d business */
  padding: 1em 20px;

  transform: translate3d(${p => (p.isOpen ? "0" : "100%")}, 0, 0);
  transition: transform 0.15s;

  ul {
    margin-bottom: 100px;
  }
`

interface MenuProps {
  isOpen: boolean
  title: string
  links: LinkData[]
  showBacknav?: boolean
}

const Menu: React.FC<MenuProps> = ({
  isOpen,
  title,
  links,
  showBacknav = true,
}) => {
  return (
    <AnimatingMenuWrapper isOpen={isOpen}>
      <Flex position="relative">
        {showBacknav && <BackLink />}
        <Sans size={["5", "6"]} color={color("black100")} mx="auto">
          {title}
        </Sans>
      </Flex>
      <ul>{links.map(link => NavLink({ link }))}</ul>
    </AnimatingMenuWrapper>
  )
}

export const BackLink: React.FC = () => {
  const { trackEvent } = useTracking()
  const { pop } = useNavigation()
  const contextModule = useTrackingContextModule()

  return (
    <Box
      position="absolute"
      onClick={e => {
        e.preventDefault()
        trackEvent({
          action_type: AnalyticsSchema.ActionType.Click,
          context_module: contextModule,
          flow: "Header",
          subject: "Back link",
        })
        pop()
      }}
      width="30px"
      height="30px"
      style={{
        cursor: "pointer",
      }}
    >
      <ChevronIcon
        direction="left"
        color={color("black100")}
        height="14px"
        width="14px"
        top="6px"
        left="-2px"
      />
    </Box>
  )
}

const useTrackingContextModule = () => {
  const { path } = useNavigation()
  let contextModule
  if (path[0] === "Artworks") {
    contextModule = AnalyticsSchema.ContextModule.HeaderArtworksDropdown
  } else if (path[0] === "Artists") {
    contextModule = AnalyticsSchema.ContextModule.HeaderArtistsDropdown
  } else {
    contextModule = AnalyticsSchema.ContextModule.Header
  }
  return contextModule
}

const NavLink: React.FC<any> = ({ link }) => {
  const isSubMenu = !!link.menu
  const contextModule = useTrackingContextModule()

  if (isSubMenu) {
    return (
      <React.Fragment key={link.menu.title}>
        <MobileSubmenuLink menu={link.menu}>{link.text}</MobileSubmenuLink>
        {link.dividerBelow && <Separator my={1} color={color("black10")} />}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment key={link.href}>
        <MobileLink href={link.href} contextModule={contextModule}>
          {link.text}
        </MobileLink>
        {link.dividerBelow && <Separator my={1} color={color("black10")} />}
      </React.Fragment>
    )
  }
}

export const MobileSubmenuLink: React.FC<any> = ({ children, menu }) => {
  const { trackEvent } = useTracking()
  const { path, push } = useNavigation()
  const contextModule = useTrackingContextModule()

  return (
    <li>
      <Flex
        py={0.5}
        flexDirection="row"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          push(menu.title)
          trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            context_module: contextModule,
            flow: "Header",
            subject: menu.title,
          })
        }}
      >
        <Sans size={["5t", "6"]} color={color("black60")}>
          {children}
        </Sans>
        <ChevronIcon
          direction="right"
          color={color("black60")}
          height="14px"
          width="14px"
          top="7px"
          left="5px"
        />
      </Flex>
      <Menu
        isOpen={path.includes(menu.title)}
        title={menu.title}
        links={menu.links}
      />
    </li>
  )
}

const AuthenticateLinks: React.FC = () => {
  const authLink = (type: ModalType) => {
    return getMobileAuthLink(type, {
      intent: Intent[type],
      contextModule: ContextModule.header,
    })
  }

  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      <MobileLink href={authLink(ModalType.signup)}>Sign Up</MobileLink>
      <MobileLink href={authLink(ModalType.login)}>Login</MobileLink>
    </Box>
  )
}

const LoggedInLinks: React.FC = () => {
  const { mediator, user } = useSystemContext()
  const conversationsEnabled = userHasLabFeature(
    user,
    "User Conversations View"
  )
  return (
    <Box>
      <Separator my={1} color={color("black10")} />
      {conversationsEnabled && (
        <MobileLink href="/user/conversations">Inbox</MobileLink>
      )}
      <MobileLink href="/works-for-you">Works for you</MobileLink>
      <MobileLink href="/user/edit">Account</MobileLink>
      <MobileLink
        href="#"
        onClick={event => {
          event.preventDefault()
          mediator.trigger("auth:logout")
        }}
      >
        Log out
      </MobileLink>
    </Box>
  )
}

export const MobileToggleIcon: React.FC<{ open: boolean }> = ({ open }) => {
  const style = { transform: "scale(1.5)", top: 2 }
  return open ? <CloseIcon style={style} /> : <MenuIcon style={style} />
}
