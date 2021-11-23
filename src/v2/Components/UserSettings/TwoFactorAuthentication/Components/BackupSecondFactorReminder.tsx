import { BorderBoxProps, Box, Flex, Text } from "@artsy/palette"
import { BackupSecondFactorActions } from "./BackupSecondFactor/BackupSecondFactorActions"
import * as React from "react"

interface BackupSecondFactorReminderProps extends BorderBoxProps {
  backupSecondFactors: string[]
  factorTypeName: string
}

export const BackupSecondFactorReminder: React.FC<BackupSecondFactorReminderProps> = props => {
  const { backupSecondFactors, factorTypeName } = props

  return (
    <Box minHeight="280px">
      <Text color="black60">
        You can use these one-time codes to access your account if you lose
        access to your{" "}
        {factorTypeName === "AppSecondFactor"
          ? "authenticator application"
          : "phone"}
        .
      </Text>
      <Text mt={2} variant="mediumText" color="black80">
        Treat these codes like a password and store them in a safe place.
      </Text>
      <Flex mt={3} flexDirection="row" flexWrap="wrap">
        {backupSecondFactors.map((factor, index) => (
          <Box width="50%" key={index}>
            <Text
              variant="subtitle"
              color="black60"
              textAlign="center"
              py={0.5}
            >
              {factor}
            </Text>
          </Box>
        ))}
      </Flex>

      <BackupSecondFactorActions backupSecondFactors={backupSecondFactors} />
    </Box>
  )
}
