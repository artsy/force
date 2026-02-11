import { WorkflowEngine } from "Utils/WorkflowEngine"
import { DateTime } from "luxon"
import { useEffect, useRef, useState } from "react"
import type { Context } from "./Hooks/useInquiryContext"
import { InquiryAccount } from "./Views/InquiryAccount"
import { InquiryArtistsInCollection } from "./Views/InquiryArtistsInCollection"
import { InquiryBasicInfoQueryRenderer } from "./Views/InquiryBasicInfo"
import { InquiryInquiryQueryRenderer } from "./Views/InquiryInquiry"
import { InquirySpecialist } from "./Views/InquirySpecialist"
import { Visited } from "./Visited"

const VIEWS = {
  Account: InquiryAccount,
  BasicInfo: InquiryBasicInfoQueryRenderer,
  Inquiry: InquiryInquiryQueryRenderer,
  Specialist: InquirySpecialist,
  ArtistsInCollection: InquiryArtistsInCollection,
}

export const SKIPPABLE_VIEWS: View[] = ["BasicInfo", "ArtistsInCollection"]

export type View = keyof typeof VIEWS

interface UseEngine {
  context: React.RefObject<Context>
  onDone(): void
}

export const useEngine = ({ context, onDone }: UseEngine) => {
  const visited = useRef(new Visited("inquiry"))

  const conditions = {
    askSpecialist: () => {
      return !!context.current?.askSpecialist
    },
    hasBasicInfo: () => {
      return !!context.current?.profession && !!context.current?.location?.city
    },
    isLoggedOut: () => {
      return !context.current?.isLoggedIn
    },
    hasArtistsInCollection: () => {
      return (context.current?.userInterestsConnection?.totalCount ?? 0) > 0
    },
    wasRecentlyPromptedForCollection: () => {
      const lastUpdatePromptAt =
        context.current?.collectorProfile?.lastUpdatePromptAt

      if (!lastUpdatePromptAt) {
        return false
      }

      const lastPromptDate = DateTime.fromISO(lastUpdatePromptAt)
      const now = DateTime.now()
      const daysSincePrompt = now.diff(lastPromptDate, "days").days

      return daysSincePrompt < 7
    },
  }

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
                hasArtistsInCollection: {
                  false: [
                    {
                      wasRecentlyPromptedForCollection: {
                        false: ["ArtistsInCollection"],
                      },
                    },
                  ],
                  true: [
                    {
                      hasBasicInfo: {
                        false: ["BasicInfo"],
                      },
                    },
                  ],
                },
              },
              "Confirmation",
            ],
          },
        },
      ],
      conditions,
    }),
  )

  const [current, setCurrent] = useState(engine.current.current())

  const View = VIEWS[current as View]

  // Log each step as it updates
  useEffect(() => {
    visited.current.log(current)
  }, [current])

  const next = () => {
    // At the end; closes the modal
    if (engine.current.isEnd()) {
      onDone()
      return
    }

    const nextView = engine.current.next()

    if (nextView === "Confirmation") {
      onDone()
      return
    }

    setCurrent(nextView)
  }

  return {
    current,
    engine: engine.current,
    next,
    View,
    visited: visited.current,
  }
}
