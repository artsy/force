import { Spacer, Button, Select, Banner } from "@artsy/palette"
import React, { useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { UpdateUserEmailPreferencesMutation } from "v2/Components/UserSettings/UserEmailPreferences/UserEmailPreferencesMutation"
import { UnsubscribeLoggedIn_me } from "v2/__generated__/UnsubscribeLoggedIn_me.graphql"

enum Mode {
  Pending,
  Loading,
  Success,
  Error,
}

interface UnsubscribeLoggedInProps {
  me: UnsubscribeLoggedIn_me
}

export const UnsubscribeLoggedIn: React.FC<UnsubscribeLoggedInProps> = ({
  me,
}) => {
  const { relayEnvironment } = useSystemContext()

  const [emailFrequency, setEmailFrequency] = useState(
    me.emailFrequency ?? "daily"
  )
  const [mode, setMode] = useState(Mode.Pending)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = async () => {
    try {
      timeoutRef.current && clearTimeout(timeoutRef.current)

      setMode(Mode.Loading)

      await UpdateUserEmailPreferencesMutation(
        relayEnvironment!,
        { emailFrequency },
        me.id
      )

      setMode(Mode.Success)
      timeoutRef.current = setTimeout(() => setMode(Mode.Pending), 5000)
    } catch (err) {
      console.error(err)
      setMode(Mode.Error)
      timeoutRef.current = setTimeout(() => setMode(Mode.Pending), 5000)
    }
  }

  return (
    <>
      {mode === Mode.Success && (
        <Banner variant="success" my={2} dismissable>
          Your email preferences have been updated.
        </Banner>
      )}

      <Select
        title="Email frequency"
        selected={emailFrequency}
        options={[
          { text: "None", value: "none" },
          { text: "Weekly", value: "weekly" },
          { text: "Daily", value: "daily" },
        ]}
        onSelect={setEmailFrequency}
      />

      <Spacer mt={2} />

      <Button onClick={handleClick} loading={mode === Mode.Loading}>
        {
          {
            [Mode.Pending]: "Update preferences",
            [Mode.Loading]: "Update preferences",
            [Mode.Success]: "Updated preferences",
            [Mode.Error]: "There was an error",
          }[mode]
        }
      </Button>
    </>
  )
}

export const UnsubscribeLoggedInFragmentContainer = createFragmentContainer(
  UnsubscribeLoggedIn,
  {
    me: graphql`
      fragment UnsubscribeLoggedIn_me on Me {
        id
        emailFrequency
      }
    `,
  }
)
