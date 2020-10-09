import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern/node8"
import RelaySSR from "react-relay-network-modern-ssr/node8/server"
import { Environment, Network, RecordSource, Store } from "relay-runtime"

export default {
  initEnvironment: () => {
    const source = new RecordSource()
    const store = new Store(source)
    const relaySSR = new RelaySSR()

    return {
      relaySSR,
      environment: new Environment({
        store,
        network: new RelayNetworkLayer([
          urlMiddleware({
            url: req => process.env.METAPHYSICS_URL,
          }),
          relaySSR.getMiddleware(),
        ]),
      }),
    }
  },
  createEnvironment: relayData => {
    const source = new RecordSource()
    const store = new Store(source)

    return new Environment({
      store,
      network: Network.create(() => relayData?.[0][1] || Promise.resolve()),
    })
  },
}
