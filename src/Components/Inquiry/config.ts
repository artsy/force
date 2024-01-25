import { useEffect, useRef, useState } from "react"
import { WorkflowEngine } from "Utils/WorkflowEngine"
import { Context } from "./Hooks/useInquiryContext"
import { Visited } from "./Visited"
import { InquiryAccount } from "./Views/InquiryAccount"
import { InquiryBasicInfoQueryRenderer } from "./Views/InquiryBasicInfo"
import { InquiryInquiryQueryRenderer } from "./Views/InquiryInquiry"
import { InquirySpecialist } from "./Views/InquirySpecialist"
import { InquiryConfirmation } from "./Views/InquiryConfirmation"

const VIEWS = {
  Account: InquiryAccount,
  BasicInfo: InquiryBasicInfoQueryRenderer,
  Confirmation: InquiryConfirmation,
  Inquiry: InquiryInquiryQueryRenderer,
  Specialist: InquirySpecialist,
}

type View = keyof typeof VIEWS

interface UseEngine {
  context: React.RefObject<Context>
  onDone(): void
}

export const useEngine = ({ context, onDone }: UseEngine) => {
  const visited = useRef(new Visited("inquiry"))

  const engine = useRef(
    new WorkflowEngine({
      workflow: [
        {
          askSpecialist: {
            true: ["Specialist"],
            false: [
              "Inquiry",
              {
                isLoggedOut: {
                  true: ["Account"], // Enforces a logged in user
                },
              },
              {
                hasBasicInfo: {
                  false: ["BasicInfo"],
                },
              },
              "Confirmation",
            ],
          },
        },
      ],
      conditions: {
        askSpecialist: () => {
          return !!context.current?.askSpecialist
        },
        hasBasicInfo: () => {
          return (
            !!context.current?.profession &&
            !!context.current?.location?.city &&
            !!context.current?.otherRelevantPositions &&
            !!context.current?.shareFollows
          )
        },
        isLoggedOut: () => {
          return !context.current?.isLoggedIn
        },
      },
    })
  )

  const [current, setCurrent] = useState(engine.current.current())

  const View = VIEWS[current as View]

  // Log each step as it updates
  useEffect(() => {
    visited.current.log(current)
  }, [current, visited])

  const next = () => {
    // At the end; closes the modal
    if (engine.current.isEnd()) {
      onDone()
      return
    }

    setCurrent(engine.current.next())
  }

  return {
    current,
    engine: engine.current,
    next,
    View,
    visited: visited.current,
  }
}
