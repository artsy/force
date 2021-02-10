import React from "react"
import { mount } from "enzyme"
import { QueryRenderer } from "react-relay"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { GraphQLTaggedNode, OperationType } from "relay-runtime"
import { MockResolvers } from "relay-test-utils/lib/RelayMockPayloadGenerator"

type SetupTestWrapper<T extends OperationType> = {
  Component: React.ComponentType<T["response"]>
  query: GraphQLTaggedNode
  variables?: T["variables"]
}
/**
 * Creates an enzyme-based wrapper for testing Relay components using the
 * `relay-test-tools` package, which will provide automatic fixture data for
 * GraphQL queries.
 *
 * @see https://relay.dev/docs/en/testing-relay-components
 *
 * @example

  import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

  // Important! Don't forget to unmock relay, otherwise the following error
  // will occur: "RelayModernMockEnvironment: There are no pending operations."
  jest.unmock("react-relay")

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <ShowMetaFragmentContainer show={props.show} />
    },
    query: graphql`
      query OverviewRoute_Test_Query($showID: String!) {
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
  const wrapper = getWrapper()
  expect(wrapper.text()).toContain(...)

  // If wanting to manually provide fixture data, can pass in an object that
  // maps to the type and field resolvers.
  const wrapper = getWrapper({
    Show: () => ({
      description: "Hello world!"
    })
  })
  expect(wrapper.text()).toContain("Hello World!")
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
