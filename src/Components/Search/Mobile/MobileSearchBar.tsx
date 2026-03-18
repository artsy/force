import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput, useDidMount } from "@artsy/palette"
import { type FC, useState } from "react"
import { useVariant } from "@unleash/proxy-client-react"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { OverlayRefetchContainer } from "./Overlay"

import { StaticSearchContainer } from "Components/Search/StaticSearchContainer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type {
  MobileSearchBarSuggestQuery,
  MobileSearchBarSuggestQuery$data,
} from "__generated__/MobileSearchBarSuggestQuery.graphql"
import { graphql } from "react-relay"

const SEARCH_AUTOSUGGEST_VARIANT_EXPERIMENT = "onyx_search-autosuggest-variant"

interface MobileSearchBarProps {
  viewer: NonNullable<MobileSearchBarSuggestQuery$data["viewer"]>
  onClose: () => void
}

export const MobileSearchBar: FC<
  React.PropsWithChildren<MobileSearchBarProps>
> = ({ viewer, onClose }) => {
  const [overlayDisplayed, setOverlayDisplayed] = useState(false)

  // Get variant from Unleash for A/B testing (on page load)
  const unleashVariant = useVariant(SEARCH_AUTOSUGGEST_VARIANT_EXPERIMENT)
  const variant =
    unleashVariant.enabled && unleashVariant.name !== "disabled"
      ? unleashVariant.name
      : undefined

  // Track experiment view for analytics (on page load, not on overlay open)
  useTrackFeatureVariantOnMount({
    experimentName: SEARCH_AUTOSUGGEST_VARIANT_EXPERIMENT,
    variantName: unleashVariant.name,
  })

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
        <OverlayRefetchContainer
          viewer={viewer}
          onClose={handleOverlayClose}
          variant={variant}
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
        variant: undefined,
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
