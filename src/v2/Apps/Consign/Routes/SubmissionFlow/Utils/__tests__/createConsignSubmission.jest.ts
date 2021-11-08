import { ActionType } from "@artsy/cohesion"
import { trackEvent } from "lib/analytics/helpers"
import { Environment } from "relay-runtime"
import {
  addAssetToConsignment,
  createConsignSubmissionMutation,
  createGeminiAssetWithS3Credentials,
} from "../../Mutations"
import { createConsignSubmission } from "../createConsignSubmission"
import { SubmissionModel } from "../useSubmission"

jest.mock("../../../../../../../lib/analytics/helpers", () => ({
  ...jest.requireActual("../../../../../../../lib/analytics/helpers"),
  trackEvent: jest.fn(),
}))

jest.mock("../../Mutations/CreateConsignSubmissionMutation", () => ({
  ...jest.requireActual("../../Mutations/CreateConsignSubmissionMutation"),
  createConsignSubmissionMutation: jest.fn().mockResolvedValue("123"),
}))

jest.mock("../../Mutations/addAssetToConsignment", () => ({
  ...jest.requireActual("../../Mutations/addAssetToConsignment"),
  addAssetToConsignment: jest.fn(),
}))

jest.mock("../../Mutations/Gemini/getConvectionGeminiKey", () => ({
  ...jest.requireActual("../../Mutations/Gemini/getConvectionGeminiKey"),
  getConvectionGeminiKey: jest.fn().mockResolvedValue("convectionKey"),
}))

jest.mock("../../Mutations/Gemini/createGeminiAssetWithS3Credentials", () => ({
  ...jest.requireActual(
    "../../Mutations/Gemini/createGeminiAssetWithS3Credentials"
  ),
  createGeminiAssetWithS3Credentials: jest
    .fn()
    .mockResolvedValue("geminiToken"),
}))

const file = new File([new Array(10000).join(" ")], "foo.png", {
  type: "image/png",
})

describe("createConsignSubmission", () => {
  let user, submission: SubmissionModel, relayEnvironment

  beforeEach(() => {
    user = {
      id: "1",
      email: "test@test.test",
    }
    submission = {
      artworkDetailsForm: {
        artistId: "artistId",
        height: "height",
        rarity: "rarity",
        title: "title",
        units: "units",
        width: "width",
        year: "year",
        medium: "medium",
        artistName: "",
        editionNumber: "",
        editionSize: "",
        depth: "",
        provenance: "provenance",
      },
      uploadPhotosForm: {
        photos: [
          {
            file: file,
            id: "id",
            name: "foo.png",
            size: file.size,
            removed: false,
            s3Key: "key",
            bucket: "bucket1",
          },
        ],
      },
    }
    relayEnvironment = {} as Environment
    ;(createGeminiAssetWithS3Credentials as jest.Mock).mockClear()
    ;(addAssetToConsignment as jest.Mock).mockClear()
    ;(createConsignSubmissionMutation as jest.Mock).mockClear()
  })

  describe("returns undefined if", () => {
    it("submition empty", async () => {
      const result = await createConsignSubmission(
        relayEnvironment,
        (null as unknown) as SubmissionModel,
        user
      )

      expect(result).toBeUndefined()
    })

    it("uploadPhotosForm empty", async () => {
      const result = await createConsignSubmission(
        relayEnvironment,
        {} as SubmissionModel,
        user
      )

      expect(result).toBeUndefined()
    })
  })

  it("creates submission", async () => {
    const result = await createConsignSubmission(
      relayEnvironment,
      submission,
      user
    )

    const input = {
      artistID: "artistId",
      year: "year",
      title: "title",
      category: "medium",
      attributionClass: "RARITY",
      editionNumber: "",
      editionSizeFormatted: "",
      height: "height",
      width: "width",
      depth: "",
      dimensionsMetric: "units",
      state: "SUBMITTED",
      userEmail: user.email,
      userName: undefined,
      userPhone: undefined,
      provenance: "provenance",
    }

    expect(createConsignSubmissionMutation).toHaveBeenCalled()
    expect(createConsignSubmissionMutation).toHaveBeenCalledWith(
      relayEnvironment,
      input
    )
    expect(result).toEqual("123")
  })

  it("tracks consignment submitted event", async () => {
    await createConsignSubmission(relayEnvironment, submission, user)

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: ActionType.consignmentSubmitted,
      submission_id: "123",
      user_id: "1",
      user_email: "test@test.test",
    })
  })

  it("saves images", async () => {
    await createConsignSubmission(relayEnvironment, submission, user)

    expect(createGeminiAssetWithS3Credentials).toHaveBeenCalledTimes(1)
    expect(createGeminiAssetWithS3Credentials).toHaveBeenCalledWith(
      relayEnvironment,
      {
        sourceKey: "key",
        sourceBucket: "bucket1",
        templateKey: "convectionKey",
        metadata: {
          id: "123",
          _type: "Consignment",
        },
      }
    )
    expect(addAssetToConsignment).toHaveBeenCalledTimes(1)
    expect(addAssetToConsignment).toHaveBeenCalledWith(relayEnvironment, {
      assetType: "image",
      geminiToken: "geminiToken",
      submissionID: "123",
    })
  })
})
