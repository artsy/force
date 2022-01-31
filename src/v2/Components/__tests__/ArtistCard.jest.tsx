import { ContextModule } from "@artsy/cohesion"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import { set } from "lodash/fp"
import { Breakpoint } from "v2/Utils/Responsive"
import { ArtistCard, ArtistCardProps } from "../ArtistCard"
import { SystemContextProvider } from "v2/System"

describe("ArtistCard", () => {
  let props: ArtistCardProps
  let mediator
  const getWrapper = (breakpoint, passedProps: ArtistCardProps = props) => {
    return mount(
      <MockBoot breakpoint={breakpoint}>
        <SystemContextProvider mediator={mediator}>
          <ArtistCard {...passedProps} />
        </SystemContextProvider>
      </MockBoot>
    )
  }

  beforeEach(() => {
    mediator = {
      ready: () => true,
      trigger: jest.fn(),
    }
    props = {
      contextModule: ContextModule.artistsToFollowRail,
      artist: {
        image: {
          cropped: {
            src: "https://picsum.photos/110/110/?random",
            srcSet: "https://picsum.photos/110/110/?random 1x",
          },
        },
        href: "/artist/francesca-dimattio",
        name: "Francesca DiMattio",
        formatted_nationality_and_birthday: "American, b. 1979",
        slug: "percy",
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        " $fragmentRefs": null,
        " $refType": null,
      },
    }
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.matchMedia = undefined // Immediately set matching media query in MockBoot
  })

  it("hides avatar if no image is provided", () => {
    ;["xs" as Breakpoint, "lg" as Breakpoint].forEach(breakpoint => {
      const updatedProps: any = set("artist.image", undefined, props)

      const wrapper = getWrapper(breakpoint, updatedProps)

      expect(wrapper.find("Avatar").length).toEqual(0)
    })
  })

  it("opens auth modal with expected args when following an artist", () => {
    const wrapper = getWrapper("lg")
    wrapper.find(FollowArtistButton).find("button").simulate("click")
    expect(mediator.trigger).toBeCalledWith("open:auth", {
      mode: "signup",
      contextModule: "artistsToFollowRail",
      copy: "Sign up to follow Francesca DiMattio",
      intent: "followArtist",
      afterSignUpAction: {
        action: "follow",
        kind: "artist",
        objectId: "percy",
      },
    })
  })
})
