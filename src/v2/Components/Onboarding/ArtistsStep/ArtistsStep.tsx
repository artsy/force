import React, { useState } from "react"
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
  const [followCount, setFollowCount] = useState(0)
  const [inputTextQuery, setInputTextQuery] = useState("")
  const throttledTextChange = throttle(setInputTextQuery, 500, {
    leading: true,
  })

  const handleFollowCountChange = newCount => {
    setFollowCount(newCount)
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
      <ProgressIndicator percentComplete={0.25} />
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
              term={inputTextQuery}
              updateFollowCount={handleFollowCountChange}
            />
          ) : (
            <PopularArtists updateFollowCount={handleFollowCountChange} />
          )}
        </OnboardingSearchBox>
      </Layout>
    </>
  )
}
