import { SettingsEditSettingsTwoFactorBackupCodesActions } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/SettingsEditSettingsTwoFactorBackupCodesActions"
import { type BorderBoxProps, Column, GridColumns, Text } from "@artsy/palette"
import type * as React from "react"

interface BackupSecondFactorReminderProps extends BorderBoxProps {
  backupSecondFactors: string[]
  factorTypeName: string
}

export const BackupSecondFactorReminder: React.FC<
  React.PropsWithChildren<BackupSecondFactorReminderProps>
> = props => {
  const { backupSecondFactors, factorTypeName } = props

  return (
    <>
      <Text variant="sm" color="mono60">
        You can use these one-time codes to access your account if you lose
        access to your{" "}
        {factorTypeName === "AppSecondFactor"
          ? "authenticator application"
          : "phone"}
        .
      </Text>

      <Text mt={2} variant="sm" color="mono60">
        Treat these codes like a password and store them in a safe place.
      </Text>

      <GridColumns mt={2}>
        {backupSecondFactors.map(factor => {
          if (!factor) return null

          return (
            <Column span={6} key={factor}>
              <Text variant={["md", "lg"]} textAlign="center">
                {factor}
              </Text>
            </Column>
          )
        })}
      </GridColumns>

      <SettingsEditSettingsTwoFactorBackupCodesActions
        mt={4}
        backupSecondFactors={backupSecondFactors}
      />
    </>
  )
}
