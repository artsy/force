import { FC } from "react"
import {
  Column,
  GridColumns,
  Skeleton,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SettingsEditSettingsTwoFactorBackupCodesDialog_me } from "v2/__generated__/SettingsEditSettingsTwoFactorBackupCodesDialog_me.graphql"
import { SettingsEditSettingsTwoFactorBackupCodesDialogQuery } from "v2/__generated__/SettingsEditSettingsTwoFactorBackupCodesDialogQuery.graphql"

interface SettingsEditSettingsTwoFactorBackupCodesDialogProps {
  me?: SettingsEditSettingsTwoFactorBackupCodesDialog_me | null
}

const SettingsEditSettingsTwoFactorBackupCodesDialog: FC<SettingsEditSettingsTwoFactorBackupCodesDialogProps> = ({
  me,
}) => {
  return (
    <>
      <Text variant="sm" color="black60">
        Store these two-factor recovery codes in a safe place. You can use these
        one-time codes to access your account.
      </Text>

      {me?.backupSecondFactors ? (
        <GridColumns mt={2}>
          {me.backupSecondFactors.map(factor => {
            if (!factor) return null

            return (
              <Column span={6} key={factor.code}>
                <Text variant="lg" textAlign="center">
                  {factor.code}
                </Text>
              </Column>
            )
          })}
        </GridColumns>
      ) : (
        <Skeleton>
          <GridColumns mt={2}>
            {[...Array(12)].map((_, i) => (
              <Column key={i} span={6}>
                <SkeletonText variant="lg" textAlign="center">
                  Pending Code
                </SkeletonText>
              </Column>
            ))}
          </GridColumns>
        </Skeleton>
      )}
    </>
  )
}

const SettingsEditSettingsTwoFactorBackupCodesDialogFragmentContainer = createFragmentContainer(
  SettingsEditSettingsTwoFactorBackupCodesDialog,
  {
    me: graphql`
      fragment SettingsEditSettingsTwoFactorBackupCodesDialog_me on Me {
        backupSecondFactors: secondFactors(kinds: [backup]) {
          ... on BackupSecondFactor {
            code
          }
        }
      }
    `,
  }
)

export const SettingsEditSettingsTwoFactorBackupCodesDialogQueryRenderer = () => {
  return (
    <SystemQueryRenderer<SettingsEditSettingsTwoFactorBackupCodesDialogQuery>
      placeholder={
        <SettingsEditSettingsTwoFactorBackupCodesDialogFragmentContainer />
      }
      query={graphql`
        query SettingsEditSettingsTwoFactorBackupCodesDialogQuery {
          me {
            ...SettingsEditSettingsTwoFactorBackupCodesDialog_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        return (
          <SettingsEditSettingsTwoFactorBackupCodesDialogFragmentContainer
            me={props?.me}
          />
        )
      }}
    />
  )
}
