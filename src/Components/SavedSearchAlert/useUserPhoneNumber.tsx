import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useUserPhoneNumberQuery } from "__generated__/useUserPhoneNumberQuery.graphql"
import { graphql } from "react-relay"

const QUERY = graphql`
  query useUserPhoneNumberQuery {
    me {
      phoneNumber {
        regionCode
        display(format: NATIONAL)
        originalNumber # Used as a fallback for 'display'
      }
    }
  }
`

export const useUserPhoneNumber = () => {
  const { data, error } = useClientQuery<useUserPhoneNumberQuery>({
    query: QUERY,
    variables: {},
    cacheConfig: {
      fetchPolicy: "network-only",
    },
  })

  if (error) {
    return { phone: "", regionCode: "us" }
  }

  const phone =
    data?.me?.phoneNumber?.display ?? data?.me?.phoneNumber?.originalNumber

  return {
    phone: phone ?? "",
    regionCode: data?.me?.phoneNumber?.regionCode ?? "us",
  }
}
