import type { Command } from "Components/CommandBar/types"

/**
 * Side-effecting actions the command bar can perform. Supplied by
 * `useCommandBarActions`, which owns the router / Relay / toast wiring so that
 * `getCommands` itself stays pure and unit-testable.
 */
export interface CommandBarActions {
  navigate: (path: string) => void
  followCurrentArtist: () => void
  saveCurrentArtwork: () => void
  copyCurrentLink: () => void
}

interface GetCommandsOptions {
  isLoggedIn: boolean
  pathname: string
  query: string
  actions: CommandBarActions
}

const ARTIST_PATH = /^\/artist\/([^/]+)/
const ARTWORK_PATH = /^\/artwork\/([^/]+)/

/**
 * Builds the full, ordered list of commands for the current context, before
 * fuzzy filtering. Auth-gated destinations are omitted when logged out, and
 * contextual actions are only added on matching routes.
 */
export const getCommands = ({
  isLoggedIn,
  pathname,
  query,
  actions,
}: GetCommandsOptions): Command[] => {
  const commands: Command[] = []

  // Context-aware actions for the current page.
  commands.push(...getContextualCommands({ pathname, actions }))

  // Static navigation destinations.
  commands.push(...getDestinationCommands({ isLoggedIn, actions }))

  // Free-text fallback: redirect to the existing search results page.
  const trimmedQuery = query.trim()

  if (trimmedQuery !== "") {
    commands.push({
      id: "search-for-query",
      label: `Search Artsy for “${trimmedQuery}”`,
      group: "Search",
      run: () => {
        actions.navigate(`/search?term=${encodeURIComponent(trimmedQuery)}`)
      },
    })
  }

  return commands
}

const getContextualCommands = ({
  pathname,
  actions,
}: {
  pathname: string
  actions: CommandBarActions
}): Command[] => {
  const commands: Command[] = []

  if (ARTIST_PATH.test(pathname)) {
    commands.push({
      id: "follow-current-artist",
      label: "Follow this artist",
      group: "On this page",
      keywords: ["follow", "artist"],
      run: actions.followCurrentArtist,
    })

    commands.push({
      id: "create-alert-current-artist",
      label: "Create an alert for this artist",
      group: "On this page",
      keywords: ["alert", "notify", "search alert"],
      run: () => {
        const artistID = pathname.match(ARTIST_PATH)?.[1]

        if (!artistID) return

        actions.navigate(`/artist/${artistID}?createAlert=true`)
      },
    })
  }

  if (ARTWORK_PATH.test(pathname)) {
    commands.push({
      id: "save-current-artwork",
      label: "Save this artwork",
      group: "On this page",
      keywords: ["save", "collection", "artwork"],
      run: actions.saveCurrentArtwork,
    })
  }

  // Available on every page.
  commands.push({
    id: "copy-current-link",
    label: "Copy link to this page",
    group: "On this page",
    keywords: ["copy", "share", "url", "link"],
    run: actions.copyCurrentLink,
  })

  return commands
}

interface Destination {
  id: string
  label: string
  path: string
  keywords?: string[]
  requiresAuth?: boolean
}

const DESTINATIONS: Destination[] = [
  { id: "search", label: "Search", path: "/search", keywords: ["find"] },
  { id: "artists", label: "Browse artists", path: "/artists" },
  { id: "auctions", label: "Auctions", path: "/auctions", keywords: ["bid"] },
  { id: "shows", label: "Shows", path: "/shows" },
  { id: "fairs", label: "Art fairs", path: "/art-fairs", keywords: ["fair"] },
  {
    id: "saves",
    label: "Saved works",
    path: "/favorites/saves",
    keywords: ["saved", "collection", "favorites"],
    requiresAuth: true,
  },
  {
    id: "follows",
    label: "Follows",
    path: "/favorites/follows",
    keywords: ["following", "favorites"],
    requiresAuth: true,
  },
  {
    id: "alerts",
    label: "Search alerts",
    path: "/favorites/alerts",
    keywords: ["alert", "notifications"],
    requiresAuth: true,
  },
  {
    id: "my-collection",
    label: "My Collection",
    path: "/collector-profile/my-collection",
    keywords: ["collection"],
    requiresAuth: true,
  },
  {
    id: "collector-profile",
    label: "Collector profile",
    path: "/collector-profile",
    keywords: ["profile"],
    requiresAuth: true,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    keywords: ["account", "preferences"],
    requiresAuth: true,
  },
]

const getDestinationCommands = ({
  isLoggedIn,
  actions,
}: {
  isLoggedIn: boolean
  actions: CommandBarActions
}): Command[] => {
  return DESTINATIONS.filter(destination => {
    return isLoggedIn || !destination.requiresAuth
  }).map(destination => {
    return {
      id: `go-to-${destination.id}`,
      label: destination.label,
      group: "Go to",
      keywords: destination.keywords,
      run: () => {
        actions.navigate(destination.path)
      },
    }
  })
}

/**
 * Case-insensitive substring/token filter over a command's label + keywords.
 * Every whitespace-separated term in the query must match somewhere.
 */
export const filterCommands = (
  commands: Command[],
  query: string,
): Command[] => {
  const trimmedQuery = query.trim().toLowerCase()

  if (trimmedQuery === "") {
    return commands
  }

  const terms = trimmedQuery.split(/\s+/)

  return commands.filter(command => {
    // The free-text search command should always remain available.
    if (command.id === "search-for-query") {
      return true
    }

    const haystack = [command.label, ...(command.keywords ?? [])]
      .join(" ")
      .toLowerCase()

    return terms.every(term => {
      return haystack.includes(term)
    })
  })
}
