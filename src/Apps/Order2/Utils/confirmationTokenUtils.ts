import createLogger from "Utils/logger"
import type { confirmationTokenUtilsQuery } from "__generated__/confirmationTokenUtilsQuery.graphql"
import { type Environment, fetchQuery, graphql } from "react-relay"

const logger = createLogger("confirmationTokenUtils")

export const fetchAndSetConfirmationToken = async (
  tokenId: string,
  environment: Environment,
  setConfirmationToken: (data: any) => void
) => {
  try {
    const response = await fetchQuery<confirmationTokenUtilsQuery>(
      environment,
      graphql`
        query confirmationTokenUtilsQuery($id: String!) {
          me {
            confirmationToken(id: $id) {
              paymentMethodPreview {
                __typename
                ... on Card {
                  displayBrand
                  last4
                }
                ... on USBankAccount {
                  bankName
                  last4
                }
                ... on SEPADebit {
                  last4
                }
              }
            }
          }
        }
      `,
      { id: tokenId },
      { fetchPolicy: "store-or-network" }
    ).toPromise()

    setConfirmationToken({
      confirmationToken: {
        id: tokenId,
        ...response?.me?.confirmationToken,
      },
    })

    return response
  } catch (error) {
    logger.error("Failed to fetch confirmation token:", error)
    // Set basic confirmation token even if fetch fails
    setConfirmationToken({
      confirmationToken: {
        id: tokenId,
      },
    })
    throw error
  }
}
