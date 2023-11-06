import { waitFor } from "@testing-library/react"
import { OperationDescriptor } from "react-relay"
import { MockEnvironment, MockPayloadGenerator } from "relay-test-utils"

type ResolverHandler = {
  /* Resolve operation with mock data in the mockResolvers format */
  mockResolvers: MockPayloadGenerator.MockResolvers
}
type ErrorHandler = {
  /* Reject operation with an error */
  error: Error
}
type OperationConfig = {
  /* The expected operation name */
  name?: string
  /* The operation variables */
  variables?: any
} & (ResolverHandler | ErrorHandler)

/**
 * Get the most recent pending relay operaion, optionally assert on its name or variables,
 * and resolve or reject it with mock data or an error. A partially-applied version of this
 * with the relay environment already included is also available as return
 * value from `setupTestWrapperTL().renderWithRelay()`.
 * @example
 * ```tsx
 * const mockRelayEnv = createMockEnvironment()
 *
 * await userEvent.click(screen.findByText("Submit"))
 * await expectAndHandleOperationWithEnv(mockRelayEnv, {
 *  name: "UpdateUserDefaultAddressMutation",
 *  variables: { input: { addressID: "123" } },
 *  mockResolvers: {
 *   UpdateUserDefaultAddressMutation: () => ({ internalID: "123", isDefault: true }),
 *  }
 * )
 *
 * await expectAndHandleOperationWithEnv(mockRelayEnv, {
 *   name: "grantAdminPrivilegesMutation",
 *   error: new Error("You do not have permission to perform this action"),
 * })
 * ```
 */
export async function expectAndHandleOperationWithEnv(
  mockRelayEnv: MockEnvironment,
  operationConfig: OperationConfig
) {
  const {
    name: expectedName,
    variables: expectedVariables,
    ...handler
  } = operationConfig
  let operation: OperationDescriptor = {} as OperationDescriptor
  await waitFor(() => {
    operation = mockRelayEnv.mock.getMostRecentOperation()
  })
  if (expectedName) {
    expect(operation.request.node.operation.name).toEqual(expectedName)
  }
  if (expectedVariables) {
    expect(operation.request.variables).toMatchObject(expectedVariables)
  }

  if ("mockResolvers" in handler) {
    mockRelayEnv.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation, handler.mockResolvers)
    )
  } else if ("error" in handler) {
    mockRelayEnv.mock.reject(operation, handler.error)
  }
}
