import { RouterConfig } from "v2/Artsy/Router"
import { buildClientApp } from "v2/Artsy/Router/buildClientApp"
import {
  createMockNetworkLayer,
  createMockNetworkLayer2,
} from "v2/DevTools/createMockNetworkLayer"
import { FarceCreateRouterArgs, RouteConfig } from "found"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React from "react"
import { getUser } from "v2/Utils/user"

interface Props {
  routes: RouteConfig[]
  initialRoute?: string
  initialState?: object
  historyOptions?: FarceCreateRouterArgs["historyOptions"]
  mockResolvers?: IMocks
  mockData?: object
  mockMutationResults?: object
  context?: RouterConfig["context"]
}

export class MockRouter extends React.Component<Props> {
  state = {
    ClientApp: null,
  }

  static defaultProps = {
    initialRoute: "/",
  }

  async componentDidMount() {
    const {
      routes,
      initialRoute,
      historyOptions,
      mockResolvers,
      mockData,
      mockMutationResults,
      context,
    } = this.props

    try {
      const user = getUser(context && context.user)

      const relayEnvironment = mockResolvers
        ? createMockNetworkLayer(mockResolvers)
        : mockData || mockMutationResults
        ? createMockNetworkLayer2({ mockData, mockMutationResults })
        : undefined

      const { ClientApp } = await buildClientApp({
        routes,
        initialRoute,
        history: {
          protocol: "memory",
          options: historyOptions,
        },
        context: {
          ...context,
          user,
          relayEnvironment,
        } as any,
      })

      this.setState({
        ClientApp,
      })
    } catch (error) {
      console.error("MockRouter", error)
    }
  }

  render() {
    const { ClientApp } = this.state

    return (
      <React.Fragment>
        {ClientApp && <ClientApp {...this.props.initialState} />}
      </React.Fragment>
    )
  }
}
