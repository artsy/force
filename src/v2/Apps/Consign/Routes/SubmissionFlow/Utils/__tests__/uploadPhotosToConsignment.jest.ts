import { Environment } from "relay-runtime"
import {
  addAssetToConsignment,
  createGeminiAssetWithS3Credentials,
} from "../../Mutations"
import { uploadPhotosToConsignment } from "../uploadPhotosToConsignment"
import { UploadPhotosFormModel } from "../../UploadPhotos/Components/UploadPhotosForm"

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

describe("uploadPhotosToConsignment", () => {
  let uploadPhotosForm: UploadPhotosFormModel = {
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
  }

  let relayEnvironment

  beforeEach(() => {
    relayEnvironment = {} as Environment
    ;(createGeminiAssetWithS3Credentials as jest.Mock).mockClear()
    ;(addAssetToConsignment as jest.Mock).mockClear()
  })

  describe("returns false if", () => {
    it("uploadPhotosForm has no image", async () => {
      const result = await uploadPhotosToConsignment(relayEnvironment, {
        photos: [],
      })

      expect(result).toBe(false)
    })
  })

  it("creates Gemini assets with the images", async () => {
    await uploadPhotosToConsignment(
      relayEnvironment,
      uploadPhotosForm,
      "123",
      "sessionId"
    )
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
  })

  it("adds images to the consignment", async () => {
    await uploadPhotosToConsignment(
      relayEnvironment,
      uploadPhotosForm,
      "123",
      "sessionId"
    )

    expect(addAssetToConsignment).toHaveBeenCalledTimes(1)
    expect(addAssetToConsignment).toHaveBeenCalledWith(relayEnvironment, {
      assetType: "image",
      geminiToken: "geminiToken",
      submissionID: "123",
      sessionID: "sessionId",
    })
  })
})
