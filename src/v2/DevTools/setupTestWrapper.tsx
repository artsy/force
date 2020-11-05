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
