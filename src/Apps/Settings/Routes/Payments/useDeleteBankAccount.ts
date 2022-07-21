import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useDeleteBankAccountMutation } from "__generated__/useDeleteBankAccountMutation.graphql"

export const useDeleteBankAccount = () => {
  return useMutation<useDeleteBankAccountMutation>({
    mutation: graphql`
      mutation useDeleteBankAccountMutation($input: DeleteBankAccountInput!) {
        deleteBankAccount(input: $input) {
          me {
            ...SettingsPaymentsMethods_me
          }
          bankAccountOrError {
            ... on BankAccountMutationSuccess {
              bankAccount {
                ...SettingsBankAccount_bankAccount
              }
            }
            ... on BankAccountMutationFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })
}
