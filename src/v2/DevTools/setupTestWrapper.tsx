import * as React from "react"
import { mount } from "enzyme"
import { render, RenderResult } from "@testing-library/react"
import { QueryRenderer } from "react-relay"
import {
  MockPayloadGenerator,
  createMockEnvironment,
  RelayMockEnvironment,
} from "relay-test-utils"
import { GraphQLTaggedNode, OperationType } from "relay-runtime"
import { MockResolvers } from "relay-test-utils/lib/RelayMockPayloadGenerator"

type SetupTestWrapper<T extends OperationType> = {
  Component: React.ComponentType<T["response"]>
  query: GraphQLTaggedNode
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
	import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"

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
 * @see https://testing-library.com/docs/react-testing-library/
 */

type RTLRenderResult = RenderResult<
  typeof import("@testing-library/dom/types/queries"),
  HTMLElement
>
type RenderWithRelay = RTLRenderResult & { env: RelayMockEnvironment }
export const setupTestWrapperTL = <T extends OperationType>({
  Component,
  query,
  variables = {},
}: SetupTestWrapper<T>) => {
  const renderWithRelay = (
    mockResolvers: MockResolvers = {},
    manualEnvControl?: boolean
  ): RenderWithRelay => {
    const env = createMockEnvironment()
    const TestRenderer = () => (
      <QueryRenderer<T>
        environment={env}
        variables={variables}
        query={query}
        render={({ props, error }) => {
          if (props) {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            return <Component {...props} />
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const view = render(<TestRenderer />)

    if (!manualEnvControl) {
      env.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, mockResolvers)
      })
    }

    return { ...view, env }
  }

  return { renderWithRelay }
}

/**
 * @deprecated Use `setupTestWrapperTL`, which uses `@testing-library/react`
 */
export const setupTestWrapper = <T extends OperationType>({
  Component,
  query,
  variables = {},
}: SetupTestWrapper<T>) => {
  const getWrapper = (mockResolvers: MockResolvers = {}) => {
    const env = createMockEnvironment()

    const TestRenderer = () => (
      <QueryRenderer<T>
        environment={env}
        variables={variables}
        query={query}
        render={({ props, error }) => {
          if (props) {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            return <Component {...props} />
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const wrapper = mount(<TestRenderer />)

    env.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, mockResolvers)
    })

    wrapper.update()

    return wrapper
  }

  return { getWrapper }
}
