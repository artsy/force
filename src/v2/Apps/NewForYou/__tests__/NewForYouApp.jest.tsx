import { MockBoot } from "v2/DevTools"
import { render, screen } from "@testing-library/react"
import { NewForYouApp } from "../NewForYouApp"
import { SystemContextProvider } from "v2/System"
import { NewForYouApp_artworks } from "v2/__generated__/NewForYouApp_artworks.graphql"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    router: {
      replace: jest.fn(),
    },
  }),
}))

describe("NewForYouApp", () => {
  it("renders", () => {
    render(
      <MockBoot breakpoint="lg">
        <SystemContextProvider>
          <NewForYouApp
            artworks={
              [
                { title: "Test Title", internalID: "test-artwork-slug" },
              ] as NewForYouApp_artworks[]
            }
          />
        </SystemContextProvider>
      </MockBoot>
    )
    expect(screen.getByText("New Works For You")).toBeInTheDocument()
  })
})
