import { SystemContext } from "v2/System"
import React, { useContext } from "react"
import { commitMutation as relayCommitMutation } from "react-relay"
import { Environment, MutationConfig, MutationParameters } from "relay-runtime"

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
          mutation,
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
      <ProvideMutationContext relayEnvironment={relayEnvironment!}>
        <MutationContext.Consumer>
          {({ isCommittingMutation, commitMutation }) => (
            <Component
              // @ts-expect-error STRICT_NULL_CHECK
              isCommittingMutation={isCommittingMutation}
              // @ts-expect-error STRICT_NULL_CHECK
              commitMutation={commitMutation}
              {...(props as Props)}
            />
          )}
        </MutationContext.Consumer>
      </ProvideMutationContext>
    )
  }
}
