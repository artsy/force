import { Environment } from "relay-runtime"
import { createConsignSubmissionMutation } from "../../Mutations"
import {
  createOrUpdateConsignSubmission,
  SubmissionInput,
} from "../createConsignSubmission"

jest.mock("../../Mutations/CreateConsignSubmissionMutation", () => ({
  ...jest.requireActual("../../Mutations/CreateConsignSubmissionMutation"),
  createConsignSubmissionMutation: jest.fn().mockResolvedValue("123"),
}))

describe("createOrUpdateConsignSubmission", () => {
  let submission: SubmissionInput, relayEnvironment

  beforeEach(() => {
    submission = {
      artistID: "artistId",
    }
    relayEnvironment = {} as Environment
    ;(createConsignSubmissionMutation as jest.Mock).mockClear()
  })

  it("creates submission", async () => {
    const result = await createOrUpdateConsignSubmission(
      relayEnvironment,
      submission
    )

    expect(createConsignSubmissionMutation).toHaveBeenCalled()
    expect(createConsignSubmissionMutation).toHaveBeenCalledWith(
      relayEnvironment,
      submission
    )
    expect(result).toEqual("123")
  })

  it.skip("updates submission", async () => {})
})
