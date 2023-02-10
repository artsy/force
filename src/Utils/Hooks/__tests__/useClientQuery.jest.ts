import { renderHook } from "@testing-library/react-hooks"
import { graphql } from "react-relay"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { useClientQuery } from "Utils/Hooks/useClientQuery"

jest.unmock("react-relay")

const TEST_QUERY = graphql`
  query useClientQueryTestQuery {
    artwork(id: "example") {
      id
    }
  }
`

describe("useClientQuery", () => {
  it("executes the query, updating the loading state", async () => {
    const environment = createMockEnvironment()

    const { result, waitForNextUpdate } = renderHook(() =>
      useClientQuery({ environment, query: TEST_QUERY })
    )

    environment.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, {
        Artwork: () => ({ id: "example" }),
      })
    })

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.data).toEqual({ artwork: { id: "example" } })
    expect(result.current.loading).toBe(false)
  })

  it('skips the query if "skip" is true', () => {
    const { result } = renderHook(() =>
      useClientQuery({ query: TEST_QUERY, skip: true })
    )

    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
  })
})
