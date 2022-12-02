import {
  Box,
  Button,
  Flex,
  ModalDialog,
  Spacer,
  Sup,
  Text,
  useToasts,
} from "@artsy/palette"
import { ConfirmPasswordModal } from "Components/ConfirmPasswordModal"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useMode } from "Utils/Hooks/useMode"
import { SettingsEditSettingsTwoFactorBackupCodes_me$data } from "__generated__/SettingsEditSettingsTwoFactorBackupCodes_me.graphql"
import { CreateBackupSecondFactorsInput } from "__generated__/useCreateSettingsBackupSecondFactorsMutation.graphql"
import { SettingsEditSettingsTwoFactorBackupCodesDialogQueryRenderer } from "./SettingsEditSettingsTwoFactorBackupCodesDialog"
import { useCreateSettingsBackupSecondFactors } from "./useCreateSettingsBackupSecondFactorsMutation"

interface SettingsEditSettingsTwoFactorBackupCodesProps {
  me: SettingsEditSettingsTwoFactorBackupCodes_me$data
}

type Mode = "Pending" | "Show" | "Creating"

export const SettingsEditSettingsTwoFactorBackupCodes: FC<SettingsEditSettingsTwoFactorBackupCodesProps> = ({
  me,
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { sendToast } = useToasts()

  const {
    submitCreateSettingsBackupSecondFactors,
  } = useCreateSettingsBackupSecondFactors()

  const handleGenerate = async (
    password: CreateBackupSecondFactorsInput["password"]
  ) => {
    setMode("Creating")

    try {
      await submitCreateSettingsBackupSecondFactors({ password })

      setMode("Show")
      setShowConfirmPassword(false)
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })

      setMode("Pending")
      setShowConfirmPassword(false)
    }
  }

  const handleShow = () => {
    setMode("Show")
  }

  const handleClose = () => {
    setMode("Pending")
  }

  return (
    <>
      <Flex
        p={2}
        border="1px solid"
        borderColor="black10"
        flexDirection={["column", "row"]}
      >
        <Box flexBasis="50%">
          <Text variant={["md", "lg"]} mb={2}>
            Backup Codes
            {me.backupSecondFactors && me.backupSecondFactors.length > 0 && (
              <>
                &nbsp;
                <Sup color="brand">{me.backupSecondFactors.length}</Sup>
              </>
            )}
          </Text>

          <Text variant="sm" color="black60">
            Generate one-time backup codes to access your account. Keep these
            safe.
          </Text>
        </Box>

        <Spacer x={[0, 2]} y={[2, 0]} />

        <Flex flexBasis="50%" alignItems="center" justifyContent="flex-end">
          {me.backupSecondFactors?.length ? (
            <>
              <Button
                onClick={handleShow}
                variant="secondaryBlack"
                width={["100%", "auto"]}
              >
                Show
              </Button>

              <Spacer x={1} />

              <Button
                onClick={() => setShowConfirmPassword(true)}
                loading={mode === "Creating"}
                width={["100%", "auto"]}
              >
                Regenerate
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setShowConfirmPassword(true)}
              loading={mode === "Creating"}
            >
              Set up
            </Button>
          )}
        </Flex>
      </Flex>

      <ConfirmPasswordModal
        show={showConfirmPassword}
        onConfirm={handleGenerate}
        onCancel={() => setShowConfirmPassword(false)}
        title="Regenerate Backup Codes"
        subTitle="Confirm your password to continue."
      />

      {mode === "Show" && (
        <ModalDialog
          title="Your backup codes"
          onClose={handleClose}
          footer={
            <Button width="100%" onClick={handleClose}>
              Done
            </Button>
          }
        >
          <SettingsEditSettingsTwoFactorBackupCodesDialogQueryRenderer />
        </ModalDialog>
      )}
    </>
  )
}

export const SettingsEditSettingsTwoFactorBackupCodesFragmentContainer = createFragmentContainer(
  SettingsEditSettingsTwoFactorBackupCodes,
  {
    me: graphql`
      fragment SettingsEditSettingsTwoFactorBackupCodes_me on Me {
        backupSecondFactors: secondFactors(kinds: [backup]) {
          ... on BackupSecondFactor {
            __typename
          }
        }
      }
    `,
  }
)
