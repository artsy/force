import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"

export const ContactApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Contact Us | Artsy"
        description="We're here to help. Contact an Artsy team member about Sales, Auctions, Press inquiries, Editorial, Careers, and more."
        pathname="/contact"
      />

      <Spacer y={4} />

      <GridColumns gridRowGap={4}>
        <Column span={4}>
          <Text as="h1" variant="xl">
            Contact Us
          </Text>
        </Column>

        <Column span={4}>
          <Text as="h3" variant="xs">
            General
          </Text>

          <Text variant="sm">
            For general questions and feedback, please visit our Help Center or
            contact{" "}
            <RouterLink inline to="mailto:support@artsy.net">
              support@artsy.net
            </RouterLink>
            .
          </Text>
        </Column>

        <Column span={4}>
          <Text as="h3" variant="xs">
            Advisory Team
          </Text>

          <Text variant="sm">
            For questions about bidding on artworks in auctions through Artsy,
            contact{" "}
            <RouterLink inline to="mailto:specialist@artsy.net">
              specialist@artsy.net
            </RouterLink>
            . For questions about buying artworks through galleries on Artsy,
            contact{" "}
            <RouterLink inline to="mailto:inquiries@artsy.net">
              inquiries@artsy.net
            </RouterLink>
            .
          </Text>
        </Column>

        <Column span={4} start={5}>
          <Text as="h3" variant="xs">
            Communications Team
          </Text>

          <Text variant="sm">
            For members of the media interested in reaching Artsy's
            communications team, contact{" "}
            <RouterLink inline to="mailto:press@artsy.net">
              press@artsy.net
            </RouterLink>
            .
          </Text>
        </Column>

        <Column span={4}>
          <Text as="h3" variant="xs">
            Images
          </Text>

          <Text variant="sm">
            For questions about images published on the site, contact{" "}
            <RouterLink inline to="mailto:images@artsy.net">
              images@artsy.net
            </RouterLink>
            .
          </Text>
        </Column>

        <Column span={4} start={5}>
          <Text as="h3" variant="xs">
            Job Openings
          </Text>

          <Text variant="sm">
            For job or internship openings, explore our{" "}
            <RouterLink inline to="/jobs">
              Jobs page
            </RouterLink>
            .
          </Text>
        </Column>

        <Column span={4}>
          <Text as="h3" variant="xs">
            Editorial
          </Text>

          <Text variant="sm">
            For pitches and story ideas, contact{" "}
            <RouterLink inline to="mailto:pitches@artsy.net">
              pitches@artsy.net
            </RouterLink>
            .<br />
            For comments and questions, contact{" "}
            <RouterLink inline to="mailto:comments@artsy.net">
              comments@artsy.net
            </RouterLink>
            .<br />
            For questions about The Artsy Podcast, contact{" "}
            <RouterLink inline to="mailto:podcast@artsy.net">
              podcast@artsy.net
            </RouterLink>
            .
          </Text>
        </Column>

        <Column span={4} start={5}>
          <Text as="h3" variant="xs">
            Privacy
          </Text>

          <Text variant="sm">
            For personal data requests, contact{" "}
            <RouterLink inline to="mailto:privacy@artsy.net">
              privacy@artsy.net
            </RouterLink>
            .
          </Text>
        </Column>
      </GridColumns>

      <Spacer y={12} />

      <GridColumns gridRowGap={4}>
        <Column span={4}>
          <Text as="h2" variant="lg-display">
            Editorial Staff
          </Text>
        </Column>

        <Column span={2}>
          <Text as="h3" variant="xs">
            Director of Content
          </Text>

          <Text variant="sm">Casey Lesser</Text>
        </Column>

        <Column span={2}>
          <Text as="h3" variant="xs">
            Art Market Editor
          </Text>

          <Text variant="sm">Arun Kakar</Text>
        </Column>

        <Column span={2}>
          <Text as="h3" variant="xs">
            Staff Writer
          </Text>

          <Text variant="sm">Maxwell Rabb</Text>
        </Column>

        <Column span={2}>
          <Text as="h3" variant="xs">
            Associate Managing Editor
          </Text>

          <Text variant="sm">Olivia Horn</Text>
        </Column>
      </GridColumns>

      <Spacer y={6} />

      <GridColumns gridRowGap={4}>
        <Column span={4}>
          <Text as="h2" variant="lg-display"></Text>
        </Column>

        <Column span={2}>
          <Text as="h3" variant="xs">
            Editor
          </Text>

          <Text variant="sm">Josie Thaddeus-Johns</Text>
        </Column>
      </GridColumns>

      <Spacer y={12} />

      <GridColumns gridRowGap={4}>
        <Column span={4}>
          <Text as="h2" variant="lg-display">
            Address
          </Text>
        </Column>

        <Column span={8}>
          <Text variant="sm" as="address" fontStyle="normal">
            401 Broadway, 24th Floor, New York, NY 10013
          </Text>
        </Column>
      </GridColumns>
    </>
  )
}
