import { SellFlowStep } from "Apps/Sell/SellFlowContext"
import createLogger from "Utils/logger"
import { useEffect, useState } from "react"

const SUBMISSION_ID_KEY = "previousSubmissionID"
const SUBMISSION_STEP_KEY = "previousSubmissionStep"

const logger = createLogger("previousSubmissionUtils")
export const storePreviousSubmission = (
  submissionID: string,
  step: SellFlowStep
) => {
  localStorage.setItem(SUBMISSION_ID_KEY, submissionID)
  localStorage.setItem(SUBMISSION_STEP_KEY, step)
}

export const usePreviousSubmission = () => {
  const [submissionID, setSubmissionID] = useState<string | null>(null)
  const [step, setStep] = useState<SellFlowStep | null>(null)

  const getSubmission = async () => {
    try {
      const id = await localStorage.getItem(SUBMISSION_ID_KEY)
      const step = await localStorage.getItem(SUBMISSION_STEP_KEY)

      setSubmissionID(id as string)
      setStep(step as SellFlowStep)
    } catch (error) {
      logger.error(error)
    }
  }

  useEffect(() => {
    getSubmission()
  }, [])

  return { submissionID, step }
}
