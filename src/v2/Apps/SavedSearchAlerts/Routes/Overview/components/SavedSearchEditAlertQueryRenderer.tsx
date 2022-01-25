import { Box, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SavedSearchEditAlertQueryRendererQuery } from "v2/__generated__/SavedSearchEditAlertQueryRendererQuery.graphql"
import { SavedSearchEditAlertQueryRenderer_savedSearch } from "v2/__generated__/SavedSearchEditAlertQueryRenderer_savedSearch.graphql"

interface SavedSearchAlertEditQueryRendererProps {
  id: string
}

interface SavedSearchEditAlertProps {
  savedSearch: SavedSearchEditAlertQueryRenderer_savedSearch
}

const SavedSearchEditAlert: React.FC<SavedSearchEditAlertProps> = ({
  savedSearch,
}) => {
  return (
    <Box>
      <Text>{savedSearch.userAlertSettings.name}</Text>
    </Box>
  )
}

const SavedSearchEditAlertFragmentContainer = createFragmentContainer(
  SavedSearchEditAlert,
  {
    savedSearch: graphql`
      fragment SavedSearchEditAlertQueryRenderer_savedSearch on SearchCriteria {
        userAlertSettings {
          name
        }
      }
    `,
  }
)

const SavedSearchAlertEditPlaceholder = () => {
  return (
    <Box>
      <Text>SavedSearchAlertEditPlaceholder</Text>
    </Box>
  )
}

const SAVED_SEARCH_EDIT_ALERT_QUERY = graphql`
  query SavedSearchEditAlertQueryRendererQuery($id: ID!) {
    me {
      savedSearch(id: $id) {
        ...SavedSearchEditAlertQueryRenderer_savedSearch
      }
    }
  }
`

export const SavedSearchAlertEditQueryRenderer: React.FC<SavedSearchAlertEditQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<SavedSearchEditAlertQueryRendererQuery>
      query={SAVED_SEARCH_EDIT_ALERT_QUERY}
      variables={{ id }}
      placeholder={<SavedSearchAlertEditPlaceholder />}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me?.savedSearch) {
          return <SavedSearchAlertEditPlaceholder />
        }

        return (
          <SavedSearchEditAlertFragmentContainer
            savedSearch={props?.me?.savedSearch}
          />
        )
      }}
    />
  )
}
