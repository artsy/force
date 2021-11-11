import { Box, Button, Flex, Input, Modal, Sans, Serif } from "@artsy/palette"
import { CreateAppSecondFactorMutationResponse } from "v2/__generated__/CreateAppSecondFactorMutation.graphql"
import { useSystemContext } from "v2/System"
import { Formik, FormikHelpers as FormikActions, FormikProps } from "formik"
import QRCode from "qrcode.react"
import { useState } from "react"
import * as React from "react"
import * as Yup from "yup"
import { ApiError } from "../../ApiError"
import { EnableSecondFactor } from "../Mutation/EnableSecondFactor"
import { UpdateAppSecondFactor } from "./Mutation/UpdateAppSecondFactor"
import { BackupSecondFactorReminder } from "../BackupSecondFactorReminder"
import { redirectMessage } from "v2/Components/UserSettings/TwoFactorAuthentication/helpers"

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
  secondFactor: CreateAppSecondFactorMutationResponse["createAppSecondFactor"]["secondFactorOrErrors"]
}

export const AppSecondFactorModal: React.FC<AppSecondFactorModalProps> = props => {
  const { secondFactor, onComplete } = props
  const { relayEnvironment } = useSystemContext()

  const [showForm, setShowForm] = useState(true)
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false)
  const [recoveryCodes, setRecoveryCodes] = useState(null)

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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      await UpdateAppSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        attributes: {
          name: values.name,
        },
      })

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const response = await EnableSecondFactor(relayEnvironment, {
        secondFactorID: secondFactor.internalID,
        code: values.code,
      })

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setRecoveryCodes(response.enableSecondFactor.recoveryCodes)

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
      <Modal
        title="Set up with app"
        show={showForm}
        onClose={() => setShowForm(false)}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={{ name: secondFactor.name || "", code: "" }}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <InnerForm secondFactor={secondFactor} {...formikProps} />
          )}
        </Formik>
      </Modal>
      <Modal
        title="Recovery Codes"
        onClose={handleRecoveryReminderNext}
        show={showRecoveryCodes}
        hideCloseButton={true}
        FixedButton={
          <Button onClick={handleRecoveryReminderNext} width="100%">
            Next
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
    <Box mt={2}>
      <Sans color="black60" size="3">
        An authenticator app lets you generate security codes.
      </Sans>
      <Box mt={1}>
        <Input
          autoComplete="off"
          name="name"
          error={touched.name && errors.name}
          value={values.name}
          onBlur={handleBlur}
          placeholder="Device Name"
          onChange={handleChange}
          autoFocus
        />
      </Box>
      <Sans mt={2} color="black60" size="3">
        1. Use your app to scan the code below. If you can’t use a barcode,
        enter the secret code manually.
      </Sans>
      <Box mt={2} textAlign="center">
        <QRCode size={256} value={secondFactor.otpProvisioningURI} />
      </Box>
      <Box mt={2} textAlign="center">
        {showSecret ? (
          <Sans color="black60" size="3t">
            {secondFactor.otpSecret}
          </Sans>
        ) : (
          <Button
            size="small"
            variant="secondaryGray"
            onClick={() => setShowSecret(true)}
          >
            Show secret
          </Button>
        )}
      </Box>
      <Sans mt={2} color="black60" size="3">
        2. Enter the six-digit code from the application to complete the
        configuration.
      </Sans>
      <Box mt={2}>
        <Input
          error={touched.code && errors.code}
          onBlur={handleBlur}
          autoComplete="off"
          name="code"
          value={values.code}
          onChange={handleChange}
          placeholder="Authentication Code"
        />
      </Box>
      <Flex alignItems="center">
        <Button
          mt={2}
          loading={isSubmitting}
          disabled={isSubmitting}
          width="100%"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Turn on
        </Button>
      </Flex>
    </Box>
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
      title="Set up with app"
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
