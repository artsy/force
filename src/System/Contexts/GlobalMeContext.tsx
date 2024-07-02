import { Suspense, createContext, useEffect, useState } from "react"
import { usePreloadedQuery, useQueryLoader } from "react-relay/hooks"
import { graphql } from "react-relay"
import {
  GlobalMeContextQuery,
  GlobalMeContextQuery$data,
} from "__generated__/GlobalMeContextQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"

export interface GlobalMeContextProps {
  me: NonNullable<GlobalMeContextQuery$data["me"]> | null
  refetchMe: () => void
}

export const GlobalMeContext = createContext<GlobalMeContextProps>({
  me: null,
  refetchMe: () => {},
})

const GLOBAL_ME_QUERY = graphql`
  query GlobalMeContextQuery {
    me {
      ...useCollectorSignals_me
    }
  }
`

const GlobalMeQuery = ({ queryRef, children, refetchMe }) => {
  const data = usePreloadedQuery<GlobalMeContextQuery>(
    GLOBAL_ME_QUERY,
    queryRef
  )

  const me = data?.me ?? null

  return (
    <GlobalMeContext.Provider
      value={{
        me,
        refetchMe,
      }}
    >
      {children}
    </GlobalMeContext.Provider>
  )
}

export const GlobalMeProvider = ({ children }) => {
  const { user, relayEnvironment } = useSystemContext()
  const [loaded, setLoaded] = useState(false)
  const [queryRef, loadQuery] = useQueryLoader(GLOBAL_ME_QUERY)

  const refetchMe = () => loadQuery({})
  console.log("*** GlobalMeProvider prefetch", {
    user,
    relayEnvironment,
    loaded,
    queryRef,
    loadQuery,
  })
  useEffect(() => {
    if (!loaded) {
      if (!!user) {
        console.log("*** Loading ME query")
        loadQuery({})
      } else {
        console.log("skipping loading me")
      }
      setLoaded(true)
    }
  }, [loadQuery, loaded, user])

  if (!!user && !queryRef) {
    return "...Loading"
  }
  if (!user) {
    return children
  }

  return (
    <Suspense fallback="Loading ...">
      <GlobalMeQuery queryRef={queryRef} refetchMe={refetchMe}>
        {children}
      </GlobalMeQuery>
    </Suspense>
  )
}
