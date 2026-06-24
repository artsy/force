import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"

/**
 * A single source of truth for the desktop and mobile navigation menus.
 *
 * Each platform composes its own layout (see the layout arrays below) and renders
 * items via its own subcomponent (`NavBarDesktopItem` / `NavBarMobileItem`), so
 * presentation and hierarchy remain platform-specific while the set of links stays
 * in sync. A parity test (`__tests__/navItems.jest.ts`) enforces that both platforms
 * cover the same items.
 */

interface LinkNavItem {
  type: "link"
  id: string
  label: string
  href: string
  /** Desktop prefetches the route on hover. */
  prefetch?: boolean
  /** External URL — not a router-aware route, so it isn't prefetched. */
  external?: boolean
  /** Desktop `data-label` for tracking; defaults to `label` when omitted. */
  dataLabel?: string
}

interface DropdownNavItem {
  type: "dropdown"
  id: string
  label: string
  href: string
  menuType: "whatsNew" | "artists" | "artworks"
  navigationKey:
    | "whatsNewNavigation"
    | "artistsNavigation"
    | "artworksNavigation"
  /** Desktop-only: analytics context module for the dropdown. */
  contextModule: string
}

export type NavItem = LinkNavItem | DropdownNavItem

export const NAV_ITEMS = {
  buy: {
    type: "link",
    id: "buy",
    label: "Buy",
    href: "/collect",
    prefetch: true,
  },
  whatsNew: {
    type: "dropdown",
    id: "whatsNew",
    label: "What’s New",
    href: "/collection/new-this-week",
    menuType: "whatsNew",
    navigationKey: "whatsNewNavigation",
    contextModule:
      DeprecatedAnalyticsSchema.ContextModule.HeaderWhatsNewDropdown,
  },
  artists: {
    type: "dropdown",
    id: "artists",
    label: "Artists",
    href: "/artists",
    menuType: "artists",
    navigationKey: "artistsNavigation",
    contextModule:
      DeprecatedAnalyticsSchema.ContextModule.HeaderArtistsDropdown,
  },
  artworks: {
    type: "dropdown",
    id: "artworks",
    label: "Artworks",
    href: "/collect",
    menuType: "artworks",
    navigationKey: "artworksNavigation",
    contextModule:
      DeprecatedAnalyticsSchema.ContextModule.HeaderArtworksDropdown,
  },
  auctions: {
    type: "link",
    id: "auctions",
    label: "Auctions",
    href: "/auctions",
    prefetch: true,
  },
  viewingRooms: {
    type: "link",
    id: "viewingRooms",
    label: "Viewing Rooms",
    href: "/viewing-rooms",
    prefetch: true,
  },
  galleries: {
    type: "link",
    id: "galleries",
    label: "Galleries",
    href: "/galleries",
    prefetch: true,
  },
  fairs: {
    type: "link",
    id: "fairs",
    label: "Fairs & Events",
    href: "/art-fairs",
    prefetch: true,
  },
  shows: {
    type: "link",
    id: "shows",
    label: "Shows",
    href: "/shows",
    prefetch: true,
  },
  museums: {
    type: "link",
    id: "museums",
    label: "Museums",
    href: "/institutions",
    dataLabel: "Institutions",
    prefetch: true,
  },
  collecting101: {
    type: "link",
    id: "collecting101",
    label: "Collecting 101",
    href: "/feature/how-to-buy-art",
    prefetch: true,
  },
  galleryPartnerships: {
    type: "link",
    id: "galleryPartnerships",
    label: "Artsy for Galleries",
    href: "https://partners.artsy.net/gallery-partnerships/?utm_medium=internal-banner&utm_source=artsy&utm_campaign=b2b-2025-gallery-partnerships-application-banner-link&utm_sfc=701Hu000001jeLjIAI",
    external: true,
  },
  priceDatabase: {
    type: "link",
    id: "priceDatabase",
    label: "Price Database",
    href: "/price-database",
    prefetch: true,
  },
  editorial: {
    type: "link",
    id: "editorial",
    label: "Editorial",
    href: "/articles",
    dataLabel: "Articles",
    prefetch: true,
  },
} satisfies Record<string, NavItem>

export type NavItemId = keyof typeof NAV_ITEMS

export const SEPARATOR = "—separator—" as const

/**
 * Desktop layout. The top tier sits alongside the search bar; the second tier is
 * the row of browse links and dropdown panels below it.
 */
export const DESKTOP_TOP_TIER: NavItemId[] = [
  "buy",
  "galleryPartnerships",
  "priceDatabase",
  "editorial",
]

export const DESKTOP_SECOND_TIER: NavItemId[] = [
  "whatsNew",
  "artists",
  "artworks",
  "auctions",
  "viewingRooms",
  "galleries",
  "fairs",
  "shows",
  "museums",
  "collecting101",
]

/**
 * Mobile layout. A single ordered list; `SEPARATOR` renders a divider. The
 * mobile-only actions below the final divider (auth, "Get the app", "Log out")
 * are not nav links and live directly in `NavBarMobileMenu`.
 */
export const MOBILE_NAV_LAYOUT: Array<NavItemId | typeof SEPARATOR> = [
  "buy",
  "whatsNew",
  "artists",
  "artworks",
  "auctions",
  "viewingRooms",
  "galleries",
  "fairs",
  "shows",
  "museums",
  "collecting101",
  SEPARATOR,
  "galleryPartnerships",
  "priceDatabase",
  "editorial",
]

/** Mobile items rendered with emphasized (`mono100`) text. */
export const MOBILE_EMPHASIZED: NavItemId[] = [
  "buy",
  "galleryPartnerships",
  "priceDatabase",
  "editorial",
]
