import {
  Box,
  Button,
  Clickable,
  Flex,
  Message,
  ModalDialog,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import type { ApiError } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/ApiError"
import { DisableFactorConfirmation } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/DisableFactorConfirmation"
import { afterUpdateRedirect } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/helpers"
import { ConfirmPasswordModal } from "Components/ConfirmPasswordModal"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useVerifyEmail } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail"
import { isArtsyEmail } from "Utils/isArtsyEmail"
import type { CreateSmsSecondFactorInput } from "__generated__/CreateSmsSecondFactorMutation.graphql"
import type { SmsSecondFactor_me$data } from "__generated__/SmsSecondFactor_me.graphql"
import type * as React from "react"
import { useEffect, useState } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import { OnCompleteRedirectModal, SmsSecondFactorModal } from "./Modal"
import { CreateSmsSecondFactor } from "./Mutation/CreateSmsSecondFactor"

interface SmsSecondFactorProps {
  me: SmsSecondFactor_me$data
  relay: RelayRefetchProp
}

// TODO: This needs to be rebuilt from scratch
export const SmsSecondFactor: React.FC<
  React.PropsWithChildren<SmsSecondFactorProps>
> = ({ me, relay }) => {
  const { relayEnvironment } = useSystemContext()
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showCompleteRedirectModal, setShowCompleteRedirectModal] =
    useState(false)
  const [isDisabling] = useState(false) // ???
  const [isCreating, setCreating] = useState(false)
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [lastSentTime, setLastSentTime] = useState<number | null>(null)

  // Reset's _all_ of these state flags.
  // NOTE: Don't do this. Just hacking around the architecture here.
  const resetState = () => {
    setShowConfirmDisable(false)
    setShowConfirmPassword(false)
    setShowSetupModal(false)
    setShowCompleteModal(false)
    setShowCompleteRedirectModal(false)
    setCreating(false)
    setPasswordConfirmation("")
  }

  const { sendToast } = useToasts()
  const { submitMutation: submitVerifyEmailMutation } = useVerifyEmail()

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
      relay.refetch({}, {}, showCompleteModalCallback)
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

  function handleMutationError(err: ApiError[]) {
    console.error(err)

    const error = Array.isArray(err) ? err[0] : err

    resetState()

    sendToast({
      variant: "error",
      message: "An error occurred",
      description: error.message,
    })
  }

  async function createSecondFactor(
    password: CreateSmsSecondFactorInput["password"],
  ) {
    setCreating(true)

    try {
      const response = await CreateSmsSecondFactor(relayEnvironment, {
        attributes: {},
        password,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const factor = response.createSmsSecondFactor.secondFactorOrErrors
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setStagedSecondFactor(factor)
      setPasswordConfirmation(password)
      setShowConfirmPassword(false)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }

    setCreating(false)
  }

  async function onDisableSecondFactor() {
    relay.refetch({}, {}, () => {
      setShowConfirmDisable(false)
    })
  }

  async function handleSendVerifyEmail() {
    const COOLDOWN_MS = 30000 // 30 seconds
    const now = Date.now()

    // Guard: Check if already sending
    if (isSendingEmail) return

    // Guard: Check cooldown period
    if (lastSentTime && now - lastSentTime < COOLDOWN_MS) {
      const remainingSeconds = Math.ceil(
        (COOLDOWN_MS - (now - lastSentTime)) / 1000,
      )
      sendToast({
        variant: "message",
        message: "Please wait",
        description: `You can resend the verification email in ${remainingSeconds} seconds.`,
      })
      return
    }

    setIsSendingEmail(true)

    try {
      await submitVerifyEmailMutation({
        variables: { input: {} },
        rejectIf: res => {
          return res.sendConfirmationEmail?.confirmationOrError?.mutationError
        },
      })

      setEmailSent(true)
      setLastSentTime(now)
    } catch (error) {
      sendToast({
        variant: "error",
        message: "There was a problem",
        description: error.message || "Something went wrong",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Poll for email verification after user requests verification email
  useEffect(() => {
    if (emailSent && !me.isEmailConfirmed) {
      const interval = setInterval(() => {
        relay.refetch({}, null, {}, { force: true })
      }, 5000) // Check every 5 seconds

      return () => clearInterval(interval)
    }
  }, [emailSent, me.isEmailConfirmed, relay])

  const show2FAWarning = isArtsyEmail(me?.email)
  const showEmailVerificationWarning = !isEnabled && !me.isEmailConfirmed

  return (
    <>
      <Flex flexDirection="column" border="1px solid" borderColor="mono10">
        {show2FAWarning && (
          <Message
            variant="warning"
            title="Artsy employees are encouraged to use the “App Authenticator” 2FA
          method via 1Password (or your preferred password manager)."
          >
            You may find a detailed walkthrough{" "}
            <RouterLink
              inline
              to="https://artsy.net/employees-mfa-instructions"
            >
              here in Notion
            </RouterLink>
            .
          </Message>
        )}

        {showEmailVerificationWarning && (
          <Message
            variant={emailSent ? "success" : "error"}
            title={
              emailSent
                ? "Verification email sent"
                : "Email verification required"
            }
          >
            {emailSent ? (
              <>
                Please check your inbox and click the link to verify your email.{" "}
                <Clickable
                  onClick={handleSendVerifyEmail}
                  textDecoration="underline"
                  style={{ opacity: isSendingEmail ? 0.5 : 1 }}
                >
                  <Text variant="sm-display">
                    {isSendingEmail
                      ? "Sending..."
                      : "Resend verification email"}
                  </Text>
                </Clickable>
              </>
            ) : (
              <>
                You must verify your email address before setting up text
                message two-factor authentication.{" "}
                <Clickable
                  onClick={handleSendVerifyEmail}
                  textDecoration="underline"
                  style={{ opacity: isSendingEmail ? 0.5 : 1 }}
                >
                  <Text variant="sm-display">
                    {isSendingEmail ? "Sending..." : "Send verification email"}
                  </Text>
                </Clickable>
              </>
            )}
          </Message>
        )}

        <Flex p={2} flexDirection={["column", "row"]}>
          <Box flexBasis="50%">
            <Text variant={["md", "lg"]}>Use Text Messages</Text>

            {enabledSecondFactorLabel && (
              <Text variant={["md", "lg"]} color="mono60">
                {enabledSecondFactorLabel}
              </Text>
            )}

            <Spacer y={2} />

            <Text variant="sm" color="mono60">
              Security codes will be sent to your mobile phone.
            </Text>
          </Box>

          <Spacer x={[0, 2]} y={[2, 0]} />

          <Flex flexBasis="50%" alignItems="center" justifyContent="flex-end">
            {isEnabled ? (
              <>
                <Button
                  variant="secondaryBlack"
                  width={["100%", "auto"]}
                  onClick={() => setShowConfirmDisable(true)}
                  loading={isDisabling}
                  disabled={isDisabling}
                >
                  Disable
                </Button>

                <Spacer x={1} />

                <Button
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
                onClick={() => {
                  if (!me.isEmailConfirmed) {
                    sendToast({
                      variant: "error",
                      message: "Email verification required",
                      description:
                        "Please verify your email before setting up text message two-factor authentication.",
                    })
                    return
                  }
                  setShowConfirmPassword(true)
                }}
                loading={isCreating}
                disabled={isCreating || !me.isEmailConfirmed}
              >
                Set Up
              </Button>
            )}
          </Flex>
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
        password={passwordConfirmation}
        onComplete={onComplete}
        onClose={() => setShowSetupModal(false)}
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
          <Text variant="sm" color="mono60">
            You’ve successfully set up two-factor authentication!
          </Text>

          {!me.hasSecondFactorEnabled && (
            <Text variant="sm" mt={2} color="mono60">
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

export const SmsSecondFactorRefetchContainer = createRefetchContainer(
  SmsSecondFactor,
  {
    me: graphql`
      fragment SmsSecondFactor_me on Me {
        email
        hasSecondFactorEnabled
        isEmailConfirmed

        smsSecondFactors: secondFactors(kinds: [sms]) {
          ... on SmsSecondFactor {
            __typename
            internalID
            formattedPhoneNumber
          }
        }
      }
    `,
  },
  graphql`
    query SmsSecondFactorRefetchQuery {
      me {
        ...SmsSecondFactor_me
      }
    }
  `,
)
