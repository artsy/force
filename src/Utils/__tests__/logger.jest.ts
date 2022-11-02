/* eslint-disable no-console */
import { sendErrorToService } from "Utils/errors"
import createLogger from "Utils/logger"

jest.mock("Utils/errors")
jest.unmock("Utils/logger")

describe("logger", () => {
  describe("#createLogger", () => {
    let logger
    beforeEach(() => {
      console.log = jest.fn()
      console.warn = jest.fn()
      console.error = jest.fn()
      logger = createLogger("testing")
    })

    describe("#log", () => {
      it("logs given statements with console.log", () => {
        logger.log("msg")
        expect(console.log).toBeCalledWith("testing |", "msg", "\n")
      })
    })

    describe("#warn", () => {
      it("logs given warnings with console.warn", () => {
        logger.warn("msg")
        expect(console.warn).toBeCalledWith("testing |", "msg", "\n")
      })
    })

    describe("#error", () => {
      describe("when it should not capture errors", () => {
        it("does not send errors to service", () => {
          logger.error(new Error("msg"))
          expect(sendErrorToService).not.toHaveBeenCalled()
        })
      })

      describe("when it should capture errors", () => {
        let originalEnv
        beforeAll(() => {
          originalEnv = process.env
          process.env = Object.assign({}, originalEnv, {
            NODE_ENV: "staging",
          })
        })

        afterAll(() => {
          process.env = originalEnv
          ;(sendErrorToService as any).mockReset()
        })

        it("sends errors to service", () => {
          const err = new Error("msg")
          logger.error(err)
          expect(sendErrorToService).toHaveBeenCalledWith(err)
        })

        it("sends extended error content to service", () => {
          const err = new Error("msg")
          const extendedErr = {
            ...err,
            customField: "customField",
            shouldLogErrorToSentry: true,
          }

          logger.error(extendedErr)
          expect(sendErrorToService).toHaveBeenCalledWith(extendedErr)
        })
      })

      it("logs given errors with console.error", () => {
        const err = new Error("msg")
        logger.error(err)
        expect(console.error).toBeCalledWith("testing |", err, "\n")
      })
    })
  })
})
