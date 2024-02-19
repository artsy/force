import { act, render, RenderResult } from "@testing-library/react"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import * as React from "react"
import {
  GraphQLTaggedNode,
  QueryRenderer,
  RelayEnvironmentProvider,
  Variables,
} from "react-relay"
import { OperationDescriptor, OperationType } from "relay-runtime"
import {
  createMockEnvironment,
  MockPayloadGenerator,
  MockEnvironment,
} from "relay-test-utils"
import { MockResolvers } from "relay-test-utils/lib/RelayMockPayloadGenerator"

type SetupTestWrapper<T extends OperationType> = {
  Component: React.ComponentType<T["response"]>
  query?: GraphQLTaggedNode
  variables?: T["variables"]
}

/**
 * Creates a wrapper for testing Relay components using the `relay-test-utils`
 * package, which will provide automatic fixture data for GraphQL queries.
 *
 * Note: If wanting to test a QueryRenderer, extract the render code into a
 * fragment-like container and test that; `QueryRenderer` components aren't
 * supported.
 *
 * @see https://relay.dev/docs/guides/testing-relay-components/
 *
 * @example

	import { screen } from "@testing-library/react"
	import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

  // Important! Don't forget to unmock relay, otherwise the following error
  // will occur: "RelayModernMockEnvironment: There are no pending operations."
  jest.unmock("react-relay")

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return <ShowMetaFragmentContainer show={props.show} />
    },
    query: graphql`
      query ExampleOverviewRoute_Test_Query($showID: String!) {
        show(id: $showID) {
          description
        }
      }
    `,
    variables: {
      showID: 'some-show'
    }
  })

  // Invoking without arguments will return dummy fixture data, provide by relay
  renderWithRelay()
	expect(screen.queryByText("Some text string")).toBeInTheDocument()

  // If wanting to manually provide fixture data, can pass in an object that
  // maps to the type and field resolvers.
  renderWithRelay({
    Show: () => ({
      description: "Hello world!"
    })
  })

	expect(screen.queryByText("Hello world")).toBeInTheDocument()
 */
/**
 * Creates a React Testing Library-based wrapper for testing Relay components
 * using the `relay-test-utils` package, which will provide automatic fixture
 * data for GraphQL queries.
 *
 * @see https://relay.dev/docs/en/testing-relay-components
 * @see https://testing-library.com/docs/react-testing-library/intro
 */

type RTLRenderResult = RenderResult<
  typeof import("@testing-library/dom/types/queries"),
  HTMLElement
>

type RenderWithRelay = RTLRenderResult & {
  env: MockEnvironment
  mockResolveLastOperation: (
    mockResolvers: MockResolvers
  ) => {
    operation: OperationDescriptor
    operationName: string
    operationVariables: Variables
  }
  mockRejectLastOperation: (error: Error) => void
}

export const setupTestWrapperTL = <T extends OperationType>({
  Component,
  query,
  variables = {},
}: SetupTestWrapper<T>) => {
  const renderWithRelay = (
    mockResolvers: MockResolvers = {},
    componentProps?: any,
    mockedEnv?: ReturnType<typeof createMockEnvironment>
  ): RenderWithRelay => {
    const env = mockedEnv ?? createMockEnvironment()

    const TestRenderer = () =>
      query ? (
        <MockBoot relayEnvironment={env}>
          <QueryRenderer<T>
            environment={env}
            variables={variables}
            query={query}
            render={({ props, error }) => {
              if (props) {
                return <Component {...componentProps} {...(props as {})} />
              } else if (error) {
                console.error(error)
              }
            }}
          />
        </MockBoot>
      ) : (
        <MockBoot relayEnvironment={env}>
          <RelayEnvironmentProvider environment={env}>
            <Component {...componentProps} />
          </RelayEnvironmentProvider>
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

    const view = render(<TestRenderer />)

    env.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, mockResolvers)
    })

    return {
      ...view,
      env,
      mockResolveLastOperation,
      mockRejectLastOperation,
    }
  }

  return { renderWithRelay }
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

class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    // Print an error to the console for a better debugging experience
    console.log("Something went wrong while rendering a component")
    console.log(error)
  }

  render() {
    return this.props.children
  }
}
