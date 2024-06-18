import {
  Banner,
  Button,
  Flex,
  Input,
  ModalDialog,
  Spacer,
  Text,
} from "@artsy/palette"
import { FormikHelpers as FormikActions } from "formik"
import { useState } from "react"
import * as React from "react"
import * as Yup from "yup"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { CountrySelect } from "Components/CountrySelect"
import { Step, Wizard } from "Components/Wizard"
import { FormValues, StepElement } from "Components/Wizard/types"
import { ApiError } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/ApiError"
import { EnableSecondFactor } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/Mutation/EnableSecondFactor"
import { DeliverSecondFactor } from "./Mutation/DeliverSecondFactor"
import { UpdateSmsSecondFactor } from "./Mutation/UpdateSmsSecondFactor"
import { BackupSecondFactorReminder } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/BackupSecondFactorReminder"
import { CreateSmsSecondFactorMutation$data } from "__generated__/CreateSmsSecondFactorMutation.graphql"
import { redirectMessage } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/helpers"

interface SmsSecondFactorModalProps {
  onClose: () => void
  show?: boolean
  onComplete: () => void
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  secondFactor: CreateSmsSecondFactorMutation$data["createSmsSecondFactor"]["secondFactorOrErrors"]
  password: string
}

export const SmsSecondFactorModal: React.FC<SmsSecondFactorModalProps> = props => {
  const { secondFactor, password, onComplete } = props
  const { relayEnvironment } = useSystemContext()
  const [isSubmitting, setSubmitting] = useState(false)
  const [isDelivering, setDelivering] = useState(false)

  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
  const [recoveryCodes, setRecoveryCodes] = useState<any>(null)

  if (!secondFactor || secondFactor.__typename !== "SmsSecondFactor") {
    return null
  }

  const handleOnComplete = async (
    values: FormValues,
    actions: FormikActions<object>
  ) => {
    setSubmitting(true)

    try {
      const response = await EnableSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        code: values.code,
        password: password,
      })

      setRecoveryCodes(response?.enableSecondFactor?.recoveryCodes)

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
        await UpdateSmsSecondFactor(relayEnvironment, {
          secondFactorID: secondFactor.internalID,
          attributes: {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            phoneNumber: values.phoneNumber,
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            countryCode: values.countryCode,
          },
        })
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
    // eslint-disable-next-line react/jsx-key
    <Step
      label="Phone Number"
      onSubmit={handleDeliverStepSubmit}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string().required("Enter your phone number"),
      })}
    >
      {({ form }) => (
        <>
          <Text variant="sm" color="black60">
            Enter your mobile phone number.
          </Text>

          <Text variant="sm" mt={1} color="black60">
            We’ll send you a security code to this number whenever you log into
            Artsy.
          </Text>

          <Spacer y={2} />

          <CountrySelect
            selected={form.values.countryCode}
            onSelect={value => form.setFieldValue("countryCode", value)}
          />

          <Spacer y={1} />

          <Input
            autoComplete="tel"
            autoFocus
            error={form.touched.phoneNumber && form.errors.phoneNumber}
            name="phoneNumber"
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            pattern="[^a-z]+"
            placeholder="Add phone"
            type="tel"
            value={form.values.phoneNumber}
          />

          {form.status && (
            <Banner my={2} variant="error">
              {form.status.message}
            </Banner>
          )}

          <Button
            mt={2}
            loading={isDelivering}
            disabled={isDelivering}
            width="100%"
            type="submit"
          >
            Next
          </Button>
        </>
      )}
    </Step>,

    // eslint-disable-next-line react/jsx-key
    <Step
      label="Authentication Code"
      validationSchema={Yup.object().shape({
        code: Yup.string().required("Enter a code"),
      })}
    >
      {({ form, wizard }) => (
        <>
          <Text variant="sm" color="black60">
            We’ve sent the authentication code to{" "}
            {form.values.formattedPhoneNumber}. Please enter the code to verify
            your phone number.
          </Text>

          <Spacer y={2} />

          <Input
            autoComplete="off"
            autoFocus
            error={form.touched.code && form.errors.code}
            name="code"
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.code}
          />

          {form.status && (
            <Banner my={2} variant="error">
              {form.status.message}
            </Banner>
          )}

          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Button
              flex={1}
              variant="tertiary"
              type="button"
              onClick={e => {
                form.setStatus(null)
                wizard.previous(e)
              }}
            >
              Back
            </Button>

            <Spacer x={1} />

            <Button
              flex={1}
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Turn On
            </Button>
          </Flex>
        </>
      )}
    </Step>,
  ]

  return (
    <>
      {props.show && (
        <ModalDialog title="Set up with text message" onClose={props.onClose}>
          <Wizard
            onComplete={handleOnComplete}
            initialValues={{ countryCode: "US", phoneNumber: "", code: "" }}
            steps={steps}
          >
            {wizardProps => {
              const { wizard } = wizardProps
              const { currentStep } = wizard
              return currentStep
            }}
          </Wizard>
        </ModalDialog>
      )}

      {showRecoveryCodes && (
        <ModalDialog
          title="Recovery Codes"
          onClose={onComplete}
          footer={
            <Button onClick={handleRecoveryReminderNext} width="100%">
              Next
            </Button>
          }
        >
          <BackupSecondFactorReminder
            backupSecondFactors={recoveryCodes}
            factorTypeName={secondFactor.__typename}
          />
        </ModalDialog>
      )}
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

  if (!show) {
    return null
  }

  return (
    <ModalDialog
      title="Set up with text message"
      onClose={onClick}
      footer={
        <Button onClick={onClick} width="100%">
          OK
        </Button>
      }
    >
      <Text color="black60">
        You’ve successfully set up two-factor authentication!
      </Text>

      <Text mt={2} color="black60">
        {redirectMessage(redirectTo)}
      </Text>
    </ModalDialog>
  )
}
