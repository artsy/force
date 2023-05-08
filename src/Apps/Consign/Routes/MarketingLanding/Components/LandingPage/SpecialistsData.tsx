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
export const CARD_HEIGHT_MOBILE = 418

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

export const SPECIALISTS: SpecialistsData[] = [
  {
    specialty: "auctions",
    name: "Shlomi Rabi",
    firstName: "Shlomi",
    jobTitle: "VP and Head of Auctions",
    bio:
      "Shlomi has 20+ years in the auction industry, with tenures at Phillips and Christie’s. He oversees Artsy’s auction partnerships and primary and secondary market auctions. Previously, he launched his own social impact auction platform, Greenhouse Auctions, which he sold to Artsy in 2021. He holds an MA from the School of the Art Institute of Chicago.",
    image: TEST_imageAuctions,
    email: "shlomi.rabi@artsy.net",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Akanksha Ballaney",
    firstName: "Akanksha",
    jobTitle: "Director, Private Sales",
    bio:
      "Akanksha leads Artsy’s private sales team, assisting our global audience to buy and sell artworks across today’s most popular collecting categories. With Artsy since 2018, she has 10+ years of experience in art fairs, galleries, auction houses, and art-tech platforms.",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "akanksha@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Christine Aschwald",
    firstName: "Christine",
    jobTitle: "Head of Advisory and Senior Private Sales Director",
    bio:
      "Christine advises top-tier private collectors, blue-chip secondary market galleries, and the fiduciary community on buying and selling opportunities. With 17 years of experience, she brings long-standing relationships with top collectors and institutional clients from her time as VP at Christie’s client advisory department. She graduated from Williams College with a degree in Art History and Political Science.",
    image: TEST_imageAuctions,
    email: "christine.aschwald@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Adam McCoy",
    firstName: "Adam",
    jobTitle: "Senior Specialist and Head of Prints",
    bio:
      "Adam is the Head of Prints & Multiples, which has achieved records for leading post-war and pop art artists. He began his career in museums, before joining Christie's prints and multiples department in 2008, where he rose to Vice President, Senior Specialist. He holds a graduate degree from the University of Chicago and undergraduate degrees from the University of Kansas.",
    image: TEST_imageAuctions,
    email: "adam.mccoy@artsy.net",
  },
  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Adriana Almeida",
  //   firstName: "Adriana",
  //   jobTitle: "Senior Private Sales Director",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "adriana.almeida@artsy.net",
  // },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Robin Roche",
    firstName: "Robin",
    jobTitle: "Senior Private Sales Director",
    bio:
      "Robin has 20+ years experience in modern, contemporary, and emerging art, including at Christie's (10 years), Gerald Peters Gallery (5 years), Auctionata and Artnet. She was instrumental in developing Artsy’s private sales business, and brokered our first 7-figure private sale.",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "robin.roche@artsy.net",
  },
  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Meave Hamill",
  //   firstName: "Meave",
  //   jobTitle: "Senior Advisor, Private Sales",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "meave@artsy.net",
  // },
  {
    specialty: "auctions",
    name: "Alan Zeng",
    firstName: "Alan",
    jobTitle: "Senior Specialist & Head of Street Art",
    bio:
      "At Artsy since 2020, Alan’s street art sales continuously set world auction records. Alan was previously Head of Street Art at Paddle8, where he led the company to great success. Alan holds an undergraduate degree from Baruch College, New York.",
    image: TEST_imageAuctions,
    email: "alan@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Celine Cunha",
    firstName: "Celine",
    jobTitle: "Specialist in Post-War & Contemporary Art",
    bio:
      "With 13+ years of experience, Celine specializes in emerging and post-war artist markets. Her background includes MoMA-PS1 and Christie’s, where she was a post-war and contemporary specialist focused on auction and private sales, and led corporate social responsibility initiatives. She holds a Contemporary Art Business degree from Christie’s Education, and a BA from Cornell University.",
    image: TEST_imageAuctions,
    email: "celine.cunha@artsymail.com",
  },
  {
    specialty: "priveteSalesAndAdvisory",
    name: "Caroline Perkins",
    firstName: "Caroline",
    jobTitle: "Advisor",
    bio:
      "Caroline advises collectors on buying and selling hard-to-access unique artworks. Her passion and foremost expertise is emerging and ultra contemporary artist markets. With Artsy since 2016, she holds a Bachelor of Arts in Art History from Wake Forest University.",
    image: TEST_imagePriveteSalesAndAdvisory,
    email: "caroline.perkins@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Lauren Carpinelli",
    firstName: "Lauren",
    jobTitle: "Specialist, Prints and Contemporary",
    bio:
      "With 14+ years in the auction industry, Lauren works with primary and secondary markets. Her focus is ultra-contemporary and established post-war markets for auction and private sale. In 2020, she established the Artsy Auctions division. She has worked across multiple auction houses, including as a specialist in the modern & contemporary department at Heritage Auctions.",
    image: TEST_imageAuctions,
    email: "lauren.carpinelli@artsy.net",
  },
  {
    specialty: "auctions",
    name: "Erica Lyon",
    firstName: "Erica",
    jobTitle: "Director of Business Strategy and Operations",
    bio:
      "Erica has 13 years experience in scaling nascent business lines to profitability, and a particular interest in developing and executing philanthropic partnerships with leading museums, nonprofits and institutions. She holds a BA from Wesleyan University and an MA from New York University.",
    image: TEST_imageAuctions,
    email: "erica@artsy.net",
  },
  // {
  //   specialty: "auctions",
  //   name: "Laura Martin",
  //   firstName: "Laura",
  //   jobTitle: "Specialist, Post-War & Contemporary",
  //   bio: "SOME BIO",
  //   image: TEST_imageAuctions,
  //   email: "laura.martin@artsy.net",
  // },
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "George King",
  //   firstName: "George",
  //   jobTitle: "Senior Advisor, Private Sales",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "george.king@artsy.net",
  // },
  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Alexander Forbes",
  //   firstName: "Alexander",
  //   jobTitle: "Head of Collector Services & Private Sales",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "alexander.forbes@artsy.net",
  // },
  // {

  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Daniela Bianco-Duppen",
  //   firstName: "Daniela",
  //   jobTitle: "Advisor",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "daniela.bianco-duppen@artsy.net",
  // },
  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Itziar Ramos Ricoy",
  //   firstName: "Meave",
  //   jobTitle: "Advisor",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "itziar.ramos@artsy.net",
  // },
  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Akilah Chandler",
  //   firstName: "Akilah",
  //   jobTitle: "Private Sales & Advisory Business Associate",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "akilah.chandler@artsymail.com",
  // },
  // {
  //   specialty: "priveteSalesAndAdvisory",
  //   name: "Sarah Punzel",
  //   firstName: "Sarah",
  //   jobTitle: "Private Sales Business Associate",
  //   bio: "SOME BIO",
  //   image: TEST_imagePriveteSalesAndAdvisory,
  //   email: "sarah.punzel@artsy.net",
  // },

  // {
  //   specialty: "collectorServices",
  //   name: "Wendy Wiberg",
  //   firstName: "Wendy",
  //   jobTitle: "Collector Services Lead",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "wendy.wiberg@artsy.net",
  // },
  // {
  //   specialty: "collectorServices",
  //   name: "Alexandra Freedman",
  //   firstName: "Alexandra",
  //   jobTitle: "Senior Manager, Collector Development",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "alexandra.freedman@artsy.net",
  // },
  // {
  //   specialty: "collectorServices",
  //   name: "Eleonora Leo",
  //   firstName: "Eleonora",
  //   jobTitle: "Senior Manager, Collector Services",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "eleonora.leo@artsy.net",
  // },
  // {
  //   specialty: "collectorServices",
  //   name: "Isabel Telonis",
  //   firstName: "Isabel",
  //   jobTitle: "Senior Manager, Collector Services",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "isabel.telonis@artsy.net",
  // },
  // {
  //   specialty: "collectorServices",
  //   name: "Vanessa Zingale",
  //   firstName: "Vanessa",
  //   jobTitle: "Senior Manager, Collector Services",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "vanessa.zingale@artsy.net",
  // },
  // {
  //   specialty: "collectorServices",
  //   name: "Caroline Targgart",
  //   firstName: "Caroline",
  //   jobTitle: "Client Development Manager",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "caroline.targgart@artsy.net",
  // },
  // {
  //   specialty: "collectorServices",
  //   name: "Dana Rodriguez",
  //   firstName: "Dana",
  //   jobTitle: "Associate, Collector Services",
  //   bio: "SOME BIO",
  //   image: TEST_CollectorServices,
  //   email: "dana.rodriguez@artsy.net",
  // },
]
