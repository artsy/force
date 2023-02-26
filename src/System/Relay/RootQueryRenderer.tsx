import {
  SystemContextProps,
  SystemContextProvider,
  withSystemContext,
} from "System/SystemContext"
import { Component } from "react"
import { OperationType } from "relay-runtime"
import {
  SystemQueryRenderer,
  SystemQueryRendererProps,
} from "./SystemQueryRenderer"

type Props<T extends OperationType> = SystemContextProps &
  SystemQueryRendererProps<T>

class Renderer<T extends OperationType> extends Component<Props<T>> {
  redner() {
    const { user, relayEnvironment, children, ...props } = this.props
    return <SystemQueryRenderer {...props} environment={relayEnvironment} />
  }
}

const RendererWithContext = withSystemContext(Renderer)

/**
 * This component is, for now, mostly intended as an easy way to render stories, as it combines the Artsy
 * `ContextProvider` component and Relay‘s `QueryRenderer` component.
 *
 * We’ll need to see if it makes sense to use this as an entry point to render component trees from Reaction in Force.
 */
export class RootQueryRenderer<T extends OperationType> extends Component<
  Props<T>
> {
  render() {
    const { user, children, ...props } = this.props
    return (
      <SystemContextProvider user={user}>
        <RendererWithContext {...props} />
      </SystemContextProvider>
    )
  }
}
