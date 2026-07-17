import { ImageSearchAppFragmentContainer as ImageSearchApp } from "Apps/ImageSearch/ImageSearchApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import type { ImageSearchAppTestQuery } from "__generated__/ImageSearchAppTestQuery.graphql"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "/image-search",
        query: { s3Key: "some-key", s3Bucket: "some-bucket" },
      },
    },
    router: { push: jest.fn() },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL<ImageSearchAppTestQuery>({
  Component: props => {
    return (
      <MockBoot breakpoint="lg">
        <SystemContextProvider>
          <ImageSearchApp viewer={props.viewer!} />
        </SystemContextProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query ImageSearchAppTestQuery @relay_test_operation {
      viewer {
        ...ImageSearchApp_viewer
          @arguments(first: 30, s3Key: "some-key", s3Bucket: "some-bucket")
      }
    }
  `,
})

describe("ImageSearchApp", () => {
  it("renders the image results heading", () => {
    renderWithRelay({
      ArtworkConnection: () => ({ totalCount: 10 }),
    })

    expect(screen.getByText("Visual Search")).toBeInTheDocument()
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument()
  })

  it("renders the empty state when there are no results", () => {
    renderWithRelay({
      ArtworkConnection: () => ({ totalCount: 0 }),
    })

    expect(screen.getByText("No results found.")).toBeInTheDocument()
  })
})
