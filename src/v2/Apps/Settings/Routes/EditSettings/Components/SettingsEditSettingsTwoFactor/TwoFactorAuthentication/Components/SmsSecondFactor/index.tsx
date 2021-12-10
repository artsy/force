import {
  Box,
  Button,
  Flex,
  ModalDialog,
  Spacer,
  Sup,
  Text,
} from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { RelayRefetchProp, createFragmentContainer, graphql } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import { useSystemContext } from "v2/System"
import { ApiError } from "../../ApiError"
import { SmsSecondFactorModal, OnCompleteRedirectModal } from "./Modal"
import { CreateSmsSecondFactor } from "./Mutation/CreateSmsSecondFactor"
import { CreateSmsSecondFactorInput } from "v2/__generated__/CreateSmsSecondFactorMutation.graphql"
import { SmsSecondFactor_me } from "v2/__generated__/SmsSecondFactor_me.graphql"
import { ApiErrorModal } from "../ApiErrorModal"
import { DisableFactorConfirmation } from "../DisableFactorConfirmation"
import { ConfirmPasswordModal } from "v2/Components/ConfirmPasswordModal"
import { afterUpdateRedirect } from "v2/Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/helpers"

interface SmsSecondFactorProps {
  me: SmsSecondFactor_me
  relayRefetch?: RelayRefetchProp
}

export const SmsSecondFactor: React.FC<SmsSecondFactorProps> = ({
  me,
  relayRefetch,
}) => {
  const { relayEnvironment } = useSystemContext()
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showCompleteRedirectModal, setShowCompleteRedirectModal] = useState(
    false
  )
  const [apiErrors, setApiErrors] = useState<ApiError[]>([])
  const [isDisabling] = useState(false)
  const [isCreating, setCreating] = useState(false)

  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)

  const redirectTo = afterUpdateRedirect()

  const enabledSecondFactorLabel =
    me.smsSecondFactors?.length &&
    me.smsSecondFactors[0]?.__typename === "SmsSecondFactor"
      ? me.smsSecondFactors[0].formattedPhoneNumber
      : null

  const isEnabled = !!enabledSecondFactorLabel

  function onComplete() {
    const showCompleteModalCallback = () => {
      setShowSetupModal(false)
      setShowCompleteModal(true)
    }

    const showCompleteRedirectModalCallback = () => {
      setShowSetupModal(false)
      setShowCompleteRedirectModal(true)
    }

    if (me.hasSecondFactorEnabled) {
      relayRefetch?.refetch({}, {}, showCompleteModalCallback)
    } else {
      showCompleteModalCallback()
      if (redirectTo) {
        showCompleteRedirectModalCallback()
      } else {
        showCompleteModalCallback()
      }
    }
  }

  async function onCompleteConfirmed() {
    if (me.hasSecondFactorEnabled) {
      setShowCompleteModal(false)
    } else {
      await request
        .delete("/users/sign_out")
        .set("X-Requested-With", "XMLHttpRequest")

      location.reload()
    }
  }

  function onCompleteRedirect() {
    if (me.hasSecondFactorEnabled) {
      setShowCompleteModal(false)
    } else {
      window.location.assign(redirectTo)
    }
  }

  function handleMutationError(errors: ApiError[]) {
    if (!Array.isArray(errors)) {
      throw errors
    }

    setApiErrors(errors)
  }

  async function createSecondFactor(
    password: CreateSmsSecondFactorInput["password"]
  ) {
    setCreating(true)

    try {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const response = await CreateSmsSecondFactor(relayEnvironment, {
        attributes: {},
        password,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const factor = response.createSmsSecondFactor.secondFactorOrErrors
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setStagedSecondFactor(factor)
      setShowConfirmPassword(false)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }

    setCreating(false)
  }

  async function onDisableSecondFactor() {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    relayRefetch.refetch({}, {}, () => {
      setShowConfirmDisable(false)
    })
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
            Use Text Messages
            {enabledSecondFactorLabel && (
              <>
                {" "}
                <Sup color="black60">{enabledSecondFactorLabel}</Sup>
              </>
            )}
          </Text>

          <Text variant="sm" color="black60">
            Security codes will be sent to your mobile phone.
          </Text>
        </Box>

        <Spacer ml={[0, 2]} mt={[2, 0]} />

        <Flex flexBasis="50%" alignItems="center" justifyContent="flex-end">
          {isEnabled ? (
            <>
              <Button
                variant="secondaryOutline"
                width={["100%", "auto"]}
                onClick={() => setShowConfirmDisable(true)}
                loading={isDisabling}
                disabled={isDisabling}
              >
                Disable
              </Button>

              <Spacer ml={1} />

              <Button
                variant="secondaryGray"
                width={["100%", "auto"]}
                onClick={() => setShowConfirmPassword(true)}
                loading={isCreating}
                disabled={isCreating}
              >
                Edit
              </Button>
            </>
          ) : (
            <Button
              width={["100%", "auto"]}
              onClick={() => setShowConfirmPassword(true)}
              loading={isCreating}
              disabled={isCreating}
            >
              Set up
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Modals */}

      <ConfirmPasswordModal
        show={showConfirmPassword}
        onConfirm={createSecondFactor}
        onCancel={() => setShowConfirmPassword(false)}
        title="Set up with text message"
        subTitle="Confirm your password to continue."
      />

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

      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      {me.smsSecondFactors.length > 0 &&
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        me.smsSecondFactors[0].__typename === "SmsSecondFactor" && (
          <DisableFactorConfirmation
            show={showConfirmDisable}
            onConfirm={onDisableSecondFactor}
            onCancel={() => setShowConfirmDisable(false)}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            secondFactorID={me.smsSecondFactors[0].internalID}
          />
        )}

      {showCompleteModal && (
        <ModalDialog
          title="Set Up With Text Message"
          onClose={onCompleteConfirmed}
          footer={
            <Button onClick={onCompleteConfirmed} width="100%">
              {me.hasSecondFactorEnabled ? "OK" : "Log Back In"}
            </Button>
          }
        >
          <Text variant="sm" color="black60">
            You’ve successfully set up two-factor authentication!
          </Text>

          {!me.hasSecondFactorEnabled && (
            <Text variant="sm" mt={2} color="black60">
              You will be logged out of this session and prompted to enter a
              two-factor authentication code.
            </Text>
          )}
        </ModalDialog>
      )}

      <OnCompleteRedirectModal
        onClick={onCompleteRedirect}
        redirectTo={redirectTo}
        show={showCompleteRedirectModal}
      />
    </>
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
