import { settingOrderPaymentFailed } from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderPayment"
import {
  type CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { createMockNetworkLayer } from "DevTools/createMockNetworkLayer"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import type { commitMutationTest1Mutation } from "__generated__/commitMutationTest1Mutation.graphql"
import type { Environment as IEnvironment } from "react-relay"
import { graphql } from "react-relay"
import { Environment, RecordSource, Store } from "relay-runtime"

jest.unmock("react-relay")

describe("injectCommitMutation", () => {
  const network = createMockNetworkLayer({
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

  const Provider: React.FC<React.PropsWithChildren<unknown>> = props => (
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

    render(
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
          // biome-ignore lint/a11y/useKeyWithClickEvents: test component
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

    render(
      <Provider>
        <Injected word="hello" />
      </Provider>
    )

    const clickableDiv = screen.getByText("hello")
    expect(clickableDiv).toBeInTheDocument()
    expect(clickableDiv).toHaveClass("nothing")

    fireEvent.click(clickableDiv)
    expect(clickableDiv).toHaveClass("isCommittingMutation")
    expect(resultFn).not.toHaveBeenCalled()

    await flushPromiseQueue()
    await waitFor(() => {
      expect(clickableDiv).toHaveClass("nothing")
    })
    expect(resultFn).toHaveBeenCalledWith({
      commerceSetPayment: {
        orderOrError: { error: { code: "invalid_state" } },
      },
    })
  })
})
