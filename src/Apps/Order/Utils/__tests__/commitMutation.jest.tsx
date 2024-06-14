import { commitMutationTest1Mutation } from "__generated__/commitMutationTest1Mutation.graphql"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { createMockNetworkLayer2 } from "DevTools/createMockNetworkLayer"
import { mount } from "enzyme"
import { graphql } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"
import { Environment as IEnvironment } from "react-relay"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { settingOrderPaymentFailed } from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderPayment"
jest.unmock("react-relay")

describe("injectCommitMutation", () => {
  const network = createMockNetworkLayer2({
    mockMutationResults: {
      ...settingOrderPaymentFailed,
    },
  })
  const source = new RecordSource()
  const store = new Store(source)
  const relayEnvironment = new Environment({
    network,
    store,
  }) as IEnvironment

  const Provider: React.FC = props => (
    <SystemContextProvider relayEnvironment={relayEnvironment}>
      {props.children}
    </SystemContextProvider>
  )

  it("injects two props", () => {
    const Injected = injectCommitMutation(props => {
      expect(props.isCommittingMutation).toBe(false)
      expect(typeof props.commitMutation).toBe("function")
      return <div />
    })

    mount(
      <Provider>
        <Injected />
      </Provider>
    )

    expect.assertions(2)
  })

  it("lets you commit a mutation", async () => {
    const resultFn = jest.fn()
    const Injected = injectCommitMutation(
      (props: {
        isCommittingMutation: boolean
        commitMutation: CommitMutation
        word: string
      }) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className={
              props.isCommittingMutation ? "isCommittingMutation" : "nothing"
            }
            onClick={() => {
              props
                .commitMutation<commitMutationTest1Mutation>({
                  variables: {
                    input: {
                      paymentMethod: "CREDIT_CARD",
                      paymentMethodId: "card",
                      id: "order",
                    },
                  },
                  // TODO: Inputs to the mutation might have changed case of the keys!
                  mutation: graphql`
                    mutation commitMutationTest1Mutation(
                      $input: CommerceSetPaymentInput!
                    ) {
                      commerceSetPayment(input: $input) {
                        orderOrError {
                          ... on CommerceOrderWithMutationFailure {
                            error {
                              code
                            }
                          }
                        }
                      }
                    }
                  `,
                })
                .then(resultFn)
            }}
          >
            {props.word}
          </div>
        )
      }
    )

    const wrapper = mount(
      <Provider>
        <Injected word="hello" />
      </Provider>
    )
    expect(wrapper.text()).toBe("hello")
    expect(wrapper.find("div").props().className).toBe("nothing")
    wrapper.find("div").simulate("click")
    expect(wrapper.find("div").props().className).toBe("isCommittingMutation")
    expect(resultFn).not.toHaveBeenCalled()
    await flushPromiseQueue()
    wrapper.update()
    expect(wrapper.find("div").props().className).toBe("nothing")
    expect(resultFn).toHaveBeenCalledWith({
      commerceSetPayment: {
        orderOrError: { error: { code: "invalid_state" } },
      },
    })
  })
})
