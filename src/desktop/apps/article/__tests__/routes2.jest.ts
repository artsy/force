import { createSailthruClient } from "sailthru-client"
import { subscribedToEditorial } from "../routes"

jest.mock("sailthru-client", () => ({
  createSailthruClient: jest.fn(() => ({
    apiGet: jest.fn(),
    apiPost: jest.fn(),
  })),
}))

let apiGet = jest.fn().mockImplementation((_var, _args, success) => {
  console.log("in get mock")
  success(null, {
    vars: {
      receive_editorial_email: true,
      email_frequency: "daily",
    },
  })
})
const apiPost = jest.fn()

describe("mocks", () => {
  xit("mocks", done => {
    createSailthruClient.mockImplementation(() => ({
      apiGet,
      apiPost,
    }))
    const sailthruMock = createSailthruClient()
    // console.log(sailthru)
    sailthruMock.apiGet({}, {}, jest.fn())
    expect(apiGet).toBeCalled()
    done()
  })
  createSailthruClient.mockImplementation(() => ({
    apiGet,
    apiPost,
  }))
  it("mocks", async () => {
    // const sailthruMock = createSailthruClient()
    // console.log(sailthru)

    const subscribed = await subscribedToEditorial("foo@test.com")
    expect(subscribed).toBeTruthy()
    console.log("apiGet", apiGet.mock.calls)
    expect(apiGet).toBeCalled()
  })
})
