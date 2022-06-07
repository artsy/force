import { commitMutationTest1Mutation } from "v2/__generated__/commitMutationTest1Mutation.graphql"
import { settingOrderPaymentFailed } from "v2/Apps/Order/Routes/__fixtures__/MutationResults"
import { SystemContextProvider } from "v2/System"
import { createMockNetworkLayer2 } from "v2/DevTools"
import { mount } from "enzyme"
import { graphql } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"
import { flushPromiseQueue } from "v2/DevTools"
import { CommitMutation, injectCommitMutation } from "../commitMutation"
jest.unmock("react-relay")

describe(injectCommitMutation, () => {
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
  })

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
