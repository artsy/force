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
      // @ts-expect-error STRICT_NULL_CHECK
      mount(<MockRelayRenderer Component={null} query={null} />)
    }).toThrowError('jest.unmock("react-relay")')
  })
})
