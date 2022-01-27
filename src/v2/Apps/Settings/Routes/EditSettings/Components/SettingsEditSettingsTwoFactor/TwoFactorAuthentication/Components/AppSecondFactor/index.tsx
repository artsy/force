import {
  Button,
  Flex,
  Box,
  Text,
  Sup,
  Spacer,
  ModalDialog,
} from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { RelayRefetchProp, graphql, createRefetchContainer } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import { useSystemContext } from "v2/System"
import { AppSecondFactorModal, OnCompleteRedirectModal } from "./Modal"
import { ApiError } from "../../ApiError"
import { ApiErrorModal } from "../ApiErrorModal"
import { CreateAppSecondFactor } from "./Mutation/CreateAppSecondFactor"
import { DisableFactorConfirmation } from "../DisableFactorConfirmation"
import { AppSecondFactor_me } from "v2/__generated__/AppSecondFactor_me.graphql"
import { ConfirmPasswordModal } from "v2/Components/ConfirmPasswordModal"
import { CreateAppSecondFactorInput } from "v2/__generated__/CreateAppSecondFactorMutation.graphql"

import { afterUpdateRedirect } from "v2/Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/helpers"

interface AppSecondFactorProps {
  me: AppSecondFactor_me
  relay: RelayRefetchProp
}

export const AppSecondFactor: React.FC<AppSecondFactorProps> = ({
  me,
  relay,
}) => {
  const [apiErrors, setApiErrors] = useState<ApiError[]>([])
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [showCompleteRedirectModal, setShowCompleteRedirectModal] = useState(
    false
  )
  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)
  const [isDisabling] = useState(false)
  const [isCreating, setCreating] = useState(false)

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

  function handleMutationError(errors: ApiError[]) {
    if (!Array.isArray(errors)) {
      throw errors
    }

    setApiErrors(errors)
  }

  async function createSecondFactor(
    password: CreateAppSecondFactorInput["password"]
  ) {
    setCreating(true)

    try {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const response = await CreateAppSecondFactor(relayEnvironment, {
        attributes: {},
        password,
      })
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setStagedSecondFactor(response.createAppSecondFactor.secondFactorOrErrors)
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
          <Text variant="lg" mb={2}>
            App Authenticator
            {enabledSecondFactorLabel && (
              <>
                {" "}
                <Sup color="black60">{enabledSecondFactorLabel}</Sup>
              </>
            )}
          </Text>

          <Text variant="sm" color="black60">
            Generate secure authentication codes using an application such as{" "}
            <a
              href="https://support.1password.com/one-time-passwords"
              target="_blank"
              rel="noopener noreferrer"
            >
              1Password
            </a>{" "}
            or{" "}
            <a
              href="https://authy.com/features"
              target="_blank"
              rel="noopener noreferrer"
            >
              Authy
            </a>
            .
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
        onComplete={onComplete}
        onClose={() => setShowSetupModal(false)}
      />

      <ApiErrorModal
        onClose={() => setApiErrors([])}
        show={!!apiErrors.length}
        errors={apiErrors}
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
