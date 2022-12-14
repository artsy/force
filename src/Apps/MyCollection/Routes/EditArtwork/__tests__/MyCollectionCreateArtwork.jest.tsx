import { fireEvent, render, screen } from "@testing-library/react"
import { MyCollectionCreateArtwork } from "Apps/MyCollection/Routes/EditArtwork/MyCollectionCreateArtwork"
import { flushPromiseQueue, MockBoot } from "DevTools"
import { Breakpoint } from "Utils/Responsive"

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    router: {
      push: mockRouterPush,
      replace: mockRouterReplace,
    },
  })),
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

jest.mock("Components/PhotoUpload/Utils/fileUtils", () => ({
  ...jest.requireActual("Components/PhotoUpload/Utils/fileUtils"),
  uploadMyCollectionPhoto: jest.fn(),
}))
jest.mock("react-tracking")
jest.unmock("react-relay")

describe("MyCollectionCreateArtwork", () => {
  const getWrapper = (breakpoint: Breakpoint = "lg") => {
    render(
      <MockBoot breakpoint={breakpoint}>
        <MyCollectionCreateArtwork />
      </MockBoot>
    )
  }

  describe("Initial render", () => {
    it("doesn't populate inputs", async () => {
      getWrapper()

      await flushPromiseQueue()

      expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
      expect(screen.getByTestId("save-button")).toBeDisabled()

      expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()

      expect(screen.getByPlaceholderText("Enter full name")).toHaveValue("")
    })
  })

  describe("Back Link behavior", () => {
    describe("when the form is dirty", () => {
      it("opens modal before navigating to the previous screen", async () => {
        getWrapper()

        fireEvent.change(
          screen.getByTestId("my-collection-artwork-details-title"),
          {
            target: { value: "Some new value" },
          }
        )

        fireEvent.click(screen.getByText("Back"))
        fireEvent.click(screen.getByText("Leave Without Saving"))

        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: "/settings/my-collection",
        })
      })
    })

    describe("when the form is not dirty", () => {
      it("navigates to the previous screen", async () => {
        getWrapper()

        fireEvent.click(screen.getByText("Back"))

        expect(mockRouterPush).toHaveBeenCalledWith({
          pathname: "/settings/my-collection",
        })
      })
    })
  })
})
