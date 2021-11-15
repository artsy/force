import { useState } from "react"
import * as React from "react"
import { throttle } from "lodash"
import styled from "styled-components"
import { ProgressIndicator } from "v2/Components/ProgressIndicator"
import Colors from "../../../Assets/Colors"
import Input from "../../Input"
import { Spacer } from "@artsy/palette"
import { MultiButtonState } from "../../Buttons/MultiStateButton"
import { media } from "../../Helpers"
import { Layout } from "../Steps/Layout"
import { ArtistSearchResults } from "./ArtistSearchResults"
import { PopularArtists } from "./PopularArtists"
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

export const ArtistsStep: React.FC<Props> = props => {
  const { router } = props
  const tracking = useTracking()
  const [followCount, setFollowCount] = useState(0)
  const [inputTextQuery, setInputTextQuery] = useState("")
  const throttledTextChange = throttle(setInputTextQuery, 500, {
    leading: true,
  })

  const handleArtistFollow = (follow, artist) => {
    setFollowCount(previousCount =>
      follow ? previousCount + 1 : previousCount - 1
    )

    const event = {
      action_type: follow
        ? ActionType.followedArtist
        : ActionType.unfollowedArtist,
      context_module: ContextModule.onboardingArtists,
      context_owner_type: OwnerType.onboarding,
      owner_id: artist.internalID,
      owner_slug: artist.slug,
      owner_type: OwnerType.artist,
    }

    tracking.trackEvent(event)
  }

  const handleNoResults = () => {
    const event = {
      action_type: ActionType.searchedWithNoResults,
      context_module: ContextModule.onboardingArtists,
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
    router.push("/personalize/categories")
  }

  const buttonState =
    followCount > 0 ? MultiButtonState.Highlighted : MultiButtonState.Default

  const showSearchResults = inputTextQuery.length > 0

  return (
    <>
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <ProgressIndicator percentComplete={0.25} />
      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
      <Layout
        buttonState={buttonState}
        onNextButtonPressed={handleNextButtonPress}
        subtitle="Follow one or more"
        title="Who are your favorite artists?"
      >
        <OnboardingSearchBox>
          <Input
            autoFocus
            block
            onCut={handleSearchTextChange}
            onInput={handleSearchTextChange}
            onPaste={handleSearchTextChange}
            placeholder="Search artists..."
          />
          <Spacer my={2} />
          {showSearchResults ? (
            <ArtistSearchResults
              onArtistFollow={handleArtistFollow}
              onNoResults={handleNoResults}
              term={inputTextQuery}
            />
          ) : (
            <PopularArtists onArtistFollow={handleArtistFollow} />
          )}
        </OnboardingSearchBox>
      </Layout>
    </>
  )
}
