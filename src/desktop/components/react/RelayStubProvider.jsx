import { Environment, Network, RecordSource, Store } from "relay-runtime"
import { ReactRelayContext } from "react-relay"
import { Component } from "react";

export class RelayStubProvider extends Component {
  static defaultProps = {
    relay: {
      environment: new Environment({
        network: Network.create(x => x),
        store: new Store(new RecordSource()),
      }),
      variables: {},
    },
  }

  render() {
    return (
      <ReactRelayContext.Provider
        value={{ environment: this.props.relay.environment, variables: {} }}
      >
        {this.props.children}
      </ReactRelayContext.Provider>
    )
  }
}
