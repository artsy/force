import chalk from "chalk"
import Enzyme from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import "regenerator-runtime/runtime"
import { format } from "util"
import "@testing-library/jest-dom"
import { configure } from "@testing-library/react"

if (
  process.env.CIRCLECI === "true" ||
  process.env.TERSE_RTL_OUTPUT === "true"
) {
  configure({
    // Fixes issue where testing-library react await would time out on CI
    asyncUtilTimeout: 10000,
    // Don't spit out html output on failed tests by default. If needing to see
    // html, use screen.debug(undefined, Infinity)
    getElementError: (message: string) => {
      const error = new Error(message)
      error.name = "TestingLibraryElementError"
      error.stack = null as any
      return error
    },
  })
}

jest.mock("react-tracking")
import _track, { useTracking as _useTracking } from "react-tracking"
const track = _track as jest.Mock<typeof _track>
const useTracking = _useTracking as jest.Mock
track.mockImplementation(() => x => x as any)
useTracking.mockImplementation(() => ({ trackEvent: jest.fn() }))

jest.mock("lodash/debounce", () => jest.fn(e => e))
jest.mock("Utils/logger")
jest.mock("Components/CookieConsentManager/CookieConsentManager", () => ({
  CookieConsentManager: ({ children }) => children,
}))

jest.mock("routes", () => ({
  getAppRoutes: () => [],
}))

/**
 * We want each test to have assertions, otherwise it’s too easy to write async
 * tests that never end up making any, leading to false positives.
 *
 * TODO: Find a way to make this not emit after failing tests.
 *
 * SEE: https://github.com/facebook/jest/issues/2209#issuecomment-458706599
 */
// afterEach(() => expect.hasAssertions())

import "DevTools/renderUntil"
Enzyme.configure({ adapter: new Adapter() })

// Manually run the garbage collector after 30 seconds. Only works if the
// --expose-gc flag is used.
let time = Date.now()
afterEach(() => {
  if (global.gc && Math.floor((Date.now() - time) / 1000) > 30) {
    global.gc()
    time = Date.now()
  }
})

afterAll(() => {
  if (global.gc && Math.floor((Date.now() - time) / 1000) > 30) {
    global.gc()
    time = Date.now()
  }
})

if (typeof window !== "undefined") {
  window.open = jest.fn()
  // Needed for new tests
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.matchMedia = undefined

  window.grecaptcha = {
    ready: jest.fn(cb => cb()),
    execute: jest.fn().mockResolvedValue("recaptcha-token"),
  }
  window.scrollTo = jest.fn()
  HTMLMediaElement.prototype.pause = jest.fn()
  HTMLMediaElement.prototype.play = jest.fn()

  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))

  window.IntersectionObserverEntry = jest.fn()
}

if (process.env.ALLOW_CONSOLE_LOGS !== "true") {
  const originalLoggers = {
    error: console.error,
    warn: console.warn,
  }

  function logToError(type, args, constructorOpt: () => void) {
    const explanation =
      chalk.white(`Test failed due to \`console.${type}(…)\` call.\n`) +
      chalk.gray("(Disable with ALLOW_CONSOLE_LOGS=true env variable.)\n\n")
    if (args[0] instanceof Error) {
      const msg = explanation + chalk.red(args[0].message)
      const err = new Error(msg)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      err.stack = args[0].stack.replace(`Error: ${args[0].message}`, msg)
      return err
    } else {
      const err = new Error(
        explanation + chalk.red(format(args[0], ...args.slice(1)))
      )
      Error.captureStackTrace(err, constructorOpt)
      return err
    }
  }

  beforeEach(() => {
    return new Promise((resolve, reject) => {
      ;["error", "warn"].forEach((type: "error" | "warn") => {
        // Don't spy on loggers that have been modified by the current test.
        // eslint-disable-next-line no-console
        if (console[type] === originalLoggers[type]) {
          const handler = (...args) => {
            // Sometimes jest consumes relay errors. If something weird is going
            // on uncomment this and see if it is outputted.
            // const runtimeErrorStackTrace = args[1]
            // if (runtimeErrorStackTrace && runtimeErrorStackTrace !== "false") {
            //   originalLoggers.error(runtimeErrorStackTrace)
            // }

            if (
              args[0] &&
              args[0].includes &&
              !args[0].includes(
                "Warning: An update to %s inside a test was not wrapped in act"
              ) &&
              !args[0].includes(
                "Warning: RelayResponseNormalizer: Payload did not contain a value for field `id: id`. Check that you are parsing with the same query that was used to fetch the payload."
              ) &&
              !/Warning: Received.+?for a non-boolean attribute/.test(
                args[0]
              ) &&
              // FIXME: Ignore unknown props warnings until we can filter out styled-system props
              !args[0].includes("Warning: React does not recognize the") &&
              // FIXME: Ignore this warning which stems from using refs on RouterLinks
              !args[0].includes(
                "Warning: Function components cannot be given refs."
              ) &&
              !args[0].includes(
                "Warning: componentWillReceiveProps has been renamed"
              ) &&
              !args[0].includes(
                "Warning: componentWillMount has been renamed"
              ) &&
              !args[0].includes(
                "Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering"
              ) &&
              // Relay 13 warning
              !args[0].includes(
                "has missing data and would suspend. When using features such as @defer or @module, use `useFragment` instead of a Relay Container"
              ) &&
              !args[0].includes(
                // Styled-components 5 warning
                "You may see this warning because you've called styled inside another component"
              )
            ) {
              reject(logToError(type, args, handler))
            }
          }

          jest.spyOn(console, type).mockImplementation(handler)
        }
      })
      resolve(null)
    }) // it is important to call this here or every test will timeout
  })
}
