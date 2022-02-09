import { render, screen, fireEvent } from "@testing-library/react"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "v2/System/Analytics/useTracking"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { CreateAlertButton } from "../CreateAlertButton"
import { mediator } from "lib/mediator"
import { ArtworkFilterContextProvider } from "v2/Components/ArtworkFilter/ArtworkFilterContext"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Analytics/useTracking")

const savedSearchAttributes: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "test-artist-name",
  slug: "example-slug",
}

describe("CreateAlertButton", () => {
  const renderButton = () => {
    render(
      <CreateAlertButtonTest savedSearchAttributes={savedSearchAttributes} />
    )
  }

  const CreateAlertButtonTest = (
    props: ExtractProps<typeof CreateAlertButton>
  ) => {
    return (
      <ArtworkFilterContextProvider>
        <CreateAlertButton {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const openAuthToSatisfyIntent = jest.spyOn(
    openAuthModal,
    "openAuthToSatisfyIntent"
  )

  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("renders correctly", () => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        isLoggedIn: true,
      }
    })
    renderButton()
    expect(screen.getByText("Create Alert")).toBeInTheDocument()
  })

  describe("when logged in", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: true,
        }
      })
    })

    it("pops up the Create Alert modal when clicked", () => {
      renderButton()
      expect(screen.queryByTestId("CreateAlertModal")).not.toBeInTheDocument()

      const button = screen.getByText("Create Alert")
      fireEvent.click(button)

      expect(screen.getByTestId("CreateAlertModal")).toBeInTheDocument()
    })

    it("tracks event", () => {
      renderButton()
      const button = screen.getByText("Create Alert")
      fireEvent.click(button)
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedCreateAlert",
          context_page_owner_type: "artist",
          context_page_owner_id: "test-artist-id",
          context_page_owner_slug: "example-slug",
        })
      )
    })
  })

  describe("when logged out", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: false,
        }
      })
    })

    it("pops up the auth modal when clicked", () => {
      renderButton()
      const button = screen.getByText("Create Alert")
      fireEvent.click(button)
      expect(openAuthToSatisfyIntent).toHaveBeenCalledWith(mediator, {
        entity: {
          name: "test-artist-name",
          slug: "example-slug",
        },
        contextModule: "artworkGrid",
        intent: "createAlert",
        redirectTo: "http://localhost/",
      })
    })

    it("tracks event", () => {
      renderButton()
      const button = screen.getByText("Create Alert")
      fireEvent.click(button)
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedCreateAlert",
          context_page_owner_type: "artist",
          context_page_owner_id: "test-artist-id",
          context_page_owner_slug: "example-slug",
        })
      )
    })
  })
})
