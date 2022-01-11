import { Column, GridColumns, Text } from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"

export const ContactApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Contact Us"
        description="We're here to help. Contact an Artsy team member about Sales, Auctions, Press inquiries, Editorial, Careers, and more."
        pathname="/contact"
      />

      <Section
        title="Contact Us"
        content={
          <>
            <Item
              title="General"
              content={
                <>
                  For general questions and feedback, please visit our Help
                  Center or contact{" "}
                  <a href="mailto:support@artsy.net">support@artsy.net</a>.
                </>
              }
            />
            <Item
              title="Advisory Team"
              content={
                <>
                  For questions about bidding on artworks in auctions through
                  Artsy, contact{" "}
                  <a href="mailto:specialist@artsy.net">specialist@artsy.net</a>
                  . For questions about buying artworks through galleries on
                  Artsy, contact
                  <a href="mailto:inquiries@artsy.net">inquiries@artsy.net</a>.
                </>
              }
            />
            <Item
              title="Communications Team"
              content={
                <>
                  For members of the media interested in reaching Artsy's
                  communications team, contact{" "}
                  <a href="mailto:press@artsy.net">press@artsy.net</a>
                </>
              }
            />
            <Item
              title="Images"
              content={
                <>
                  For questions about images published on the site, contact{" "}
                  <a href="mailto:images@artsy.net">images@artsy.net</a>
                </>
              }
            />
            <Item
              title="Job Openings"
              content={
                <>
                  For job or internship openings, explore our{" "}
                  <a href="/jobs">Jobs page</a>
                </>
              }
            />
            <Item
              title="Editorial"
              content={
                <>
                  <Text as="p" variant="sm">
                    For pitches and story ideas, contact{" "}
                    <a href="mailto:pitches@artsy.net">pitches@artsy.net</a>
                  </Text>

                  <Text as="p" variant="sm" mt={1}>
                    For comments and questions, contact{" "}
                    <a href="mailto:comments@artsy.net">comments@artsy.net</a>
                  </Text>

                  <Text as="p" variant="sm" mt={1}>
                    For questions about The Artsy Podcast, contact{" "}
                    <a href="mailto:podcast@artsy.net">podcast@artsy.net</a>
                  </Text>
                </>
              }
            />
            <Item
              title="Privacy"
              content={
                <>
                  For personal data requests, contact{" "}
                  <a href="mailto:privacy@artsy.net">privacy@artsy.net</a>
                </>
              }
            />
          </>
        }
      />

      <Section
        title="Editorial Staff"
        content={
          <>
            <Item
              title="Associate Director of Content"
              content="Casey Lesser"
            ></Item>
            <Item title="Production Editor" content="Harley Wong"></Item>
            <Item title="Associate Editor" content="Shannon Lee"></Item>
            <Item title="Editorial Coordinator" content="Leah Gallant"></Item>
          </>
        }
      />

      <Section
        title="Address"
        content={
          <Item content="401 Broadway, 26th Floor, New York, NY 10013" />
        }
      />
    </>
  )
}

const Section: React.FC<{ title: string; content: JSX.Element }> = ({
  title,
  content,
}) => {
  return (
    <GridColumns width={["100%", "70%"]} margin="auto" py={4}>
      <Column span={5}>
        <Text variant={["lg", "xl"]}>{title}</Text>
      </Column>
      <Column span={7}>
        <GridColumns>{content}</GridColumns>
      </Column>
    </GridColumns>
  )
}

const Item: React.FC<{
  title?: string | undefined
  content: JSX.Element | string
}> = ({ title, content }) => {
  return (
    <Column span={6} my={[1, 0]}>
      <Text variant={["md", "lg"]} mb={1}>
        {title}
      </Text>
      <Text variant="sm">{content}</Text>
    </Column>
  )
}
