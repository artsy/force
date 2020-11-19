import { recordArtworkView } from "lib/components/record_artwork_view"

jest.mock("lib/metaphysics2.coffee", () =>
  jest.fn().mockReturnValue({
    catch: jest.fn(),
  })
)
const metaphysics = require("lib/metaphysics2.coffee") as jest.Mock

describe("Recording an artwork view", () => {
  beforeEach(() => {
    metaphysics.mockClear()
  })

  it("records an artwork view for a user", () => {
    recordArtworkView("artwork_id", { accessToken: "token" })
    expect(metaphysics).toBeCalled()
    metaphysics.mock.calls[0][0].variables.artwork_id.should.equal("artwork_id")
    metaphysics.mock.calls[0][0].query.should.containEql("recordArtworkView")
  })

  it("doesnt record anything with no user", () => {
    recordArtworkView("artwork_id", null)
    expect(metaphysics).not.toBeCalled()
  })
})
