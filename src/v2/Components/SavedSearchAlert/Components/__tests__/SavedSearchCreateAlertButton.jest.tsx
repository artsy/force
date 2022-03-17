import { render, screen, fireEvent } from "@testing-library/react"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "v2/System/Analytics/useTracking"
import {
  openAuthToSatisfyIntent,
  AuthModalOptions,
} from "v2/Utils/openAuthModal"
import {
  SavedSearchCreateAlertButton,
  SavedSearchCreateAlertButtonProps,
} from "../SavedSearchCreateAlertButton"
import { mediator } from "lib/mediator"
import { SavedSearchEntity } from "../../types"
import { OwnerType } from "@artsy/cohesion"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Utils/openAuthModal")

const savedSearchEntity: SavedSearchEntity = {
  placeholder: "test-artist-name",
  artists: [
    {
      id: "test-artist-id",
      name: "test-artist-name",
      slug: "example-slug",
    },
  ],
  analytics: {
    ownerType: OwnerType.artist,
    ownerId: "test-artist-id",
    ownerSlug: "example-slug",
  },
}

const getAuthModalOptions = () => {
  return {
    entity: {
      name: "test-artist-name",
      slug: "example-slug",
    },
    afterSignUpAction: {
      action: "createAlert",
      kind: "artist",
      objectId: "example-slug",
    },
    contextModule: "artworkGrid",
    intent: "createAlert",
    redirectTo: "http://localhost/",
  } as AuthModalOptions
}

describe("SavedSearchCreateAlertButton", () => {
  const mockOpenAuthToSatisfyIntent = openAuthToSatisfyIntent as jest.Mock

  const renderButton = () => {
    render(
      <CreateAlertButtonTest
        entity={savedSearchEntity}
        criteria={{}}
        getAuthModalOptions={getAuthModalOptions}
      />
    )
  }

  const CreateAlertButtonTest = (props: SavedSearchCreateAlertButtonProps) => {
    return <SavedSearchCreateAlertButton {...props} />
  }

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

      expect(mockOpenAuthToSatisfyIntent).toHaveBeenCalledWith(mediator, {
        entity: {
          name: "test-artist-name",
          slug: "example-slug",
        },
        afterSignUpAction: {
          action: "createAlert",
          kind: "artist",
          objectId: "example-slug",
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
