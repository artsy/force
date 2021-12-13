import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalType } from "v2/Components/Authentication/Types"
import { mockLocation } from "v2/DevTools/mockLocation"
import {
  AuthModalOptions,
  openAuthModal,
  openAuthToFollowSaveCreate,
} from "../openAuthModal"

const artistArgs: AuthModalOptions = {
  contextModule: ContextModule.artistHeader,
  entity: {
    name: "Andy Warhol",
    slug: "andy-warhol",
  },
  intent: Intent.followArtist,
}

const partnerArgs: AuthModalOptions = {
  contextModule: ContextModule.aboutTheWork,
  entity: {
    name: "David Zwirner",
    slug: "david-zwirner",
  },
  intent: Intent.followPartner,
}

const artworkArgs: AuthModalOptions = {
  contextModule: ContextModule.artworkGrid,
  entity: {
    name: "Skull",
    slug: "andy-warhol-skull",
  },
  intent: Intent.saveArtwork,
}

describe("openAuth Helpers", () => {
  let mediator

  beforeEach(() => {
    mediator = {
      ready: () => {
        return true
      },
      trigger: jest.fn(),
    }
    mockLocation({ href: "http://localhost/" })
  })

  describe("#openAuthModal", () => {
    it("calls the mediator with expected args", () => {
      openAuthModal(mediator, {
        contextModule: ContextModule.header,
        copy: "Sign up to do cool stuff",
        intent: Intent.signup,
        mode: ModalType.signup,
      })

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "header",
        copy: "Sign up to do cool stuff",
        intent: "signup",
        mode: "signup",
      })
    })
  })

  describe("#openAuthToFollowSaveCreateAlert", () => {
    describe("desktop", () => {
      it("transforms args for following artists", () => {
        openAuthToFollowSaveCreate(mediator, artistArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "follow",
            kind: "artist",
            objectId: "andy-warhol",
          },
          contextModule: "artistHeader",
          copy: "Sign up to follow Andy Warhol",
          intent: "followArtist",
          mode: "signup",
        })
      })

      it("transforms args for following partners", () => {
        openAuthToFollowSaveCreate(mediator, partnerArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "follow",
            kind: "profile",
            objectId: "david-zwirner",
          },
          contextModule: "aboutTheWork",
          copy: "Sign up to follow David Zwirner",
          intent: "followPartner",
          mode: "signup",
        })
      })

      it("transforms args for saving artworks", () => {
        openAuthToFollowSaveCreate(mediator, artworkArgs)

        expect(mediator.trigger).toBeCalledWith("open:auth", {
          afterSignUpAction: {
            action: "save",
            kind: "artworks",
            objectId: "andy-warhol-skull",
          },
          contextModule: "artworkGrid",
          copy: "Sign up to save artworks",
          intent: "saveArtwork",
          mode: "signup",
        })
      })
    })
  })
})
