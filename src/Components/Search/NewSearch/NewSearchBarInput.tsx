import { AutocompleteInput, Box, BoxProps } from "@artsy/palette"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"
import { ChangeEvent, FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SystemContextProps, useSystemContext } from "System/SystemContext"
import { extractNodes } from "Utils/extractNodes"
import { NewSearchBarInput_viewer$data } from "__generated__/NewSearchBarInput_viewer.graphql"
import { NewSearchBarInputSuggestQuery } from "__generated__/NewSearchBarInputSuggestQuery.graphql"
import createLogger from "Utils/logger"
import { NewSearchInputPillsFragmentContainer } from "Components/Search/NewSearch/NewSearchInputPills"
import { NewSearchBarFooter } from "Components/Search/NewSearch/NewSearchBarFooter"
import { getLabel } from "./utils/getLabel"
import { isServer } from "Server/isServer"
import {
  ELASTIC_PILL_KEY_TO_SEARCH_ENTITY,
  PillType,
  TOP_PILL,
} from "Components/Search/NewSearch/constants"
import { SearchResult } from "Components/Search/NewSearch/SearchResult"
import qs from "qs"

const logger = createLogger("Components/Search/NewSearchBar")

export interface NewSearchBarInputProps extends SystemContextProps {
  relay: RelayRefetchProp
  viewer: NewSearchBarInput_viewer$data
  isXs: boolean
}

export const getSearchTerm = (location: Location): string => {
  const term = qs.parse(location.search?.slice(1))?.term ?? ""

  if (Array.isArray(term)) {
    return term[0]
  }

  return term
}

const NewSearchBarInput: FC<NewSearchBarInputProps> = ({
  isXs,
  relay,
  viewer,
}) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(getSearchTerm(window.location))
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)

  const options = extractNodes(viewer.searchConnection)
  const formattedOptions = options.map(option => {
    return {
      text: option.displayLabel!,
      value: option.displayLabel!,
      subtitle: getLabel({
        displayType: option.displayType ?? "",
        typename: option.__typename,
      }),
      imageUrl: option.imageUrl!,
      showArtworksButton: !!option.statuses?.artworks,
      showAuctionResultsButton: !!option.statuses?.auctionLots,
      href: option.href!,
    }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    relay.refetch(
      {
        hasTerm: true,
        term: event.target.value,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
          return
        }
      }
    )
  }

  const handlePillClick = (pill: PillType) => {
    setSelectedPill(pill)

    relay.refetch(
      {
        hasTerm: true,
        term: value,
        entities: ELASTIC_PILL_KEY_TO_SEARCH_ENTITY?.[pill.key],
      },
      null,
      error => {
        if (error) {
          logger.error(error)
          return
        }
      }
    )
  }

  const handleRedirect = () => {
    setValue("")
  }

  return (
    <AutocompleteInput
      placeholder={isXs ? t`navbar.searchArtsy` : t`navbar.searchBy`}
      spellCheck={false}
      options={value.length < 2 ? [] : formattedOptions}
      value={value}
      onChange={handleChange}
      onClear={() => setValue("")}
      header={
        <NewSearchInputPillsFragmentContainer
          viewer={viewer}
          selectedPill={selectedPill}
          onPillClick={handlePillClick}
        />
      }
      renderOption={option => (
        <SearchResult
          display={option.text}
          href={option.href}
          label={option.subtitle ?? ""}
          imageUrl={option.imageUrl}
          query={value}
          showArtworksButton={option.showArtworksButton}
          showAuctionResultsButton={option.showAuctionResultsButton}
          onRedirect={handleRedirect}
        />
      )}
      footer={
        <NewSearchBarFooter
          display={value}
          href={`/search?term=${encodeURIComponent(value)}`}
          label={value}
          query={value}
          onRedirect={handleRedirect}
        />
      }
    />
  )
}

export const NewSearchBarInputRefetchContainer = createRefetchContainer(
  NewSearchBarInput,
  {
    viewer: graphql`
      fragment NewSearchBarInput_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
          entities: { type: "[SearchEntity]" }
        ) {
        searchConnection(
          query: $term
          entities: $entities
          mode: AUTOSUGGEST
          first: 7
        ) @include(if: $hasTerm) {
          edges {
            node {
              displayLabel
              href
              imageUrl
              __typename
              ... on SearchableItem {
                displayType
                slug
              }
              ... on Artist {
                statuses {
                  artworks
                  auctionLots
                }
              }
            }
          }
        }
        ...NewSearchInputPills_viewer @arguments(term: $term)
      }
    `,
  },
  graphql`
    query NewSearchBarInputRefetchQuery(
      $term: String!
      $hasTerm: Boolean!
      $entities: [SearchEntity]
    ) {
      viewer {
        ...NewSearchBarInput_viewer
          @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
      }
    }
  `
)

interface NewSearchBarInputQueryRendererProps extends BoxProps {
  isXs: boolean
}

export const NewSearchBarInputQueryRenderer: FC<NewSearchBarInputQueryRendererProps> = props => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()

  if (isServer) {
    return <StaticSearchContainer searchQuery={searchQuery} {...props} />
  }

  return (
    <SystemQueryRenderer<NewSearchBarInputSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query NewSearchBarInputSuggestQuery(
          $term: String!
          $hasTerm: Boolean!
          $entities: [SearchEntity]
        ) {
          viewer {
            ...NewSearchBarInput_viewer
              @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
          }
        }
      `}
      variables={{
        hasTerm: false,
        term: "",
        entities: null,
      }}
      render={({ props: relayProps }) => {
        if (relayProps && relayProps.viewer) {
          return (
            <NewSearchBarInputRefetchContainer
              viewer={relayProps.viewer}
              isXs={props.isXs}
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

/**
 * Displays during SSR render, but once mounted is swapped out with
 * QueryRenderer below.
 */
const StaticSearchContainer: FC<{ searchQuery: string } & BoxProps> = ({
  searchQuery,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <>
      <Box display={["block", "none"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || t`navbar.searchArtsy`}
          defaultValue={searchQuery}
        />
      </Box>

      <Box display={["none", "block"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || t`navbar.searchBy`}
          defaultValue={searchQuery}
        />
      </Box>
    </>
  )
}
