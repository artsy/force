import React from "react"
import { useContext } from "react"
import ResolverUtils from "found/ResolverUtils"
import resovler from "found/resolver"

import {
  createOperationDescriptor,
  fetchQuery,
  getRequest,
} from "relay-runtime"
import { isEmpty, isUndefined, last } from "lodash"

interface PrefetchContextProps {
  prefetch?: boolean
}

export const PrefetchContext = React.createContext<PrefetchContextProps>({
  prefetch: false,
})

export const PrefetchContextProvider: React.FC<PrefetchContextProps> = ({
  children,
  prefetch,
}) => {
  const contextProps = {
    prefetch,
  }

  return (
    <PrefetchContext.Provider value={contextProps}>
      {children}
    </PrefetchContext.Provider>
  )
}

export function usePrefetchContext() {
  const prefetchContext = useContext(PrefetchContext)
  return prefetchContext
}

/**
 * Whenever we intercept a RouterLink, look up the path and prefetch
 */
export async function prefetchQuery(environment, query, variables) {
  const operation = createOperationDescriptor(getRequest(query), variables)
  const data = await fetchQuery(environment, query, variables)

  // This will retain the result in the relay store so it's not garbage collected
  // so it can pull the data from here when we try and fetch it later
  environment.retain(operation)
  return data
}

/**
 * Revived from our old PreloadLink component.
 * @see https://github.com/damassi/reaction/blob/177cf3e0e772dd413dc2ed80034c9f1c7eb9d704/src/Artsy/Router/Components/PreloadLink.tsx
 */
export function getRouteQuery({ resolver, relayEnvironment, router, to }) {
  const { getRouteMatches, getRouteValues } = ResolverUtils
  const location = router.createLocation(to)
  const match = router.matcher.match(location)

  // Route is missing query, just pass through
  if (!match) {
    return
  }

  const routes = router.matcher.getRoutes(match)
  const augmentedMatch = { ...match, routes }
  const routeMatches = getRouteMatches(augmentedMatch)

  // FIXME: This should result in a GraphQLTaggedNode type
  const query: any = last(
    getRouteValues(
      routeMatches,
      route => route.getQuery,
      route => route.query
    ).filter(q => !isUndefined(q))
  )

  const cacheConfig = last(
    getRouteValues(
      routeMatches,
      route => route.getCacheConfig,
      route => route.cacheConfig
    ).filter(caches => !isUndefined(caches))
  )

  const variables = last(
    resolver
      .getRouteVariables(match, routeMatches)
      .filter(
        routeVariables =>
          !isUndefined(routeVariables) && !isEmpty(routeVariables)
      )
  )

  return {
    environment: relayEnvironment,
    query,
    cacheConfig,
    variables,
  }
}
