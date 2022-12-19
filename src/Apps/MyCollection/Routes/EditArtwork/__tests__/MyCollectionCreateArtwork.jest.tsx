import { fireEvent, render, screen } from "@testing-library/react"
import { MyCollectionCreateArtwork } from "Apps/MyCollection/Routes/EditArtwork/MyCollectionCreateArtwork"
import { flushPromiseQueue, MockBoot } from "DevTools"

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
  const getWrapper = (props: Record<string, any> = {}) => {
    const {
      breakpoint = "lg",
      featureFlags = {
        "cx-my-collection-uploading-flow-steps": { flagEnabled: false },
      },
    } = props

    render(
      <MockBoot breakpoint={breakpoint} context={{ featureFlags }}>
        <MyCollectionCreateArtwork />
      </MockBoot>
    )
  }

  describe("when the new upload flow is enabled", () => {
    describe("Select Artist step", () => {
      describe("back button", () => {
        it("navigates back to the My Collection page", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          fireEvent.click(screen.getByText("Back"))

          expect(mockRouterPush).toHaveBeenCalledWith({
            pathname: "/settings/my-collection",
          })
        })
      })

      describe("skip button", () => {
        it("navigates to the Detail step", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the select artwork step
          fireEvent.click(screen.getByTestId("artist-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        })
      })
    })

    describe("Select Artwork step", () => {
      describe("back button", () => {
        it("navigates back to the select artist step", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the select artwork step
          fireEvent.click(screen.getByText("Next"))

          expect(screen.getByText("Select Artwork")).toBeInTheDocument()

          fireEvent.click(screen.getByText("Back"))

          expect(screen.getByText("Select Artist")).toBeInTheDocument()
        })
      })

      describe("skip button", () => {
        it("navigates to the Detail step", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the select artwork step

          fireEvent.click(screen.getByText("Next"))

          expect(screen.getByText("Select Artwork")).toBeInTheDocument()

          fireEvent.click(screen.getByTestId("artwork-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()
        })
      })
    })

    describe("Detail step", () => {
      describe("back button", () => {
        it("opens modal before navigating to the previous screen", async () => {
          getWrapper({
            featureFlags: {
              "cx-my-collection-uploading-flow-steps": {
                flagEnabled: true,
              },
            },
          })

          // Navigate to the detail step
          fireEvent.click(screen.getByTestId("artist-select-skip-button"))

          expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()

          fireEvent.click(screen.getByText("Back"))

          expect(screen.getByText("Select Artist")).toBeInTheDocument()
        })
      })

      it("doesn't populate inputs", async () => {
        getWrapper({
          featureFlags: {
            "cx-my-collection-uploading-flow-steps": {
              flagEnabled: true,
            },
          },
        })

        // Navigate to the detail step
        fireEvent.click(screen.getByTestId("artist-select-skip-button"))

        expect(screen.getByText("Upload Artwork")).toBeInTheDocument()
        expect(screen.getByTestId("save-button")).toBeDisabled()

        expect(screen.getByText("Add Artwork Details")).toBeInTheDocument()

        expect(screen.getByPlaceholderText("Enter full name")).toHaveValue("")
      })
    })
  })

  describe("when new upload flow is disabled", () => {
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
})
