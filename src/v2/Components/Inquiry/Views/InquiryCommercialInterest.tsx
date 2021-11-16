import { Banner, Button, Text } from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { useUpdateMyUserProfile } from "../Hooks/useUpdateMyUserProfile"
import { logger } from "../util"

enum Mode {
  Pending,
  Loading3,
  Loading2,
  Success,
  Error,
}

export const InquiryCommercialInterest: React.FC = () => {
  const { next, setContext, relayEnvironment } = useInquiryContext()

  const [mode, setMode] = useState(Mode.Pending)

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment.current!,
  })

  const handleClick = (value: 2 | 3) => async () => {
    setContext({ collectorLevel: value })

    setMode({ 2: Mode.Loading2, 3: Mode.Loading3 }[value])

    try {
      await submitUpdateMyUserProfile({ collectorLevel: value })
      setMode(Mode.Success)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  return (
    <>
      <Text variant="lg" mb={2} pr={2}>
        Have you bought art from a gallery or auction house before?
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <Button
        variant="secondaryOutline"
        width="100%"
        onClick={handleClick(3)}
        loading={mode === Mode.Loading3}
        disabled={mode === Mode.Success || mode === Mode.Loading2}
        mb={1}
      >
        Yes
      </Button>

      <Button
        variant="secondaryOutline"
        width="100%"
        onClick={handleClick(2)}
        loading={mode === Mode.Loading2}
        disabled={mode === Mode.Success || mode === Mode.Loading3}
      >
        Not yet
      </Button>
    </>
  )
}
