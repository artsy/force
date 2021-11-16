import { mount } from "enzyme"
import { MockRelayRenderer } from "../MockRelayRenderer"

describe("MockRelayRenderer", () => {
  const consoleError = console.error

  beforeAll(() => {
    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = consoleError
  })

  it("throws when react-relay is mocked", () => {
    expect(() => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      mount(<MockRelayRenderer Component={null} query={null} />)
    }).toThrowError('jest.unmock("react-relay")')
  })
})
