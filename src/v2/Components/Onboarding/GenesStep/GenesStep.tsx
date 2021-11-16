import { useState } from "react"
import * as React from "react"
import { throttle } from "lodash"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import Colors from "../../../Assets/Colors"
import Input from "../../Input"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import { Layout } from "../Steps/Layout"
import { GeneSearchResults } from "./GeneSearchResults"
import { SuggestedGenes } from "./SuggestedGenes"
import { useTracking } from "v2/System/Analytics/useTracking"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"

const OnboardingSearchBox = styled.div`
  width: 450px;
  margin: 0 auto 100px;
  border-bottom: 1px solid ${Colors.grayRegular};
  ${media.sm`
    width: 100%;
    margin-bottom: 20px;
  `};
`

interface Props {
  router
}

export const GenesStep: React.FC<Props> = props => {
  const { router } = props
  const tracking = useTracking()
  const [followCount, setFollowCount] = useState(0)
  const [inputTextQuery, setInputTextQuery] = useState("")
  const throttledTextChange = throttle(setInputTextQuery, 500, {
    leading: true,
  })

  const handleGeneFollow = (follow, gene) => {
    setFollowCount(previousCount =>
      follow ? previousCount + 1 : previousCount - 1
    )

    const event = {
      action_type: follow ? ActionType.followedGene : ActionType.unfollowedGene,
      context_module: ContextModule.onboardingGenes,
      context_owner_type: OwnerType.onboarding,
      owner_id: gene.internalID,
      owner_slug: gene.slug,
      owner_type: OwnerType.gene,
    }

    tracking.trackEvent(event)
  }

  const handleNoResults = () => {
    const event = {
      action_type: ActionType.searchedWithNoResults,
      context_module: ContextModule.onboardingGenes,
      context_owner_type: OwnerType.onboarding,
      query: inputTextQuery,
    }

    tracking.trackEvent(event)
  }

  const handleSearchTextChange = e => {
    const updatedInputText = e.target.value
    throttledTextChange(updatedInputText)
  }

  const handleNextButtonPress = () => {
    router.push("/personalize/budget")
  }

  const buttonState =
    followCount > 0 ? MultiButtonState.Highlighted : MultiButtonState.Default

  const showGeneResults = inputTextQuery.length > 0

  return (
    <>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ProgressIndicator percentComplete={0.5} />
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <Layout
        buttonState={buttonState}
        onNextButtonPressed={handleNextButtonPress}
        subtitle="Follow one or more"
        title="What categories most interest you?"
      >
        <OnboardingSearchBox>
          <Input
            autoFocus
            block
            onCut={handleSearchTextChange}
            onInput={handleSearchTextChange}
            onPaste={handleSearchTextChange}
            placeholder={"Search categories..."}
          />
          <div style={{ marginBottom: "35px" }} />
          {showGeneResults ? (
            <GeneSearchResults
              onGeneFollow={handleGeneFollow}
              onNoResults={handleNoResults}
              term={inputTextQuery}
            />
          ) : (
            <SuggestedGenes onGeneFollow={handleGeneFollow} />
          )}
        </OnboardingSearchBox>
      </Layout>
    </>
  )
}
