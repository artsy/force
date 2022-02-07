import { Spacer, Button, Select, useToasts } from "@artsy/palette"
import { useRef, useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { UnsubscribeLoggedIn_me } from "v2/__generated__/UnsubscribeLoggedIn_me.graphql"
import { useMode } from "v2/Utils/Hooks/useMode"
import { useUnsubscribeEmailPreferences } from "../useUnsubscribeEmailPreferences"

interface UnsubscribeLoggedInProps {
  me: UnsubscribeLoggedIn_me
}

type Mode = "Pending" | "Loading" | "Success" | "Error"

export const UnsubscribeLoggedIn: React.FC<UnsubscribeLoggedInProps> = ({
  me,
}) => {
  const [emailFrequency, setEmailFrequency] = useState(
    me.emailFrequency ?? "daily"
  )
  const [mode, setMode] = useMode<Mode>("Pending")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { sendToast } = useToasts()
  const { submitMutation } = useUnsubscribeEmailPreferences()

  const handleClick = async () => {
    try {
      timeoutRef.current && clearTimeout(timeoutRef.current)

      setMode("Loading")

      submitMutation({ input: { emailFrequency } })

      sendToast({
        variant: "success",
        message: "Your email preferences have been updated.",
      })

      setMode("Success")
      timeoutRef.current = setTimeout(() => setMode("Pending"), 5000)
    } catch (err) {
      console.error(err)

      sendToast({
        variant: "error",
        message: "There was a problem updating your email preferences.",
        description: err.message,
      })

      setMode("Error")
      timeoutRef.current = setTimeout(() => setMode("Pending"), 5000)
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
        loading={mode === "Loading"}
        width={["100%", "auto"]}
      >
        {
          {
            ["Pending"]: "Update preferences",
            ["Loading"]: "Update preferences",
            ["Success"]: "Updated preferences",
            ["Error"]: "There was an error",
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
