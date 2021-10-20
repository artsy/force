import { mount } from "enzyme"
import { MockBoot } from "v2/DevTools"
import { Breakpoint } from "@artsy/palette"
import { ReadMore } from "../ReadMore"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")

describe("ReadMore", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const getWrapper = (breakpoint = "lg") => {
    return mount(
      <MockBoot breakpoint={breakpoint as Breakpoint}>
        <ReadMore />
      </MockBoot>
    )
  }

  it("tracks clicks on articles", () => {
    const wrapper = getWrapper()
    const articles = wrapper.find("Article")
    articles.forEach(article => {
      expect(article.props().href).toBeDefined()
      article.simulate("click")
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedArticleGroup",
          context_module: "relatedArticles",
          context_page_owner_type: "consign",
          destination_page_owner_id: expect.any(String),
          destination_page_owner_slug: expect.any(String),
          destination_page_owner_type: "article",
          type: "thumbnail",
        })
      )
    })
  })
})
