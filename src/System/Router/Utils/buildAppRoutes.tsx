import { AppShell } from "Apps/Components/AppShell"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { RouteProps } from "System/Router/Route"
import { interceptLinks } from "System/Router/Utils/interceptLinks"
import { Match, Router, withRouter } from "found"
import { useEffect } from "react"

export function buildAppRoutes(routes: RouteProps[][]): RouteProps[] {
  const children = routes.flat()

  const Component: React.FC<{
    children: React.ReactNode
    match: Match
    router: Router
  }> = props => {
    const { router, setRouter } = useSystemContext()

    // Store global reference to router instance
    useEffect(() => {
      if (props.router !== router) {
        setRouter?.(props.router)
      }

      interceptLinks({
        router: props.router,
        routes: children,
      })
    }, [props.router, router, setRouter])

    return <AppShell {...props} />
  }

  // Return a top-level "meta" route containing all global sub-routes, which is
  // then mounted into the router.
  return [
    {
      Component: withRouter(Component),
      children,
      path: "",
    },
  ]
}
