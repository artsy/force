import * as React from "react"
import {
  AuctionIcon,
  Button,
  EditIcon,
  EnvelopeIcon,
  Text,
  Spacer,
  GridColumns,
  Column,
} from "@artsy/palette"
import { ArtistConsignHowToSell_artist } from "v2/__generated__/ArtistConsignHowToSell_artist.graphql"
import { AnalyticsSchema, useTracking } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"

interface ArtistConsignHowtoSellProps {
  artist: ArtistConsignHowToSell_artist
}

const ArtistConsignHowtoSell: React.FC<ArtistConsignHowtoSellProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  return (
    <SectionContainer height="100%" bg="black10" textAlign="center">
      <Subheader>How to sell your collection with Artsy</Subheader>

      <Spacer my={2} />

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
          icon={<AuctionIcon width={30} height={30} />}
          text="Match &amp; sell"
          description="With our specialists’ expert guidance and advisement, evaluate
            your offers, choose the best offer for you and sell your work."
        />
      </GridColumns>

      <Spacer mt={4} />

      <Button
        // @ts-ignore
        as={RouterLink}
        to={getConsignSubmissionUrl({
          contextPath: artist.href!,
          subject: AnalyticsSchema.Subject.RequestPriceEstimate,
        })}
        onClick={() => {
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            context_module:
              AnalyticsSchema.ContextModule.HowToSellYourCollection,
            flow: AnalyticsSchema.Flow.Consignments,
            subject: AnalyticsSchema.Subject.RequestPriceEstimate,
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
