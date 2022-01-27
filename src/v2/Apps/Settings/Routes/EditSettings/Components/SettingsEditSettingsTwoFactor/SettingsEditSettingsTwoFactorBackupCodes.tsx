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
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useMode } from "v2/Utils/Hooks/useMode"
import { SettingsEditSettingsTwoFactorBackupCodes_me } from "v2/__generated__/SettingsEditSettingsTwoFactorBackupCodes_me.graphql"
import { SettingsEditSettingsTwoFactorBackupCodesDialogQueryRenderer } from "./SettingsEditSettingsTwoFactorBackupCodesDialog"
import { useCreateSettingsBackupSecondFactors } from "./useCreateSettingsBackupSecondFactorsMutation"

interface SettingsEditSettingsTwoFactorBackupCodesProps {
  me: SettingsEditSettingsTwoFactorBackupCodes_me
}

type Mode = "Pending" | "Show" | "Creating"

export const SettingsEditSettingsTwoFactorBackupCodes: FC<SettingsEditSettingsTwoFactorBackupCodesProps> = ({
  me,
}) => {
  const [mode, setMode] = useMode<Mode>("Pending")

  const { sendToast } = useToasts()

  const {
    submitCreateSettingsBackupSecondFactors,
  } = useCreateSettingsBackupSecondFactors()

  const handleGenerate = async () => {
    setMode("Creating")

    try {
      await submitCreateSettingsBackupSecondFactors()

      setMode("Show")
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })

      setMode("Pending")
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
          <Text variant="lg" mb={2}>
            Backup codes
            {me.backupSecondFactors?.length && (
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

        <Spacer ml={[0, 2]} mt={[2, 0]} />

        <Flex flexBasis="50%" alignItems="center" justifyContent="flex-end">
          {me.backupSecondFactors?.length ? (
            <>
              <Button
                onClick={handleShow}
                variant="secondaryOutline"
                width={["100%", "auto"]}
              >
                Show
              </Button>

              <Spacer ml={1} />

              <Button
                onClick={handleGenerate}
                loading={mode === "Creating"}
                width={["100%", "auto"]}
              >
                Regenerate
              </Button>
            </>
          ) : (
            <Button onClick={handleGenerate} loading={mode === "Creating"}>
              Set up
            </Button>
          )}
        </Flex>
      </Flex>

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
