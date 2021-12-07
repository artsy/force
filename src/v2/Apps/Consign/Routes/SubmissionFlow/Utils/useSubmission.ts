import { useEffect, useState } from "react"
import { useRouter } from "v2/System/Router/useRouter"
import createLogger from "v2/Utils/logger"
import { ArtworkDetailsFormModel } from "../ArtworkDetails/Components/ArtworkDetailsForm"
import { ContactInformationFormModel } from "../ContactInformation/Components/ContactInformationForm"
import { UploadPhotosFormModel } from "../UploadPhotos/Components/UploadPhotosForm"
import { getRedirect } from "./redirects"

const logger = createLogger("getSubmissionFromSessionStorage.ts")

export type UtmParams = {
  utmTerm?: string
  utmMedium?: string
  utmSource?: string
}
export interface SubmissionModel {
  id?: string
  artworkDetailsForm: ArtworkDetailsFormModel
  uploadPhotosForm?: UploadPhotosFormModel
  contactInformationForm?: ContactInformationFormModel
  utmParams?: UtmParams
}

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

export const removeSubmission = (id: string) => {
  sessionStorage.removeItem(getSubmissionKey(id))
}

const getSubmissionKey = (id: string) => `submission-${id}`

export const useSubmission = (id: string) => {
  const { router, match } = useRouter()

  const [submission, setSubmission] = useState<SubmissionModel>()

  const save = (submission: SubmissionModel) => {
    setSubmission(submission)
    sessionStorage.setItem(getSubmissionKey(id), JSON.stringify(submission))
  }

  const remove = () => {
    setSubmission(undefined)
    removeSubmission(id)
  }

  useEffect(() => {
    const submission = getSubmission(id)

    setSubmission(submission)

    const redirectTo = getRedirect(router, match, {
      submission: submission,
      submissionId: id,
    })

    if (redirectTo) {
      router.replace(redirectTo)
    }
  }, [id])

  return {
    submissionId: id,
    submission,
    saveSubmission: save,
    removeSubmission: remove,
  }
}
