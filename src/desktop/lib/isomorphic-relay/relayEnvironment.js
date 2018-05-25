import 'isomorphic-fetch'
import 'regenerator-runtime/runtime'
import { Environment, RecordSource, Store } from 'relay-runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,
  cacheMiddleware,
  loggerMiddleware,
} from 'react-relay-network-modern'

export function createRelayEnvironment(cache) {
  const isServer = typeof window === 'undefined'
  let relaySSRMiddleware = null

  if (isServer) {
    const {
      default: RelayServerSSR,
    } = require('react-relay-network-modern-ssr/lib/server')

    relaySSRMiddleware = new RelayServerSSR()
  } else {
    const {
      default: RelayClientSSR,
    } = require('react-relay-network-modern-ssr/lib/client')

    relaySSRMiddleware = new RelayClientSSR(cache)
  }

  relaySSRMiddleware.debug = false

  const network = new RelayNetworkLayer([
    relaySSRMiddleware.getMiddleware({
      lookup: true,
    }),
    cacheMiddleware({
      size: 100, // max 100 requests
      ttl: 900000, // 15 minutes
      onInit: cache => {
        // TODO: Handle this cache
        // console.log(cache)
      },
    }),
    urlMiddleware({
      url: process.env.METAPHYSICS_ENDPOINT,
    }),
    // loggerMiddleware(),
  ])

  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  })
  environment.relaySSRMiddleware = relaySSRMiddleware

  return environment
}
