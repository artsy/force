import { act, waitFor } from "@testing-library/react"
import { OperationDescriptor } from "react-relay"
import { MockEnvironment, MockPayloadGenerator } from "relay-test-utils"

type MockedOperationResult = {
  name: string
  variables: any
  operation: OperationDescriptor
}

/** extract the name and variables from a relay operation.
 *
 * @example
 * ```ts
 * const operation = await waitFor(() => env.getMostRecentOperation())
 *
 * expect(getOperationProps(operation)).toEqual({ name: 'MyQuery', variables: { id: '123' } })
 * ```
 */
export const getOperationProps = (operation: OperationDescriptor) => {
  const name = operation.request.node.operation.name
  const variables = operation.request.variables
  return { name, variables }
}

/**
 * Asynchronously find and resolve the next operation with mock data provided
 * in the mockResolvers format.
 *
 * Returns an object containing the operation, its name and variables.
 */
export const mockResolveMostRecentOperation = async (
  mockRelayEnv: MockEnvironment,
  mockResolvers: MockPayloadGenerator.MockResolvers
): Promise<MockedOperationResult> => {
  const operation = await waitFor(() =>
    mockRelayEnv.mock.getMostRecentOperation()
  )
  await act(() => {
    mockRelayEnv.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation, mockResolvers)
    )
  })
  const operationProps = getOperationProps(operation)
  return { ...operationProps, operation }
}

/**
 * Asynchronously find and reject the next operation with the provided error.
 *
 * Returns an object containing the operation, its name and variables.
 */
export const mockRejectMostRecentOperation = async (
  mockRelayEnv: MockEnvironment,
  error: Error
): Promise<MockedOperationResult> => {
  const operation = await waitFor(() =>
    mockRelayEnv.mock.getMostRecentOperation()
  )
  await act(() => {
    mockRelayEnv.mock.reject(operation, error)
  })
  const operationProps = getOperationProps(operation)
  return { ...operationProps, operation }
}

const applyEnvironmentMock = <A extends Array<unknown>, R>(
  mockRelayEnv: MockEnvironment,
  func: (env: MockEnvironment, ...args: A) => R
) => (...args: A) => func(mockRelayEnv, ...args)

/**
 * Curry a mock relay operation resolver with a mock environment.
 * Useful for when you have a stable identifier for your environment.
 * Example:
 * ```ts
 * let mockEnv: MockEnvironment
 * const mockResolveMostRecentOperation = mockResolveMostRecentOperationWithEnv(mockEnv)
 *
 * beforeEach(() => {
 *  mockEnv = createMockEnvironment()
 * })
 * ```
 */
export const mockResolveMostRecentOperationWithEnv = (env: MockEnvironment) =>
  applyEnvironmentMock(env, mockResolveMostRecentOperation)

/**
 * Curry a mock relay operation rejector with a mock environment.
 * Useful for when you have a stable identifier for your environment.
 * Example:
 * ```ts
 * let mockEnv: MockEnvironment
 * const mockRejectMostRecentOperation = mockRejectMostRecentOperationWithEnv(mockEnv)
 *
 * beforeEach(() => {
 *  mockEnv = createMockEnvironment()
 * })
 * ```
 */
export const mockRejectMostRecentOperationWithEnv = (env: MockEnvironment) =>
  applyEnvironmentMock(env, mockRejectMostRecentOperation)
