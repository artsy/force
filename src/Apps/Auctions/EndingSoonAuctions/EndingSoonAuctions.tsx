import { ContextModule } from "@artsy/cohesion"
import { Clickable, Message, Spacer, Text } from "@artsy/palette"
import { EndingSoonAuctionsGridPaginationContainer } from "Apps/Auctions/Routes/EndingSoonAuctionsGrid"
import { useAuthDialog } from "Components/AuthDialog"
import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/SystemContext"
import { EndingSoonAuctions_viewer$data } from "__generated__/EndingSoonAuctions_viewer.graphql"

interface EndingSoonAuctionsProps {
  viewer: EndingSoonAuctions_viewer$data
}

const EndingSoonAuctions: React.FC<EndingSoonAuctionsProps> = ({ viewer }) => {
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  const handleClick = () => {
    showAuthDialog({
      mode: "Login",
      options: {
        title: mode => {
          const action = mode === "Login" ? "Log in" : "Sign up"
          return `${action} to see your personalized recommendations`
        },
      },
      analytics: {
        contextModule: ContextModule.auctionLotsEndingSoonRail,
      },
    })
  }

  return (
    <>
      <MetaTags title="Auction Lots for You Ending Soon" />

      <Spacer y={4} />

      <Text variant="xl">Auction Lots for You Ending Soon</Text>

      <Spacer y={4} />

      {!isLoggedIn && (
        <>
          <Message variant="warning">
            <Clickable onClick={handleClick} textDecoration="underline">
              Log in
            </Clickable>{" "}
            to see your personalized recommendations.
          </Message>

          <Spacer y={4} />
        </>
      )}

      {viewer && <EndingSoonAuctionsGridPaginationContainer viewer={viewer} />}
    </>
  )
}

export const EndingSoonAuctionsFragmentContainer = createFragmentContainer(
  EndingSoonAuctions,
  {
    viewer: graphql`
      fragment EndingSoonAuctions_viewer on Viewer {
        ...EndingSoonAuctionsGrid_viewer
      }
    `,
  }
)
