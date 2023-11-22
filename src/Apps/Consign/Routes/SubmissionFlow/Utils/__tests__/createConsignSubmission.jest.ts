import { Environment } from "react-relay"
import {
  createConsignSubmissionMutation,
  updateConsignSubmissionMutation,
} from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import {
  createOrUpdateConsignSubmission,
  SubmissionInput,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"

jest.mock("../../Mutations/CreateConsignSubmissionMutation", () => ({
  ...jest.requireActual("../../Mutations/CreateConsignSubmissionMutation"),
  createConsignSubmissionMutation: jest.fn().mockResolvedValue("111"),
}))
jest.mock("../../Mutations/UpdateConsignSubmissionMutation", () => ({
  ...jest.requireActual("../../Mutations/UpdateConsignSubmissionMutation"),
  updateConsignSubmissionMutation: jest.fn().mockResolvedValue("222"),
}))
const mockCreateMutation = createConsignSubmissionMutation as jest.Mock
const mockUpdateMutation = updateConsignSubmissionMutation as jest.Mock

describe("createOrUpdateConsignSubmission", () => {
  let submission: SubmissionInput, relayEnvironment: Environment

  beforeAll(() => {
    submission = { artistID: "artistId" }
    jest.clearAllMocks()
  })

  it("creates submission", async () => {
    const result = await createOrUpdateConsignSubmission(
      relayEnvironment,
      submission
    )
    const userAgent = `${navigator.userAgent} Artsy-Web Force`

    expect(mockCreateMutation).toHaveBeenCalled()
    expect(mockCreateMutation).toHaveBeenCalledWith(relayEnvironment, {
      ...submission,
      userAgent: userAgent,
      source: "WEB_INBOUND",
    })
    expect(result).toEqual("111")
  })

  it("updates submission", async () => {
    submission = { artistID: "artistId", id: "123" }

    const result = await updateConsignSubmissionMutation(
      relayEnvironment,
      submission
    )

    expect(mockUpdateMutation).toHaveBeenCalled()
    expect(mockUpdateMutation).toHaveBeenCalledWith(
      relayEnvironment,
      submission
    )
    expect(result).toEqual("222")
  })
})
