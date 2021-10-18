import { Button, Checkbox, Spacer, useToasts } from "@artsy/palette"
import React, { useRef, useState } from "react"
import { data as sd } from "sharify"

enum Mode {
  Pending,
  Loading,
  Success,
  Error,
}

interface UnsubscribeLoggedOutProps {
  authenticationToken: string
}

export const UnsubscribeLoggedOut: React.FC<UnsubscribeLoggedOutProps> = ({
  authenticationToken,
}) => {
  const [emailTypes, setEmailTypes] = useState<string[]>([])
  const [mode, setMode] = useState(Mode.Pending)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { sendToast } = useToasts()

  const handleClick = async () => {
    try {
      timeoutRef.current && clearTimeout(timeoutRef.current)

      setMode(Mode.Loading)

      const res = await fetch(`${sd.API_URL}/api/v1/me/unsubscribe`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
          authentication_token: authenticationToken,
          type: emailTypes,
        }),
      })

      if (res.ok) {
        setMode(Mode.Success)

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

      setMode(Mode.Error)
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
        disabled={mode === Mode.Success}
      >
        Opt out of all email
      </Checkbox>

      <Spacer mt={2} />

      <Button
        onClick={handleClick}
        loading={mode === Mode.Loading}
        disabled={emailTypes.length === 0 || mode === Mode.Success}
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
