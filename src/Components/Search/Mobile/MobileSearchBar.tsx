import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput, useDidMount } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { type FC, useEffect, useState } from "react"
import { OverlayRefetchContainer } from "./Overlay"
import { StaticSearchContainer } from "Components/Search/StaticSearchContainer"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type {
  MobileSearchBarSuggestQuery,
  MobileSearchBarSuggestQuery$data,
} from "__generated__/MobileSearchBarSuggestQuery.graphql"
import { graphql } from "react-relay"

interface MobileSearchBarProps {
  viewer: NonNullable<MobileSearchBarSuggestQuery$data["viewer"]>
  onClose: () => void
}

// The history entry the overlay was opened on, so back navigation re-shows it
interface OverlaySession {
  locationKey: string
  hasNavigatedAway: boolean
}

export const MobileSearchBar: FC<
  React.PropsWithChildren<MobileSearchBarProps>
> = ({ viewer, onClose }) => {
  const { match } = useRouter()
  // The initial page-load entry carries no farce key (history.state is null
  // until farce stamps it); the URL identifies that entry instead
  const locationKey =
    match.location.key ?? `${match.location.pathname}${match.location.search}`

  const isTrendingEnabled = useFlag("onyx_trending-searches")

  const [session, setSession] = useState<OverlaySession | null>(null)

  // Re-shows after back skip the autofocus (see shouldAutoFocus below)
  useEffect(() => {
    if (!session || session.hasNavigatedAway) return

    if (locationKey !== session.locationKey) {
      setSession({ ...session, hasNavigatedAway: true })
    }
  }, [locationKey, session])

  const displayOverlay = () => {
    setSession({ locationKey, hasNavigatedAway: false })
  }

  const handleOverlayClose = () => {
    setSession(null)
    onClose()
  }

  // Result clicks keep the session: the location change hides the overlay and
  // browser back re-shows it. Flag off closes as before.
  const handleOverlayNavigate = () => {
    if (!isTrendingEnabled) {
      handleOverlayClose()
    }
  }

  const visibleSession =
    session && session.locationKey === locationKey ? session : null

  return (
    <>
      {visibleSession && (
        <OverlayRefetchContainer
          viewer={viewer}
          onClose={handleOverlayClose}
          onNavigate={handleOverlayNavigate}
          shouldAutoFocus={!visibleSession.hasNavigatedAway}
          variant="experiment"
        />
      )}

      <LabeledInput
        placeholder="Search Artsy"
        label={<SearchIcon fill="mono60" aria-hidden size={22} />}
        onClick={displayOverlay}
        height={40}
      />
    </>
  )
}

interface MobileSearchBarQueryRendererProps {
  onClose: () => void
}

export const MobileSearchBarQueryRenderer: FC<
  React.PropsWithChildren<MobileSearchBarQueryRendererProps>
> = props => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()
  const isClient = useDidMount()

  if (!isClient) {
    return <StaticSearchContainer searchQuery={searchQuery} {...props} />
  }

  return (
    <SystemQueryRenderer<MobileSearchBarSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query MobileSearchBarSuggestQuery(
          $term: String!
          $hasTerm: Boolean!
          $entities: [SearchEntity]
          $variant: String
        ) {
          viewer {
            ...Overlay_viewer
              @arguments(
                term: $term
                hasTerm: $hasTerm
                entities: $entities
                variant: $variant
              )
          }
        }
      `}
      variables={{
        hasTerm: false,
        term: "",
        entities: [],
        variant: "experiment",
      }}
      render={({ props: relayProps }) => {
        if (relayProps?.viewer) {
          return <MobileSearchBar viewer={relayProps.viewer} {...props} />
          // SSR render pass. Since we don't have access to `<Boot>` context
          // from within the NavBar (it's not a part of any app) we need to lean
          // on styled-system for showing / hiding depending upon breakpoint.
        } else {
          return <StaticSearchContainer searchQuery={searchQuery} />
        }
      }}
    />
  )
}
