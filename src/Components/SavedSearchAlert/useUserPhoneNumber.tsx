import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useUserPhoneNumberQuery } from "__generated__/useUserPhoneNumberQuery.graphql"
import { graphql } from "react-relay"

const QUERY = graphql`
  query useUserPhoneNumberQuery {
    me {
      phoneNumber {
        regionCode
      }
      phone
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

  return {
    phone: data?.me?.phone ?? "",
    regionCode: data?.me?.phoneNumber?.regionCode ?? "us",
  }
}
