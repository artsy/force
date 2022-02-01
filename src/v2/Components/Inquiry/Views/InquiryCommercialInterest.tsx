import { Banner, Button, Text } from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { useUpdateMyUserProfile } from "../Hooks/useUpdateMyUserProfile"
import { logger } from "../util"

type Mode = "Pending" | "Loading3" | "Loading2" | "Success" | "Error"

export const InquiryCommercialInterest: React.FC = () => {
  const { next, setContext, relayEnvironment } = useInquiryContext()

  const [mode, setMode] = useState<Mode>("Pending")

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment.current!,
  })

  const handleClick = (value: 2 | 3) => async () => {
    setContext({ collectorLevel: value })

    setMode({ 2: "Loading2", 3: "Loading3" }[value] as Mode)

    try {
      await submitUpdateMyUserProfile({ collectorLevel: value })
      setMode("Success")
      next()
    } catch (err) {
      logger.error(err)
      setMode("Error")
    }
  }

  return (
    <>
      <Text variant="lg" mb={2} pr={2}>
        Have you bought art from a gallery or auction house before?
      </Text>

      {mode === "Error" && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <Button
        variant="secondaryOutline"
        width="100%"
        onClick={handleClick(3)}
        loading={mode === "Loading3"}
        disabled={mode === "Success" || mode === "Loading2"}
        mb={1}
      >
        Yes
      </Button>

      <Button
        variant="secondaryOutline"
        width="100%"
        onClick={handleClick(2)}
        loading={mode === "Loading2"}
        disabled={mode === "Success" || mode === "Loading3"}
      >
        Not yet
      </Button>
    </>
  )
}
