import {
  Box,
  Button,
  Input,
  Join,
  ModalDialog,
  Text,
  Spacer,
} from "@artsy/palette"
import { CreateAppSecondFactorMutation$data } from "__generated__/CreateAppSecondFactorMutation.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Formik, FormikHelpers as FormikActions, FormikProps } from "formik"
import QRCode from "qrcode.react"
import { useState } from "react"
import * as React from "react"
import * as Yup from "yup"
import { ApiError } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/ApiError"
import { EnableSecondFactor } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/Mutation/EnableSecondFactor"
import { UpdateAppSecondFactor } from "./Mutation/UpdateAppSecondFactor"
import { BackupSecondFactorReminder } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/BackupSecondFactorReminder"
import { redirectMessage } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/helpers"

export interface FormValues {
  name: string
  code: string
}

const presenceRegex = /.*\S+.*/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Enter a name")
    .matches(presenceRegex, "Enter a name"),
  code: Yup.string()
    .required("Enter a code")
    .matches(presenceRegex, "Enter a code"),
})

interface AppSecondFactorModalProps {
  onClose: () => void
  show?: boolean
  onComplete: () => void
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  secondFactor: CreateAppSecondFactorMutation$data["createAppSecondFactor"]["secondFactorOrErrors"]
  password: string
}

export const AppSecondFactorModal: React.FC<AppSecondFactorModalProps> = props => {
  const { secondFactor, password, onComplete } = props
  const { relayEnvironment } = useSystemContext()

  const [showForm, setShowForm] = useState(true)
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
  const [recoveryCodes, setRecoveryCodes] = useState<any>(null)

  if (!secondFactor || secondFactor.__typename !== "AppSecondFactor") {
    return null
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
      if (error.code === "invalid_otp" || error.code === "invalid") {
        actions.setFieldError("code", error.message)
      } else {
        statusMessage += `${error.message}\n`
      }
    })

    if (statusMessage.length) {
      actions.setStatus({ message: statusMessage })
    }
  }

  const handleSubmit = async (
    values: FormValues,
    actions: FormikActions<FormValues>
  ) => {
    try {
      await UpdateAppSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        attributes: {
          name: values.name,
        },
      })

      const response = await EnableSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        code: values.code,
        password: password,
      })

      setRecoveryCodes(response?.enableSecondFactor?.recoveryCodes)

      actions.setSubmitting(false)

      setShowForm(false)
      setShowRecoveryCodes(true)
    } catch (error) {
      actions.setSubmitting(false)
      handleMutationError(actions, error)
    }
  }

  const handleRecoveryReminderNext = () => {
    setShowRecoveryCodes(false)
    onComplete()
  }

  return (
    <>
      {showForm && (
        <ModalDialog title="Set up with app" onClose={() => setShowForm(false)}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ name: secondFactor.name || "", code: "" }}
            onSubmit={handleSubmit}
          >
            {(formikProps: FormikProps<FormValues>) => (
              <InnerForm secondFactor={secondFactor} {...formikProps} />
            )}
          </Formik>
        </ModalDialog>
      )}

      {showRecoveryCodes && (
        <ModalDialog
          title="Recovery Codes"
          onClose={handleRecoveryReminderNext}
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

interface InnerFormProps extends FormikProps<FormValues> {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  secondFactor: CreateAppSecondFactorMutationResponse["createAppSecondFactor"]["secondFactorOrErrors"]
}

const InnerForm: React.FC<InnerFormProps> = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
  secondFactor,
}) => {
  const [showSecret, setShowSecret] = useState(false)

  if (secondFactor.__typename !== "AppSecondFactor") {
    return null
  }

  return (
    <Join separator={<Spacer y={2} />}>
      <Text variant="sm" color="black60">
        An authenticator app lets you generate security codes.
      </Text>

      <Input
        autoComplete="off"
        name="name"
        error={touched.name && errors.name}
        value={values.name}
        onBlur={handleBlur}
        placeholder="Device name"
        onChange={handleChange}
        autoFocus
      />

      <Text variant="sm" color="black60">
        1. Use your app to scan the code below. If you can’t use a barcode,
        enter the secret code manually.
      </Text>

      <Box textAlign="center">
        <QRCode size={256} value={secondFactor.otpProvisioningURI} />
      </Box>

      <Box textAlign="center">
        {showSecret ? (
          <Text variant="sm" color="black60">
            {secondFactor.otpSecret}
          </Text>
        ) : (
          <Button
            size="small"
            variant="primaryGray"
            onClick={() => setShowSecret(true)}
          >
            Show secret
          </Button>
        )}
      </Box>

      <Text variant="sm" color="black60">
        2. Enter the six-digit code from the application to complete the
        configuration.
      </Text>

      <Input
        error={touched.code && errors.code}
        onBlur={handleBlur}
        autoComplete="off"
        name="code"
        value={values.code}
        onChange={handleChange}
        placeholder="Authentication code"
      />

      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        width="100%"
        type="submit"
        onClick={() => handleSubmit()}
      >
        Turn on
      </Button>
    </Join>
  )
}

interface OnCompleteRedirectModalProps {
  onClick: () => void
  redirectTo: string
  show: boolean
}

export const OnCompleteRedirectModal: React.FC<OnCompleteRedirectModalProps> = props => {
  const { onClick, redirectTo, show } = props

  if (!show) return null

  return (
    <ModalDialog
      title="Set up with app"
      onClose={onClick}
      footer={
        <Button onClick={onClick} width="100%">
          OK
        </Button>
      }
    >
      <Text variant="sm" color="black60">
        You’ve successfully set up two-factor authentication!
      </Text>

      <Text variant="sm" mt={2} color="black60">
        {redirectMessage(redirectTo)}
      </Text>
    </ModalDialog>
  )
}
