import {
  Banner,
  Box,
  Button,
  Text,
  TextArea,
  TextAreaChange,
} from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { useInquiryContext } from "../Hooks/useInquiryContext"
import { useUpdateCollectorProfile } from "../Hooks/useUpdateCollectorProfile"
import { logger } from "../util"

type Mode = "Pending" | "Loading" | "Success" | "Error"

export const InquiryInstitutionalAffiliations: React.FC = () => {
  const { next } = useInquiryContext()

  const { submitUpdateCollectorProfile } = useUpdateCollectorProfile()

  const [mode, setMode] = useState<Mode>("Pending")

  const [institutionalAffiliations, setInstitutionalAffiliations] = useState<
    string | null
  >(null)

  const handleChange = ({ value }: TextAreaChange) => {
    setInstitutionalAffiliations(value)
  }

  const handleClick = async () => {
    setMode("Loading")

    if (institutionalAffiliations === null) {
      next()
      return
    }

    try {
      await submitUpdateCollectorProfile({ institutionalAffiliations })
      setMode("Success")
      next()
    } catch (err) {
      logger.error(err)
      setMode("Error")
    }
  }

  return (
    <>
      <Text variant="lg" pr={2}>
        Any institutional affiliations?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      <Text variant="md" color="black60" mb={2}>
        Collector groups, memberships, etc.
      </Text>

      {mode === "Error" && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <TextArea
        name="institutionalAffiliations"
        onChange={handleChange}
        autoFocus
        mb={2}
      />

      <Button
        width="100%"
        onClick={handleClick}
        loading={mode === "Loading"}
        disabled={mode === "Success"}
      >
        Next
      </Button>
    </>
  )
}
