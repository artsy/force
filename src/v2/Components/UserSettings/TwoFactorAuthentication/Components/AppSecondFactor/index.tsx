import {
  BorderBox,
  BorderBoxProps,
  Button,
  Flex,
  Link,
  Modal,
  Sans,
  Serif,
} from "@artsy/palette"
import React, { useState } from "react"
import { RelayRefetchProp, createFragmentContainer, graphql } from "react-relay"
import request from "superagent"

import { useSystemContext } from "v2/Artsy"
import { AppSecondFactorModal } from "./Modal"
import { ApiError } from "../../ApiError"
import { ApiErrorModal } from "../ApiErrorModal"
import { CreateAppSecondFactor } from "./Mutation/CreateAppSecondFactor"
import { DisableFactorConfirmation } from "../DisableFactorConfirmation"
import { AppSecondFactor_me } from "v2/__generated__/AppSecondFactor_me.graphql"
import { ConfirmPasswordModal } from "v2/Components/ConfirmPasswordModal"
import { CreateAppSecondFactorInput } from "v2/__generated__/CreateAppSecondFactorMutation.graphql"

interface AppSecondFactorProps extends BorderBoxProps {
  me: AppSecondFactor_me
  relayRefetch?: RelayRefetchProp
}

export const AppSecondFactor: React.FC<AppSecondFactorProps> = props => {
  const { me, relayRefetch } = props
  const [apiErrors, setApiErrors] = useState<ApiError[]>([])
  const [showConfirmDisable, setShowConfirmDisable] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)
  const [isDisabling] = useState(false)
  const [isCreating, setCreating] = useState(false)

  const { relayEnvironment } = useSystemContext()

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

  async function createSecondFactor(
    password: CreateAppSecondFactorInput["password"]
  ) {
    setCreating(true)

    try {
      const response = await CreateAppSecondFactor(relayEnvironment, {
        attributes: {},
        password,
      })
      setStagedSecondFactor(response.createAppSecondFactor.secondFactorOrErrors)
      setShowConfirmPassword(false)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }

    setCreating(false)
  }

  function onDisableSecondFactor() {
    relayRefetch.refetch({}, {}, () => {
      setShowConfirmDisable(false)
    })
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
      onClick={() => setShowConfirmPassword(true)}
      loading={isCreating}
      disabled={isCreating}
      {...props}
    >
      {props.children}
    </Button>
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
            App Authenticator
          </Sans>
          <Serif mt={1} size="3t" color="black60">
            Generate secure authentication codes using an application such as{" "}
            <Link href="https://support.1password.com/one-time-passwords">
              1Password
            </Link>{" "}
            or <Link href="https://authy.com/features">Authy</Link>.
          </Serif>
        </Flex>
        <Flex mt={[3, 0]} flexDirection={["column", "row"]} alignItems="center">
          {me.appSecondFactors.length &&
          me.appSecondFactors[0].__typename === "AppSecondFactor" ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.appSecondFactors[0].name || "Unnamed"}
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
      {me.appSecondFactors.length > 0 &&
        me.appSecondFactors[0].__typename === "AppSecondFactor" && (
          <DisableFactorConfirmation
            show={showConfirmDisable}
            onConfirm={onDisableSecondFactor}
            onCancel={() => setShowConfirmDisable(false)}
            secondFactorID={me.appSecondFactors[0].internalID}
          />
        )}
      <Modal
        title="Set up with app"
        onClose={onCompleteConfirmed}
        show={showCompleteModal}
        hideCloseButton={!me.hasSecondFactorEnabled}
        FixedButton={
          <Button onClick={onCompleteConfirmed} width="100%">
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

export const AppSecondFactorFragmentContainer = createFragmentContainer(
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
  }
)
