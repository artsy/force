import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Box,
  ChevronIcon,
  Clickable,
  CloseIcon,
  Color,
  Flex,
  MenuIcon,
  ModalBase,
  Sans,
  Separator,
  Text,
  color,
  space,
  TextProps,
} from "@artsy/palette"
import { AnalyticsSchema, useSystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics"
import { ModalType } from "v2/Components/Authentication/Types"
import {
  ARTISTS_SUBMENU_DATA,
  ARTWORKS_SUBMENU_DATA,
  LinkData,
} from "v2/Components/NavBar/menuData"
import React from "react"
import styled from "styled-components"
import { getMobileAuthLink } from "v2/Utils/openAuthModal"
import { LoggedInLinksQueryRenderer as LoggedInLinks } from "./LoggedInLinks"
import { MobileLink } from "./MobileLink"
import {
  NavigatorContextProvider,
  useNavigation,
} from "./NavigatorContextProvider"
import { NAV_BAR_BORDER_OFFSET, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"
import { ArtistsLetterNav } from "v2/Apps/Artists/Components/ArtistsLetterNav"
import { useDeviceDetection } from "v2/Utils/Hooks/useDeviceDetection"

const Close = styled(Clickable)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${space(6)}px;
  height: ${MOBILE_NAV_HEIGHT - NAV_BAR_BORDER_OFFSET}px;
`

interface Props {
  isOpen: boolean
  onClose: () => void
  onNavButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const MobileNavMenu: React.FC<Props> = ({
  isOpen,
  onNavButtonClick,
  onClose,
}) => {
  const { user } = useSystemContext()
  const { downloadAppUrl } = useDeviceDetection()

  return (
    <NavigatorContextProvider>
      <ModalBase
        dialogProps={{
          width: "100%",
          height: "100%",
          background: color("white100"),
        }}
      >
        <MenuViewport onClick={onNavButtonClick}>
          <Close onClick={onClose}>
            <MobileToggleIcon open />
          </Close>

          <AnimatingMenuWrapper isOpen={isOpen}>
            <ul>
              <MobileLink href="/collect" color="black100" pt={0.5}>
                Buy
              </MobileLink>
              <MobileSubmenuLink menu={ARTISTS_SUBMENU_DATA.menu}>
                {ARTISTS_SUBMENU_DATA.menu.title}
              </MobileSubmenuLink>

              <MobileSubmenuLink menu={ARTWORKS_SUBMENU_DATA.menu}>
                {ARTWORKS_SUBMENU_DATA.menu.title}
              </MobileSubmenuLink>

              <MobileLink href="/auctions">Auctions</MobileLink>
              <MobileLink href="/viewing-rooms">Viewing Rooms</MobileLink>
              <MobileLink href="/galleries">Galleries</MobileLink>
              <MobileLink href="/fairs">Fairs</MobileLink>
              <MobileLink href="/shows">Shows</MobileLink>
              <MobileLink href="/institutions">Museums</MobileLink>
              <Separator my={1} color={color("black10")} />
              <MobileLink href="/consign" color="black100">
                Sell
              </MobileLink>
              <MobileLink href="/articles" color="black100">
                Editorial
              </MobileLink>
              {user ? <LoggedInLinks /> : <AuthenticateLinks />}
              <MobileLink href={downloadAppUrl}>Get the app</MobileLink>
            </ul>
          </AnimatingMenuWrapper>
        </MenuViewport>
      </ModalBase>
    </NavigatorContextProvider>
  )
}

const MenuViewport = styled.nav`
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

export const AnimatingMenuWrapper = styled.div<{
  isOpen: boolean
}>`
  background: white;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  top: 0;
  left: 0;
  padding: 1em 20px;
  transition: transform 0.15s;
  ${({ isOpen }) =>
    isOpen
      ? `
    z-index: 1;
    transform: translate3d(0, 0, 0);
  `
      : `
    z-index: 0;
    transform: translate3d(100%, 0, 0);
  `}
`

const StyledArtistsLetterNav = styled(ArtistsLetterNav)`
  max-width: 385px;
  margin-top: 10px;
  > div {
    width: 55px;
    height: 50px;
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
  const isArtistsMenu = title === "Artists"
  const lastLinkIndex = links.length - 1
  return (
    <AnimatingMenuWrapper isOpen={isOpen}>
      <Flex position="relative">
        {showBacknav && <BackLink />}
        <Sans size={["5", "6"]} color={color("black100")} mx="auto">
          {title}
        </Sans>
      </Flex>
      <ul>
        {[...links].map((link, i) => {
          const isLast = lastLinkIndex === i
          return (
            <NavLink
              key={i}
              link={link}
              isLast={isLast}
              isArtistsMenu={isArtistsMenu}
            />
          )
        })}
      </ul>
      {isArtistsMenu && <StyledArtistsLetterNav />}
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
        // @ts-expect-error STRICT_NULL_CHECK
        pop()
      }}
      width="60px"
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
  // @ts-expect-error STRICT_NULL_CHECK
  if (path[0] === "Artworks") {
    contextModule = AnalyticsSchema.ContextModule.HeaderArtworksDropdown
    // @ts-expect-error STRICT_NULL_CHECK
  } else if (path[0] === "Artists") {
    contextModule = AnalyticsSchema.ContextModule.HeaderArtistsDropdown
  } else {
    contextModule = AnalyticsSchema.ContextModule.Header
  }
  return contextModule
}

const NavLink: React.FC<any> = ({ link, isLast, isArtistsMenu }) => {
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
        <MobileLink
          contextModule={contextModule}
          href={link.href}
          onClick={link.onClick}
        >
          {link.text}
          {isArtistsMenu && isLast && <> A &#8211; Z</>}
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
          // @ts-expect-error STRICT_NULL_CHECK
          push(menu.title)
          trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            context_module: contextModule,
            flow: "Header",
            subject: menu.title,
          })
        }}
      >
        <MobileMenuText py={0.5} color="black60">
          {children}
        </MobileMenuText>
        <ChevronIcon
          direction="right"
          color={color("black60")}
          height="14px"
          width="14px"
          top="9px"
          left="5px"
        />
      </Flex>
      <Menu
        // @ts-expect-error STRICT_NULL_CHECK
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
      <MobileLink href={authLink(ModalType.signup)}>Sign up</MobileLink>
      <MobileLink href={authLink(ModalType.login)}>Log in</MobileLink>
    </Box>
  )
}

export const MobileToggleIcon: React.FC<{ open: boolean }> = ({ open }) => {
  const style = { transform: "scale(1.5)" }
  return open ? <CloseIcon style={style} /> : <MenuIcon style={style} />
}

interface MobileMenuTextProps extends TextProps {
  children: any
  color?: Color
  firstItem?: boolean
}

export const MobileMenuText: React.FC<MobileMenuTextProps> = ({
  children,
  color: linkColor,
  ...props
}) => {
  return (
    // @ts-expect-error STRICT_NULL_CHECK
    <Text variant="title" color={color(linkColor)} {...props}>
      {children}
    </Text>
  )
}
