import { renderHook } from "@testing-library/react-hooks"
import { graphql } from "react-relay"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { useQuery } from "Utils/Hooks/useQuery"

jest.unmock("react-relay")

describe("useQuery", () => {
  it("executes the query, updating the loading state", async () => {
    const environment = createMockEnvironment()

    const { result, waitForNextUpdate } = renderHook(() =>
      useQuery({
        environment,
        query: graphql`
          query useQueryTestQuery {
            artwork(id: "example") {
              id
            }
          }
        `,
      })
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
})
