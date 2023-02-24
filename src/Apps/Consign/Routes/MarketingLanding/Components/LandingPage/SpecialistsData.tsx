import { resized } from "Utils/resized"

export type Specialty =
  | "auctions"
  | "priveteSalesAndAdvisory"
  | "collectorServices"

export interface SpecialistsData {
  specialty: Specialty
  image: { src: string; srcSet: string }
  name: string
  firstName: string
  jobTitle: string
  bio: string
  email: string
}

export const CARD_WIDTH = 445
export const CARD_HEIGHT = 610
export const CARD_HEIGHT_MD = 557
export const CARD_HEIGHT_MOBILE = 461

const imageOptions = {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
}

const TEST_imageAuctions = resized(
  "https://files.artsy.net/images/08_CVP_About_Follow (2).png",
  imageOptions
)

const TEST_imagePriveteSalesAndAdvisory = resized(
  "https://files.artsy.net/images/06_CVP_About_Sell.png",
  imageOptions
)

const TEST_CollectorServices = resized(
  "https://files.artsy.net/images/07_CVP_About_Discover.png",
  imageOptions
)

export const SPECIALISTS: SpecialistsData[] = [
  {
    specialty: "auctions",
    name: "Shlomi Rabi",
    firstName: "Shlomi",
    jobTitle: "VP and Head of Auctions",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "shlomi.rabi@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Lauren Carpinelli",
    firstName: "Lauren",
    jobTitle: "Specialist, Prints and Contemporary",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "lauren.carpinelli@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Erica Lyon",
    firstName: "Erica",
    jobTitle: "Director of Business Strategy and Operations",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "erica@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Laura Martin",
    firstName: "Laura",
    jobTitle: "Specialist, Post-War & Contemporary",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "laura.martin@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Adam McCoy",
    firstName: "Adam",
    jobTitle: "Senior Specialist and Head of Prints",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "adam.mccoy@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Alan Zeng",
    firstName: "Alan",
    jobTitle: "Senior Specialist & Head of Street Art",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "alan@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Celine Cunha",
    firstName: "Celine",
    jobTitle: "Specialist in Post-War & Contemporary Art",
    bio: "SOME BIO",
    image: TEST_imageAuctions,
    email: "celine.cunha@artsymail.com",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Alexander Forbes",
    firstName: "Alexander",
    jobTitle: "Head of Collector Services & Private Sales",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "alexander.forbes@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Christine Aschwald",
    firstName: "Christine",
    jobTitle: "Head of Advisory and Senior Private Sales Director",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "christine.aschwald@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Akanksha Ballaney",
    firstName: "Akanksha",
    jobTitle: "Director, Private Sales",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "akanksha@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Robin Roche",
    firstName: "Robin",
    jobTitle: "Senior Private Sales Director",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "robin.roche@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Adriana Almeida",
    firstName: "Adriana",
    jobTitle: "Senior Private Sales Director",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "adriana.almeida@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Meave Hamill",
    firstName: "Meave",
    jobTitle: "Senior Advisor, Private Sales",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "meave@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "George King",
    firstName: "George",
    jobTitle: "Senior Advisor, Private Sales",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "george.king@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Daniela Bianco-Duppen",
    firstName: "Daniela",
    jobTitle: "Advisor",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "daniela.bianco-duppen@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Itziar Ramos Ricoy",
    firstName: "Meave",
    jobTitle: "Advisor",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "itziar.ramos@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Caroline Perkins",
    firstName: "Caroline",
    jobTitle: "Advisor",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "caroline.perkins@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Akilah Chandler",
    firstName: "Akilah",
    jobTitle: "Private Sales & Advisory Business Associate",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "akilah.chandler@artsymail.com",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Sarah Punzel",
    firstName: "Sarah",
    jobTitle: "Private Sales Business Associate",
    bio: "SOME BIO",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "sarah.punzel@artsy.net",
  },

  {
    specialty: "collectorServices",
    name: "Wendy Wiberg",
    firstName: "Wendy",
    jobTitle: "Collector Services Lead",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "wendy.wiberg@artsy.net",
  },
  {
    specialty: "collectorServices",
    name: "Alexandra Freedman",
    firstName: "Alexandra",
    jobTitle: "Senior Manager, Collector Development",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "alexandra.freedman@artsy.net",
  },
  {
    specialty: "collectorServices",
    name: "Eleonora Leo",
    firstName: "Eleonora",
    jobTitle: "Senior Manager, Collector Services",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "eleonora.leo@artsy.net",
  },
  {
    specialty: "collectorServices",
    name: "Isabel Telonis",
    firstName: "Isabel",
    jobTitle: "Senior Manager, Collector Services",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "isabel.telonis@artsy.net",
  },
  {
    specialty: "collectorServices",
    name: "Vanessa Zingale",
    firstName: "Vanessa",
    jobTitle: "Senior Manager, Collector Services",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "vanessa.zingale@artsy.net",
  },
  {
    specialty: "collectorServices",
    name: "Caroline Targgart",
    firstName: "Caroline",
    jobTitle: "Client Development Manager",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "caroline.targgart@artsy.net",
  },
  {
    specialty: "collectorServices",
    name: "Dana Rodriguez",
    firstName: "Dana",
    jobTitle: "Associate, Collector Services",
    bio: "SOME BIO",
    image: TEST_CollectorServices,
    email: "dana.rodriguez@artsy.net",
  },
]
