import { STEPS, SellFlowStep } from "Apps/Sell/SellFlowContext"
import createLogger from "Utils/logger"
import { useEffect, useState } from "react"
import * as Yup from "yup"

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

  const stepSchema = Yup.string().oneOf([...STEPS])
  const idSchema = Yup.string().required()

  const isStepValid = (step: any): step is SellFlowStep | null =>
    stepSchema.isValidSync(step)

  const isIdValid = (id: any): id is string => idSchema.isValidSync(id)

  const getSubmission = async () => {
    try {
      const id = await localStorage.getItem(SUBMISSION_ID_KEY)
      const step = await localStorage.getItem(SUBMISSION_STEP_KEY)

      if (!isIdValid(id) || !isStepValid(step)) {
        logger.error("Invalid submission ID or step in localStorage.")
        return
      }

      setSubmissionID(id)
      setStep(step)
    } catch (error) {
      logger.error(error)
    }
  }

  useEffect(() => {
    getSubmission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { submissionID, step }
}
