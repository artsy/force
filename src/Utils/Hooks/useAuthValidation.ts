import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { logout } from "Utils/auth"
import { useAuthValidationQuery } from "__generated__/useAuthValidationQuery.graphql"

export const useAuthValidation = () => {
  const { relayEnvironment } = useSystemContext()

  useEffect(() => {
    const exec = async () => {
      const data = await fetchQuery<useAuthValidationQuery>(
        relayEnvironment!,
        graphql`
          query useAuthValidationQuery {
            authenticationStatus
          }
        `,
        {}
      ).toPromise()

      if (data?.authenticationStatus === "INVALID") {
        await logout()
        window.location.reload()
        return
      }
    }

    exec()
  }, [relayEnvironment])
}
