import { Button, Checkbox, Spacer, useToasts } from "@artsy/palette"
import { useRef, useState } from "react"
import * as React from "react"
import { getENV } from "v2/Utils/getENV"
import { useMode } from "v2/Utils/Hooks/useMode"

interface UnsubscribeLoggedOutProps {
  authenticationToken: string
}

type Mode = "Pending" | "Loading" | "Success" | "Error"

export const UnsubscribeLoggedOut: React.FC<UnsubscribeLoggedOutProps> = ({
  authenticationToken,
}) => {
  const [emailTypes, setEmailTypes] = useState<string[]>([])
  const [mode, setMode] = useMode<Mode>("Pending")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { sendToast } = useToasts()

  const handleClick = async () => {
    try {
      timeoutRef.current && clearTimeout(timeoutRef.current)

      setMode("Loading")

      const res = await fetch(`${getENV("API_URL")}/api/v1/me/unsubscribe`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-Xapp-Token": getENV("ARTSY_XAPP_TOKEN"),
        },
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
          authentication_token: authenticationToken,
          type: emailTypes,
        }),
      })

      if (res.ok) {
        setMode("Success")

        sendToast({
          variant: "success",
          message: "Your email preferences have been updated.",
        })

        return
      }

      const err = await res.json()

      sendToast({
        variant: "error",
        message: "There was a problem updating your email preferences.",
        description: err.text,
      })

      setMode("Error")
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

  const handleSelect = (emailType: string) => () => {
    setEmailTypes(prevEmailTypes => {
      return prevEmailTypes.includes(emailType)
        ? prevEmailTypes.filter(prevEmailType => prevEmailType !== emailType)
        : [...prevEmailTypes, emailType]
    })
  }
  return (
    <>
      <Checkbox
        onSelect={handleSelect("all")}
        selected={emailTypes.includes("all")}
        disabled={mode === "Success"}
      >
        Opt out of all email
      </Checkbox>

      <Spacer mt={2} />

      <Button
        onClick={handleClick}
        loading={mode === "Loading"}
        disabled={emailTypes.length === 0 || mode === "Success"}
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
