import { AuthIntent, ContextModule } from "@artsy/cohesion"
import { Button, Flex, FullBleed, Spacer } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtistNotEligiblText } from "Apps/Sell/Components/ArtistNotEligibleText"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useAuthDialog } from "Components/AuthDialog"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ArtistNotEligibleRoute_artist$key } from "__generated__/ArtistNotEligibleRoute_artist.graphql"
import * as React from "react"
import { graphql, useFragment } from "react-relay"

const FRAGMENT = graphql`
  fragment ArtistNotEligibleRoute_artist on Artist {
    ...EntityHeaderArtist_artist
  }
`
interface ArtistNotEligibleRouteProps {
  artist: ArtistNotEligibleRoute_artist$key
}

export const ArtistNotEligibleRoute: React.FC<ArtistNotEligibleRouteProps> = props => {
  const artist = useFragment(FRAGMENT, props.artist)
  const { showAuthDialog } = useAuthDialog()
  const { router } = useRouter()
  const { isLoggedIn } = useSystemContext()

  const triggerAuthDialog = () => {
    showAuthDialog({
      mode: "SignUp",
      options: {
        title: mode =>
          mode === "Login"
            ? "Log in to add to My Collection"
            : "Sign up to add to My Collection",
        redirectTo: "/collector-profile/my-collection/artworks/new",
      },
      analytics: {
        contextModule: ContextModule.sell,
        // TODO: This should be `Intent.addToMyCollection`
        intent: "addToMyCollection" as AuthIntent,
        trigger: "click",
      },
    })
  }

  const onAddToMyCollection = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      return triggerAuthDialog()
    }

    router.push("/collector-profile/my-collection/artworks/new")
  }

  return (
    <FullBleed>
      <AppContainer>
        <SubmissionLayout hideNavigation>
          <SubmissionStepTitle>
            This artist isn’t currently eligible to sell on our platform
          </SubmissionStepTitle>

          {!!artist && (
            <EntityHeaderArtistFragmentContainer
              artist={artist}
              displayFollowButton={false}
            />
          )}

          <ArtistNotEligiblText />

          <Spacer y={4} />

          <Flex flexDirection="column" justifyContent="space-between" pb={2}>
            <Button
              // @ts-ignore
              as={RouterLink}
              to="/collector-profile/my-collection/artworks/new"
              data-testid="add-to-collection"
              onClick={onAddToMyCollection}
            >
              Add to My Collection
            </Button>

            <Spacer y={2} />

            <Button
              // @ts-ignore
              as={RouterLink}
              to="/sell/submissions/new"
              variant="secondaryBlack"
              data-testid="view-collection"
            >
              Add Another Artist
            </Button>
          </Flex>
        </SubmissionLayout>
      </AppContainer>
    </FullBleed>
  )
}
