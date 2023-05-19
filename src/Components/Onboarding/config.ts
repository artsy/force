import { useRef, useState } from "react"
import { WorkflowEngine } from "Utils/WorkflowEngine"
import { State } from "./Hooks/useOnboardingContext"

interface UseConfig {
  basis: React.RefObject<State>
  onClose(): void
}

export const useConfig = ({ basis, onClose }: UseConfig) => {
  const workflowEngine = useRef(
    new WorkflowEngine({
      workflow: [
        VIEW_WELCOME,
        VIEW_QUESTION_ONE,
        VIEW_QUESTION_TWO,
        VIEW_QUESTION_THREE,
        {
          [DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN]: {
            [OPTION_ART_QUIZ]: [VIEW_ART_QUIZ],
            [OPTION_TOP_AUCTION_LOTS]: [VIEW_TOP_AUCTION_LOTS],
            [OPTION_A_CURATED_SELECTION_OF_ARTWORKS]: [VIEW_CURATED_ARTWORKS],
            [OPTION_ARTISTS_ON_THE_RISE]: [VIEW_ARTISTS_ON_THE_RISE],
            [OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN]: [
              VIEW_FOLLOW_ARTISTS,
              VIEW_THANK_YOU,
            ],
            [OPTION_FOLLOW_GALLERIES_I_LOVE]: [
              VIEW_FOLLOW_GALLERIES,
              VIEW_THANK_YOU,
            ],
          },
        },
      ],
      conditions: {
        [DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN]: () => {
          return basis.current?.questionThree!
        },
      },
    })
  )

  const [current, setCurrent] = useState(workflowEngine.current.current())

  const next = () => {
    if (workflowEngine.current.isEnd()) {
      onClose()
      return
    }

    setCurrent(workflowEngine.current.next())
  }

  const back = () => {
    if (workflowEngine.current.isStart()) {
      return
    }

    setCurrent(workflowEngine.current.back())
  }

  const reset = () => {
    setCurrent(workflowEngine.current.reset())
  }

  return {
    back,
    current,
    workflowEngine: workflowEngine.current,
    next,
    reset,
  }
}

/* prettier-ignore */ export const OPTION_YES_I_LOVE_COLLECTING_ART = "Yes, I love collecting art"
/* prettier-ignore */ export const OPTION_NO_IM_JUST_STARTING_OUT = "No, I’m just starting out"

/* prettier-ignore */ export const OPTION_DEVELOPING_MY_ART_TASTES = "Developing my art tastes"
/* prettier-ignore */ export const OPTION_KEEP_TRACK_OF_ART = "Keeping track of art I’m interested in"
/* prettier-ignore */ export const OPTION_FINDING_GREAT_INVESTMENTS = "Finding my next great investment"
/* prettier-ignore */ export const OPTION_COLLECTING_ART_THAT_MOVES_ME = "Collecting art that moves me"

/* prettier-ignore */ export const OPTION_TOP_AUCTION_LOTS = "Explore top auction lots"
/* prettier-ignore */ export const OPTION_A_CURATED_SELECTION_OF_ARTWORKS = "Browse a curated collection"
/* prettier-ignore */ export const OPTION_ARTISTS_ON_THE_RISE = "Artists on the rise"
/* prettier-ignore */ export const OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN = "Follow artists you love"
/* prettier-ignore */ export const OPTION_FOLLOW_GALLERIES_I_LOVE = "Galleries I'm interested in"
/* prettier-ignore */ export const OPTION_ART_QUIZ = "Take the art taste quiz"

/* prettier-ignore */ export const VIEW_WELCOME = "VIEW_WELCOME"
/* prettier-ignore */ export const VIEW_QUESTION_ONE = "VIEW_QUESTION_ONE"
/* prettier-ignore */ export const VIEW_QUESTION_TWO = "VIEW_QUESTION_TWO"
/* prettier-ignore */ export const VIEW_QUESTION_THREE = "VIEW_QUESTION_THREE"

/* prettier-ignore */ export const VIEW_FOLLOW_ARTISTS = "VIEW_FOLLOW_ARTISTS"
/* prettier-ignore */ export const VIEW_TOP_AUCTION_LOTS = "VIEW_TOP_AUCTION_LOTS"
/* prettier-ignore */ export const VIEW_CURATED_ARTWORKS = "VIEW_CURATED_ARTWORKS"
/* prettier-ignore */ export const VIEW_ARTISTS_ON_THE_RISE = "VIEW_ARTISTS_ON_THE_RISE"
/* prettier-ignore */ export const VIEW_FOLLOW_GALLERIES = "VIEW_FOLLOW_GALLERIES"
/* prettier-ignore */ export const VIEW_ART_QUIZ = "VIEW_ART_QUIZ"

/* prettier-ignore */ export const VIEW_THANK_YOU = "VIEW_THANK_YOU"

/* prettier-ignore */ export const DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN = "DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN"
