import {
  Box,
  Button,
  Flex,
  Modal,
  Spacer,
  Sup,
  Text,
  useToasts,
} from "@artsy/palette"
import { useState, FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditSettingsTwoFactorBackupCodes_me } from "v2/__generated__/SettingsEditSettingsTwoFactorBackupCodes_me.graphql"
import { SettingsEditSettingsTwoFactorBackupCodesDialogQueryRenderer } from "./SettingsEditSettingsTwoFactorBackupCodesDialog"
import { useCreateSettingsBackupSecondFactors } from "./useCreateSettingsBackupSecondFactorsMutation"

enum Mode {
  Pending,
  Show,
  Creating,
}

interface SettingsEditSettingsTwoFactorBackupCodesProps {
  me: SettingsEditSettingsTwoFactorBackupCodes_me
}

export const SettingsEditSettingsTwoFactorBackupCodes: FC<SettingsEditSettingsTwoFactorBackupCodesProps> = ({
  me,
}) => {
  const [mode, setMode] = useState(Mode.Pending)

  const { sendToast } = useToasts()

  const {
    submitCreateSettingsBackupSecondFactors,
  } = useCreateSettingsBackupSecondFactors()

  const handleGenerate = async () => {
    setMode(Mode.Creating)

    console.log("creating now")

    try {
      await submitCreateSettingsBackupSecondFactors()

      setMode(Mode.Show)
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })

      setMode(Mode.Pending)
    }
  }

  const handleShow = () => {
    setMode(Mode.Show)
  }

  const handleClose = () => {
    setMode(Mode.Pending)
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
                loading={mode === Mode.Creating}
                variant="secondaryGray"
                width={["100%", "auto"]}
              >
                Regenerate
              </Button>
            </>
          ) : (
            <Button
              onClick={handleGenerate}
              loading={mode === Mode.Creating}
              variant="secondaryGray"
            >
              Set up
            </Button>
          )}
        </Flex>
      </Flex>

      <Modal
        title="Your backup codes"
        show={mode === Mode.Show}
        onClose={handleClose}
        FixedButton={
          <Button width="100%" onClick={handleClose}>
            Done
          </Button>
        }
      >
        <SettingsEditSettingsTwoFactorBackupCodesDialogQueryRenderer />
      </Modal>
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
