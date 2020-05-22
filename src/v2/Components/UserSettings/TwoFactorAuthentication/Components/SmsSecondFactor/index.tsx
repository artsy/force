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
import { RelayRefetchProp, createFragmentContainer, graphql } from "react-relay"
import request from "superagent"

import { useSystemContext } from "v2/Artsy"

import { ApiError } from "../../ApiError"
import { DisableSecondFactor } from "../Mutation/DisableSecondFactor"
import { SmsSecondFactorModal } from "./Modal"
import { CreateSmsSecondFactor } from "./Mutation/CreateSmsSecondFactor"

import { SmsSecondFactor_me } from "v2/__generated__/SmsSecondFactor_me.graphql"
import { ApiErrorModal } from "../ApiErrorModal"
import { DisableFactorConfirmation } from "../DisableFactorConfirmation"

interface SmsSecondFactorProps extends BorderBoxProps {
  me: SmsSecondFactor_me
  relayRefetch?: RelayRefetchProp
}

export const SmsSecondFactor: React.FC<SmsSecondFactorProps> = props => {
  const { me, relayRefetch } = props
  const { relayEnvironment } = useSystemContext()
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [apiErrors, setApiErrors] = useState<ApiError[]>([])
  const [isDisabling, setDisabling] = useState(false)
  const [isCreating, setCreating] = useState(false)

  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)

  function onComplete() {
    const showCompleteModalCallback = () => {
      setShowSetupModal(false)
      setShowCompleteModal(true)
    }

    if (props.me.hasSecondFactorEnabled) {
      relayRefetch.refetch({}, {}, showCompleteModalCallback)
    } else {
      showCompleteModalCallback()
    }
  }

  async function onCompleteConfirmed() {
    if (props.me.hasSecondFactorEnabled) {
      setShowCompleteModal(false)
    } else {
      await request
        .delete("/users/sign_out")
        .set("X-Requested-With", "XMLHttpRequest")

      location.reload()
    }
  }

  function handleMutationError(errors: ApiError[]) {
    if (!Array.isArray(errors)) {
      throw errors
    }

    setApiErrors(errors)
  }

  async function createSecondFactor() {
    setCreating(true)

    try {
      const response = await CreateSmsSecondFactor(relayEnvironment, {
        attributes: {},
      })
      const factor = response.createSmsSecondFactor.secondFactorOrErrors

      setStagedSecondFactor(factor)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }

    setCreating(false)
  }

  async function disableSecondFactor() {
    if (me.smsSecondFactors[0].__typename !== "SmsSecondFactor") {
      return
    }

    setShowConfirmDisable(false)
    setDisabling(true)

    try {
      await DisableSecondFactor(relayEnvironment, {
        secondFactorID: me.smsSecondFactors[0].internalID,
      })

      relayRefetch.refetch({}, {}, () => {
        setDisabling(false)
      })
    } catch (error) {
      setDisabling(false)
      handleMutationError(error)
    }
  }

  const DisableButton = props => (
    <Button
      onClick={() => setShowConfirmDisable(true)}
      variant="secondaryOutline"
      loading={isDisabling}
      disabled={isDisabling}
      {...props}
    >
      Disable
    </Button>
  )

  const SetupButton = props => (
    <Button
      onClick={createSecondFactor}
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
            Use text messages
          </Sans>
          <Serif mt={1} size="3t" color="black60">
            Security codes will be sent to your mobile phone.
          </Serif>
        </Flex>
        <Flex mt={[3, 0]} flexDirection={["column", "row"]} alignItems="center">
          {me.smsSecondFactors.length &&
            me.smsSecondFactors[0].__typename === "SmsSecondFactor" ? (
              <>
                <Sans color="black60" size="3" weight="medium">
                  {me.smsSecondFactors[0].formattedPhoneNumber}
                </Sans>
                <DisableButton width={["100%", "auto"]} ml={[0, 1]} mt={[1, 0]} />
                <SetupButton
                  width={["100%", "auto"]}
                  ml={[0, 1]}
                  mt={[1, 0]}
                  variant="secondaryGray"
                >
                  Edit
              </SetupButton>
              </>
            ) : (
              <SetupButton width={["100%", "auto"]} ml={[0, 1]} mt={[1, 0]}>
                Set up
              </SetupButton>
            )}
        </Flex>
      </Flex>
      <SmsSecondFactorModal
        show={showSetupModal}
        secondFactor={stagedSecondFactor}
        onComplete={onComplete}
        onClose={() => setShowSetupModal(false)}
      />
      <ApiErrorModal
        onClose={() => setApiErrors([])}
        show={!!apiErrors.length}
        errors={apiErrors}
      />
      <DisableFactorConfirmation
        show={showConfirmDisable}
        onConfirm={disableSecondFactor}
        onCancel={() => setShowConfirmDisable(false)}
      />
      <Modal
        title="Set up with text message"
        onClose={onCompleteConfirmed}
        show={showCompleteModal}
        hideCloseButton={!me.hasSecondFactorEnabled}
        FixedButton={
          <Button onClick={onCompleteConfirmed} block width="100%">
            {me.hasSecondFactorEnabled ? "OK" : "Log back in"}
          </Button>
        }
      >
        <Serif size="3t" color="black60">
          You’ve successfully set up two-factor authentication!
        </Serif>
        {!me.hasSecondFactorEnabled && (
          <Serif mt={2} size="3t" color="black60">
            You will be logged out of this session and prompted to enter a
            two-factor authentication code.
          </Serif>
        )}
      </Modal>
    </BorderBox>
  )
}

export const SmsSecondFactorFragmentContainer = createFragmentContainer(
  SmsSecondFactor,
  {
    me: graphql`
      fragment SmsSecondFactor_me on Me {
        hasSecondFactorEnabled

        smsSecondFactors: secondFactors(kinds: [sms]) {
          ... on SmsSecondFactor {
            __typename
            internalID
            formattedPhoneNumber
          }
        }
      }
    `,
  }
)
