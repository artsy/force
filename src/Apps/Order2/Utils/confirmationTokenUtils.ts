import { fetchQuery, graphql, type Environment } from "react-relay"
import createLogger from "Utils/logger"
import type { confirmationTokenUtilsQuery } from "__generated__/confirmationTokenUtilsQuery.graphql"

const logger = createLogger("confirmationTokenUtils")

export const fetchAndSetConfirmationToken = async (
  tokenId: string,
  environment: Environment,
  setConfirmationToken: (data: any) => void,
  saveCreditCard: boolean,
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
              }
            }
          }
        }
      `,
      { id: tokenId },
      { fetchPolicy: "store-or-network" },
    ).toPromise()

    setConfirmationToken({
      confirmationToken: {
        id: tokenId,
        ...response?.me?.confirmationToken,
      },
      saveCreditCard,
    })

    return response
  } catch (error) {
    logger.error("Failed to fetch confirmation token:", error)
    // Set basic confirmation token even if fetch fails
    setConfirmationToken({
      confirmationToken: {
        id: tokenId,
      },
      saveCreditCard,
    })
    throw error
  }
}
