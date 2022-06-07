import React, { FC } from "react"
import { MetaTags } from "v2/Components/MetaTags"
import { Message, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NewForYouApp_viewer } from "v2/__generated__/NewForYouApp_viewer.graphql"
import { NewForYouArtworksGridRefetchContainer } from "v2/Apps/NewForYou/Components/NewForYouArtworksGrid"
import { Link } from "v2/System/Router"
import { useSystemContext } from "v2/System"

interface NewForYouAppProps {
  viewer: NewForYouApp_viewer
}

export const NewForYouApp: FC<NewForYouAppProps> = ({ viewer }) => {
  const { isLoggedIn } = useSystemContext()

  return (
    <>
      <Spacer mt={2} />
      <MetaTags title="New For You" />
      <Text variant="xl" mt={4}>
        New Works For You
      </Text>
      <Spacer mt={2} />
      {!isLoggedIn && (
        <Message variant="warning">
          <Text>
            Already have an account? <Link to="/login">Log in</Link> to see your
            personalized recommendations.
          </Text>
        </Message>
      )}
      <Spacer mt={2} />
      {viewer && <NewForYouArtworksGridRefetchContainer viewer={viewer} />}
    </>
  )
}

export const NewForYouAppFragmentContainer = createFragmentContainer(
  NewForYouApp,
  {
    viewer: graphql`
      fragment NewForYouApp_viewer on Viewer {
        ...NewForYouArtworksGrid_viewer
      }
    `,
  }
)
