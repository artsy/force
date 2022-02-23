import * as React from "react"
import {
  Avatar,
  Box,
  Flex,
  Spacer,
  Text,
  GridColumns,
  Column,
} from "@artsy/palette"
import { __internal__useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { crop } from "v2/Utils/resizer"
import { Meta, Title } from "react-head"

export const MeetTheSpecialistsIndex: React.FC = () => {
  const resizeImage = (
    url: string,
    width = 100,
    height = 100,
    quality = 100,
    convert_to = "jpg"
  ) =>
    crop(url, {
      width,
      height,
      quality,
      convert_to,
    })

  return (
    <>
      <Title>Art Advisory, Specialists, and Collector Services | Artsy</Title>
      <Meta
        name="description"
        content="Whether you’re seeking a specific work for your collection or wish to sell, Artsy’s globe-spanning team is ready to source, sell, advise, and research on your behalf. Contact a specialist today."
      />
      <Box mt={4}>
        <Text variant={"xs"}>Private Sales</Text>
        <Text as="h1" variant={["xl", "xxl"]}>
          Meet the Specialists
        </Text>
        <Spacer mb={2} />
        <Text color="black60" variant={["lg", "xl"]} width={["100%", "50%"]}>
          Whether you’re seeking a specific work for your growing collection or
          wish to sell, our globe-spanning team is ready to source, sell,
          advise, and research on your behalf.
        </Text>
      </Box>

      <Box mt={2}>
        <Text variant="xs">
          Have a question about Artsy? Check out our{" "}
          <RouterLink to={"https://support.artsy.net"}>help center</RouterLink>{" "}
          or email <a href="mailto:support@artsy.net">support@artsy.net</a>.
        </Text>

        <Text variant={"xs"}>
          Have a question about bidding on Artsy? Email{" "}
          <a href="mailto:specialist@artsy.net">specialist@artsy.net</a>.
        </Text>

        <Text variant={"xs"}>
          Have a question about an existing order or offer? Email{" "}
          <a href="mailto:specialist@artsy.net">orders@artsy.net</a>.
        </Text>
      </Box>

      <Spacer mb={12} />

      <GridColumns>
        <Column span={4} start={1}>
          <Text variant={["xl", "xxl"]}>Advisory and Private Sales</Text>
        </Column>

        <Media lessThan="md">
          <Spacer mb={4} />
        </Media>

        <Column start={5}>
          {advisorySpecialists.map(specialist => (
            <Box width="100%">
              <Flex flexDirection={["column", "row"]}>
                <Avatar
                  size="md"
                  src={resizeImage(specialist.photo.url!)!}
                  mr={[0, 2]}
                  mb={[2, 0]}
                />

                <Flex flexDirection="column">
                  <Text variant="lg">{specialist.name}</Text>
                  <Text variant="md">{specialist.title}</Text>
                  <Text variant="md" color="black60">
                    {specialist.location}
                  </Text>
                  <Spacer my={1} />
                  <RouterLink to={`mailto:${specialist.email}`}>
                    {specialist.email}
                  </RouterLink>
                  <Spacer mb={6} />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Column>
      </GridColumns>
      <GridColumns>
        <Column span={4} start={1}>
          <Text variant={["xl", "xxl"]}>Auctions</Text>
        </Column>

        <Spacer mb={4} />

        <Column start={5}>
          {auctionSpecialists.map((specialist, i) => (
            <Box width="100%">
              <Flex flexDirection={["column", "row"]}>
                <Avatar
                  size="md"
                  src={resizeImage(specialist.photo.url!)!}
                  mr={[0, 2]}
                  mb={[2, 0]}
                />

                <Flex flexDirection="column">
                  <Text variant="lg">{specialist.name}</Text>
                  <Text variant="md">{specialist.title}</Text>
                  <Text variant="md" color="black60">
                    {specialist.location}
                  </Text>
                  <Spacer my={10} />
                  <RouterLink to={`mailto:${specialist.email}`}>
                    {specialist.email}
                  </RouterLink>
                  <Spacer mb={6} />
                </Flex>
              </Flex>
            </Box>
          ))}
        </Column>
      </GridColumns>
    </>
  )
}

const advisorySpecialists = [
  {
    name: "Alexander Forbes",
    title: "Head of Collector Services & Private Sales",
    location: "New York",
    email: "alexander.forbes@artsy.net",
    photo: {
      url:
        "http://files.artsy.net/images/alexander-forbes-artsy-headshot-2019.jpg",
    },
  },
  {
    name: "Akanksha Ballaney",
    title: "Associate Director",
    location: "New York",
    email: "akanksha@artsy.net",
    photo: { url: "http://files.artsy.net/images/akanksha.jpeg" },
  },
  {
    name: "Natasha Prince",
    title: "Senior Advisor",
    location: "London",
    email: "natasha.prince@artsy.net",
    phone: " +44 7889 403808 ",
    photo: { url: "http://files.artsy.net/images/natasha.jpeg" },
  },
  {
    name: "Robin Roche",
    title: "Senior Advisor",
    location: "New York",
    email: "robin.roche@artsy.net",
    phone: "+1 646 707 9450",
    photo: { url: "http://files.artsy.net/images/robin.jpeg" },
  },
  {
    name: "Daniela Bianco-Duppen",
    title: "Advisor",
    location: "London",
    email: "daniela.bianco-duppen@artsy.net",
    phone: "+44 7503 236844",
    photo: { url: "http://files.artsy.net/images/daniela-bianco-duppen.jpeg" },
  },
  {
    name: "Alexandra Freedman",
    title: "Advisor",
    location: "New York",
    email: "alexandra.freedman@artsy.net",
    phone: "+1 610 405 7151",
    photo: { url: "http://files.artsy.net/images/alexandra.jpeg" },
  },
  {
    name: "Meave Hamill",
    title: "Advisor",
    location: "London",
    email: "meave@artsy.net",
    photo: { url: "http://files.artsy.net/images/meave.jpeg" },
  },
  {
    name: "George King",
    title: "Advisor",
    location: "London",
    email: "george.king@artsy.net",
    phone: "+44 7850 739913",
    photo: { url: "http://files.artsy.net/images/george.jpeg" },
  },
  {
    name: "Agnieszka Perche",
    title: "Advisor",
    location: "London",
    email: "agnieszka.perche@artsy.net",
    phone: "+44 7842 548576",
    photo: { url: "http://files.artsy.net/images/agnieszka.jpg" },
  },
  {
    name: "Caroline Perkins",
    title: "Advisor",
    location: "New York",
    email: "caroline.perkins@artsy.net",
    phone: "+1 540 588 1371",
    photo: { url: "http://files.artsy.net/images/cperkins_headshot-copy.jpg" },
  },
  {
    name: "Itziar Ramos Ricoy",
    title: "Advisor",
    location: "London",
    email: "itziar.ramos@artsy.net",
    phone: "+44 7429 093319",
    photo: { url: "http://files.artsy.net/images/itziar.jpeg" },
  },
]
const auctionSpecialists = [
  {
    name: "Shlomi Rabi",
    title: "VP and Head of Auctions",
    location: "New York",
    email: "shlomi.rabi@artsy.net",
    photo: { url: "http://files.artsy.net/images/shlomi.jpg" },
  },
  {
    name: "Chloé Bigio",
    title: "Senior Manager, Auction Partnerships",
    location: "New York",
    email: "chloe@artsy.net",
    photo: { url: "http://files.artsy.net/images/chloe.jpg" },
  },
  {
    name: "Lauren Carpinelli",
    title: "Specialist, Prints and Contemporary",
    location: "New York",
    email: "lauren.carpinelli@artsy.net",
    photo: {
      url: "http://files.artsy.net/images/lauren.jpg",
      height: 120,
    },
  },
  {
    name: "Erica Lyon",
    title: "Associate Director of Partner Auctions",
    location: "New York",
    email: "erica@artsy.net",
    photo: { url: "http://files.artsy.net/images/ericalyonheadshot.jpeg" },
  },
  {
    name: "Laura Martin",
    title: "Specialist, Post-War & Contemporary",
    location: "Los Angeles",
    email: "laura.martin@artsy.net",
    photo: { url: "http://files.artsy.net/images/laura.jpg" },
  },
  {
    name: "Adam McCoy",
    title: "Senior Specialist and Head of Prints",
    location: "New York",
    email: "adam.mccoy@artsy.net",
    photo: { url: "http://files.artsy.net/images/adam.jpg" },
  },

  {
    name: "Alan Zeng",
    title: "Senior Specialist, Street Art",
    location: "New York",
    email: "alan.zeng@artsy.net",
    photo: { url: "http://files.artsy.net/images/alan.png" },
  },
]
