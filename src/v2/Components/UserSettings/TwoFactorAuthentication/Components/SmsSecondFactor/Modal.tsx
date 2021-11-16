import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { FormikHelpers as FormikActions } from "formik"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"

import * as Yup from "yup"

import { useSystemContext } from "v2/System"
import { CountrySelect } from "v2/Components/CountrySelect"
import { Step, Wizard } from "v2/Components/Wizard"
import { FormValues, StepElement } from "v2/Components/Wizard/types"

import { ApiError } from "../../ApiError"
import { EnableSecondFactor } from "../Mutation/EnableSecondFactor"
import { DeliverSecondFactor } from "./Mutation/DeliverSecondFactor"
import { UpdateSmsSecondFactor } from "./Mutation/UpdateSmsSecondFactor"
import { BackupSecondFactorReminder } from "../BackupSecondFactorReminder"

import { CreateSmsSecondFactorMutationResponse } from "v2/__generated__/CreateSmsSecondFactorMutation.graphql"
import { redirectMessage } from "v2/Components/UserSettings/TwoFactorAuthentication/helpers"

interface SmsSecondFactorModalProps {
  onClose: () => void
  show?: boolean
  onComplete: () => void
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  secondFactor: CreateSmsSecondFactorMutationResponse["createSmsSecondFactor"]["secondFactorOrErrors"]
}

// TODO: Port this box-sizing attribute to Palette component
const StyledInput = styled(Input)`
  box-sizing: border-box;
`

export const SmsSecondFactorModal: React.FC<SmsSecondFactorModalProps> = props => {
  const { secondFactor, onComplete } = props
  const { relayEnvironment } = useSystemContext()
  const [isSubmitting, setSubmitting] = useState(false)
  const [isDelivering, setDelivering] = useState(false)

  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
  const [recoveryCodes, setRecoveryCodes] = useState(null)

  if (!secondFactor || secondFactor.__typename !== "SmsSecondFactor") {
    return null
  }

  const handleOnComplete = async (
    values: FormValues,
    actions: FormikActions<object>
  ) => {
    setSubmitting(true)

    try {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const response = await EnableSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        code: values.code,
      })

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setRecoveryCodes(response.enableSecondFactor.recoveryCodes)

      setShowRecoveryCodes(true)
    } catch (error) {
      handleMutationError(actions, error)
    }

    setSubmitting(false)
  }

  const handleMutationError = (
    actions: FormikActions<FormValues>,
    errors: ApiError[]
  ) => {
    if (!Array.isArray(errors)) {
      throw errors
    }

    let statusMessage = ""

    errors.forEach(error => {
      if (
        error.code === "invalid" &&
        error.data &&
        error.data.key === "phone_number"
      ) {
        actions.setFieldError("phoneNumber", error.message)
      } else if (error.code === "invalid_otp" || error.code === "invalid") {
        actions.setFieldError("code", error.message)
      } else {
        statusMessage += `${error.message}\n`
      }
    })

    if (statusMessage.length) {
      actions.setStatus({ message: statusMessage })
    }
  }

  const handleDeliverStepSubmit = async (
    values: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    return new Promise<boolean>(async (resolve, _reject) => {
      setDelivering(true)

      try {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        await UpdateSmsSecondFactor(relayEnvironment, {
          secondFactorID: secondFactor.internalID,
          attributes: {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            phoneNumber: values.phoneNumber,
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            countryCode: values.countryCode,
          },
        })
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const response = await DeliverSecondFactor(relayEnvironment, {
          secondFactorID: secondFactor.internalID,
        })

        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const factor = response.deliverSecondFactor.secondFactorOrErrors

        if (factor.__typename === "SmsSecondFactor") {
          actions.setFieldValue(
            "formattedPhoneNumber",
            factor.formattedPhoneNumber
          )
        }

        resolve(true)
      } catch (error) {
        handleMutationError(actions, error)
      }

      setDelivering(false)
    })
  }

  const handleRecoveryReminderNext = () => {
    setShowRecoveryCodes(false)
    onComplete()
  }

  const steps: StepElement[] = [
    <Step
      label="Phone Number"
      onSubmit={handleDeliverStepSubmit}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string().required("Enter your phone number"),
      })}
    >
      {({ form, wizard }) => (
        <>
          <Sans mt={1} color="black60" size="3t">
            Enter your mobile phone number.
          </Sans>
          <Sans mt={1} color="black60" size="3t">
            We’ll send you a security code to this number whenever you log into
            Artsy.
          </Sans>
          <Spacer mt={3} />
          <CountrySelect
            selected={form.values.countryCode}
            onSelect={value => form.setFieldValue("countryCode", value)}
          />
          <Spacer mt={1} />
          <StyledInput
            autoComplete="off"
            name="phoneNumber"
            error={form.touched.phoneNumber && form.errors.phoneNumber}
            value={form.values.phoneNumber}
            onBlur={form.handleBlur}
            placeholder="Add phone"
            pattern="[^a-z]+"
            onChange={form.handleChange}
            autoFocus
          />
          {form.status && (
            <Sans mt={1} color="red100" size="2">
              {form.status.message}
            </Sans>
          )}
          <Button
            loading={isDelivering}
            disabled={isDelivering}
            display="block"
            width="100%"
            type="submit"
            mt={2}
          >
            Next
          </Button>
        </>
      )}
    </Step>,
    <Step
      label="Authentication Code"
      validationSchema={Yup.object().shape({
        code: Yup.string().required("Enter a code"),
      })}
    >
      {({ form, wizard }) => (
        <>
          <Sans mt={1} color="black60" size="3t">
            We’ve sent the authentication code to{" "}
            {form.values.formattedPhoneNumber}. Please enter the code to verify
            your phone number.
          </Sans>
          <Spacer mt={2} />
          <StyledInput
            error={form.touched.code && form.errors.code}
            onBlur={form.handleBlur}
            autoComplete="off"
            name="code"
            value={form.values.code}
            onChange={form.handleChange}
            autoFocus
          />
          {form.status && (
            <Sans mt={1} color="red100" size="2">
              {form.status.message}
            </Sans>
          )}
          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Button
              width="50%"
              variant="secondaryGray"
              type="button"
              onClick={e => {
                form.setStatus(null)
                wizard.previous(e)
              }}
            >
              Back
            </Button>
            <Spacer ml={1} />
            <Button
              width="50%"
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Turn on
            </Button>
          </Flex>
        </>
      )}
    </Step>,
  ]

  return (
    <>
      <Modal
        title="Set up with text message"
        show={props.show}
        onClose={props.onClose}
      >
        <Wizard
          onComplete={handleOnComplete}
          initialValues={{ countryCode: "US", phoneNumber: "", code: "" }}
          steps={steps}
        >
          {wizardProps => {
            const { wizard } = wizardProps
            const { currentStep } = wizard
            return <Box>{currentStep}</Box>
          }}
        </Wizard>
      </Modal>
      <Modal
        title="Recovery Codes"
        onClose={onComplete}
        show={showRecoveryCodes}
        hideCloseButton={true}
        FixedButton={
          <Button onClick={handleRecoveryReminderNext} width="100%">
            next
          </Button>
        }
      >
        <BackupSecondFactorReminder
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          backupSecondFactors={recoveryCodes}
          factorTypeName={secondFactor.__typename}
        />
      </Modal>
    </>
  )
}

interface OnCompleteRedirectModalProps {
  onClick: () => void
  redirectTo: string
  show: boolean
}

export const OnCompleteRedirectModal: React.FC<OnCompleteRedirectModalProps> = props => {
  const { onClick, redirectTo, show } = props

  return (
    <Modal
      title="Set up with text message"
      onClose={onClick}
      show={show}
      hideCloseButton={true}
      FixedButton={
        <Button onClick={onClick} width="100%">
          OK
        </Button>
      }
    >
      <Serif size="3t" color="black60">
        You’ve successfully set up two-factor authentication!
      </Serif>
      <Serif mt={2} size="3t" color="black60">
        {redirectMessage(redirectTo)}
      </Serif>
    </Modal>
  )
}
