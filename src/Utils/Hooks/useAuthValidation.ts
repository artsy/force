import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System"
import { logout } from "../auth"
import { useAuthValidationQuery } from "__generated__/useAuthValidationQuery.graphql"

export const useAuthValidation = () => {
  const { relayEnvironment } = useSystemContext()

  useEffect(() => {
    const exec = async () => {
      const { authenticationStatus } = await fetchQuery<useAuthValidationQuery>(
        relayEnvironment!,
        graphql`
          query useAuthValidationQuery {
            authenticationStatus
          }
        `,
        {}
        // @ts-expect-error RELAY_UPGRADE
      ).toPromise()

      if (authenticationStatus === "INVALID") {
        await logout()
        window.location.reload()
        return
      }
    }

    exec()
  }, [relayEnvironment])
}
