import * as React from "react"
import { Expandable, Join, Spacer, Text } from "@artsy/palette"

export const FAQ: React.FC = () => {
  return (
    <>
      <Text mb={4} variant="xl" id="jump--faq">
        Frequently Asked Questions
      </Text>

      <Join separator={<Spacer mt={4} />}>
        <Expandable label="What does it cost to sell with Artsy?">
          <TextItem>
            We offer no upfront fees. When the artwork sells, we charge a
            nominal seller’s commission as a percentage of the sale price. The
            commission is determined based on the total value of works you sell
            with us. You won’t be asked to cover any additional costs, such as
            shipping, insurance, or photography. <br />
          </TextItem>
        </Expandable>

        <Expandable label="What happens once I submit an artwork?">
          <TextItem>
            Based on our proprietary market data, we will let you know within 48
            hours whether your artwork has sufficient demand within the
            secondary market. If so, your work will be approved. Once approved,
            you will receive an offer from Artsy to include your work in an
            upcoming online auction. The offer will have an estimated artwork
            range and auction details. If you are interested in selling your
            work based on the offer, you can accept it or ask further questions
            to our specialists, who will guide you through the process.
          </TextItem>
        </Expandable>

        <Expandable label="How is selling with Artsy different from consigning with a traditional auction house?">
          <TextItem>
            Unlike a consignment with a traditional auction house, Artsy does
            not require any upfront costs of shipping, insurance, or marketing.
            This means no upfront fees for you. This also allows you to sell
            your work in an online auction faster, as we hold multiple auctions
            a month. In case your work doesn’t find a buyer right away, the
            auction results won’t be published and the work won’t get “burned.”
          </TextItem>
        </Expandable>

        <Expandable label="How long does it take to sell art with Artsy?">
          <TextItem>
            We hold multiple themed auctions per month, which means that your
            artwork can be sold within 2–6 weeks.
          </TextItem>
        </Expandable>

        <Expandable label="I am an artist. Can I sell my art with Artsy?">
          <TextItem>
            <p>
              At this time, Artsy does not partner directly with artists.
              Instead, we offer partnerships for galleries, museums, and other
              institutions. If you work with a gallery, we ask you to get in
              touch with us at{" "}
              <a href="mailto:partners@artsy.net">partners@artsy.net</a>.
              Otherwise, we recommend reaching out to your gallery and asking
              them to join Artsy by visiting{" "}
              <a href="https://partners.artsy.net" target="_blank">
                partners.artsy.net
              </a>
              .
            </p>
            <p>
              Artsy has a{" "}
              <a href="/consign" target="_blank">
                Sell with Artsy program
              </a>{" "}
              in which we currently accept works by artists that are already in
              our database who have a resale market and substantial collector
              demand. To learn more about our Sell with Artsy program, please
              visit our Help Center article on{" "}
              <a
                href="https://support.artsy.net/hc/en-us/articles/1500006366381"
                target="_blank"
              >
                what do we look for works from your collection
              </a>
              ? Please note that not being accepted for our Sell with Artsy
              program is in no way a reflection or judgement of artistic
              ability, potential now or in the future, or commitment to the
              discipline; it is simply a result of the assessment of the
              information that we were given at the time and possible services
              we are able to currently provide.
            </p>
            <p>
              We'd also like to bring to your attention{" "}
              <a href="/series/working-artists-guide" target="_blank">
                The Working Artist’s Guide
              </a>{" "}
              which is a resource for artists put together by our Editorial
              team. We hope it can assist you and that you continue to enjoy
              exploring Artsy.
            </p>
          </TextItem>
        </Expandable>

        <Expandable label="Can I edit my submission?">
          <TextItem>
            To edit your existing submissions or add further details, please
            contact consign@artsy.net with the subject line “Edit my submission”
            and one of our specialists will assist you. In the body of your
            email, please include the submission ID number, which can be found
            in the email receipt you received from Artsy.
          </TextItem>
        </Expandable>

        <Expandable label="How do I contact an Artsy specialist?">
          <TextItem>
            You can contact an Artsy specialist at any time by emailing
            consign@artsy.net.
          </TextItem>
        </Expandable>
      </Join>
    </>
  )
}

const TextItem: React.FC = ({ children }) => {
  return (
    <Text variant="sm" color="black60" pr={2}>
      {children}
    </Text>
  )
}
