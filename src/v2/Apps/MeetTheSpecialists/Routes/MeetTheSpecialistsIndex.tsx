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
import { MetaTags } from "v2/Components/MetaTags"
import { FC } from "react"
import { cropped } from "v2/Utils/resized"

export const MeetTheSpecialistsIndex: FC = () => {
  return (
    <>
      <MetaTags
        title="Art Advisory, Specialists, and Collector Services | Artsy"
        description="Whether you’re seeking a specific work for your collection or wish to sell, Artsy’s globe-spanning team is ready to source, sell, advise, and research on your behalf. Contact a specialist today."
        pathname="/meet-the-specialists"
      />

      <Spacer mt={4} />

      <Text as="h1" variant={["xl", "xxl"]}>
        Meet the Specialists
      </Text>

      <Spacer mt={2} />

      <GridColumns>
        <Column span={8}>
          <Text color="black60" variant={["lg", "xl"]}>
            Whether you’re seeking a specific work for your growing collection
            or wish to sell, our globe-spanning team is ready to source, sell,
            advise, and research on your behalf.
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
        {SPECIALISTS.map(({ title, specialists }) => {
          return (
            <GridColumns gridRowGap={4}>
              <Column span={4}>
                <Text variant="xl">{title}</Text>
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
                        <Text variant="lg">{specialist.name}</Text>

                        <Text variant="md">{specialist.title}</Text>

                        <Text variant="md" color="black60">
                          {specialist.location}
                        </Text>

                        <Spacer mt={2} />

                        <Text
                          variant="md"
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
      "http://files.artsy.net/images/alexander-forbes-artsy-headshot-2019.jpg",
  },
  {
    name: "Akanksha Ballaney",
    title: "Associate Director",
    location: "New York",
    email: "akanksha@artsy.net",
    image: "http://files.artsy.net/images/akanksha.jpeg",
  },
  {
    name: "Natasha Prince",
    title: "Senior Advisor",
    location: "London",
    email: "natasha.prince@artsy.net",
    phone: "+44 7889 403808",
    image: "http://files.artsy.net/images/natasha.jpeg",
  },
  {
    name: "Robin Roche",
    title: "Senior Advisor",
    location: "New York",
    email: "robin.roche@artsy.net",
    phone: "+1 646 707 9450",
    image: "http://files.artsy.net/images/robin.jpeg",
  },
  {
    name: "Daniela Bianco-Duppen",
    title: "Advisor",
    location: "London",
    email: "daniela.bianco-duppen@artsy.net",
    phone: "+44 7503 236844",
    image: "http://files.artsy.net/images/daniela-bianco-duppen.jpeg",
  },
  {
    name: "Alexandra Freedman",
    title: "Advisor",
    location: "New York",
    email: "alexandra.freedman@artsy.net",
    phone: "+1 610 405 7151",
    image: "http://files.artsy.net/images/alexandra.jpeg",
  },
  {
    name: "Meave Hamill",
    title: "Advisor",
    location: "London",
    email: "meave@artsy.net",
    image: "http://files.artsy.net/images/meave.jpeg",
  },
  {
    name: "George King",
    title: "Advisor",
    location: "London",
    email: "george.king@artsy.net",
    phone: "+44 7850 739913",
    image: "http://files.artsy.net/images/george.jpeg",
  },
  {
    name: "Agnieszka Perche",
    title: "Advisor",
    location: "London",
    email: "agnieszka.perche@artsy.net",
    phone: "+44 7842 548576",
    image: "http://files.artsy.net/images/agnieszka.jpg",
  },
  {
    name: "Caroline Perkins",
    title: "Advisor",
    location: "New York",
    email: "caroline.perkins@artsy.net",
    phone: "+1 540 588 1371",
    image: "http://files.artsy.net/images/cperkins_headshot-copy.jpg",
  },
  {
    name: "Itziar Ramos Ricoy",
    title: "Advisor",
    location: "London",
    email: "itziar.ramos@artsy.net",
    phone: "+44 7429 093319",
    image: "http://files.artsy.net/images/itziar.jpeg",
  },
]

const AUCTION_SPECIALISTS: Specialist[] = [
  {
    name: "Shlomi Rabi",
    title: "VP and Head of Auctions",
    location: "New York",
    email: "shlomi.rabi@artsy.net",
    image: "http://files.artsy.net/images/shlomi2.jpg",
  },
  {
    name: "Chloé Bigio",
    title: "Senior Manager, Auction Partnerships",
    location: "New York",
    email: "chloe@artsy.net",
    image: "http://files.artsy.net/images/chloe.jpg",
  },
  {
    name: "Lauren Carpinelli",
    title: "Specialist, Prints and Contemporary",
    location: "New York",
    email: "lauren.carpinelli@artsy.net",
    image: "http://files.artsy.net/images/lauren.jpg",
  },
  {
    name: "Erica Lyon",
    title: "Associate Director of Partner Auctions",
    location: "New York",
    email: "erica@artsy.net",
    image: "http://files.artsy.net/images/ericalyonheadshot.jpeg",
  },
  {
    name: "Laura Martin",
    title: "Specialist, Post-War & Contemporary",
    location: "Los Angeles",
    email: "laura.martin@artsy.net",
    image: "http://files.artsy.net/images/laura.jpg",
  },
  {
    name: "Adam McCoy",
    title: "Senior Specialist and Head of Prints",
    location: "New York",
    email: "adam.mccoy@artsy.net",
    image: "http://files.artsy.net/images/adam2.jpg",
  },

  {
    name: "Alan Zeng",
    title: "Senior Specialist, Street Art",
    location: "New York",
    email: "alan@artsy.net",
    image: "http://files.artsy.net/images/alan.png",
  },
]

const COLLECTOR_SERVICES_SPECIALISTS: Specialist[] = [
  {
    name: "Wendy Wiberg",
    title: "Collector Services Lead",

    email: "wendy.wiberg@artsy.net",
    image: "http://files.artsy.net/images/wendy_wiberg.png",
  },
  {
    name: "Eleonora Leo",
    title: "Senior Manager, Collector Services",

    email: "eleonora.leo@artsy.net",
    image: "http://files.artsy.net/images/eleonora_leo.png",
  },
  {
    name: "Vanessa Zingale",
    title: "Senior Manager, Collector Services",

    email: "vanessa.zingale@artsy.net",
    image: "http://files.artsy.net/images/vanessa_zingale.png",
  },
  {
    name: "Isabel Telonis",
    title: "Manager, Collector Services",

    email: "isabel.telonis@artsy.net",
    image: "http://files.artsy.net/images/isabel_telonis.png",
  },
  {
    name: "Dana Rodriguez",
    title: "Associate, Collector Services",

    email: "dana.rodriguez@artsy.net",
    image: "http://files.artsy.net/images/dana_rodriguez.png",
  },
]

const SPECIALISTS = [
  { title: "Advisory and Private Sales", specialists: ADVISORY_SPECIALISTS },
  { title: "Auctions", specialists: AUCTION_SPECIALISTS },
  { title: "Collector Services", specialists: COLLECTOR_SERVICES_SPECIALISTS },
]
