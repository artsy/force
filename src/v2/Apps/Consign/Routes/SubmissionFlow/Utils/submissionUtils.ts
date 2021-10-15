import createLogger from "v2/Utils/logger"
import { ArtworkDetailsFormModel } from "../ArtworkDetails/Components/ArtworkDetailsForm"
import { ContactInformationFormModel } from "../ContactInformation/Components/ContactInformationForm"
import { UploadPhotosFormModel } from "../UploadPhotos/Components/UploadPhotosForm"

const logger = createLogger("getSubmissionFromSessionStorage.ts")

export interface SubmissionModel {
  artworkDetailsForm: ArtworkDetailsFormModel
  uploadPhotosForm?: UploadPhotosFormModel
  contactInformationForm?: ContactInformationFormModel
}

export const getSubmissionKey = (id: string) => `submission-${id}`

export const getSubmission = (id: string): SubmissionModel | undefined => {
  const submissionData = sessionStorage.getItem(getSubmissionKey(id))
  let submission

  try {
    submission = submissionData && JSON.parse(submissionData)
  } catch (error) {
    logger.error(error)
  }

  return submission
}

export const saveSubmission = (id: string, submission: SubmissionModel) => {
  sessionStorage.setItem(getSubmissionKey(id), JSON.stringify(submission))
}

export const removeSubmissionFromStorage = (id: string) =>
  sessionStorage.removeItem(getSubmissionKey(id))
