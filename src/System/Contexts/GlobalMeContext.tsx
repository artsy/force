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
  const { user } = useSystemContext()
  const [loaded, setLoaded] = useState(false)
  const [queryRef, loadQuery] = useQueryLoader(GLOBAL_ME_QUERY)

  useEffect(() => {
    if (!!queryRef && !loaded) {
      if (!!user) {
        loadQuery({})
      }
      setLoaded(true)
    }
  }, [loadQuery, loaded, queryRef, user])

  if (!queryRef) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <GlobalMeQuery queryRef={queryRef} refetchMe={() => loadQuery({})}>
        {children}
      </GlobalMeQuery>
    </Suspense>
  )
}
