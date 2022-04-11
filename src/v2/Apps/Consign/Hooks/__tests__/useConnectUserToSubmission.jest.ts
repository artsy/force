import Cookies from "cookies-js"
import { connectUserToSubmission } from "../useConnectUserToSubmission"
import { waitFor } from "@testing-library/react"

const mockAddUser = jest.fn()

jest.mock("../../Routes/SubmissionFlow/Mutations", () => ({
  ...jest.requireActual("../../Routes/SubmissionFlow/Mutations"),
  useAddUserToSubmission: () => ({
    submitMutation: mockAddUser,
  }),
}))

jest.mock("cookies-js", () => ({
  get: jest.fn(),
  expire: jest.fn(),
}))

const mockUser = {
  id: "123",
  email: "john@doe.com",
}
const mockNonExistentUser = {}

const mockSubmissionId = "12345"
const mockNonExistentSubmissionId = undefined

describe("connectUserToSubmission", () => {
  beforeEach(() => mockAddUser.mockImplementation(() => Promise.resolve()))
  afterEach(() => jest.resetAllMocks())

  it("calls addUser and expires submissionId, when user and submission found", async () => {
    ;(Cookies.get as jest.Mock).mockImplementation(() => mockSubmissionId)

    connectUserToSubmission(mockUser, mockAddUser)

    await waitFor(() => expect(mockAddUser).toHaveBeenCalled())
    expect(Cookies.expire).toHaveBeenCalledWith("submissionId")
  })

  it("calls addUser with correct input", async () => {
    ;(Cookies.get as jest.Mock).mockImplementation(() => mockSubmissionId)

    connectUserToSubmission(mockUser, mockAddUser)

    await waitFor(() => {
      expect(mockAddUser).toHaveBeenCalledWith({
        variables: {
          input: {
            id: mockSubmissionId,
            userEmail: mockUser.email,
          },
        },
      })
    })
  })

  it("does not call addUser, when no submission found", async () => {
    ;(Cookies.get as jest.Mock).mockImplementation(
      () => mockNonExistentSubmissionId
    )

    connectUserToSubmission(mockUser, mockAddUser)

    await waitFor(() => expect(mockAddUser).not.toHaveBeenCalled())
  })

  it("does not call addUser, when submission but no user found", async () => {
    ;(Cookies.get as jest.Mock).mockImplementation(() => mockSubmissionId)

    connectUserToSubmission(mockNonExistentUser, mockAddUser)

    await waitFor(() => expect(mockAddUser).not.toHaveBeenCalled())
  })
})
