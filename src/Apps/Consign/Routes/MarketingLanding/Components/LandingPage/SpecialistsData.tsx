export type Specialty =
  | "auctions"
  | "priveteSalesAndAdvisory"
  | "collectorServices"

export interface SpecialistsData {
  specialty: Specialty
  imageUrl: string
  name: string
  firstName: string
  jobTitle: string
  bio: string
  email: string
}

export const CARD_WIDTH = 404
export const CARD_HEIGHT = 610
export const CARD_HEIGHT_MD = 557
export const CARD_HEIGHT_MOBILE = 418

export const SPECIALISTS: SpecialistsData[] = [
  {
    firstName: "Shlomi",
    name: "Shlomi Rabi",
    email: "shlomi.rabi@artsy.net",
    jobTitle: "Vice President, Head of Auctions",
    specialty: "auctions",
    bio:
      "Shlomi has 20+ years in the auction industry, with tenures at Phillips and Christie’s. He oversees Artsy’s auction partnerships and primary and secondary market auctions. Previously, he launched his own social impact auction platform, Greenhouse Auctions, which he sold to Artsy in 2021. He holds an MA from the School of the Art Institute of Chicago.",
    imageUrl: "https://files.artsy.net/images/Shlomi-Mobile.webp",
  },
  {
    firstName: "Jessica",
    name: "Jessica Backus",
    email: "jessica@artsymail.com",
    jobTitle: "VP, Collector Sales",
    specialty: "collectorServices",
    bio:
      "An early Artsy employee, Jessica has nearly 2 decades of experience in art and tech. Driven by a passion to help people connect with art they love, Jessica has launched multiple strategic initiatives to evolve and grow the art market. She began her career working with clients in Berlin at the gallery Peres Projects and worked at Phillips before joining Artsy. She holds a master’s degree in art history from Hunter and a bachelor’s degree from Columbia University.",
    imageUrl: "https://files.artsy.net/images/Jessica-Mobile.webp",
  },
  {
    firstName: "Christine",
    name: "Christine Aschwald",
    email: "christine.aschwald@artsymail.com",
    jobTitle: "Senior Director, Auctions and Private Sales",
    specialty: "auctions",
    bio:
      "Christine advises top-tier private collectors, blue-chip secondary market galleries, and the fiduciary community on buying and selling opportunities. With 17 years of experience, she brings long-standing relationships with top collectors and institutional clients from her time as VP at Christie’s client advisory department. She graduated from Williams College with a degree in Art History and Political Science.",
    imageUrl: "https://files.artsy.net/images/Christine-Mobile.webp",
  },
  {
    firstName: "Wendy",
    name: "Wendy Wiberg",
    email: "wendy.wiberg@artsymail.com",
    jobTitle: "Associate Director, Collector Services",
    specialty: "collectorServices",
    bio:
      "Wendy leads Artsy’s Collector Services team, helping collectors navigate buying and selling from Artsy’s global gallery, auction, and private sales networks. She joined Artsy in 2017 and holds a degree in art history and mathematics from Williams College.",
    imageUrl: "https://files.artsy.net/images/Wendy-Mobile.webp",
  },
  {
    firstName: "Daniela",
    name: "Daniela Bianco-Duppen",
    email: "daniela.bianco-duppen@artsymail.com",
    jobTitle: "Senior Advisor",
    specialty: "collectorServices",
    bio:
      "Daniela is fluent in French, Italian, and Spanish, and has over a decade of experience in the art industry including her own advisory practice based out of London, Milan & Brussels. Her expertise ranges from prints and multiples by pop artists such as Warhol and Haring to contemporary artists like Flora Yuknovick and Louis Fratino.",
    imageUrl: "https://files.artsy.net/images/Daniela-Mobile.webp",
  },
  {
    firstName: "Lauren",
    name: "Lauren Carpinelli",
    email: "lauren.carpinelli@artsymail.com",
    jobTitle: "Post-War & Contemporary Specialist",
    specialty: "auctions",
    bio:
      "With 14+ years in the auction industry, Lauren works with primary and secondary markets. Her focus is ultra-contemporary and established post-war markets for auction and private sale. In 2020, she established the Artsy Auctions division. She has worked across multiple auction houses, including as a specialist in the modern & contemporary department at Heritage Auctions.",
    imageUrl: "https://files.artsy.net/images/Lauren-Mobile.webp",
  },
  {
    firstName: "Meave",
    name: "Meave Hamill",
    email: "meave@artsymail.com",
    jobTitle: "Senior Advisor",
    specialty: "collectorServices",
    bio:
      "Meave has over 15 years of experience working at international auction houses, galleries, and institutions, including Christie’s, Paddle8, Aicon Gallery, and Museum of Art and Design, and has a master’s degree in art history and art world practice. She joined Artsy in 2016, and focuses on contemporary and ultra-contemporary art for collectors in Europe and Asia.",
    imageUrl: "https://files.artsy.net/images/Meave-Mobile.webp",
  },
  {
    firstName: "George",
    name: "George King",
    email: "george.king@artsymail.com",
    jobTitle: "Senior Advisor",
    specialty: "collectorServices",
    bio:
      "George has over a decade of experience in luxury markets. He specializes in post-war and contemporary art, and has helped numerous clients build valuable art collections by identifying emerging artists and trends. His deep understanding of the art market and personalized service have made him a trusted advisor to many collectors.",
    imageUrl: "https://files.artsy.net/images/George-Mobile.webp",
  },
  {
    firstName: "Eleonora",
    name: "Eleonora Leo",
    email: "eleonora.leo@artsymail.com",
    jobTitle: "Senior Manager, Collector Services",
    specialty: "collectorServices",
    bio:
      "Eleonora supports collectors bidding in auctions across Artsy. She previously worked at several galleries as well as Phillips Auctioneers in New York, and was formerly a field archeologist in her native Rome, Italy.",
    imageUrl: "https://files.artsy.net/images/Eleonora-Mobile.webp",
  },
  {
    firstName: "Erica",
    name: "Erica Lyon",
    email: "erica@artsymail.com",
    jobTitle: "Director, Business Strategy & Operations",
    specialty: "auctions",
    bio:
      "Erica has 13 years experience in scaling nascent business lines to profitability, and a particular interest in developing and executing philanthropic partnerships with leading museums, nonprofits and institutions. She holds a BA from Wesleyan University and an MA from New York University.",
    imageUrl: "https://files.artsy.net/images/Erica-Mobile.webp",
  },
  {
    firstName: "Laura",
    name: "Laura Martin",
    email: "laura.martin@artsymail.com",
    jobTitle: "Post-War & Contemporary Specialist",
    specialty: "auctions",
    bio:
      "Based in Los Angeles, Laura’s expertise spans the post-war market to more emerging talent, with an emphasis on artists from the West Coast. She previously worked as head of sales in post-war and contemporary art at Bonhams Los Angeles, and in client strategy at Christie’s New York, contributing to a number of record-breaking auctions. She holds a bachelor’s degree in art history from Chapman University, and a master’s degree in the modern and contemporary art market from Christie’s Education.",
    imageUrl: "https://files.artsy.net/images/Laura-Mobile.webp",
  },
  {
    firstName: "Caroline",
    name: "Caroline Perkins",
    email: "caroline.perkins@artsymail.com",
    jobTitle: "Advisor",
    specialty: "auctions",
    bio:
      "Caroline advises collectors on buying and selling hard-to-access unique artworks. Her passion and foremost expertise is emerging and ultra contemporary artist markets. With Artsy since 2016, she holds a Bachelor of Arts in Art History from Wake Forest University.",
    imageUrl: "https://files.artsy.net/images/Caroline-Mobile.webp",
  },
  {
    firstName: "Itziar",
    name: "Itziar Ramos Ricoy",
    email: "itziar.ramos@artsymail.com",
    jobTitle: "Advisor, Auctions and Private Sales",
    specialty: "auctions",
    bio:
      "Itziar is an accomplished art advisor committed to helping clients build exceptional collections that reflect their unique tastes and aspirations. Itziar joined Artsy in 2021, after 7+ years of experience in both private sales and auctions at Bonhams, specializing in modern, post-war, and contemporary art.",
    imageUrl: "https://files.artsy.net/images/Itziar-Mobile.webp",
  },
  {
    firstName: "Dana",
    name: "Dana Rodriguez",
    email: "dana.rodriguez@artsymail.com",
    jobTitle: "Collector Services Manager",
    specialty: "collectorServices",
    bio:
      "Dana facilitates and promotes sales between all channels at Artsy: private sales, galleries, and auctions. She has a master’s degree in modern and contemporary art: critical and curatorial studies from Columbia University, and has worked in museums, advisory, and academic settings.",
    imageUrl: "https://files.artsy.net/images/Dana-Mobile.webp",
  },
  {
    firstName: "Isabel",
    name: "Isabel Telonis",
    email: "isabel.telonis@artsymail.com",
    jobTitle: "Senior Manager, Collector Services",
    specialty: "collectorServices",
    bio:
      "Isabel supports collectors with sourcing, negotiating on, and acquiring artworks from galleries, having worked closely with Artsy’s robust gallery partner network since 2018. She holds a master’s degree in art business from Sotheby’s Institute of Art, and has professional experience at galleries, fairs, and museums.",
    imageUrl: "https://files.artsy.net/images/Isabel-Desktop.webp",
  },
  {
    firstName: "Alexssa",
    name: "Alexssa Todd",
    email: "alexssa.todd@artsymail.com",
    jobTitle: "Auction Partnerships Lead",
    specialty: "auctions",
    bio:
      "Alexssa has 12+ years of experience working in museums, galleries, nonprofits, and commercial auction houses. She currently leads Artsy’s benefit and commercial auction partnerships. She holds a bachelor’s degree from Drew University and a master’s degree from George Washington University.",
    imageUrl: "https://files.artsy.net/images/Alexssa-Mobile.webp",
  },
  {
    firstName: "Alan",
    name: "Alan Zeng",
    email: "alan.zeng@artsymail.com",
    jobTitle: "Head of Street Art",
    specialty: "auctions",
    bio:
      "At Artsy since 2020, Alan’s street art sales continuously set world auction records. Alan was previously Head of Street Art at Paddle8, where he led the company to great success. Alan holds an undergraduate degree from Baruch College, New York.",
    imageUrl: "https://files.artsy.net/images/Alan-Mobile.webp",
  },
]
