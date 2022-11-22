import { Environment, fetchQuery, graphql } from "react-relay"
import { getPhoneNumberInformation_Query } from "__generated__/getPhoneNumberInformation_Query.graphql"

export const getPhoneNumberInformation = async (
  phoneNumber: string,
  relayEnvironment: Environment,
  regionCode?: string
) => {
  const response = await fetchQuery<getPhoneNumberInformation_Query>(
    relayEnvironment,
    graphql`
      query getPhoneNumberInformation_Query(
        $phoneNumber: String!
        $regionCode: String
      ) {
        phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {
          isValid
          international: display(format: INTERNATIONAL)
          national: display(format: NATIONAL)
          originalNumber
        }
      }
    `,
    { phoneNumber, regionCode }
  ).toPromise()

  return response?.phoneNumber
}
