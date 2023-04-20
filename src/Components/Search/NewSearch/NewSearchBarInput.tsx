import { AutocompleteInput, Box, BoxProps } from "@artsy/palette"
import { NewSearchBarSuggestion } from "Components/Search/NewSearch/NewSearchBarSuggestion"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"
import { Router } from "found"
import { ChangeEvent, FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  SystemContext,
  SystemContextProps,
  withSystemContext,
} from "System/SystemContext"
import { extractNodes } from "Utils/extractNodes"
import { useDidMount } from "Utils/Hooks/useDidMount"
import { NewSearchBarInput_viewer$data } from "__generated__/NewSearchBarInput_viewer.graphql"
import { NewSearchBarInputSuggestQuery } from "__generated__/NewSearchBarInputSuggestQuery.graphql"
import createLogger from "Utils/logger"
import { NewSearchInputPillsFragmentContainer } from "Components/Search/NewSearch/NewSearchInputPills"

const logger = createLogger("Components/Search/NewSearchBar")

export interface NewSearchBarInputProps extends SystemContextProps {
  relay: RelayRefetchProp
  router?: Router
  viewer: NewSearchBarInput_viewer$data
  isXs: boolean
}

const NewSearchBarInput: FC<NewSearchBarInputProps> = ({
  isXs,
  relay,
  router,
  viewer,
}) => {
  const { t } = useTranslation()
  const [value, setValue] = useState("")

  const getLabel = ({ displayType, __typename }) =>
    displayType || (__typename === "Artist" ? "Artist" : null)

  const options = extractNodes(viewer.searchConnection)
  const formattedOptions = options.map(option => {
    return {
      text: option.displayLabel!,
      value: option.displayLabel!,
      subtitle: getLabel({
        displayType: option.displayType,
        __typename: option.__typename,
      }),
    }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    console.log("[Debug] refetch")

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
      placeholder={isXs ? t`navbar.searchArtsy` : t`navbar.searchBy`}
      spellCheck={false}
      options={value.length < 2 ? [] : formattedOptions}
      value={value}
      header={<NewSearchInputPillsFragmentContainer viewer={viewer} />}
      renderOption={option => <NewSearchBarSuggestion option={option} />}
      onChange={handleChange}
      onClear={() => setValue("")}
    />
  )
}

export const NewSearchBarInputRefetchContainer = createRefetchContainer(
  withSystemContext(NewSearchBarInput),
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

interface NewSearchBarInputQueryRendererProps extends BoxProps {
  isXs: boolean
}

export const NewSearchBarInputQueryRenderer: FC<NewSearchBarInputQueryRendererProps> = props => {
  const { relayEnvironment, searchQuery = "" } = useContext(SystemContext)
  const isMounted = useDidMount(typeof window !== "undefined")

  if (!isMounted) {
    return <StaticSearchContainer searchQuery={searchQuery} {...props} />
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
      render={({ props: relayProps }) => {
        if (relayProps) {
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
