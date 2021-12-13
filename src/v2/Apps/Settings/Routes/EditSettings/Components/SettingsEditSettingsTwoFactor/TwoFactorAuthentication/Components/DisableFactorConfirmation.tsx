import * as React from "react"
import { useSystemContext } from "v2/System"
import { DisableSecondFactor } from "./Mutation/DisableSecondFactor"
import { FormikProps } from "formik"
import { DisableSecondFactorInput } from "v2/__generated__/DisableSecondFactorMutation.graphql"
import { map } from "lodash"
import { ConfirmPasswordModal } from "v2/Components/ConfirmPasswordModal"

interface DisableFactorConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
  show: boolean
  secondFactorID: string
}

export const DisableFactorConfirmation: React.FC<DisableFactorConfirmationProps> = props => {
  const { onCancel, onConfirm, show, secondFactorID } = props
  const { relayEnvironment } = useSystemContext()

  const onSubmit = async (
    password: DisableSecondFactorInput["password"],
    formikBag: FormikProps<any>
  ) => {
    formikBag.setStatus({ error: undefined })

    if (!secondFactorID) {
      return
    }

    try {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      await DisableSecondFactor(relayEnvironment, {
        password,
        secondFactorID,
      })
      onConfirm()
    } catch (err) {
      const formattedErrors = map(err, "message").join(", ")
      formikBag.setStatus({ error: formattedErrors })
    }
  }

  return (
    <ConfirmPasswordModal
      show={show}
      onCancel={onCancel}
      onConfirm={onSubmit}
      title="Disable 2FA method?"
      subTitle="Enter your password to confirm this change."
      buttonText="Disable"
    />
  )
}
