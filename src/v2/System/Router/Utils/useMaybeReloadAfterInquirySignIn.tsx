import { useSystemContext } from "v2/System/SystemContext"
import { useEffect } from "react"

/**
 * We need to listen to login / signup events from the inquiry form on the
 * artwork page. If we detect a login event, attach a listener that then
 * listens for a modal close event, and reload the page to sync user
 * logged in state.
 */
export function useMaybeReloadAfterInquirySignIn() {
  const { mediator } = useSystemContext()

  useEffect(() => {
    // @ts-expect-error STRICT_NULL_CHECK
    mediator.on("auth:login:inquiry_form", () => {
      // @ts-expect-error STRICT_NULL_CHECK
      mediator.on("auth:login:inquiry_form:maybeReloadOnModalClose", () => {
        window.location.reload()
      })
    })

    return () => {
      // @ts-expect-error STRICT_NULL_CHECK
      mediator.off("auth:login:inquiry_form")
      // @ts-expect-error STRICT_NULL_CHECK
      mediator.off("auth:login:inquiry_form:maybeReloadOnModalClose")
    }
  }, [mediator])
}
