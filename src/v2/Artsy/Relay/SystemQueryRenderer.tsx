import React from "react"
// FIXME: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37950
// @ts-ignore
import { QueryRenderer, QueryRendererProps } from "react-relay"
import { OperationType } from "relay-runtime"

interface SystemQueryRendererState {
  isMounted: boolean
}

/** A QueryRenderer that runs only on the client */
export class SystemQueryRenderer<
  T extends OperationType
> extends React.Component<QueryRendererProps<T>, SystemQueryRendererState> {
  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    })
  }

  render() {
    if (this.state.isMounted) {
      return <QueryRenderer<T> {...this.props} />
    } else {
      return null
    }
  }
}
