import { SystemContext } from "System/Contexts/SystemContext"
import { useContext } from "react"
import * as React from "react"
import { Environment, commitMutation as relayCommitMutation } from "react-relay"
import { MutationConfig, MutationParameters } from "relay-runtime"

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
  args: CommitMutationArgs
) => Promise<MutationType["response"]>

export interface CommitMutationProps {
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const MutationContext = React.createContext<CommitMutationProps>({
  isCommittingMutation: false,
  commitMutation() {
    throw new Error("no mutation context in react tree")
  },
})

class ProvideMutationContext extends React.Component<
  { relayEnvironment: Environment },
  { isCommittingMutation: boolean }
> {
  execQueue: Array<() => Promise<any>> = []
  state = { isCommittingMutation: false }
  commitMutation: CommitMutation = ({ variables, mutation, ...rest }) => {
    if (this.state.isCommittingMutation) {
      throw new Error(
        "Mutliple simulataneous mutations is not currently supported"
      )
    }
    this.setState({ isCommittingMutation: true })
    return new Promise((resolve, reject) => {
      try {
        relayCommitMutation(this.props.relayEnvironment, {
          mutation: mutation as any,
          variables,
          onCompleted: (data, errors) => {
            this.setState({ isCommittingMutation: false }, () => {
              if (errors) {
                reject(new Error(errors.join("\n")))
                return
              }
              resolve(data)
            })
          },
          onError: e => {
            this.setState({ isCommittingMutation: false }, () => {
              reject(e)
            })
          },
          ...rest,
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  render() {
    return (
      <MutationContext.Provider
        value={{
          commitMutation: this.commitMutation,
          isCommittingMutation: this.state.isCommittingMutation,
        }}
      >
        {this.props.children}
      </MutationContext.Provider>
    )
  }
}

export function injectCommitMutation<Props extends CommitMutationProps>(
  Component: React.ComponentType<Props>
): React.ComponentType<Omit<Props, keyof CommitMutationProps>> {
  return props => {
    const { relayEnvironment } = useContext(SystemContext)
    return (
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
    )
  }
}
