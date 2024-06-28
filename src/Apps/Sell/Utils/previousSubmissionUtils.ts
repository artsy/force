import { SellFlowStep } from "Apps/Sell/SellFlowContext"
import { useEffect, useState } from "react"

export const storePreviousSubmission = (
  submissionID: string,
  step: SellFlowStep
) => {
  localStorage.setItem("previousSubmissionID", submissionID)
  localStorage.setItem("previousSubmissionStep", step)
}

export const usePreviousSubmission = () => {
  const [submissionID, setSubmissionID] = useState<string | null>(null)
  const [step, setStep] = useState<SellFlowStep | null>(null)

  const getSubmission = async () => {
    const id = await localStorage.getItem("submissionID")
    const step = await localStorage.getItem("currentStep")

    setSubmissionID(id as string)
    setStep(step as SellFlowStep)
  }

  useEffect(() => {
    getSubmission()
  }, [])

  return { submissionID, step }
}
