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
import * as React from "react"
import { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ConfirmPasswordModal } from "Components/ConfirmPasswordModal"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { AppSecondFactor_me$data } from "__generated__/AppSecondFactor_me.graphql"
import { CreateAppSecondFactorInput } from "__generated__/CreateAppSecondFactorMutation.graphql"
import { ApiError } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/ApiError"
import { DisableFactorConfirmation } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/DisableFactorConfirmation"
import { AppSecondFactorModal, OnCompleteRedirectModal } from "./Modal"
import { CreateAppSecondFactor } from "./Mutation/CreateAppSecondFactor"

import { afterUpdateRedirect } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/helpers"
import { RouterLink } from "System/Components/RouterLink"

interface AppSecondFactorProps {
  me: AppSecondFactor_me$data
  relay: RelayRefetchProp
}

// TODO: This needs to be rebuilt from scratch
export const AppSecondFactor: React.FC<AppSecondFactorProps> = ({
  me,
  relay,
}) => {
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showCompleteRedirectModal, setShowCompleteRedirectModal] = useState(
    false
  )
  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isDisabling] = useState(false) // ???
  const [isCreating, setCreating] = useState(false)

  // Reset's _all_ of these state flags.
  // NOTE: Don't do this. Just hacking around the architecture here.
  const resetState = () => {
    setShowConfirmDisable(false)
    setShowConfirmPassword(false)
    setShowSetupModal(false)
    setShowCompleteModal(false)
    setShowCompleteRedirectModal(false)
    setStagedSecondFactor(null)
    setPasswordConfirmation("")
    setCreating(false)
  }

  const { sendToast } = useToasts()

  const { relayEnvironment } = useSystemContext()

  const redirectTo = afterUpdateRedirect()

  const enabledSecondFactorLabel =
    me.appSecondFactors?.length &&
    me.appSecondFactors[0]?.__typename === "AppSecondFactor"
      ? me.appSecondFactors[0].name
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
    password: CreateAppSecondFactorInput["password"]
  ) {
    setCreating(true)

    try {
      const response = await CreateAppSecondFactor(relayEnvironment, {
        attributes: {},
        password,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setStagedSecondFactor(response.createAppSecondFactor.secondFactorOrErrors)
      setPasswordConfirmation(password)
      setShowConfirmPassword(false)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }

    setCreating(false)
  }

  function onDisableSecondFactor() {
    relay.refetch({}, {}, () => {
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
          <Text variant={["md", "lg"]}>
            App Authenticator <Sup color="brand">Recommended</Sup>
          </Text>

          {enabledSecondFactorLabel && (
            <Text variant={["md", "lg"]} color="black60">
              {enabledSecondFactorLabel}
            </Text>
          )}

          <Spacer y={2} />

          <Text variant="sm" color="black60">
            Generate secure authentication codes using an application such as{" "}
            <RouterLink
              inline
              to="https://support.1password.com/one-time-passwords"
              target="_blank"
              rel="noopener noreferrer"
            >
              1Password
            </RouterLink>{" "}
            or{" "}
            <RouterLink
              inline
              to="https://support.google.com/accounts/answer/1066447"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Authenticator
            </RouterLink>
            .
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
              onClick={() => setShowConfirmPassword(true)}
              loading={isCreating}
              disabled={isCreating}
            >
              Set Up
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Modals */}

      <ConfirmPasswordModal
        show={showConfirmPassword}
        onConfirm={createSecondFactor}
        onCancel={() => setShowConfirmPassword(false)}
        title="Set up with app"
        subTitle="Confirm your password to continue."
      />

      <AppSecondFactorModal
        show={showSetupModal}
        secondFactor={stagedSecondFactor}
        password={passwordConfirmation}
        onComplete={onComplete}
        onClose={() => setShowSetupModal(false)}
      />

      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      {me.appSecondFactors.length > 0 &&
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        me.appSecondFactors[0].__typename === "AppSecondFactor" && (
          <DisableFactorConfirmation
            show={showConfirmDisable}
            onConfirm={onDisableSecondFactor}
            onCancel={() => setShowConfirmDisable(false)}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            secondFactorID={me.appSecondFactors[0].internalID}
          />
        )}

      {showCompleteModal && (
        <ModalDialog
          title="Set up with app"
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

export const AppSecondFactorRefetchContainer = createRefetchContainer(
  AppSecondFactor,
  {
    me: graphql`
      fragment AppSecondFactor_me on Me {
        hasSecondFactorEnabled
        appSecondFactors: secondFactors(kinds: [app]) {
          ... on AppSecondFactor {
            __typename
            internalID
            name
          }
        }
      }
    `,
  },
  graphql`
    query AppSecondFactorRefetchQuery {
      me {
        ...AppSecondFactor_me
      }
    }
  `
)
