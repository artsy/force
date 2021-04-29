import { BorderBoxProps, Box, Flex, Sans } from "@artsy/palette"
import React from "react"

interface BackupSecondFactorReminderProps extends BorderBoxProps {
  backupSecondFactors: string[]
  factorTypeName: string
}

export const BackupSecondFactorReminder: React.FC<BackupSecondFactorReminderProps> = props => {
  const { backupSecondFactors, factorTypeName } = props

  return (
    <Box minHeight="280px">
      <Sans size="3" color="black60">
        You can use these one-time codes to access your account if you lose
        access to your{" "}
        {factorTypeName === "AppSecondFactor"
          ? "authenticator application"
          : "phone"}
        .
      </Sans>
      <Sans mt={2} size="3" color="black60">
        Treat these codes like your password and store them in a safe place.
      </Sans>
      <Flex mt={3} flexDirection="row" flexWrap="wrap">
        {backupSecondFactors.map((factor, index) => (
          <Box width="50%" key={index}>
            <Sans size="6" color="black60" textAlign="center" py={0.5}>
              {factor}
            </Sans>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
