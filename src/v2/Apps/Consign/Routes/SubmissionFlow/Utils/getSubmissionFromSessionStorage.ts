import createLogger from "v2/Utils/logger"

const logger = createLogger("getSubmissionFromSessionStorage.ts")

export const getSubmissionFromSessionStorage = (id: string) => {
  const submissionData = sessionStorage.getItem(`submission-${id}`)
  let submission

  try {
    submission = submissionData && JSON.parse(submissionData)
  } catch (error) {
    logger.error(error)
  }

  return submission
}
