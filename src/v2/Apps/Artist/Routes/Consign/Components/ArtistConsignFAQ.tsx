import { Box, Sans, Serif, Spacer } from "@artsy/palette"
import { ArtistConsignFAQ_artist } from "v2/__generated__/ArtistConsignFAQ_artist.graphql"
import { AnalyticsSchema, useTracking } from "v2/System"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { getConsignSubmissionUrl } from "./Utils/getConsignSubmissionUrl"
import { Masonry } from "v2/Components/Masonry"

interface ArtistConsignFAQProps {
  artist: ArtistConsignFAQ_artist
}

const ArtistConsignFAQ: React.FC<ArtistConsignFAQProps> = props => {
  const tracking = useTracking()

  return (
    <SectionContainer height="100%" background="white100" pb={0}>
      <Box width="100%" maxWidth={["100%", 900]}>
        <Box textAlign="center">
          <Subheader>Frequently asked questions</Subheader>
        </Box>

        <Spacer my={2} />

        <Masonry columnCount={[1, 2]} gridColumnGap={20} mb={6}>
          <Question
            question="How do Consignments on Artsy work?"
            answer={
              <>
                Artsy helps you find the best sales solution for works in your
                collection. We review the works you’re interested in selling,
                determine the strength of the secondary market demand, and
                suggest an appropriate sales strategy. This can involve matching
                you with the right seller (e.g., an auction house or a gallery),
                selling qualified works via Artsy’s online marketplace, or
                selling the work privately through our network of trusted
                partners and collectors. This service is free, and the nominal,
                pre-agreed seller’s commission is due only when your work sells.
                Artsy specialists guide you along the way and help you choose
                the right sales strategy. To get started, submit works you’re
                interested in selling{" "}
                <a
                  data-test="submitOnFAQ"
                  onClick={() => {
                    tracking.trackEvent({
                      action_type: AnalyticsSchema.ActionType.Click,
                      context_module: AnalyticsSchema.ContextModule.FAQ,
                      subject:
                        AnalyticsSchema.Subject.SubmitWorksInterestedInSelling,
                    })
                  }}
                  href={getConsignSubmissionUrl({
                    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                    contextPath: props.artist.href,
                    subject: AnalyticsSchema.Subject.Here,
                  })}
                >
                  here
                </a>
                .
              </>
            }
          />

          <Question
            question="What happens once I submit a work to Artsy Consignments?"
            answer={
              <>
                If your work is approved by our specialists, you will receive an
                email notification within 7 business days. Approved works will
                be shared with our network of partners for them to review and
                propose offers, which takes 1–2 weeks from approval. Artsy will
                notify you of any offers, guide you in choosing the best selling
                option, and help you finalize a consignment agreement and
                logistics.
              </>
            }
          />

          <Question
            question="Where can I see my work on Artsy?"
            answer={
              <>
                By submitting your consignment, you do not automatically list
                your artwork on Artsy. With Artsy Consignments, you have
                multiple options for selling your work, which include consigning
                via Artsy’s trusted network of auction and gallery partners,
                listing your work on the Artsy marketplace, or selling the work
                privately. Once your work is approved, Artsy specialists will
                walk you through your best options.
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
                works by artists with an established demand and a resale market
                consistent with our partners’ current interests and needs. As
                such, we do not accept submissions from artists of their own
                work.
              </>
            }
          />
          <Question
            question="How can I edit my submission?"
            answer={
              <>
                If you wish to edit your submission or update missing
                information, please email us at{" "}
                <a href="mailto:consign@artsty.net">consign@artsty.net</a> with
                your submission ID number, and we will update the submission on
                your behalf.
              </>
            }
          />
          <Question
            question="Need more assistance?"
            answer={
              <>
                Contact us at{" "}
                <a href="mailto:consign@artsty.net">consign@artsty.net</a>.
              </>
            }
          />
        </Masonry>
      </Box>
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
      width="100%"
      maxWidth={["100%", 440]}
      p={[1, 2]}
      style={{
        breakInside: "avoid",
      }}
    >
      <Box>
        <Sans size="4">{question}</Sans>
      </Box>
      <Box>
        <Serif size="3">{answer}</Serif>
      </Box>
    </Box>
  )
}
