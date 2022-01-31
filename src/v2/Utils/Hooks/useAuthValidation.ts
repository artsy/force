import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { logout } from "../auth"
import { useAuthValidationQuery } from "v2/__generated__/useAuthValidationQuery.graphql"

export const useAuthValidation = () => {
  const { relayEnvironment } = useSystemContext()

  useEffect(() => {
    const exec = async () => {
      const response = await fetchQuery<useAuthValidationQuery>(
        relayEnvironment!,
        graphql`
          query useAuthValidationQuery {
            authenticationStatus
          }
        `,
        {}
      ).toPromise()

      if (response?.authenticationStatus === "INVALID") {
        await logout()
        window.location.reload()
        return
      }
    }

    exec()
  }, [relayEnvironment])
}
