import { useEffect, useRef, useState } from "react"
import { Engine } from "./Engine"
import { Context } from "./Hooks/useInquiryContext"
import { Visited } from "./Visited"
import { InquiryAccount } from "./views/InquiryAccount"
import { InquiryArtistsInCollection } from "./views/InquiryArtistsInCollection"
import { InquiryAuctionHousesYouWorkWith } from "./views/InquiryAuctionHousesYouWorkWith"
import { InquiryBasicInfoQueryRenderer } from "./views/InquiryBasicInfo"
import { InquiryCommercialInterest } from "./views/InquiryCommercialInterest"
import { InquiryConfirmation } from "./views/InquiryConfirmation"
import { InquiryDone } from "./views/InquiryDone"
import { InquiryFairsYouAttend } from "./views/InquiryFairsYouAttend"
import { InquiryGalleriesYouWorkWith } from "./views/InquiryGalleriesYouWorkWith"
import { InquiryInquiryQueryRenderer } from "./views/InquiryInquiry"
import { InquiryInstitutionalAffiliations } from "./views/InquiryInstitutionalAffiliations"
import { InquirySpecialist } from "./views/InquirySpecialist"

const VIEWS = {
  Account: InquiryAccount,
  ArtistsInCollection: InquiryArtistsInCollection,
  AuctionHousesYouWorkWith: InquiryAuctionHousesYouWorkWith,
  BasicInfo: InquiryBasicInfoQueryRenderer,
  CommercialInterest: InquiryCommercialInterest,
  Confirmation: InquiryConfirmation,
  Done: InquiryDone,
  FairsYouAttend: InquiryFairsYouAttend,
  GalleriesYouWorkWith: InquiryGalleriesYouWorkWith,
  Inquiry: InquiryInquiryQueryRenderer,
  InstitutionalAffiliations: InquiryInstitutionalAffiliations,
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
    new Engine({
      workflow: [
        {
          askSpecialist: {
            true: [
              "Specialist",
              {
                isLoggedOut: {
                  true: ["Account"],
                },
              },
            ],
            false: [
              "Inquiry",
              {
                isLoggedOut: {
                  true: ["Account"], // Enforces a logged in user
                },
              },
              {
                hasCompletedProfile: {
                  false: ["Confirmation"],
                },
              },
              {
                hasSeenCommercialInterest: {
                  false: ["CommercialInterest"],
                },
              },
              {
                hasBasicInfo: {
                  false: ["BasicInfo"],
                },
              },
              {
                isCollector: {
                  true: [
                    {
                      hasSeenArtistsInCollection: {
                        false: ["ArtistsInCollection"],
                      },
                    },
                    {
                      hasSeenGalleriesYouWorkWith: {
                        false: ["GalleriesYouWorkWith"],
                      },
                    },
                    {
                      hasSeenAuctionHousesYouWorkWith: {
                        false: ["AuctionHousesYouWorkWith"],
                      },
                    },
                    {
                      hasSeenFairsYouAttend: {
                        false: ["FairsYouAttend"],
                      },
                    },
                    {
                      hasSeenInstitutionalAffiliations: {
                        false: ["InstitutionalAffiliations"],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          hasSeenConfirmationThisSession: {
            true: ["Done"],
            false: ["Confirmation"],
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
            !!context.current?.phone &&
            !!context.current?.shareFollows
          )
        },
        hasCompletedProfile: () => {
          const hasBasicInfo =
            !!context.current?.profession &&
            !!context.current?.location?.city &&
            !!context.current?.phone &&
            !!context.current?.shareFollows

          const isCollector = (context.current?.collectorLevel ?? 0) >= 3

          return hasBasicInfo && isCollector
            ? // If you're a collector then you should have seen all of these
              // before "completing" your profile
              visited.current.hasSeen(
                "CommercialInterest",
                "ArtistsInCollection",
                "GalleriesYouWorkWith",
                "AuctionHousesYouWorkWith",
                "FairsYouAttend",
                "InstitutionalAffiliations"
              )
            : // If you've never bought art then you only saw this step
              visited.current.hasSeen("CommercialInterest")
        },
        hasSeenArtistsInCollection: () => {
          return visited.current.hasSeen("ArtistsInCollection")
        },
        hasSeenAuctionHousesYouWorkWith: () => {
          return visited.current.hasSeen("AuctionHousesYouWorkWith")
        },
        hasSeenCommercialInterest: () => {
          return visited.current.hasSeen("CommercialInterest")
        },
        hasSeenConfirmationThisSession: () => {
          return visited.current.hasSeenThisSession("Confirmation")
        },
        hasSeenFairsYouAttend: () => {
          return visited.current.hasSeen("FairsYouAttend")
        },
        hasSeenGalleriesYouWorkWith: () => {
          return visited.current.hasSeen("GalleriesYouWorkWith")
        },
        hasSeenInstitutionalAffiliations: () => {
          return visited.current.hasSeen("InstitutionalAffiliations")
        },
        isCollector: () => {
          return (context.current?.collectorLevel ?? 0) >= 3
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
