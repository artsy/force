import { type INetwork, Network } from "relay-runtime"

export const createMockNetworkLayer = ({
  mockData = {},
  mockMutationResults = {},
}: {
  mockData?: object
  mockMutationResults?: object
}): INetwork => {
  return Network.create((operation, _variables) => {
    // Simple mock that returns the mockData wrapped in a data property
    return new Promise(resolve => {
      resolve({
        data: operation.operationKind === "mutation" ? mockMutationResults : mockData,
      })
    })
  })
}
