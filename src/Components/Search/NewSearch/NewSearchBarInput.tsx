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
import { SuggestionItem } from "Components/Search/Suggestions/SuggestionItem"
import { NewSearchBarFooter } from "Components/Search/NewSearch/NewSearchBarFooter"
import { getLabel } from "./utils/getLabel"
import { isServer } from "Server/isServer"

const logger = createLogger("Components/Search/NewSearchBar")

export interface NewSearchBarInputProps extends SystemContextProps {
  relay: RelayRefetchProp
  viewer: NewSearchBarInput_viewer$data
}

const NewSearchBarInput: FC<NewSearchBarInputProps> = ({ relay, viewer }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState("")

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

    //TODO: Add throttle
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

  return (
    <AutocompleteInput
      placeholder={t`navbar.searchBy`}
      spellCheck={false}
      options={value.length < 2 ? [] : formattedOptions}
      value={value}
      onChange={handleChange}
      onClear={() => setValue("")}
      header={<NewSearchInputPillsFragmentContainer viewer={viewer} />}
      renderOption={option => (
        <SuggestionItem
          display={option.text}
          href={option.href}
          isHighlighted={false} // TODO: change
          label={option.subtitle ?? ""}
          imageUrl={option.imageUrl}
          query={value}
          showArtworksButton={option.showArtworksButton}
          showAuctionResultsButton={option.showAuctionResultsButton}
        />
      )}
      footer={
        <NewSearchBarFooter
          display={value}
          href={`/search?term=${encodeURIComponent(value)}`}
          isHighlighted={false}
          label={value}
          query={value}
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
        ) {
        searchConnection(query: $term, mode: AUTOSUGGEST, first: 7)
          @include(if: $hasTerm) {
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
    query NewSearchBarInputRefetchQuery($term: String!, $hasTerm: Boolean!) {
      viewer {
        ...NewSearchBarInput_viewer @arguments(term: $term, hasTerm: $hasTerm)
      }
    }
  `
)

export const NewSearchBarInputQueryRenderer: FC = () => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()

  if (isServer) {
    return <StaticSearchContainer searchQuery={searchQuery} />
  }

  return (
    <SystemQueryRenderer<NewSearchBarInputSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query NewSearchBarInputSuggestQuery(
          $term: String!
          $hasTerm: Boolean!
        ) {
          viewer {
            ...NewSearchBarInput_viewer
              @arguments(term: $term, hasTerm: $hasTerm)
          }
        }
      `}
      variables={{
        hasTerm: false,
        term: "",
      }}
      render={({ props }) => {
        if (props?.viewer) {
          return <NewSearchBarInputRefetchContainer viewer={props.viewer} />
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
