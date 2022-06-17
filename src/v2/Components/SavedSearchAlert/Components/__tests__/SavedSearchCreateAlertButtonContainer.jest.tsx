import { render, screen, fireEvent } from "@testing-library/react"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "v2/System/Analytics/useTracking"
import {
  openAuthToSatisfyIntent,
  AuthModalOptions,
} from "v2/Utils/openAuthModal"
import { mediator } from "lib/mediator"
import { SavedSearchEntity } from "../../types"
import { OwnerType } from "@artsy/cohesion"
import { SavedSearchCreateAlertButtonContainer } from "../SavedSearchCreateAlertButtonContainer"
import { Button } from "@artsy/palette"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/openAuthModal")

const savedSearchEntity: SavedSearchEntity = {
  placeholder: "placeholder-label",
  defaultArtists: [
    {
      id: "test-artist-id",
      name: "test-artist-name",
      slug: "example-slug",
    },
  ],
  owner: {
    type: OwnerType.artist,
    id: "owner-id",
    slug: "owner-slug",
    name: "Owner Name",
  },
}

const getAuthModalOptions = () => {
  return {
    entity: {
      name: "Owner Name",
      slug: "owner-slug",
    },
    afterSignUpAction: {
      action: "createAlert",
      kind: "artist",
      objectId: "owner-slug",
    },
    contextModule: "artworkGrid",
    intent: "createAlert",
    redirectTo: "http://localhost/",
  } as AuthModalOptions
}

describe("SavedSearchCreateAlertButtonContainer", () => {
  const mockOpenAuthToSatisfyIntent = openAuthToSatisfyIntent as jest.Mock

  const renderButton = () => {
    render(
      <SavedSearchCreateAlertButtonContainer
        entity={savedSearchEntity}
        criteria={{}}
        getAuthModalOptions={getAuthModalOptions}
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
  })

  afterEach(() => {
    trackEvent.mockReset()
    mockOpenAuthToSatisfyIntent.mockReset()
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
      renderButton()
      const button = screen.getByText("Create Alert")

      fireEvent.click(button)

      expect(mockOpenAuthToSatisfyIntent).toHaveBeenCalledWith(mediator, {
        entity: {
          name: "Owner Name",
          slug: "owner-slug",
        },
        afterSignUpAction: {
          action: "createAlert",
          kind: "artist",
          objectId: "owner-slug",
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
          context_page_owner_id: "owner-id",
          context_page_owner_slug: "owner-slug",
        })
      )
    })
  })
})
