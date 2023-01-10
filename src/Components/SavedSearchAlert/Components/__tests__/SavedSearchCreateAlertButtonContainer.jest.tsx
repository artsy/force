import { render, screen, fireEvent } from "@testing-library/react"
import { useSystemContext } from "System/useSystemContext"
import { useTracking } from "react-tracking"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { OwnerType } from "@artsy/cohesion"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import { Button } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"

jest.mock("System/useSystemContext")
jest.mock("react-tracking")
jest.mock("Utils/openAuthModal")
jest.mock("Components/AuthDialog/useAuthDialog")

const savedSearchEntity: SavedSearchEntity = {
  placeholder: "placeholder-label",
  defaultCriteria: {
    artistIDs: [
      {
        value: "test-artist-id",
        displayValue: "test-artist-name",
      },
    ],
  },
  owner: {
    type: OwnerType.artist,
    id: "owner-id",
    slug: "owner-slug",
    name: "Owner Name",
  },
}

describe("SavedSearchCreateAlertButtonContainer", () => {
  const mockUseAuthDialog = useAuthDialog as jest.Mock

  const renderButton = () => {
    render(
      <SavedSearchCreateAlertButtonContainer
        entity={savedSearchEntity}
        criteria={{}}
        authModalOptions={{
          entity: {
            name: "Owner Name",
            slug: "owner-slug",
          },
          afterSignUpAction: {
            action: "createAlert",
            kind: "artist",
            objectId: "owner-slug",
          },
          // @ts-ignore
          contextModule: "artworkGrid",
          copy: "Sign up to create an alert",
          // @ts-ignore
          intent: "createAlert",
          redirectTo: "http://localhost/",
        }}
        renderButton={({ onClick }) => (
          <Button onClick={onClick}>Create Alert</Button>
        )}
      />
    )
  }

  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    mockUseAuthDialog.mockImplementation(() => {
      return { showAuthDialog: jest.fn() }
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
    beforeAll(() => {
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
          context_page_owner_id: "owner-id",
          context_page_owner_slug: "owner-slug",
        })
      )
    })
  })

  describe("when logged out", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          isLoggedIn: false,
        }
      })
    })

    it("pops up the auth modal when clicked", () => {
      const showAuthDialog = jest.fn()

      mockUseAuthDialog.mockImplementation(() => {
        return { showAuthDialog }
      })

      renderButton()
      const button = screen.getByText("Create Alert")

      fireEvent.click(button)

      expect(showAuthDialog).toHaveBeenCalledWith({
        current: {
          analytics: {
            contextModule: "artworkGrid",
            intent: "createAlert",
          },
          mode: "SignUp",
          options: {
            afterAuthAction: {
              action: "createAlert",
              kind: "artist",
              objectId: "owner-slug",
            },
            title: "Sign up to create an alert",
          },
        },
        legacy: {
          afterSignUpAction: {
            action: "createAlert",
            kind: "artist",
            objectId: "owner-slug",
          },
          contextModule: "artworkGrid",
          copy: "Sign up to create an alert",
          entity: {
            name: "Owner Name",
            slug: "owner-slug",
          },
          intent: "createAlert",
          mode: "signup",
          redirectTo: "http://localhost/",
        },
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
          context_page_owner_id: "owner-id",
          context_page_owner_slug: "owner-slug",
        })
      )
    })
  })
})
