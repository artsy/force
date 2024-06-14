import * as React from "react"
import { Button, Text, Spacer, GridColumns, Column } from "@artsy/palette"
import { ArtistConsignHowToSell_artist$data } from "__generated__/ArtistConsignHowToSell_artist.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"
import GavelIcon from "@artsy/icons/GavelIcon"
import EditIcon from "@artsy/icons/EditIcon"
import EnvelopeIcon from "@artsy/icons/EnvelopeIcon"

interface ArtistConsignHowtoSellProps {
  artist: ArtistConsignHowToSell_artist$data
}

const ArtistConsignHowtoSell: React.FC<ArtistConsignHowtoSellProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  return (
    <SectionContainer height="100%" bg="black10" textAlign="center">
      <Subheader>How to sell your collection with Artsy</Subheader>

      <Spacer y={2} />

      <GridColumns>
        <Section
          icon={<EditIcon width={30} height={30} />}
          text="Submit once"
          description="Submit your artwork details and images. Artsy will review and
            approve qualified submissions for consignment."
        />

        <Section
          icon={<EnvelopeIcon width={30} height={30} />}
          text="Receive offers"
          description="If your work is accepted, you’ll receive competitive
            offers from auction houses, galleries, and collectors."
        />

        <Section
          icon={<GavelIcon width={30} height={30} />}
          text="Match &amp; sell"
          description="With our specialists’ expert guidance and advisement, evaluate
            your offers, choose the best offer for you and sell your work."
        />
      </GridColumns>

      <Spacer y={4} />

      <Button
        // @ts-ignore
        as={RouterLink}
        to={getConsignSubmissionUrl({
          contextPath: artist.href!,
          subject: DeprecatedAnalyticsSchema.Subject.RequestPriceEstimate,
        })}
        onClick={() => {
          tracking.trackEvent({
            action_type: DeprecatedAnalyticsSchema.ActionType.Click,
            context_module:
              DeprecatedAnalyticsSchema.ContextModule.HowToSellYourCollection,
            flow: DeprecatedAnalyticsSchema.Flow.Consignments,
            subject: DeprecatedAnalyticsSchema.Subject.RequestPriceEstimate,
          })
        }}
      >
        Request a price estimate
      </Button>
    </SectionContainer>
  )
}

export const ArtistConsignHowtoSellFragmentContainer = createFragmentContainer(
  ArtistConsignHowtoSell,
  {
    artist: graphql`
      fragment ArtistConsignHowToSell_artist on Artist {
        href
      }
    `,
  }
)

const Section: React.FC<{
  icon: React.ReactNode
  text: string
  description: string
}> = ({ icon, text, description }) => {
  return (
    <Column span={4}>
      {icon}

      <Text variant="lg-display" mt={0.5}>
        {text}
      </Text>

      <Text variant="sm" mt={1}>
        {description}
      </Text>
    </Column>
  )
}
