import * as React from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { DisableSecondFactor } from "./Mutation/DisableSecondFactor"
import { FormikProps } from "formik"
import { DisableSecondFactorInput } from "__generated__/DisableSecondFactorMutation.graphql"
import { map } from "lodash"
import { ConfirmPasswordModal } from "Components/ConfirmPasswordModal"

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
