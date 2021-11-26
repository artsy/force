import { Spacer, Button, Select, useToasts } from "@artsy/palette"
import { useRef, useState } from "react"
import * as React from "react"
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

  const { sendToast } = useToasts()

  const handleClick = async () => {
    try {
      timeoutRef.current && clearTimeout(timeoutRef.current)

      setMode(Mode.Loading)

      await UpdateUserEmailPreferencesMutation(
        relayEnvironment!,
        { emailFrequency },
        me.id
      )

      sendToast({
        variant: "success",
        message: "Your email preferences have been updated.",
      })

      setMode(Mode.Success)
      timeoutRef.current = setTimeout(() => setMode(Mode.Pending), 5000)
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: "There was a problem updating your email preferences.",
        description: err.message,
      })

      setMode(Mode.Error)
      timeoutRef.current = setTimeout(() => setMode(Mode.Pending), 5000)
    }
  }

  return (
    <>
      <Select
        title="Email frequency"
        selected={emailFrequency}
        options={[
          { text: "None", value: "none" },
          { text: "Weekly", value: "weekly" },
          { text: "Daily", value: "daily" },
          { text: "Alerts Only", value: "alerts_only" },
        ]}
        onSelect={setEmailFrequency}
      />

      <Spacer mt={2} />

      <Button
        onClick={handleClick}
        loading={mode === Mode.Loading}
        width={["100%", "auto"]}
      >
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
