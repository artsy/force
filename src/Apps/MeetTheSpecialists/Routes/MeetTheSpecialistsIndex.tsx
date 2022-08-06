import {
  Avatar,
  Box,
  Flex,
  Spacer,
  Text,
  GridColumns,
  Column,
  Join,
  Separator,
} from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { FC } from "react"
import { cropped } from "Utils/resized"
import { useTranslation } from "react-i18next"

export const MeetTheSpecialistsIndex: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags
        title="Art Advisory, Specialists, and Collector Services | Artsy"
        description="Whether you’re seeking a specific work for your collection or wish to sell, Artsy’s globe-spanning team is ready to source, sell, advise, and research on your behalf. Contact a specialist today."
        pathname="/meet-the-specialists"
      />

      <Spacer mt={4} />

      <Text as="h1" variant={["xl", "xxl"]}>
        {t`specialists.meetTheSpecialists`}
      </Text>

      <Spacer mt={2} />

      <GridColumns>
        <Column span={8}>
          <Text color="black60" variant={["lg-display", "xl"]}>
            {t`specialists.ourTeamIsReady`}
          </Text>

          <Spacer mt={2} />

          <Text variant="xs">
            Have a question about Artsy? Check out our{" "}
            <a href="https://support.artsy.net">help center</a> or email{" "}
            <a href="mailto:support@artsy.net">support@artsy.net</a>.
            <br />
            Have a question about bidding on Artsy? Email{" "}
            <a href="mailto:specialist@artsy.net">specialist@artsy.net</a>.
            <br />
            Have a question about an existing order or offer? Email{" "}
            <a href="mailto:specialist@artsy.net">orders@artsy.net</a>.
          </Text>
        </Column>
      </GridColumns>

      <Spacer mt={12} />

      <Join separator={<Separator my={12} />}>
        {SPECIALISTS.map(({ i18nKey, specialists }) => {
          return (
            <GridColumns gridRowGap={4}>
              <Column span={4}>
                <Text variant="xl">{t(i18nKey)}</Text>
              </Column>

              <Column span={8}>
                <Join separator={<Spacer mt={4} />}>
                  {specialists.map(specialist => (
                    <Flex key={specialist.email}>
                      <Avatar
                        size="md"
                        lazyLoad
                        mr={2}
                        flexShrink={0}
                        {...cropped(specialist.image, {
                          width: 100,
                          height: 100,
                        })}
                      />

                      <Box>
                        <Text variant="lg-display">{specialist.name}</Text>

                        <Text variant="sm-display">{specialist.title}</Text>

                        <Text variant="sm-display" color="black60">
                          {specialist.location}
                        </Text>

                        <Spacer mt={2} />

                        <Text
                          variant="sm-display"
                          as="a"
                          // @ts-ignore
                          href={`mailto:${specialist.email}`}
                        >
                          {specialist.email}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Join>
              </Column>
            </GridColumns>
          )
        })}
      </Join>
    </>
  )
}

interface Specialist {
  email: string
  image: string
  location?: string
  name: string
  phone?: string
  title: string
}

const ADVISORY_SPECIALISTS: Specialist[] = [
  {
    name: "Alexander Forbes",
    title: "Head of Collector Services & Private Sales",
    location: "New York",
    email: "alexander.forbes@artsy.net",
    image:
      "https://files.artsy.net/images/alexander-forbes-artsy-headshot-2019.jpg",
  },
  {
    name: "Christine Aschwald",
    title: "Head of Advisory and Senior Private Sales Director",
    location: "New York",
    email: "christine.aschwald@artsy.net",
    image: "https://files.artsy.net/images/Christine_Aschwald.JPG",
  },
  {
    name: "Akanksha Ballaney",
    title: "Associate Director, Private Sales",
    location: "New York",
    email: "akanksha@artsy.net",
    image: "https://files.artsy.net/images/akanksha.jpeg",
  },
  {
    name: "Natasha Prince",
    title: "Senior Advisor",
    location: "London",
    email: "natasha.prince@artsy.net",
    phone: "+44 7889 403808",
    image: "https://files.artsy.net/images/natasha.jpeg",
  },
  {
    name: "Robin Roche",
    title: "Senior Private Sales Director",
    location: "New York",
    email: "robin.roche@artsy.net",
    phone: "+1 646 707 9450",
    image: "https://files.artsy.net/images/robin.jpeg",
  },
  {
    name: "Meave Hamill",
    title: "Senior Advisor, Private Sales",
    location: "London",
    email: "meave@artsy.net",
    image: "https://files.artsy.net/images/meave.jpeg",
  },
  {
    name: "George King",
    title: "Senior Advisor, Private Sales",
    location: "London",
    email: "george.king@artsy.net",
    phone: "+44 7850 739913",
    image: "https://files.artsy.net/images/george.jpeg",
  },
  {
    name: "Daniela Bianco-Duppen",
    title: "Advisor",
    location: "London",
    email: "daniela.bianco-duppen@artsy.net",
    phone: "+44 7503 236844",
    image: "https://files.artsy.net/images/daniela-bianco-duppen.jpeg",
  },
  {
    name: "Alexandra Freedman",
    title: "Advisor",
    location: "New York",
    email: "alexandra.freedman@artsy.net",
    phone: "+1 610 405 7151",
    image: "https://files.artsy.net/images/alexandra.jpeg",
  },
  {
    name: "Caroline Perkins",
    title: "Advisor",
    location: "New York",
    email: "caroline.perkins@artsy.net",
    phone: "+1 540 588 1371",
    image: "https://files.artsy.net/images/cperkins_headshot-copy.jpg",
  },
  {
    name: "Itziar Ramos Ricoy",
    title: "Advisor",
    location: "London",
    email: "itziar.ramos@artsy.net",
    phone: "+44 7429 093319",
    image: "https://files.artsy.net/images/itziar.jpeg",
  },
  {
    name: "Adriana Almeida",
    title: "Senior Private Sales Director",
    location: "London",
    email: "adriana.almeida@artsy.net",
    image: "https://files.artsy.net/images/Adriana_Almeida.jpg",
  },
  {
    name: "Sarah Punzel",
    title: "Private Sales Coordinator",
    location: "New York",
    email: "sarah.punzel@artsy.net",
    image: "https://files.artsy.net/images/Sarah_Punzel.png",
  },
]

const AUCTION_SPECIALISTS: Specialist[] = [
  {
    name: "Shlomi Rabi",
    title: "VP and Head of Auctions",
    location: "New York",
    email: "shlomi.rabi@artsy.net",
    image: "https://files.artsy.net/images/shlomi2.jpg",
  },
  {
    name: "Lauren Carpinelli",
    title: "Specialist, Prints and Contemporary",
    location: "New York",
    email: "lauren.carpinelli@artsy.net",
    image: "https://files.artsy.net/images/lauren.jpg",
  },
  {
    name: "Erica Lyon",
    title: "Associate Director of Partner Auctions",
    location: "New York",
    email: "erica@artsy.net",
    image: "https://files.artsy.net/images/ericalyonheadshot.jpeg",
  },
  {
    name: "Laura Martin",
    title: "Specialist, Post-War & Contemporary",
    location: "Los Angeles",
    email: "laura.martin@artsy.net",
    image: "https://files.artsy.net/images/laura.jpg",
  },
  {
    name: "Adam McCoy",
    title: "Senior Specialist and Head of Prints",
    location: "New York",
    email: "adam.mccoy@artsy.net",
    image: "https://files.artsy.net/images/adam2.jpg",
  },

  {
    name: "Alan Zeng",
    title: "Senior Specialist, Street Art",
    location: "New York",
    email: "alan@artsy.net",
    image: "https://files.artsy.net/images/alan.png",
  },
  {
    name: "Celine Cunha",
    title: "Specialist in Post-War & Contemporary Art",
    location: "New York",
    email: "celine.cunha@artsymail.com",
    image: "https://files.artsy.net/images/Celine_Cunha_Krieger.png",
  },
  {
    name: "Simon Wills",
    title: "Trusts & Estates Senior Manager",
    location: "New York",
    email: "simon.wills@artsymail.com",
    image: "https://files.artsy.net/images/simon_wills.png",
  },
]

const COLLECTOR_SERVICES_SPECIALISTS: Specialist[] = [
  {
    name: "Wendy Wiberg",
    title: "Collector Services Lead",

    email: "wendy.wiberg@artsy.net",
    image: "https://files.artsy.net/images/wendy_wiberg.png",
  },
  {
    name: "Eleonora Leo",
    title: "Senior Manager, Collector Services",

    email: "eleonora.leo@artsy.net",
    image: "https://files.artsy.net/images/eleonora_leo.png",
  },
  {
    name: "Vanessa Zingale",
    title: "Senior Manager, Collector Services",

    email: "vanessa.zingale@artsy.net",
    image: "https://files.artsy.net/images/vanessa_zingale.png",
  },
  {
    name: "Isabel Telonis",
    title: "Manager, Collector Services",

    email: "isabel.telonis@artsy.net",
    image: "https://files.artsy.net/images/isabel_telonis.png",
  },
  {
    name: "Dana Rodriguez",
    title: "Associate, Collector Services",

    email: "dana.rodriguez@artsy.net",
    image: "https://files.artsy.net/images/dana_rodriguez.png",
  },
]

const SPECIALISTS = [
  { i18nKey: "specialists.privateSales", specialists: ADVISORY_SPECIALISTS },
  { i18nKey: "specialists.auctions", specialists: AUCTION_SPECIALISTS },
  {
    i18nKey: "specialists.collectorServices",
    specialists: COLLECTOR_SERVICES_SPECIALISTS,
  },
]
