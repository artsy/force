import {
  BorderBox,
  BorderBoxProps,
  Button,
  Flex,
  Modal,
  Sans,
  Serif,
} from "@artsy/palette"
import React, { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { useSystemContext } from "v2/Artsy"
import { BackupSecondFactorModalContentQueryRenderer as ModalContent } from "./BackupSecondFactorModalContent"
import { CreateBackupSecondFactors } from "./Mutation/CreateBackupSecondFactors"

import { BackupSecondFactor_me } from "v2/__generated__/BackupSecondFactor_me.graphql"

interface BackupSecondFactorProps extends BorderBoxProps {
  me: BackupSecondFactor_me
}

export const BackupSecondFactor: React.FC<BackupSecondFactorProps> = props => {
  const { me } = props
  const { relayEnvironment } = useSystemContext()

  const [showModal, setShowModal] = useState(false)
  const [isCreating, setCreating] = useState(false)

  async function createBackupSecondFactors() {
    setCreating(true)

    try {
      await CreateBackupSecondFactors(relayEnvironment)
      setShowModal(true)
    } catch (e) {
      console.error(e)
    }

    setCreating(false)
  }

  const ShowButton = props => (
    <Button
      onClick={() => setShowModal(true)}
      variant="secondaryOutline"
      {...props}
    >
      Show
    </Button>
  )

  const SetupButton = props => (
    <Button
      onClick={createBackupSecondFactors}
      loading={isCreating}
      disabled={isCreating}
      {...props}
    />
  )

  return (
    <BorderBox p={2} {...props}>
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        width="100%"
      >
        <Flex flexDirection="column" maxWidth="345px">
          <Sans size="4t" color="black100">
            Backup codes
          </Sans>
          <Serif mt={1} size="3t" color="black60">
            Generate one-time backup codes to access your account. Keep these
            safe.
          </Serif>
        </Flex>
        <Flex mt={[3, 0]} flexDirection={["column", "row"]} alignItems="center">
          {me.backupSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.backupSecondFactors.length} remaining
              </Sans>
              <ShowButton width={["100%", "auto"]} ml={[0, 1]} mt={[1, 0]} />
              <SetupButton
                width={["100%", "auto"]}
                ml={[0, 1]}
                mt={[1, 0]}
                variant="secondaryGray"
              >
                Regenerate
              </SetupButton>
            </>
          ) : (
              <SetupButton width={["100%", "auto"]} ml={[0, 1]} mt={[1, 0]}>
                Set up
              </SetupButton>
            )}
        </Flex>
      </Flex>
      <Modal
        title="Your backup codes"
        show={showModal}
        onClose={() => setShowModal(false)}
        FixedButton={
          <Button block width="100%" onClick={() => setShowModal(false)}>
            Done
          </Button>
        }
      >
        <ModalContent />
      </Modal>
    </BorderBox>
  )
}

export const BackupSecondFactorFragmentContainer = createFragmentContainer(
  BackupSecondFactor,
  {
    me: graphql`
      fragment BackupSecondFactor_me on Me {
        backupSecondFactors: secondFactors(kinds: [backup]) {
          ... on BackupSecondFactor {
            __typename
          }
        }
      }
    `,
  }
)
