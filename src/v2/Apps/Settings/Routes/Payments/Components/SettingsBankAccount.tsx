import { InstitutionIcon, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsBankAccount_bankAccount } from "v2/__generated__/SettingsBankAccount_bankAccount.graphql"
import { useDeleteBankAccount } from "../useDeleteBankAccount"
import { SettingsPaymentsMethod } from "./SettingsPaymentsMethod"

interface SettingsBankAccountProps {
  bankAccount: SettingsBankAccount_bankAccount
}

const SettingsBankAccount: React.FC<SettingsBankAccountProps> = ({
  bankAccount,
}) => {
  const { internalID, last4 } = bankAccount
  const { submitMutation } = useDeleteBankAccount()

  const handleDelete = async () => {
    await submitMutation({
      variables: { input: { id: internalID } },
      rejectIf: res => {
        return res.deleteBankAccount?.bankAccountOrError?.mutationError
      },
    })
  }

  return (
    <SettingsPaymentsMethod
      successDeleteMessage="Successfully deleted bank account."
      onDelete={handleDelete}
    >
      <InstitutionIcon width={24} height={24} mr={0.5} fill="green100" />

      <Text variant="sm-display" color="black60" mr={1}>
        •••• {last4}
      </Text>
    </SettingsPaymentsMethod>
  )
}

export const SettingsBankAccountFragmentContainer = createFragmentContainer(
  SettingsBankAccount,
  {
    bankAccount: graphql`
      fragment SettingsBankAccount_bankAccount on BankAccount {
        internalID
        last4
      }
    `,
  }
)
