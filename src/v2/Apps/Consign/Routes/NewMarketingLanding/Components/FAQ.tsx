import { Expandable, Join, Spacer, Text } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { ContextModule, OwnerType } from "@artsy/cohesion"

export const FAQ: React.FC = () => {
  const { trackEvent } = useTracking()
  const { match } = useRouter()

  const trackClickedFAQ = (label: string) => {
    if (match?.params?.id) {
      trackEvent({
        action_type: AnalyticsSchema.ActionType.ClickedFAQ,
        context_module: ContextModule.consignSubmissionFlow,
        context_owner_type: OwnerType.consignmentSubmission,
        subject: label,
      })
    }
  }

  const FAQList = [
    {
      label: "What does it cost to sell with Artsy?",
      value: (
        <TextItem>
          There are no upfront fees. When the artwork sells, we charge a nominal
          seller’s commission as a percentage of the sale price. The commission
          is determined based on the total value of works you sell with us. You
          won’t be asked to cover any additional costs, such as shipping,
          insurance, or photography. <br />
        </TextItem>
      ),
    },
    {
      label: "How long does it take to sell with Artsy?",
      value: (
        <TextItem>
          We hold multiple themed auctions per month, which means your artwork
          can be sold at auction within 2–6 weeks. Timing of private sales or
          direct listing on Artsy can vary; chat with one of our specialists to
          learn more.
        </TextItem>
      ),
    },
    {
      label: "I am an artist. Can I sell my art with Artsy?",
      value: (
        <TextItem>
          <p>
            Currently, Artsy does not directly partner with artists outside of
            our approved artists list. Instead, we offer partnerships for
            galleries, museums, and other institutions.
          </p>
          <p>
            If you are represented by a gallery, you can encourage them to
            partner with us by getting in touch at{" "}
            <a href="mailto:partners@artsy.net">partners@artsy.net</a>.
          </p>
          <p>
            If you’re looking for gallery representation, you might be
            interested in reading Artsy Editorial’s Gallery Representation Guide
            and{" "}
            <a href="/series/working-artists-guide" target="_blank">
              Working Artist’s Guide
            </a>
            .
          </p>
        </TextItem>
      ),
    },
    {
      label: "I am a gallerist. How can I partner with Artsy?",
      value: (
        <TextItem>
          Visit{" "}
          <a href="https://partners.artsy.net" target="_blank">
            partners.artsy.net
          </a>{" "}
          to apply to become a gallery partner and learn more about our
          marketplace plans.
        </TextItem>
      ),
    },
    {
      label: "Which items do you accept?",
      value: (
        <TextItem>
          We are currently accepting unique and limited-edition works of art by
          modern, contemporary, and emerging artists who have collector demand
          on Artsy. Our in-house experts cover Post-War and Contemporary Art;
          Prints and Multiples; and Street Art and Photographs.
        </TextItem>
      ),
    },
    {
      label: "How do you price artworks for sale?",
      value: (
        <TextItem>
          To assess a work’s value, our team uses publicly available auction
          results, as well as Artsy’s own database of primary market sales. We
          also take into account market trends (including both an individual
          artist’s market and macro trends in the art market), artwork
          condition, and sales channel, as well as other factors that may impact
          a work’s value, such as medium, provenance, subject matter, or period.
        </TextItem>
      ),
    },
  ]

  return (
    <>
      <Text mb={4} variant="lg" id="jump--faq">
        Frequently Asked Questions
      </Text>
      <Join separator={<Spacer mt={4} />}>
        {FAQList.map(({ label, value }) => (
          <Expandable onFocus={() => trackClickedFAQ(label)} label={label}>
            {value}
          </Expandable>
        ))}
      </Join>
    </>
  )
}

const TextItem: React.FC = ({ children }) => {
  return (
    <Text variant="md" color="black60" pr={2}>
      {children}
    </Text>
  )
}
