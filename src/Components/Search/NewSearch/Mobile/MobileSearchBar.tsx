import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput } from "@artsy/palette"
import { Overlay } from "./Overlay"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useSystemContext } from "System/SystemContext"
import { isServer } from "Server/isServer"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { MobileSearchBarSuggestQuery } from "__generated__/MobileSearchBarSuggestQuery.graphql"
import { MobileSearchBar_viewer$data } from "__generated__/MobileSearchBar_viewer.graphql"
import { StaticSearchContainer } from "Components/Search/NewSearch/StaticSearchContainer"

interface MobileSearchBarProps {
  viewer: MobileSearchBar_viewer$data
  relay: RelayRefetchProp
  onClose: () => void
}

export const MobileSearchBar: FC<MobileSearchBarProps> = ({
  viewer,
  relay,
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
        <Overlay viewer={viewer} relay={relay} onClose={handleOverlayClose} />
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

export const MobileSearchBarRefetchContainer = createRefetchContainer(
  MobileSearchBar,
  {
    viewer: graphql`
      fragment MobileSearchBar_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
          entities: { type: "[SearchEntity]" }
        ) {
        ...SearchResultsList_viewer
          @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
        ...NewSearchInputPills_viewer @arguments(term: $term)
      }
    `,
  },
  graphql`
    query MobileSearchBarRefetchQuery(
      $term: String!
      $hasTerm: Boolean!
      $entities: [SearchEntity]
    ) {
      viewer {
        ...MobileSearchBar_viewer
          @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
      }
    }
  `
)

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
            ...MobileSearchBar_viewer
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
          return (
            <MobileSearchBarRefetchContainer
              viewer={relayProps.viewer}
              {...props}
            />
          )
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
