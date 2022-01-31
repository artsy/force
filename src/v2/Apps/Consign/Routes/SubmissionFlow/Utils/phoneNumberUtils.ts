import { Environment, fetchQuery, graphql } from "react-relay"
import { phoneNumberUtils_PhoneNumber_Query } from "v2/__generated__/phoneNumberUtils_PhoneNumber_Query.graphql"

export const getPhoneNumberInformation = async (
  phoneNumber: string,
  relayEnvironment: Environment,
  regionCode?: string
) => {
  const response = await fetchQuery<phoneNumberUtils_PhoneNumber_Query>(
    relayEnvironment,
    graphql`
      query phoneNumberUtils_PhoneNumber_Query(
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

  return response!.phoneNumber
}
