import React, { useState } from "react"
import { Banner, Box, Flex, SelectSmall, Serif } from "@artsy/palette"
import { useSystemContext } from "v2/Artsy/SystemContext"
import { graphql } from "react-relay"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import {
  UserEmailPreferencesQuery,
  UserEmailPreferencesQueryResponse,
} from "v2/__generated__/UserEmailPreferencesQuery.graphql"
import { UpdateUserEmailPreferencesMutation } from "./UserEmailPreferencesMutation"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"

const fallbackFrequency = "weekly"

const options = [
  { text: "None", value: "none" },
  { text: "Daily", value: "daily" },
  { text: "Weekly", value: "weekly" },
]

export const UserEmailPreferences: React.FC<UserEmailPreferencesQueryResponse> = props => {
  const { relayEnvironment } = useSystemContext()
  const emailFrequency = props.me.emailFrequency || fallbackFrequency
  const [updated, setUpdated] = useState(false)

  const handleSelect = async newEmailFrequency => {
    setUpdated(false)
    const variables = { emailFrequency: newEmailFrequency }
    await UpdateUserEmailPreferencesMutation(
      relayEnvironment,
      variables,
      props.me.id
    )
    setUpdated(true)
  }

  return (
    <>
      <Serif color="black100" size="6">
        Email Preferences
      </Serif>
      <Serif color="black60" mt="1" size="3">
        Receive emails from Artsy with auctions, articles, curated collections,
        and new works by artists you follow
      </Serif>
      {updated && (
        <Box mt="2">
          <Banner variant="success" dismissable>
            Preferences updated
          </Banner>
        </Box>
      )}
      <Flex mt="1" justifyContent="space-between">
        <Serif color="black100" size="3">
          Frequency
        </Serif>
        <Flex alignItems="center">
          <SelectSmall
            onSelect={handleSelect}
            options={options}
            selected={emailFrequency}
          />
        </Flex>
      </Flex>
    </>
  )
}

export const UserEmailPreferencesQueryRenderer = () => {
  const { user, relayEnvironment } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <QueryRenderer<UserEmailPreferencesQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query UserEmailPreferencesQuery {
          me {
            emailFrequency
            id
          }
        }
      `}
      render={renderWithLoadProgress<UserEmailPreferencesQueryResponse>(
        UserEmailPreferences
      )}
    />
  )
}
