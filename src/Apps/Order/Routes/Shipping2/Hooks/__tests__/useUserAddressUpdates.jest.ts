import { act, renderHook } from "@testing-library/react-hooks"
import {
  MockEnvironment,
  MockPayloadGenerator,
  createMockEnvironment,
} from "relay-test-utils"
import {
  UserAddressAction,
  useUserAddressUpdates,
} from "Apps/Order/Routes/Shipping2/Hooks/useUserAddressUpdates"
import {
  FulfillmentType,
  FulfillmentValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

let mockRelayEnv: MockEnvironment
let values: FulfillmentValues
let mockShippingContext: ShippingContextProps

jest.unmock("react-relay")
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: () => ({ relayEnvironment: mockRelayEnv }),
}))
jest.mock("Apps/Order/Routes/Shipping2/Hooks/useShippingContext", () => ({
  useShippingContext: () => mockShippingContext,
}))

const setupHook = () => {
  const hookResult = renderHook(() => useUserAddressUpdates())
  return hookResult
}

beforeEach(() => {
  mockRelayEnv = createMockEnvironment()

  values = {
    fulfillmentType: FulfillmentType.SHIP,
    meta: {},
    attributes: {
      addressLine1: "401 Broadway",
      addressLine2: "",
      city: "New York",
      country: "US",
      name: "Artsy UK Ltd",
      phoneNumber: "1234567890",
      postalCode: "10013",
      region: "NY",
    },
  }

  mockShippingContext = ({
    state: {
      mode: "saved_addresses",
    },
    actions: {
      setIsPerformingOperation: jest.fn(),
    },
    orderData: {
      savedFulfillmentDetails: null,
    },
    meData: {
      addressList: [],
    },
  } as unknown) as ShippingContextProps
})

const resolveMostRecentOperation = async (resolvers: any) => {
  const operation = mockRelayEnv.mock.getMostRecentOperation()

  await act(() => {
    mockRelayEnv.mock.resolve(
      operation,
      MockPayloadGenerator.generate(operation, resolvers)
    )
  })

  const operationName = operation.request.node.operation.name
  const operationVariables = operation.request.variables

  return { operation, operationName, operationVariables }
}

let userAddressAction: UserAddressAction

describe("useUserAddressUpdates", () => {
  describe("handleNewUserAddressUpdates", () => {
    it("returns a function", () => {
      const { result } = setupHook()
      expect(result.current.handleNewUserAddressUpdates).toBeInstanceOf(
        Function
      )
    })

    it("does not call a mutation and returns an empty result and errors if fulfillment type is pickup", async () => {
      const { result } = setupHook()
      const { handleNewUserAddressUpdates } = result.current

      values.fulfillmentType = FulfillmentType.PICKUP

      const response = await handleNewUserAddressUpdates(values)

      expect(response).toBeNull()
      expect(mockRelayEnv.mock.getAllOperations().length).toBe(0)
    })

    describe("fulfillment type is ship", () => {
      beforeEach(() => {
        values.fulfillmentType = FulfillmentType.SHIP
      })

      describe("mode is new_address", () => {
        beforeEach(() => {
          mockShippingContext.state.shippingFormMode = "new_address"
        })

        it("calls the create mutation and returns the result if the save address box is checked and there is no *new* saved address ID", async () => {
          values.meta.saveAddress = true
          mockShippingContext.state.newSavedAddressID = null

          const { result } = setupHook()
          const { handleNewUserAddressUpdates } = result.current

          const request = handleNewUserAddressUpdates(values)

          await flushPromiseQueue()

          const operation = await resolveMostRecentOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "1234",
              },
            }),
          })

          expect(operation.operationName).toBe("useCreateSavedAddressMutation")

          const response = await request

          expect(response?.data?.internalID).toEqual("1234")
        })

        it("calls the update mutation if the save address box is checked and there is *new* saved address ID", async () => {
          values.meta.saveAddress = true
          mockShippingContext.meData.addressList = [
            { internalID: "1234" } as any,
          ]
          mockShippingContext.state.newSavedAddressID = "1234"
          mockShippingContext.orderData.savedFulfillmentDetails = {
            fulfillmentType: FulfillmentType.SHIP,
            fulfillmentDetails: {},
          } as any

          const { result } = setupHook()
          const { handleNewUserAddressUpdates } = result.current

          const request = handleNewUserAddressUpdates(values)

          await flushPromiseQueue()

          const operation = await resolveMostRecentOperation({
            UpdateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "1234",
              },
            }),
          })

          expect(operation.operationName).toBe("useUpdateSavedAddressMutation")
          expect(operation.operationVariables.input).toMatchObject({
            userAddressID: "1234",
            attributes: expect.any(Object),
          })

          const response = await request

          expect(response?.data?.internalID).toEqual("1234")
        })

        it("calls the delete mutation if a new address is saved and the save address box is not checked", async () => {
          // TODO: form values or dispatch to state? Form value updates can be awaited...
          mockShippingContext.state.newSavedAddressID = "1234"
          values.meta.saveAddress = false

          const { result } = setupHook()
          const { handleNewUserAddressUpdates } = result.current

          const request = handleNewUserAddressUpdates(values)

          await flushPromiseQueue()

          const operation = await resolveMostRecentOperation({
            DeleteUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "1234",
              },
            }),
          })

          expect(operation.operationName).toBe("useDeleteSavedAddressMutation")

          const response = await request

          expect(response?.data).toEqual({ __typename: "UserAddress" })
        })
      })
      describe("executeUserAddressAction", () => {
        beforeEach(() => {
          mockShippingContext.state.shippingFormMode = "saved_addresses"
        })

        it("calls the create mutation and returns the result if the user address action is create", async () => {
          userAddressAction = {
            type: "create",
            address: {
              name: "Erik Example",
              phoneNumber: "1234567890",
              addressLine1: "401 Broadway",
              addressLine2: "",
              city: "New York",
              region: "NY",
              country: "US",
              postalCode: "10013",
            },
          }
          const { result } = setupHook()
          const { executeUserAddressAction } = result.current

          const request = executeUserAddressAction(userAddressAction)

          await flushPromiseQueue()

          const operation = await resolveMostRecentOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "1234",
              },
            }),
          })

          expect(operation.operationName).toBe("useCreateSavedAddressMutation")

          const response = await request

          expect(response.data?.internalID).toEqual("1234")
        })

        it("calls the create mutation and returns the result if the user address action is edit", async () => {
          userAddressAction = {
            type: "edit",
            address: {
              internalID: "1234",
              name: "Erik Example",
              phoneNumber: "1234567890",
              addressLine1: "401 Broadway",
              addressLine2: "",
              city: "New York",
              region: "NY",
              country: "US",
              postalCode: "10013",
            },
          }
          const { result } = setupHook()
          const { executeUserAddressAction } = result.current

          const request = executeUserAddressAction(userAddressAction)

          await flushPromiseQueue()

          const operation = await resolveMostRecentOperation({
            UpdateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "1234",
              },
            }),
          })

          expect(operation.operationName).toBe("useUpdateSavedAddressMutation")

          const response = await request

          expect(response.data?.internalID).toEqual("1234")
        })

        it("calls the set as default mutation if a create/update mutation is successful and setAsDefault is true", async () => {
          userAddressAction = {
            type: "create",
            address: {
              name: "Erik Example",
              phoneNumber: "1234567890",
              addressLine1: "401 Broadway",
              addressLine2: "",
              city: "New York",
              region: "NY",
              country: "US",
              postalCode: "10013",
            },
            setAsDefault: true,
          }
          const { result } = setupHook()
          const { executeUserAddressAction } = result.current

          const request = executeUserAddressAction(userAddressAction)

          await flushPromiseQueue()

          await resolveMostRecentOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "1234",
              },
            }),
          })

          const secondOperation = await resolveMostRecentOperation({
            UpdateUserDefaultAddressPayload: () => ({
              updateUserDefaultAddress: {
                userAddressOrErrors: {
                  __typename: "UserAddress",
                },
              },
            }),
          })

          expect(secondOperation.operationName).toBe(
            "useUpdateUserDefaultAddressMutation"
          )
          const response = await request

          expect(response.data?.internalID).toEqual("1234")
        })
      })

      describe("Error handling", () => {
        beforeEach(() => {
          userAddressAction = {
            type: "create",
            address: {
              name: "Erik Example",
              phoneNumber: "1234567890",
              addressLine1: "401 Broadway",
              addressLine2: "",
              city: "New York",
              region: "NY",
              country: "US",
              postalCode: "10013",
            },
          }
        })

        it("returns a list with a single error object if the mutation fails", async () => {
          const { result } = setupHook()
          const { executeUserAddressAction } = result.current

          const request = executeUserAddressAction(userAddressAction)

          const graphqlError = new Error("mutation failed")
          mockRelayEnv.mock.rejectMostRecentOperation(graphqlError)

          const response = await request
          expect(response.errors).toEqual([graphqlError])
        })

        it("returns a list of errors if gravity returns an error type and sets correct field errors", async () => {
          const { result } = setupHook()
          const { executeUserAddressAction } = result.current

          const request = executeUserAddressAction(userAddressAction)
          const error = {
            message: "Validation failed for phone: not a valid phone number",
          }

          await resolveMostRecentOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "Errors",
                errors: [error],
              },
            }),
          })

          let response = await request

          expect(response.errors).toEqual([
            {
              message: "Validation failed for phone: not a valid phone number",
            },
          ])
        })
      })
    })
  })
})
