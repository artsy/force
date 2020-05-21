import { SystemContextProvider } from "v2/Artsy"
import { FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { Artists } from "v2/Components/Publishing/Fixtures/Components"
import { wrapperWithContext } from "v2/Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import { ArtistToolTip, TitleDate } from "../ArtistToolTip"

describe("ArtistToolTip", () => {
  const getWrapper = (props, context = {}) => {
    return mount(
      wrapperWithContext(
        {
          ...context,
          tooltipsData: {
            artists: [props.artist],
          },
        },
        {
          tooltipsData: PropTypes.object,
          onOpenAuthModal: PropTypes.func,
          user: PropTypes.object,
        },
        <SystemContextProvider user={(context as any).user}>
          <ArtistToolTip {...props} />
        </SystemContextProvider>
      )
    )
  }

  let testProps
  beforeEach(() => {
    testProps = {
      tracking: { trackEvent: jest.fn() },
      artist: Artists[0].artist,
    }
  })

  it("Renders artist data", () => {
    const component = getWrapper(testProps)

    expect(component.text()).toMatch(testProps.artist.name)
    expect(component.text()).toMatch(
      testProps.artist.formatted_nationality_and_birthday
    )
    expect(component.text()).toMatch(
      "Nick Mauss makes drawings, prints, and paintings that often"
    )
    expect(component.html()).toMatch(
      "https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeYGNRMFqIirK-962fSOAsw%2Flarge.jpg"
    )
    expect(component.find("img").length).toBe(2)
  })

  it("Renders genes if no bio present", () => {
    delete testProps.artist.blurb
    const component = getWrapper(testProps)

    expect(component.text()).toMatch(
      "United States, Abstract Art, 21st Century"
    )
  })

  it("Tracks clicks to artist page", () => {
    const component = getWrapper(testProps)
    component
      .find(TitleDate)
      .at(0)
      .simulate("click")

    expect(testProps.tracking.trackEvent).toBeCalledWith({
      action: "Click",
      contextModule: "intext tooltip",
      destination_path: "/artist/nick-mauss",
      flow: "tooltip",
      type: "artist stub",
    })
  })

  describe("Open Auth Modal", () => {
    it("callback gets called when followButton is clicked", () => {
      const artist = Artists[0].artist
      const context = {
        onOpenAuthModal: jest.fn(),
        user: null,
      }
      const component = getWrapper({ artist }, context)
      component.find(FollowArtistButton).simulate("click")

      expect(context.onOpenAuthModal).toBeCalledWith("signup", {
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "nick-mauss",
        },
        contextModule: "intextTooltip",
        copy: "Sign up to follow artists",
        intent: "followArtist",
      })
    })
  })
})
