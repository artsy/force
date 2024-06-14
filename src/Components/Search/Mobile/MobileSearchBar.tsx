import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput } from "@artsy/palette"
import { OverlayRefetchContainer } from "./Overlay"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { isServer } from "Server/isServer"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  MobileSearchBarSuggestQuery,
  MobileSearchBarSuggestQuery$data,
} from "__generated__/MobileSearchBarSuggestQuery.graphql"
import { StaticSearchContainer } from "Components/Search/StaticSearchContainer"

interface MobileSearchBarProps {
  viewer: NonNullable<MobileSearchBarSuggestQuery$data["viewer"]>
  onClose: () => void
}

export const MobileSearchBar: FC<MobileSearchBarProps> = ({
  viewer,
  onClose,
}) => {
  const { t } = useTranslation()
  const [overlayDisplayed, setOverlayDisplayed] = useState(false)

  const displayOverlay = () => {
    setOverlayDisplayed(true)
  }

  const handleOverlayClose = () => {
    setOverlayDisplayed(false)
    onClose()
  }

  return (
    <>
      {overlayDisplayed && (
        <OverlayRefetchContainer viewer={viewer} onClose={handleOverlayClose} />
      )}

      <LabeledInput
        placeholder={t`navbar.searchArtsy`}
        label={<SearchIcon fill="black60" aria-hidden size={22} />}
        onClick={displayOverlay}
        height={40}
      />
    </>
  )
}

interface MobileSearchBarQueryRendererProps {
  onClose: () => void
}

export const MobileSearchBarQueryRenderer: FC<MobileSearchBarQueryRendererProps> = props => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()

  if (isServer) {
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
        ) {
          viewer {
            ...Overlay_viewer
              @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
          }
        }
      `}
      variables={{
        hasTerm: false,
        term: "",
        entities: [],
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
