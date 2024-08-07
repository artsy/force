import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { logout } from "Utils/auth"
import { useAuthValidationQuery } from "__generated__/useAuthValidationQuery.graphql"

export const useAuthValidation = () => {
  const { relayEnvironment } = useSystemContext()

  useEffect(() => {
    const logoutAndReload = async () => {
      try {
        await logout()
      } catch (e) {
        console.error(e)
      }

      window.location.reload()
    }

    const exec = async () => {
      try {
        const data = await fetchQuery<useAuthValidationQuery>(
          relayEnvironment,
          graphql`
            query useAuthValidationQuery {
              authenticationStatus
            }
          `,
          {},
          { networkCacheConfig: { force: true } }
        ).toPromise()

        if (data?.authenticationStatus === "INVALID") {
          await logoutAndReload()
          return
        }
      } catch (error) {
        if (error?.res?.status === 401) {
          await logoutAndReload()
          return
        }
      }
    }

    // Check on mount
    exec()

    const check = () => {
      if (document.visibilityState === "visible") {
        exec()
      }
    }

    // Re-check on tab changes since you may have logged out in another tab
    document.addEventListener("visibilitychange", check)

    return () => {
      document.removeEventListener("visibilitychange", check)
    }
  }, [relayEnvironment])
}
