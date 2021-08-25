import {
  Banner,
  Box,
  Button,
  Text,
  TextArea,
  TextAreaChange,
} from "@artsy/palette"
import React from "react"
import { useState } from "react"
import { useInquiryContext } from "../InquiryContext"
import { useUpdateCollectorProfile } from "../useUpdateCollectorProfile"
import { logger } from "../util"

enum Mode {
  Pending,
  Loading,
  Success,
  Error,
}

export const InquiryInstitutionalAffiliations: React.FC = () => {
  const { next } = useInquiryContext()

  const { submitUpdateCollectorProfile } = useUpdateCollectorProfile()

  const [mode, setMode] = useState(Mode.Pending)

  const [institutionalAffiliations, setInstitutionalAffiliations] = useState<
    string | null
  >(null)

  const handleChange = ({ value }: TextAreaChange) => {
    setInstitutionalAffiliations(value)
  }

  const handleClick = async () => {
    setMode(Mode.Loading)

    if (institutionalAffiliations === null) {
      next()
      return
    }

    try {
      await submitUpdateCollectorProfile({ institutionalAffiliations })
      setMode(Mode.Success)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  return (
    <>
      <Text variant="lg">
        Any institutional affiliations?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      <Text variant="md" color="black60" mb={2}>
        Collector groups, memberships, etc.
      </Text>

      {mode === Mode.Error && (
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
        loading={mode === Mode.Loading}
        disabled={mode === Mode.Success}
      >
        Next
      </Button>
    </>
  )
}
