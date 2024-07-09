import { STEPS, SellFlowStep } from "Apps/Sell/SellFlowContext"
import createLogger from "Utils/logger"
import { useEffect, useState } from "react"
import * as Yup from "yup"

const SUBMISSION_ID_KEY = "previousSubmissionID"
const SUBMISSION_STEP_KEY = "previousSubmissionStep"

const logger = createLogger("previousSubmissionUtils")

const idSchema = Yup.string().required()
const stepSchema = Yup.string().oneOf([...STEPS])

const parseId = (id: any): string => idSchema.validateSync(id)
const parseStep = (step: any): SellFlowStep | null =>
  stepSchema.validateSync(step) as SellFlowStep | null

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
      const id = parseId(await localStorage.getItem(SUBMISSION_ID_KEY))
      const step = parseStep(await localStorage.getItem(SUBMISSION_STEP_KEY))

      if (!id || !step) {
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
  }, [])

  return { submissionID, step }
}
