import {
  Text,
  Box,
  Image,
  GridColumns,
  Column,
  Button,
  BorderBox,
} from "@artsy/palette"
import { MetaTags } from "v2/Components/MetaTags"
import { RouterLink } from "v2/System/Router/RouterLink"

export const AboutApp: React.FC = () => {
  return (
    <>
      <MetaTags
        title="About | Artsy"
        description="Artsy’s mission is to make all of the world’s art accessible to anyone with an Internet connection."
        pathname="/about"
      />
      <Box id="the-art-world-online">
        <Box mt={2} data-test="about1">
          <Text variant="xl">THE ART WORLD ONLINE</Text>
          <Text variant="md">
            Artsy features the world’s leading galleries, museum collections,
            foundations, artist estates, art fairs, and benefit auctions, all in
            one place. Our growing database of 500,000 images of art,
            architecture, and design by 50,000 artists spans historical, modern,
            and contemporary works, and includes the largest online database of
            contemporary art. Artsy is used by art lovers, museum-goers,
            patrons, collectors, students, and educators to discover, learn
            about, and collect art.
          </Text>
        </Box>

        <Box py={20} mt={2} data-test="about2">
          <GridColumns>
            <Column span={6}>
              <Text variant="xs">ART ON ARTSY</Text>
              <Text variant="lg">
                We partner with leading galleries and institutions
              </Text>
              <Box py={2}>
                <Image
                  width="320px"
                  height="471px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/tn07FUCvCfAPTdHLYksOcw/aboutPage_galleriePerotin.jpg"
                />
                <Text>Galerie Perrotin - Paris/Hong Kong/NY</Text>
              </Box>
              <Box py={2}>
                <Image
                  width="520px"
                  height="299px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/fGoN2VtmO4BSETrSR6us5w/about_BritishMuseum.jpg"
                />
                <Text>The British Museum - London</Text>
              </Box>
              <Box py={2}>
                <Image
                  width="320px"
                  height="480px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/8uU7UcN_OJ8Go3LUjwQ3FQ/about_cheimAndRead.jpg"
                />
                <Text>Cheim &amp; Read - NEW YORK</Text>
              </Box>

              <Box mt={100}>
                <Text variant="xs">Interested in partnering with Artsy?</Text>
                <RouterLink to="/gallery-partnerships">
                  <BorderBox mb={2} hover>
                    <Text>Partnership Overviews</Text>
                  </BorderBox>
                </RouterLink>
                <RouterLink to="/partner-application">
                  <BorderBox mb={2} hover>
                    <Text>Apply to become a partner</Text>
                  </BorderBox>
                </RouterLink>
                <RouterLink to="/partners">
                  <BorderBox mb={2} hover>
                    <Text>See our full list of partners</Text>
                  </BorderBox>
                </RouterLink>
              </Box>
            </Column>

            <Column span={6}>
              <Box py={2}>
                <Image
                  width="520px"
                  height="481px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/mhRydF6oufDX63mNtUgbaQ/aboutPage_gagosian.jpg"
                />
                <Text>Gagosian Gallery - New York</Text>
              </Box>
              <Box py={2}>
                <Image
                  width="320px"
                  height="640px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/23d9YUEfkYVfdzbjR59vcg/about_PearlLamGolnaz2.jpg"
                />
                <Text>Pearl Lam - Hong Kong/Shanghai</Text>
              </Box>
              <Box py={2}>
                <Image
                  width="520px"
                  height="383px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/oyRa2XKBr-Uw-LKrAe0MXQ/about_Guggenheim.jpg"
                />
                <Text>Guggenheim Museum - New York</Text>
              </Box>
              <Box py={2}>
                <Image
                  width="320px"
                  height="213px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/H6E7TPF05zaIOKSE2DIRuQ/about_fondationBeyeler.jpg"
                />
                <Text>Fondation Beyeler - Riehen</Text>
              </Box>
            </Column>
          </GridColumns>
        </Box>

        <Box py={20} mt={2} data-test="about3">
          <GridColumns>
            <Column span={4}>
              <Text variant="xs">The Artsy iPhone App</Text>
              <Text variant="lg">Access from anywhere</Text>
              <Text variant="md">
                Our iPhone app allows you to browse, save, learn about, and
                collect from your phone. It also serves as a personalized,
                on-the-ground guide to any art fair we feature on Artsy.
              </Text>
            </Column>
            <Column span={8}>
              <Box py={2}>
                <Image
                  width="720px"
                  height="507px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/PiE_1gCyYvs3IKWiWjHo3g%2FFrame+14.png"
                />
              </Box>
            </Column>
          </GridColumns>
        </Box>
      </Box>

      <Box id="collecting">
        <Box py={20} data-test="collecting1">
          <Text variant="xl">COLLECTING</Text>
          <Text variant="md">
            There are currently over 300,000 works available for sale on Artsy,
            provided by galleries, museums, and institutions from around the
            world. These works range in price from $100 to over $1,000,000, with
            new ones added every day. Artsy takes no commission from the sale of
            artworks from our subscribing gallery partners. We serve as a link
            between our gallery partners and those interested in collecting.
          </Text>
        </Box>

        <Box py={20} data-test="collecting2">
          <GridColumns>
            <Column span={4}>
              <Text variant="xs">How it works</Text>
              <Text variant="lg">Collecting art and design on Artsy</Text>
              <Text variant="md">
                If you’re interested in a for-sale work, simply visit the
                artwork page to send a message directly to the gallery or
                institution. You can ask about pricing, availability, shipping,
                and further details. Often, the more information you give the
                gallery about yourself, the quicker the response will be. You
                can also click “Ask an Artsy Specialist,” who will be happy to
                answer any questions you might have. There is no charge for
                making an inquiry or consulting with one of our specialists.
              </Text>
            </Column>
            <Column span={8}>
              <Box py={2}>
                <Image
                  width="720px"
                  height="720px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/CcQ2iGMaQZKVJPdfbOyixA/about_DeKooningCollector.jpg"
                />
              </Box>
            </Column>
          </GridColumns>
        </Box>

        <Box py={20} data-test="collecting3">
          <GridColumns>
            <Column span={6}>
              <Box>
                <Image
                  width="320px"
                  height="480px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/AwF7--lGYhhd9Ou-8jNU4A/about_stas.jpg"
                />
                <Text>STAS CHYZHYKOVA</Text>
              </Box>
              <Box>
                <Image
                  width="320px"
                  height="480px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/I2llMOya73q5Oqe3_BOSSg/about_Elena1.jpg"
                />
                <Text>ELENA SOBOLEVA</Text>
              </Box>
            </Column>
            <Column span={6}>
              <Box>
                <Text variant="xs">ARTSY SPECIALISTS</Text>
                <Text variant="lg">We’re here to help you find art</Text>
                <Text variant="md">
                  Artsy specialists are available to all Artsy users, whether
                  you are purchasing your first work or building upon an
                  existing collection. Our specialists join Artsy from leading
                  auction houses, galleries, and museums, and are available to
                  help you find works that you love, with your price range,
                  interests, and current collection in mind. Your specialist can
                  also source works which aren't publicly listed on the site
                  through our international network of gallery partners.
                </Text>
              </Box>
              <Box>
                <Image
                  width="320px"
                  height="480px"
                  src="https://artsy-media-uploads.s3.amazonaws.com/KeKyoFW83QKNeST23YyQIg/about_Rebecca.jpg"
                />
                <Text>REBECCA BRONFEIN RAPHAEL</Text>
              </Box>
              <Box py={20}>
                <Box py={20}>
                  <Text>More questions about collecting?</Text>
                </Box>
                <GridColumns>
                  <Column span={6}>
                    <Button>Collector Resources</Button>
                  </Column>
                  <Column span={6}>
                    <Button>Contact Specialist</Button>
                  </Column>
                </GridColumns>
              </Box>
            </Column>
          </GridColumns>
        </Box>
      </Box>
    </>
  )
}
