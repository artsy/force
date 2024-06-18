import { Expandable, Join, Spacer, Text } from "@artsy/palette"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { RouterLink } from "System/Components/RouterLink"

export interface FAQProps {
  shouldTrackClickEvent?: boolean
}

export const FAQ: React.FC<FAQProps> = ({ shouldTrackClickEvent }) => {
  const { trackEvent } = useTracking()

  const trackClickedFAQ = (label: string) => {
    if (shouldTrackClickEvent) {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.ClickedFAQ,
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
            <RouterLink inline to="mailto:partners@artsy.net">
              partners@artsy.net
            </RouterLink>
            .
          </p>
          <p>
            If you’re looking for gallery representation, you might be
            interested in reading Artsy Editorial’s{" "}
            <RouterLink
              inline
              to="/article/artsy-editorial-artists-gallery-representation"
              target="_blank"
            >
              Gallery Representation Guide
            </RouterLink>{" "}
            and{" "}
            <RouterLink
              inline
              to="/series/working-artists-guide"
              target="_blank"
            >
              Working Artist’s Guide
            </RouterLink>
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
          <RouterLink inline to="https://partners.artsy.net" target="_blank">
            partners.artsy.net
          </RouterLink>{" "}
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
      <Text mb={4} variant="lg-display" id="jump--faq">
        Frequently Asked Questions
      </Text>
      <Join separator={<Spacer y={4} />}>
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
    <Text variant="sm-display" color="black60" pr={2}>
      {children}
    </Text>
  )
}
