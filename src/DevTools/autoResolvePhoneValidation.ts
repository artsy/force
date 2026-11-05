import type { OperationDescriptor } from "relay-runtime"
import { type MockEnvironment, MockPayloadGenerator } from "relay-test-utils"

const PHONE_VALIDATION_QUERY = "utilsValidatePhoneNumberQuery"

/**
 * Auto-resolves the async phone-number validation query
 * (`utilsValidatePhoneNumberQuery`) on a mock Relay environment.
 *
 * Phone validation runs through `useRelayEnvironment()`, so in tests its query
 * lands on the same mock environment as the component under test. Left
 * unresolved it stalls Formik validation (and therefore form submission). Call
 * this once after rendering so validation resolves deterministically to valid
 * — without hitting the network or mocking `Components/Address/utils`.
 *
 * Other operations (mutations, refetches) fall through untouched and remain
 * pending for manual resolution via `mockResolveLastOperation`.
 */
export const autoResolvePhoneValidation = (env: MockEnvironment): void => {
  const makeResolver = () => (operation: OperationDescriptor) => {
    if (operation.request.node.operation.name !== PHONE_VALIDATION_QUERY) {
      // Returning null leaves the resolver queued and the operation pending,
      // so non-phone operations are still resolved manually.
      return null
    }

    // Re-queue a fresh resolver so later phone-validation queries (e.g. a
    // re-validation on submit) are also handled.
    env.mock.queueOperationResolver(makeResolver())

    return MockPayloadGenerator.generate(operation, {
      // The field resolves to the `PhoneNumberType` GraphQL type; keying on
      // anything else silently falls back to a default mock value for `isValid`.
      PhoneNumberType: () => ({ isValid: true }),
    })
  }

  env.mock.queueOperationResolver(makeResolver())
}
