import { getConvectionGeminiKey } from "Components/PhotoUpload/Mutations/getConvectionGeminiKey"
import { getGeminiCredentialsForEnvironment } from "Components/PhotoUpload/Mutations/getGeminiCredentialsForEnvironment"
import { uploadFileToS3 } from "Components/PhotoUpload/Utils/uploadFileToS3"
import { uploadImageToS3 } from "../uploadImageToS3"

jest.mock("Components/PhotoUpload/Mutations/getConvectionGeminiKey", () => ({
  getConvectionGeminiKey: jest.fn(),
}))
jest.mock(
  "Components/PhotoUpload/Mutations/getGeminiCredentialsForEnvironment",
  () => ({ getGeminiCredentialsForEnvironment: jest.fn() }),
)
jest.mock("Components/PhotoUpload/Utils/uploadFileToS3", () => ({
  uploadFileToS3: jest.fn(),
}))

const mockConvectionKey = getConvectionGeminiKey as jest.Mock
const mockCredentials = getGeminiCredentialsForEnvironment as jest.Mock
const mockUpload = uploadFileToS3 as jest.Mock

const relayEnvironment = {} as any
const file = new File(["x"], "art.jpg", { type: "image/jpeg" })

const CREDENTIALS = {
  policyDocument: { conditions: { bucket: "my-bucket" } },
}

describe("uploadImageToS3", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockConvectionKey.mockResolvedValue("gemini")
  })

  it("returns s3Key and s3Bucket on success", async () => {
    mockCredentials.mockResolvedValue(CREDENTIALS)
    mockUpload.mockResolvedValue("gemini/art.jpg")

    const result = await uploadImageToS3(relayEnvironment, file)

    expect(result).toEqual({ s3Key: "gemini/art.jpg", s3Bucket: "my-bucket" })
  })

  it("returns null when credentials are missing", async () => {
    mockCredentials.mockResolvedValue(undefined)

    const result = await uploadImageToS3(relayEnvironment, file)

    expect(result).toBeNull()
    expect(mockUpload).not.toHaveBeenCalled()
  })

  it("returns null when the S3 upload returns no key", async () => {
    mockCredentials.mockResolvedValue(CREDENTIALS)
    mockUpload.mockResolvedValue(undefined)

    const result = await uploadImageToS3(relayEnvironment, file)

    expect(result).toBeNull()
  })
})
