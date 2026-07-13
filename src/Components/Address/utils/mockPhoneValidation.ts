import * as Yup from "yup"

/**
 * Factory for `jest.mock("Components/Address/utils", ...)` that swaps the async,
 * debounced, network-backed phone validators for synchronous yup validators.
 *
 * The real validators call `validatePhoneNumber`, which debounces (200ms) and
 * then fires a Relay query against a live SSR environment. In tests that either
 * hangs forever under `jest.useFakeTimers()` (the debounce timer never fires,
 * so Formik's submit-time validation never resolves and no mutation is queued)
 * or silently relies on a real localhost fetch failing under real timers. Any
 * test that submits an address form should opt in:
 *
 *   jest.mock("Components/Address/utils", () =>
 *     require("Components/Address/utils/mockPhoneValidation").mockPhoneValidation(),
 *   )
 */
export const mockPhoneValidation = () => {
  return {
    ...jest.requireActual("Components/Address/utils"),
    validatePhoneNumber: jest.fn().mockResolvedValue(true),
    richPhoneValidators: {
      phoneNumber: Yup.string(),
      phoneNumberCountryCode: Yup.string(),
    },
    richRequiredPhoneValidators: {
      phoneNumber: Yup.string().required("Phone number is required"),
      phoneNumberCountryCode: Yup.string().required(
        "Phone number country code is required",
      ),
    },
  }
}
