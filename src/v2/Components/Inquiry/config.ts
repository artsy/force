import { useMemo, useState } from "react"
import { useSystemContext } from "v2/System"
import { Engine } from "./Engine"
import { InquiryAccount } from "./views/InquiryAccount"
import { InquiryArtistsInCollection } from "./views/InquiryArtistsInCollection"
import { InquiryAuctionHousesYouWorkWith } from "./views/InquiryAuctionHousesYouWorkWith"
import { InquiryBasicInfoQueryRenderer } from "./views/InquiryBasicInfo"
import { InquiryCommercialInterest } from "./views/InquiryCommercialInterest"
import { InquiryConfirmation } from "./views/InquiryConfirmation"
import { InquiryDone } from "./views/InquiryDone"
import { InquiryFairsYouAttend } from "./views/InquiryFairsYouAttend"
import { InquiryGalleriesYouWorkWith } from "./views/InquiryGalleriesYouWorkWith"
import { InquiryHowCanWeHelp } from "./views/InquiryHowCanWeHelp"
import { InquiryInquiryQueryRenderer } from "./views/InquiryInquiry"
import { InquiryInstitutionalAffiliations } from "./views/InquiryInstitutionalAffiliations"
import { InquirySpecialist } from "./views/InquirySpecialist"

const VIEWS = {
  Account: InquiryAccount, // ✅
  ArtistsInCollection: InquiryArtistsInCollection,
  AuctionHousesYouWorkWith: InquiryAuctionHousesYouWorkWith,
  BasicInfo: InquiryBasicInfoQueryRenderer, // ✅
  CommercialInterest: InquiryCommercialInterest, // ✅
  Confirmation: InquiryConfirmation,
  Done: InquiryDone,
  FairsYouAttend: InquiryFairsYouAttend,
  GalleriesYouWorkWith: InquiryGalleriesYouWorkWith,
  HowCanWeHelp: InquiryHowCanWeHelp,
  Inquiry: InquiryInquiryQueryRenderer, // ✅
  InstitutionalAffiliations: InquiryInstitutionalAffiliations,
  Specialist: InquirySpecialist,
}

type View = keyof typeof VIEWS

export const useEngine = () => {
  const { user, isLoggedIn } = useSystemContext()

  const engine = useMemo(() => {
    return new Engine({
      context: { user, isLoggedIn },
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
        askSpecialist: context => {
          // TODO:
          return false
        },
        hasBasicInfo: context => {
          // TODO:
          return false
        },
        hasCompletedProfile: context => {
          // TODO:
          return false
        },
        hasSeenArtistsInCollection: context => {
          // TODO:
          return false
        },
        hasSeenAuctionHousesYouWorkWith: context => {
          // TODO:
          return false
        },
        hasSeenCommercialInterest: context => {
          // TODO:
          return false
        },
        hasSeenConfirmationThisSession: context => {
          // TODO:
          return false
        },
        hasSeenFairsYouAttend: context => {
          // TODO:
          return false
        },
        hasSeenGalleriesYouWorkWith: context => {
          // TODO:
          return false
        },
        hasSeenInstitutionalAffiliations: context => {
          // TODO:
          return false
        },
        helpBy: context => {
          // TODO:
          return false
        },
        isCollector: context => {
          // TODO:
          return false
        },
        isLoggedIn: context => {
          return !!context.isLoggedIn
        },
        isLoggedOut: context => {
          return !context.isLoggedIn
        },
      },
    })
  }, [isLoggedIn, user])

  const [current, setCurrent] = useState(engine.current())

  const View = VIEWS[current as View]

  const next = () => {
    setCurrent(engine.next())
  }

  return { engine, View, next, current }
}
