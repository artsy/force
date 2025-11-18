import { waitFor } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { graphql } from "react-relay"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"

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

    const { result } = renderHook(() =>
      useClientQuery({ environment, query: TEST_QUERY }),
    )

    // Check loading state before resolving the operation
    expect(result.current.loading).toBe(true)

    environment.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, {
        Artwork: () => ({ id: "example" }),
      })
    })

    await waitFor(() => {
      expect(result.current.data).toEqual({ artwork: { id: "example" } })
      expect(result.current.loading).toBe(false)
    })
  })

  it('skips the query if "skip" is true', () => {
    const { result } = renderHook(() =>
      useClientQuery({ query: TEST_QUERY, skip: true }),
    )

    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  describe("refetch", () => {
    it("returns an object with promise and disposable", async () => {
      const environment = createMockEnvironment()

      const { result } = renderHook(() =>
        useClientQuery({ environment, query: TEST_QUERY }),
      )

      environment.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {
          Artwork: () => ({ id: "example" }),
        })
      })

      await waitFor(() => {
        expect(result.current.data).toEqual({ artwork: { id: "example" } })
      })

      const { promise, disposable } = result.current.refetch({ id: "example2" })

      // Verify disposable has dispose method
      expect(disposable).toBeDefined()
      expect(typeof disposable.dispose).toBe("function")

      environment.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {
          Artwork: () => ({ id: "example2" }),
        })
      })

      // Promise resolves to the data
      const data = await promise

      expect(data).toEqual({ artwork: { id: "example2" } })
    })

    it("disposable can cancel in-flight requests", async () => {
      const environment = createMockEnvironment()

      const { result } = renderHook(() =>
        useClientQuery({ environment, query: TEST_QUERY }),
      )

      environment.mock.resolveMostRecentOperation(operation => {
        return MockPayloadGenerator.generate(operation, {
          Artwork: () => ({ id: "example" }),
        })
      })

      await waitFor(() => {
        expect(result.current.data).toEqual({ artwork: { id: "example" } })
      })

      // Start a refetch
      const { disposable } = result.current.refetch({ id: "example2" })

      // Cancel it immediately
      disposable.dispose()

      // Should not throw
      expect(() => disposable.dispose()).not.toThrow()
    })
  })
})
