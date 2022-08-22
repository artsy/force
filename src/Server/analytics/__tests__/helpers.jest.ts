import { trackEvent } from "../helpers"
import { OwnerType, timeOnPage } from "@artsy/cohesion"
import { GlobalData } from "sharify"

describe("#trackEvent", () => {
  beforeEach(() => {
    window.analytics = {
      page: jest.fn(),
      track: jest.fn(),
    } as any
    window.sd = { APP_URL: "https://artsy.net" } as GlobalData
    console.error = jest.fn()
  })

  it("can construct events with action_type", () => {
    trackEvent({
      action_type: "Time on page",
      category: "15 seconds",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "andy-warhol",
      context_page_owner_type: OwnerType.artist,
    })

    expect(window.analytics?.track).toBeCalledWith(
      "Time on page",
      {
        category: "15 seconds",
        context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
        context_page_owner_slug: "andy-warhol",
        context_page_owner_type: "artist",
      },
      {}
    )
  })

  it("can construct events with action", () => {
    trackEvent(
      timeOnPage({
        contextPageOwnerId: "4d8b92b34eb68a1b2c0003f4",
        contextPageOwnerSlug: "andy-warhol",
        contextPageOwnerType: OwnerType.artist,
      })
    )

    expect(window.analytics?.track).toBeCalledWith(
      "timeOnPage",
      {
        category: "15 seconds",
        context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
        context_page_owner_slug: "andy-warhol",
        context_page_owner_type: "artist",
      },
      {}
    )
  })

  it("fires a pageview when action is 'clicked read more'", () => {
    trackEvent({
      action: "Clicked read more",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "andy-warhol",
      context_page_owner_type: OwnerType.artist,
    })
    expect(window.analytics?.track).not.toBeCalled()
    expect(window.analytics?.page).toBeCalledWith(
      { path: "/" },
      { integrations: { Marketo: false } }
    )
  })

  it("errors with incorrect action definition", () => {
    trackEvent({
      action_name: "Time on page",
      category: "15 seconds",
      context_page_owner_id: "4d8b92b34eb68a1b2c0003f4",
      context_page_owner_slug: "andy-warhol",
      context_page_owner_type: OwnerType.artist,
    })
    expect(console.error).toBeCalledWith(
      'Unknown analytics schema being used: {"action_name":"Time on page","category":"15 seconds","context_page_owner_id":"4d8b92b34eb68a1b2c0003f4","context_page_owner_slug":"andy-warhol","context_page_owner_type":"artist"}'
    )
  })
})
