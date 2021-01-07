import React from "react"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import {
  ClickContainer,
  SaveButtonFragmentContainer,
  SaveButtonProps,
} from "../index"
import { graphql } from "react-relay"
import { mediator } from "lib/mediator"
import { mockLocation } from "v2/DevTools/mockLocation"
import { ContextModule } from "@artsy/cohesion"

jest.unmock("react-relay")

class SaveButtonTestPage extends RootTestPage {
  async clickSaveButton() {
    this.find(ClickContainer).first().simulate("click")
    await this.update()
  }
}

describe("Save artwork", () => {
  let defaultData
  let passedProps
  let trackEvent

  beforeEach(() => {
    defaultData = {
      artwork: {
        id: "foo",
        internalID: "abcd1234",
        slug: "andy-warhol-skull",
        is_saved: false,
        title: "Skull",
        " $fragmentRefs": null,
        " $refType": null,
      },
    }
    trackEvent = jest.fn()
    passedProps = {
      contextModule: ContextModule.worksForSaleRail,
      tracking: {
        trackEvent,
      },
    }
    jest.spyOn(mediator, "trigger")
    mockLocation()
  })

  const setupTestEnv = () => {
    return createTestEnv({
      Component: (props: SaveButtonProps) => (
        <SaveButtonFragmentContainer {...props} {...passedProps} />
      ),
      TestPage: SaveButtonTestPage,
      defaultData,
      defaultMutationResults: {
        saveArtwork: {
          artwork: {
            id: "foo",
            internalID: "abcd1234",
            slug: "andy-warhol-skull",
            is_saved: true,
            title: "Skull",
            " $fragmentRefs": null,
            " $refType": null,
          },
        },
      },
      query: graphql`
        query SaveButtonTestQuery {
          artwork(id: "example-artwork-id") {
            ...SaveButton_artwork
          }
        }
      `,
    })
  }

  it("can save an artwork", async () => {
    passedProps.user = { id: "blah" }
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSaveButton()
    expect(mediator.trigger).not.toBeCalled()
    expect(trackEvent).toBeCalledWith({
      action: "Saved Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("can un-save an artwork", async () => {
    passedProps.user = { id: "blah" }
    defaultData.artwork.is_saved = true
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSaveButton()
    expect(mediator.trigger).not.toBeCalled()
    expect(trackEvent).toBeCalledWith({
      action: "Saved Artwork",
      entity_id: "abcd1234",
      entity_slug: "andy-warhol-skull",
    })
  })

  it("opens auth modal with expected args when saving an artwork", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSaveButton()
    expect(mediator.trigger).toBeCalledWith("open:auth", {
      mode: "signup",
      contextModule: "worksForSaleRail",
      copy: "Sign up to save artworks",
      intent: "saveArtwork",
      afterSignUpAction: {
        action: "save",
        kind: "artworks",
        objectId: "andy-warhol-skull",
      },
    })
  })
})
