import { useEffect, useRef, useState } from "react"
import { Engine } from "./Engine"
import { Context } from "./Hooks/useInquiryContext"
import { Logger } from "./Logger"
import { InquiryAccount } from "./Views/InquiryAccount"
import { InquiryArtistsInCollection } from "./Views/InquiryArtistsInCollection"
import { InquiryAuctionHousesYouWorkWith } from "./Views/InquiryAuctionHousesYouWorkWith"
import { InquiryBasicInfoQueryRenderer } from "./Views/InquiryBasicInfo"
import { InquiryCommercialInterest } from "./Views/InquiryCommercialInterest"
import { InquiryConfirmation } from "./Views/InquiryConfirmation"
import { InquiryDone } from "./Views/InquiryDone"
import { InquiryFairsYouAttend } from "./Views/InquiryFairsYouAttend"
import { InquiryGalleriesYouWorkWith } from "./Views/InquiryGalleriesYouWorkWith"
import { InquiryInquiryQueryRenderer } from "./Views/InquiryInquiry"
import { InquiryInstitutionalAffiliations } from "./Views/InquiryInstitutionalAffiliations"
import { InquirySpecialist } from "./Views/InquirySpecialist"

const VIEWS = {
  Account: InquiryAccount, // ✅
  ArtistsInCollection: InquiryArtistsInCollection, // ✅
  AuctionHousesYouWorkWith: InquiryAuctionHousesYouWorkWith, // ✅
  BasicInfo: InquiryBasicInfoQueryRenderer, // ✅
  CommercialInterest: InquiryCommercialInterest, // ✅
  Confirmation: InquiryConfirmation, // ✅
  Done: InquiryDone, // ✅
  FairsYouAttend: InquiryFairsYouAttend, // ✅
  GalleriesYouWorkWith: InquiryGalleriesYouWorkWith, // ✅
  Inquiry: InquiryInquiryQueryRenderer, // ✅
  InstitutionalAffiliations: InquiryInstitutionalAffiliations, // ✅
  Specialist: InquirySpecialist,
}

type View = keyof typeof VIEWS

interface UseEngine {
  context: React.RefObject<Context>
  onDone(): void
}

export const useEngine = ({ context, onDone }: UseEngine) => {
  const logger = useRef(new Logger("inquiry"))

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
        "Done",
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
          return (
            // Has all the basic info
            !!context.current?.profession &&
              !!context.current.location?.city &&
              !!context.current.phone &&
              !!context.current.shareFollows &&
              // And has logged all the relevant steps
              (context.current.collectorLevel ?? 0) >= 3
              ? // If you're a collector then you should have seen all of these
                // before "completing" your profile
                logger.current.hasLogged(
                  "CommercialInterest",
                  "ArtistsInCollection",
                  "GalleriesYouWorkWith",
                  "AuctionHousesYouWorkWith",
                  "FairsYouAttend",
                  "InstitutionalAffiliations"
                )
              : // If you've never bought art then you only saw this step
                logger.current.hasLogged("CommercialInterest")
          )
        },
        hasSeenArtistsInCollection: () => {
          return logger.current.hasLogged("ArtistsInCollection")
        },
        hasSeenAuctionHousesYouWorkWith: () => {
          return logger.current.hasLogged("AuctionHousesYouWorkWith")
        },
        hasSeenCommercialInterest: () => {
          return logger.current.hasLogged("CommercialInterest")
        },
        hasSeenConfirmationThisSession: () => {
          return logger.current.hasLogged("ConfirmationThisSession")
        },
        hasSeenFairsYouAttend: () => {
          return logger.current.hasLogged("FairsYouAttend")
        },
        hasSeenGalleriesYouWorkWith: () => {
          return logger.current.hasLogged("GalleriesYouWorkWith")
        },
        hasSeenInstitutionalAffiliations: () => {
          return logger.current.hasLogged("InstitutionalAffiliations")
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
    logger.current.log(current)
  }, [current, logger])

  const next = () => {
    // At the end; closes the modal
    if (current === "Done") {
      onDone()
      return
    }

    setCurrent(engine.current.next())
  }

  return {
    current,
    engine: engine.current,
    logger: logger.current,
    next,
    View,
  }
}
