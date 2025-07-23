import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import { SystemContext } from "System/Contexts/SystemContext"
import { useContext } from "react"
import * as React from "react"
import {
  type Environment,
  commitMutation as relayCommitMutation,
} from "react-relay"
import type { MutationConfig, MutationParameters } from "relay-runtime"

interface OperationBase {
  variables: object
  response: object
  rawResponse?: object
}

type CommitMutationArgs = Omit<
  MutationConfig<MutationParameters>,
  "onCompleted" | "onError"
>

export type CommitMutation = <MutationType extends OperationBase>(
  args: CommitMutationArgs,
) => Promise<MutationType["response"]>

export interface CommitMutationProps {
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

// Easy-peasy store model interface
interface MutationStoreModel {
  // State
  isCommittingMutation: boolean

  // Actions
  setIsCommittingMutation: Action<MutationStoreModel, boolean>

  // Thunks
  commitMutation: Thunk<
    MutationStoreModel,
    {
      args: CommitMutationArgs
      relayEnvironment: Environment
    },
    any,
    any,
    Promise<any>
  >
}

// Create the context store
export const MutationStore = createContextStore<MutationStoreModel>(
  runtimeModel => ({
    // State
    isCommittingMutation: runtimeModel?.isCommittingMutation || false,

    // Actions
    setIsCommittingMutation: action((state, payload) => {
      state.isCommittingMutation = payload
    }),

    // Thunks
    commitMutation: thunk(
      async (actions, { args, relayEnvironment }, { getState }) => {
        const state = getState()

        if (state.isCommittingMutation) {
          throw new Error(
            "Multiple simultaneous mutations is not currently supported",
          )
        }

        actions.setIsCommittingMutation(true)

        return new Promise((resolve, reject) => {
          try {
            const { variables, mutation, ...rest } = args

            relayCommitMutation(relayEnvironment, {
              mutation: mutation as any,
              variables,
              onCompleted: (data, errors) => {
                actions.setIsCommittingMutation(false)

                if (errors) {
                  reject(new Error(errors.join("\n")))
                  return
                }
                resolve(data)
              },
              onError: e => {
                actions.setIsCommittingMutation(false)
                reject(e)
              },
              ...rest,
            })
          } catch (e) {
            actions.setIsCommittingMutation(false)
            reject(e)
          }
        })
      },
    ),
  }),
)

// Legacy context for backward compatibility
const MutationContext = React.createContext<CommitMutationProps>({
  isCommittingMutation: false,
  commitMutation() {
    throw new Error("no mutation context in react tree")
  },
})

// Provider component that bridges easy-peasy and legacy context
const ProvideMutationContext: React.FC<
  React.PropsWithChildren<{ relayEnvironment: Environment }>
> = ({ children, relayEnvironment }) => {
  const isCommittingMutation = MutationStore.useStoreState(
    state => state.isCommittingMutation,
  )
  const commitMutationThunk = MutationStore.useStoreActions(
    actions => actions.commitMutation,
  )

  const commitMutation: CommitMutation = args => {
    return commitMutationThunk({ args, relayEnvironment })
  }

  return (
    <MutationContext.Provider
      value={{
        commitMutation,
        isCommittingMutation,
      }}
    >
      {children}
    </MutationContext.Provider>
  )
}

// HOC for backward compatibility
export function injectCommitMutation<Props extends CommitMutationProps>(
  Component: React.ComponentType<React.PropsWithChildren<Props>>,
): React.ComponentType<
  React.PropsWithChildren<Omit<Props, keyof CommitMutationProps>>
> {
  return props => {
    const { relayEnvironment } = useContext(SystemContext)

    return (
      <MutationStore.Provider>
        <ProvideMutationContext relayEnvironment={relayEnvironment}>
          <MutationContext.Consumer>
            {({ isCommittingMutation, commitMutation }) => (
              <Component
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                isCommittingMutation={isCommittingMutation}
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                commitMutation={commitMutation}
                {...(props as Props)}
              />
            )}
          </MutationContext.Consumer>
        </ProvideMutationContext>
      </MutationStore.Provider>
    )
  }
}
