import { mount } from "enzyme"
import { useTracking } from "react-tracking"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { SellWithArtsy, tests } from "../SellWithArtsy"
import { Link } from "@artsy/palette"

jest.mock("react-tracking")

describe("SellWithArtsy", () => {
  const trackEvent = jest.fn()
  const getWrapper = (breakpoint = "lg") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <SellWithArtsy />
      </MockBoot>
    )
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("links out to submission flow", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Link").props().href).toBe(tests.DOWNLOAD_URL)
  })

  it("tracks clicks on the app download link", () => {
    const wrapper = mount(<SellWithArtsy />)
    const downloadLink = wrapper.find(Link)
    // @ts-expect-error STRICT_NULL_CHECK
    downloadLink.props().onClick({} as any)
    expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "action": "clickedAppDownload",
          "context_module": "sellFooter",
          "context_page_owner_id": undefined,
          "context_page_owner_slug": undefined,
          "context_page_owner_type": "consign",
          "destination_path": "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080",
          "subject": "Download the app",
        },
      ]
    `)
  })
})
