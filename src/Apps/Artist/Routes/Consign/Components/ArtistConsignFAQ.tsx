import { Box, Text, Spacer, GridColumns, Column } from "@artsy/palette"
import { ArtistConsignFAQ_artist$data } from "__generated__/ArtistConsignFAQ_artist.graphql"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"
import { Masonry } from "Components/Masonry"
import { RouterLink } from "System/Components/RouterLink"

interface ArtistConsignFAQProps {
  artist: ArtistConsignFAQ_artist$data
}

const ArtistConsignFAQ: React.FC<ArtistConsignFAQProps> = props => {
  const tracking = useTracking()

  return (
    <SectionContainer>
      <Subheader>Frequently asked questions</Subheader>

      <Spacer y={4} />

      <GridColumns>
        <Column span={[12, 12, 8]} start={[1, 1, 3]}>
          <Masonry columnCount={[1, 2]} gridColumnGap={4}>
            <Question
              question="How do Consignments on Artsy work?"
              answer={
                <>
                  Artsy helps you find the best sales solution for works in your
                  collection. We review the works you’re interested in selling,
                  determine the strength of the secondary market demand, and
                  suggest an appropriate sales strategy. This can involve
                  matching you with the right seller (e.g., an auction house or
                  a gallery), selling qualified works via Artsy’s online
                  marketplace, or selling the work privately through our network
                  of trusted partners and collectors. This service is free, and
                  the nominal, pre-agreed seller’s commission is due only when
                  your work sells. Artsy specialists guide you along the way and
                  help you choose the right sales strategy. To get started,
                  submit works you’re interested in selling{" "}
                  <RouterLink
                    inline
                    data-test="submitOnFAQ"
                    onClick={() => {
                      tracking.trackEvent({
                        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                        context_module:
                          DeprecatedAnalyticsSchema.ContextModule.FAQ,
                        subject:
                          DeprecatedAnalyticsSchema.Subject
                            .SubmitWorksInterestedInSelling,
                      })
                    }}
                    to={getConsignSubmissionUrl({
                      contextPath: props.artist.href || "",
                      subject: DeprecatedAnalyticsSchema.Subject.Here,
                    })}
                  >
                    here
                  </RouterLink>
                  .
                </>
              }
            />

            <Question
              question="What happens once I submit a work to Artsy Consignments?"
              answer={
                <>
                  If your work is approved by our specialists, you will receive
                  an email notification within 7 business days. Approved works
                  will be shared with our network of partners for them to review
                  and propose offers, which takes 1–2 weeks from approval. Artsy
                  will notify you of any offers, guide you in choosing the best
                  selling option, and help you finalize a consignment agreement
                  and logistics.
                </>
              }
            />

            <Question
              question="Where can I see my work on Artsy?"
              answer={
                <>
                  By submitting your consignment, you do not automatically list
                  your artwork on Artsy. With Artsy Consignments, you have
                  multiple options for selling your work, which include
                  consigning via Artsy’s trusted network of auction and gallery
                  partners, listing your work on the Artsy marketplace, or
                  selling the work privately. Once your work is approved, Artsy
                  specialists will walk you through your best options.
                </>
              }
            />

            <Question
              question="Which auction houses and galleries are in Artsy’s consignment partner network?"
              answer={
                <>
                  Artsy partners with international auction houses, including
                  Phillips, Bonhams, Piasa, Heritage, Forum, and Tate Ward, as
                  well as leading art galleries such as Gagosian, Alan Cristea,
                  Mitchell-Innes & Nash, and Stern Pissarro.
                </>
              }
            />

            <Question
              question="I’m an artist. Can I submit my own work to consign?"
              answer={
                <>
                  At this time, Artsy Consignments is only able to accommodate
                  works by artists with an established demand and a resale
                  market consistent with our partners’ current interests and
                  needs. As such, we do not accept submissions from artists of
                  their own work.
                </>
              }
            />

            <Question
              question="How can I edit my submission?"
              answer={
                <>
                  If you wish to edit your submission or update missing
                  information, please email us at{" "}
                  <RouterLink inline to="mailto:sell@artsty.net">
                    sell@artsty.net
                  </RouterLink>{" "}
                  with your submission ID number, and we will update the
                  submission on your behalf.
                </>
              }
            />

            <Question
              question="Need more assistance?"
              answer={
                <>
                  Contact us at{" "}
                  <RouterLink inline to="mailto:sell@artsty.net">
                    sell@artsty.net
                  </RouterLink>
                  .
                </>
              }
            />
          </Masonry>
        </Column>
      </GridColumns>
    </SectionContainer>
  )
}

export const ArtistConsignFAQFragmentContainer = createFragmentContainer(
  ArtistConsignFAQ,
  {
    artist: graphql`
      fragment ArtistConsignFAQ_artist on Artist {
        href
      }
    `,
  }
)

const Question: React.FC<{ question: string; answer: JSX.Element }> = ({
  question,
  answer,
}) => {
  return (
    <Box
      mb={4}
      textAlign="left"
      style={{
        breakInside: "avoid",
      }}
    >
      <Text variant="sm" fontWeight="bold">
        {question}
      </Text>

      <Text variant="sm">{answer}</Text>
    </Box>
  )
}
