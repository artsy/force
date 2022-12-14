import { Environment, graphql } from "react-relay"
import { commitMutation } from "relay-runtime"
import {
  createConsignmentInquiryMutation,
  CreateConsignmentInquiryMutationInput,
} from "__generated__/createConsignmentInquiryMutation.graphql"

export const createConsignmentInquiry = (
  environment: Environment,
  input: CreateConsignmentInquiryMutationInput
) => {
  return new Promise<number>((resolve, reject) => {
    commitMutation<createConsignmentInquiryMutation>(environment, {
      mutation: graphql`
        mutation createConsignmentInquiryMutation(
          $input: CreateConsignmentInquiryMutationInput!
        ) {
          createConsignmentInquiry(input: $input) {
            consignmentInquiryOrError {
              ... on ConsignmentInquiryMutationSuccess {
                consignmentInquiry {
                  internalID
                }
              }
              ... on ConsignmentInquiryMutationFailure {
                mutationError {
                  error
                  message
                  statusCode
                }
              }
            }
          }
        }
      `,
      variables: { input },
      onError: e => reject(e.message),
      onCompleted: async (res, errors) => {
        if (errors !== null) {
          let err = ""
          errors?.forEach(e => {
            err += e.message + ";\n"
          })
          reject(err)
          return
        }
        const error =
          res.createConsignmentInquiry?.consignmentInquiryOrError?.mutationError
            ?.message
        if (error) {
          reject(error)
          return
        }
        resolve(
          res.createConsignmentInquiry!.consignmentInquiryOrError!
            .consignmentInquiry!.internalID
        )
      },
    })
  })
}
