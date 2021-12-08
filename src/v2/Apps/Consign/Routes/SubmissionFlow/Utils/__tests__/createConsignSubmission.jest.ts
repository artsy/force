import { ActionType } from "@artsy/cohesion"
import { trackEvent } from "lib/analytics/helpers"
import { Environment } from "relay-runtime"
import { createConsignSubmissionMutation } from "../../Mutations"
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

const file = new File([new Array(10000).join(" ")], "foo.png", {
  type: "image/png",
})

describe("createConsignSubmission", () => {
  let submission: SubmissionModel, relayEnvironment

  beforeEach(() => {
    submission = {
      artworkDetailsForm: {
        artistId: "artistId",
        height: "height",
        rarity: "rarity",
        title: "title",
        units: "units",
        width: "width",
        year: "year",
        materials: "materials",
        artistName: "",
        editionNumber: "",
        editionSize: "",
        depth: "",
        provenance: "provenance",
        // location: "location",
        // locationId: "locationID",
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
      contactInformationForm: {
        name: "name",
        email: "test@test.test",
        phone: {
          isValid: true,
          international: "+1 415-555-0132",
          national: "(415) 555-0132",
          regionCode: "us",
        },
      },
    }
    relayEnvironment = {} as Environment
    ;(createConsignSubmissionMutation as jest.Mock).mockClear()
  })

  describe("returns undefined if", () => {
    it("submition empty", async () => {
      const result = await createConsignSubmission(
        relayEnvironment,
        (null as unknown) as SubmissionModel
      )

      expect(result).toBeUndefined()
    })

    it("uploadPhotosForm empty", async () => {
      const result = await createConsignSubmission(
        relayEnvironment,
        {} as SubmissionModel
      )

      expect(result).toBeUndefined()
    })
  })

  it("creates submission if logged-in", async () => {
    const result = await createConsignSubmission(
      relayEnvironment,
      submission,
      "userId",
      undefined
    )
    const input = {
      artistID: "artistId",
      year: "year",
      title: "title",
      medium: "materials",
      attributionClass: "RARITY",
      editionNumber: "",
      editionSizeFormatted: "",
      height: "height",
      width: "width",
      depth: "",
      dimensionsMetric: "units",
      state: "SUBMITTED",
      userEmail: "test@test.test",
      userName: "name",
      userPhone: "+1 415-555-0132",
      provenance: "provenance",
      // locationCity: "location",
      sessionID: undefined,
    }

    expect(createConsignSubmissionMutation).toHaveBeenCalled()
    expect(createConsignSubmissionMutation).toHaveBeenCalledWith(
      relayEnvironment,
      input
    )
    expect(result).toEqual("123")
  })

  it("creates submission if not logged-in", async () => {
    const result = await createConsignSubmission(
      relayEnvironment,
      submission,
      undefined,
      "sessionId"
    )
    const input = {
      artistID: "artistId",
      year: "year",
      title: "title",
      medium: "materials",
      attributionClass: "RARITY",
      editionNumber: "",
      editionSizeFormatted: "",
      height: "height",
      width: "width",
      depth: "",
      dimensionsMetric: "units",
      state: "SUBMITTED",
      userEmail: "test@test.test",
      userName: "name",
      userPhone: "+1 415-555-0132",
      provenance: "provenance",
      // locationCity: "location",
      sessionID: "sessionId",
    }

    expect(createConsignSubmissionMutation).toHaveBeenCalled()
    expect(createConsignSubmissionMutation).toHaveBeenCalledWith(
      relayEnvironment,
      input
    )
    expect(result).toEqual("123")
  })

  it("tracks consignment submitted event", async () => {
    await createConsignSubmission(relayEnvironment, submission)

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: ActionType.consignmentSubmitted,
      submission_id: "123",
      user_id: undefined,
      user_email: "test@test.test",
    })
  })
})
