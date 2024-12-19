import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import * as React from "react"
import { act } from "react-dom/test-utils"
import { type GraphQLTaggedNode, QueryRenderer } from "react-relay"
import type { OperationType } from "relay-runtime"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import type { MockResolvers } from "relay-test-utils/lib/RelayMockPayloadGenerator"

type SetupTestWrapper<T extends OperationType> = {
  Component: React.ComponentType<React.PropsWithChildren<T["response"]>>
  query?: GraphQLTaggedNode
  variables?: T["variables"]
}

/**
 * @deprecated This method should _not_ be used for new tests. See
 * `setupTestWrapperTL` which uses `@testing-library/react`.
 */
export const setupTestWrapper = <T extends OperationType>({
  Component,
  query,
  variables = {},
}: SetupTestWrapper<T>) => {
  const getWrapper = (
    mockResolvers: MockResolvers = {},
    componentProps: {} = {},
    mockedEnv?: ReturnType<typeof createMockEnvironment>
  ) => {
    const env = mockedEnv ?? createMockEnvironment()

    const TestRenderer = () => (
      <MockBoot relayEnvironment={env}>
        <QueryRenderer<T>
          environment={env}
          variables={variables}
          query={query}
          render={({ props, error }) => {
            if (props) {
              return (
                <Component {...(componentProps || {})} {...(props as {})} />
              )
            } else if (error) {
              console.error(error)
            }
          }}
        />
      </MockBoot>
    )

    const mockResolveLastOperation = (mockResolvers: MockResolvers) => {
      const operation = env.mock.getMostRecentOperation()

      act(() => {
        env.mock.resolve(
          operation,
          MockPayloadGenerator.generate(operation, mockResolvers)
        )
      })

      const operationName = operation.request.node.operation.name
      const operationVariables = operation.request.variables

      return { operation, operationName, operationVariables }
    }

    const mockRejectLastOperation = (error: Error) => {
      const operation = env.mock.getMostRecentOperation()

      act(() => {
        env.mock.reject(operation, error)
      })
      const operationName = operation.request.node.operation.name
      const operationVariables = operation.request.variables

      return { operation, operationName, operationVariables }
    }

    const wrapper = mount(
      <ErrorBoundary>
        <TestRenderer />
      </ErrorBoundary>
    )

    env.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, mockResolvers)
    })

    wrapper.update()

    return {
      wrapper,
      env,
      mockResolveLastOperation,
      mockRejectLastOperation,
    }
  }

  return { getWrapper }
}

class ErrorBoundary extends React.Component<React.PropsWithChildren> {
  componentDidCatch(error) {
    // Print an error to the console for a better debugging experience
    console.log("Something went wrong while rendering a component")
    console.log(error)
  }

  render() {
    return this.props.children
  }
}
