import { cloneDeep, extend } from "lodash"
import { ArticleData, ArticlePartner, ArticleSale } from "../Typings"
import {
  ClassicText,
  FeatureText,
  Media,
  SocialEmbedInstagram,
  SocialEmbedTwitter,
  Sponsor,
  StandardText,
} from "./Components"

export const ClassicArticle: ArticleData = {
  _id: "597b9f652d35b80017a2a6a7",
  author_id: "4f85e1b55ca0370001000072",
  partner_channel_id: "52d99185cd530e581300006c",
  partner_ids: ["52d99185cd530e581300006c"],
  author: {
    id: "4f85e1b55ca0370001000072",
    name: "Joanne Artman Gallery",
  },
  authors: [],
  layout: "classic",
  hero_section: null,
  thumbnail_title:
    "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple",
  email_metadata: {
    image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/wHFgQlrTrHav5O6bQRJ0dg%2FUntitled+Suspended_30x67x33+%282%29_sm+cropped.jpg",
    author: "Joanne Artman Gallery",
    headline:
      "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple",
  },
  send_body: false,
  tier: 2,
  tags: [],
  tracking_tags: [],
  published: true,
  fair_ids: [],
  fair_programming_ids: [],
  fair_artsy_ids: [],
  fair_about_ids: [],
  auction_ids: [],
  section_ids: [],
  featured: false,
  exclude_google_news: false,
  indexable: true,
  contributing_authors: [],
  is_super_article: false,
  channel_id: null,
  daily_email: false,
  weekly_email: false,
  keywords: ["Joanne Artman Gallery"],
  updated_at: "2017-07-28T20:38:05.709Z",
  title:
    "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple",
  lead_paragraph:
    "<p>Critics were skeptical of Bambi when it was first released in 1942—what was the point, they wondered, of a cartoon that ignored fantasy in favor of naturalistic forest landscapes?</p>",
  id: "597b9f652d35b80017a2a6a7",
  slug: "joanne-artman-gallery-poetry-naturerefinement-form",
  scheduled_publish_at: null,
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/wHFgQlrTrHav5O6bQRJ0dg%2FUntitled+Suspended_30x67x33+%282%29_sm+cropped.jpg",
  published_at: "2017-07-28T20:38:05.709Z",
  description:
    "The elegant spiral of the Nautilus shell, the sinuous pattern of the banks of a river, or the swirling vortex street of clouds - patterns exist on ev...",
  sections: [
    {
      type: "text",
      body:
        "<p>The elegant spiral of the Nautilus shell, the sinuous pattern of the banks of a river, or the swirling vortex street of clouds - patterns exist on every level in nature. Along with fractals, chaos theory is one of the essential, universal influences on patterns in nature. In essence, the theory shows how systems of chaotic, apparent randomness have an underlying pattern, or repetition.</p><p>The work of sculptor Matt Devine echoes the natural world, as the artist creates wonderfully complex works that resonate with both chaos and order. Perhaps this is why we can’t stop looking at Devine’s <em>Brass Tax</em>. Elevated by the use of a metallic finish, the piece is a minimalist refinement of nature, form and sequence.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "596aa2851a1e864d5eea6681",
          slug: "matt-devine-brass-tax",
          date: "",
          title: "Brass Tax",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/lSBz0tsfvOAm2qKdWwgxLw/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 1500,
          height: 2000,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>Long before chaos theory, scientists have hypothesized on the apparent beauty of the “irregular” in nature. In the 1841 edition of the American Repertory of Arts, Sciences and Manufactures (Volume 3), James Jay Mapes pens a deftly, eloquently written ode to the irregularities of our world, the stars, the oceans, the mountains and deserts. Mapes describes how our perceptions of beauty are built upon such irregularities - poignant breaks from any visible pattern, that are then captured and described in works of art. &nbsp;</p><p>“…the relative distances of the planets, their magnitudes, and the number of their satellites, conform to no known numerical law. The fixed stars exhibit no regular arrangement, either in their magnitudes, distances, or positions, but appear scattered at random across the sky. To descend to our own earth, no symmetry is traceable in the forms of island or continents, the courses of rivers, or the directions of mountain chains… In the “human face divine,” portrait painters affirm that the two sides never correspond; and even when the external form of an animal exhibits an appearance of bilateral or radiate symmetry, nature departs from it in her arrangement of the internal structure. In short, variety is a great and a most beautiful law of nature: it is that which distinguishes her productions from those of art, and it is that which man often exerts his highest efforts…to imitate.”</p><p>In a recent text, <em>Aesthetics of Ugliness: A Critical Edition</em> by Karl Rosenkranz, the author stipulates, that although “free multiplicity” is indeed beautiful, “regularity tires through its stereotypical sameness, which presents to us difference always in the same manner, so that we long to get out of its uniformity and into freedom, even if <em>in extremis</em> it is a chaotic freedom.”</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "57dc83ce139b212bd7000172",
          slug: "matt-devine-untitled-suspended",
          date: "",
          title: "Untitled Suspended",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/jDXiwSBgNP2eml1YkMIitg/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 3134,
          height: 2062,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>In both<em>Brass Tax</em>as well as<em>Untitled Suspended</em>, the words of Mapes and Rosenkranz can be seen to find their home, both pieces exhibiting a poetic, chaotic freedom, their beauty centered in their adherence to no prescriptive, formal pattern. The works seem entirely organic despite their true nature.</p>",
    },
    {
      type: "text",
      body: "Hello World",
    },
  ],
}

export const ClassicArticleManyAuthors = extend({}, ClassicArticle, {
  contributing_authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "First Author",
    },
    {
      id: "523783258b3b815f7100055a",
      name: "Second Author",
    },
    {
      id: "523783258b3b815f7100055a",
      name: "Third Author",
    },
  ],
})

export const ClassicArticleInternalChannel: ArticleData = {
  id: "5e3b232c77aee50020ddfb7f",
  title: "Consignments Intern",
  description:
    "Artsy’s mission is to expand the art market to support more artists and art in the world. Artsy has created the world’s largest two-sided art marketpl...",
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/QqdsjeaNSJcspGs0pEw_7A%2F18_11_09_Artsy_0377%2B0366%2B0386.jpg",
  thumbnail_title: "Consignments Intern",
  published_at: "2020-02-05T20:51:39.758Z",
  tags: [],
  tracking_tags: [],
  slug: "artsy-jobs-consignments-intern-02-05-20",
  layout: "classic",
  featured: false,
  channel_id: "578eb73cb5989e6f98f779a1",
  partner_channel_id: null,
  lead_paragraph:
    "<p>Artsy’s mission is to expand the art market to support more artists and art in the world. Artsy has created the world’s largest two-sided art marketplace, with more than 1,000,000 works by 100,000 artists from 4,000 of the world’s leading galleries, auction houses, art fairs, and institutions across 190 countries. </p>",
  keywords: [],
  published: true,
  email_metadata: {
    headline: "Consignments Intern",
    author: "Artsy Jobs",
    image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/e7TOhXLnd0vkNqtFRByrgQ%2F18_11_09_Artsy_0123.jpg",
  },
  author: {
    name: "Artsy Jobs",
  },
  authors: null,
  channel: {
    name: "Artsy Jobs",
  },
  sections: [
    {
      type: "text",
      body:
        '<p>We are currently seeking an analytical and driven Consignments Intern who will help grow this new Artsy business and provide guidance and expertise to collectors while selling their art.</p><p>The Consignments team is a recent area of business investment that aims to create more liquidity in the market and enable collectors to sell and rotate their collection more frequently, seamlessly and with the best outcome.</p><p>The Consignments Intern will be responsible for being the first person reviewing incoming Consignment property submissions, addressing inquiries from collectors via email and phone, as well as supporting the team of Specialists with a variety of administrative tasks. This is a unique opportunity for a professional early in their career in the art industry, who is eager to play an important role in growing a new business within Artsy. </p><p><br></p><h2>Key Responsibilities:</h2><ul><li>Review consignment submissions and ensuring that consignment requests are being evaluated promptly</li><li>Identify and surface high-value property and consignors to Specialists </li><li>Catalog consignment submissions data </li><li>Create consignment reports </li><li>Address consignment requests via email, phone and in-person requests</li><li>Log and synthesize feedback from clients</li><li>Track the status of Artsy’s consignments thorough follow-ups with partners and logging consignments outcomes </li></ul><p><br></p><h2>Candidate Qualifications:</h2><ul><li>0-3 years of professional experience (preferably in an auction house setting)</li><li>Background or experience in art market and/or art history - preferably with a focus on research, data or analytics</li><li>Excellent analytical skills and focus on process</li><li>Strong written and verbal communication skills</li><li>Ability to work on tight deadlines and under pressure</li><li>Comfort operating independently in a fast-paced environment</li><li>Proficiency in a language other than English is a plus, but not required</li><li>Solutions-oriented and go-getter mentality</li></ul><p><br></p><h2>To Apply:</h2><p>This position is a paid full-time, six month internship based in our Manhattan offices. To apply, please submit your resumé and a cover letter <strong><a href="https://grnh.se/298b49861">here</a>.</strong> </p><p><em>When you apply, you will be directed to a third party site.</em></p>',
    },
    {
      type: "text",
      body:
        "<h2>Artsy Values</h2><p>Artsy has five core values that will inform your experience at Artsy.</p><p><strong>Art x Science:</strong> We believe in uniting empathy with logic, emotion with data, and intuition with research in everything we do. Whether in business strategy or design, culture or code, we seek the magic that happens when the often separate worlds of art and science come together.</p><p><strong>People are Paramount:</strong> We spend extraordinary energy finding the best person for a job—and once found, we give them the trust and autonomy to be CEO of their role. We avoid pointless bureaucracy and prefer to empower people with information rather than limit them with process.</p><p><strong>Quality Worthy of Art:</strong> We aim to create an experience worthy of all the world’s art and so hold ourselves to the highest standards in all our work. We believe that the best long term quality comes from rapid shipping, iterating, and learning as we go.</p><p><strong>Positive Energy:</strong> We know positivity and optimism benefit our work, and we harness positive energy as a vehicle towards greater awareness, growth, and collaboration. We believe in cultivating a positive relationship to art as opposed to one based on exclusivity or scarcity.</p><p><strong>Openness:</strong> We believe in being open with each other and the world—whether in open-sourcing our code, sharing feedback, or building a diverse and inclusive work culture. We believe in bringing our full selves to work and manifesting an open world where everyone has access to art.</p><p><em>Artsy is an equal opportunity employer. We value a diverse workforce and an inclusive culture. We encourage applications from all qualified individuals without regard to race, color, religion, gender, sexual orientation, gender identity or expression, age, national origin, marital status, disability, and veteran status.</em></p>",
    },
  ],
}

export const ClassicArticlePartner: ArticlePartner = {
  default_profile_id: "contessa-gallery",
  name: "Contessa Gallery",
  type: "Gallery",
  profile: {
    id: "contessa-gallery",
    href: "/contessa-gallery",
    image: {
      cropped: {
        url:
          "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=250&height=165&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FOyZ08tRGQ1k-ue1nk06vlQ%2Fsquare.jpg",
      },
    },
  },
}

export const ClassicArticleSale: ArticleSale = {
  id: "ici-benefit-auction-2019",
  name: "ICI: Benefit Auction 2019",
  href: "/auction/ici-benefit-auction-2019",
  cover_image: {
    cropped: {
      url:
        "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=250&height=165&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FLp8BFIM7yd8AspTZJz-MGg%2Flarge_rectangle.jpg",
    },
  },
}

export const ClassicArticlePromotedContent: ArticleData = {
  id: "5da49b750c2c190020d70d2d",
  title: "ICI: Benefit Auction 2019 Curatorial Committee Picks",
  search_title: null,
  social_title: null,
  description:
    "On the occasion of its 2019 Annual Benefit & Auction, Independent Curators International (ICI) has assembled the inaugural Benefit Auction Curatorial ...",
  search_description: null,
  social_description: null,
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/M9D3a0es2TBNztvPs_dIAQ%2FShrobe%2C+David.jpg",
  thumbnail_title: "ICI: Benefit Auction 2019 Curatorial Committee Picks",
  social_image: null,
  published_at: "2019-10-14T18:52:13.138Z",
  tags: [],
  tracking_tags: [],
  slug:
    "independent-curators-international-ici-benefit-auction-2019-curatorial-committee-picks",
  layout: "classic",
  featured: false,
  channel_id: "5759e4d7b5989e6f98f77997",
  partner_channel_id: null,
  auction_ids: ["5d9664fafe84d100122ed257", "5d9b78f801c2c900126c1954"],
  partner_ids: null,
  lead_paragraph: "",
  indexable: true,
  keywords: [],
  published: true,
  postscript: null,
  is_super_article: false,
  is_super_sub_article: false,
  sponsor: {
    partner_dark_logo: null,
    partner_light_logo: null,
    partner_condensed_logo: null,
    partner_logo_link: null,
    pixel_tracking_code: null,
  },
  seriesArticle: null,
  super_article: null,
  email_metadata: {
    headline: "ICI: Benefit Auction 2019 Curatorial Committee Picks",
    author: "Independent Curators International",
    image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/M9D3a0es2TBNztvPs_dIAQ%2FShrobe%2C+David.jpg",
  },
  author: {
    name: "Independent Curators International",
  },
  authors: null,
  channel: {
    name: "Artsy Auctions",
  },
  contributing_authors: [],
  vertical: null,
  news_source: {
    title: null,
    url: null,
  },
  media: {
    url: null,
    credits: null,
    description: null,
    cover_image_url: null,
    published: null,
    duration: null,
    release_date: null,
  },
  series: null,
  hero_section: null,
  sections: [
    {
      type: "text",
      body:
        '<p>On the occasion of its <a href="https://www.artsy.net/feature/ici-benefit-auction-2019">2019 Annual Benefit &amp; Auction</a>, Independent Curators International (ICI) has assembled the inaugural <strong>Benefit Auction Curatorial Committee</strong>, composed of <strong>Magali Arriola</strong>, <strong>Matthew Higgs</strong>, <strong>Barbara London</strong>, <strong>Larry Ossei-Mensah</strong>, <strong>Tumelo Mosaka</strong>, <strong>Paul Schimmel</strong> and <strong>Franklin Sirmans</strong>.</p>',
    },
    {
      type: "text",
      body:
        "<p>The Benefit Auction Curatorial Committee has provided advice and assistance in the creation of a unique Benefit Auction, adding their voices and endorsement to the generosity of artists who support ICI's mission and programs. </p>",
    },
    {
      type: "text",
      body:
        "<p><strong>ICI: Benefit Auction 2019 Curatorial Committee Picks</strong></p>",
    },
    {
      type: "text",
      body:
        "<p>1.<strong> Magali Arriola</strong>, Director, Museo Tamayo, Mexico City, Mexico</p>",
    },
    {
      type: "text",
      body:
        '<p>Pablo Vargas Lugo is representing Mexico in the Mexican National Pavilion at the Venice Biennale, curated by Arriola. </p><p>"Vargas Lugo\'s work has always put forth fortuitous and unlikely encounters. His interest in the ancient and the sacred, cartography and astronomy, secret societies and science fiction, has allowed him to displace the hierarchies and classifications that structure Western thought. His practice speculates about what happens when the left hand is unaware of what the right hand does, when numbers operate like letters, or when during the course of one day, time is fractured into arbitrary and indivisible units, reimagining thereby the rites and conventions that shape our cultural imaginary." - Magali Arriola</p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce86f2f7f58000ee2657b",
          slug: "pablo-vargas-lugo-no-imago",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/9sPuiCmlJ8436sqTensu-A/larger.jpg",
          title: "No imago",
          date: "2016",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Pablo Vargas Lugo",
              slug: "pablo-vargas-lugo",
            },
          ],
          artist: {
            name: "Pablo Vargas Lugo",
            slug: "pablo-vargas-lugo",
          },
          width: 2000,
          height: 2698,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>2.<strong> Mathew Higgs</strong>, Director and Chief Curator, White Columns, New York, NY</p><p>Neil Winokur's <em>Andy Warhol</em> was included in the ICI exhibition: <em>Likeness: Portraits of Artists by other Artists</em> (2004–2006), curated by Matthew Higgs. </p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce871fbeac100113269d0",
          slug: "neil-winokur-andy-warhol",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/q5BueTqqcv6mpl_Gr32ZUg/larger.jpg",
          title: "Andy Warhol",
          date: "1982",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Neil Winokur",
              slug: "neil-winokur",
            },
          ],
          artist: {
            name: "Neil Winokur",
            slug: "neil-winokur",
          },
          width: 2000,
          height: 2545,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>3.<strong> Barbara London</strong>, Independent Curator</p><p>"Marina Rosenfeld is a New York-based composer, sound and visual artist who pushes the definition of what Contemporary art can be. Her drawing is related to her environmental sonic work Music Stand, featured in ICI’s touring exhibition, “Seeing Sound.” The drawing and installation are based on the concept that a site may involve a continuous and simultaneous recording and playback, an acoustic environment where a constant production and dispersal of data is subject to a series of delays and to the native distortion of the gallery and the viewer’s mind." - Barbara London</p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce86c0f01e1000e492877",
          slug: "marina-rosenfeld-untitled-deathstar-notation-p-50",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/48m0ZmcozydFWrCW4AzzDg/larger.jpg",
          title: "Untitled (Deathstar notation p. 50)",
          date: "2017",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Marina Rosenfeld",
              slug: "marina-rosenfeld",
            },
          ],
          artist: {
            name: "Marina Rosenfeld",
            slug: "marina-rosenfeld",
          },
          width: 2000,
          height: 1530,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>4. <strong>Larry Ossei-Mensah</strong>, Senior Curator, Museum of Contemporary Art Detroit (MoCAD), Detroit</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce86606f50b0012c4432c",
          slug: "david-shrobe-moment-to-see",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/_f8jgZZy4q6ag14gYzjeaQ/larger.jpg",
          title: "Moment to See",
          date: "2019",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "David Shrobe",
              slug: "david-shrobe",
            },
          ],
          artist: {
            name: "David Shrobe",
            slug: "david-shrobe",
          },
          width: 3496,
          height: 4000,
        },
      ],
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9cf074985cb5000d0a7736",
          slug: "amoako-boafo-yaw-abedi",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/XITMc6Bfw1aQcOCl2RHfuQ/larger.jpg",
          title: "Yaw Abedi",
          date: "2019",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Amoako Boafo",
              slug: "amoako-boafo",
            },
          ],
          artist: {
            name: "Amoako Boafo",
            slug: "amoako-boafo",
          },
          width: 2691,
          height: 3818,
        },
      ],
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce86b0f01e1000e492872",
          slug: "lakela-brown-triangle-composition-with-bamboo-earrings",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/FAwt5X2Abdn1iKIWMp1nVg/larger.jpg",
          title: "Triangle composition with Bamboo Earrings",
          date: "2018",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "LaKela Brown",
              slug: "lakela-brown-1",
            },
          ],
          artist: {
            name: "LaKela Brown",
            slug: "lakela-brown-1",
          },
          width: 2000,
          height: 2394,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>5. <strong>Tumelo Mosaka</strong>, Independent Curator</p><p>"Paul Pfeiffer’s digitally manipulated photographs amplify the racial challenges confronting black athletes today. In the photographs, the black male body is isolated and frozen to question the bias and racism at the core of sports and entertainment business." - Tumelo Mosaka</p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9cf074fc022b000d29bec8",
          slug: "paul-pfeiffer-four-horseman-of-the-apocalypse-8",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/8Ny4AftChgf-yEYDIFUebA/larger.jpg",
          title: "Four Horseman of the Apocalypse (8)",
          date: "2001/2018",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Paul Pfeiffer",
              slug: "paul-pfeiffer",
            },
          ],
          artist: {
            name: "Paul Pfeiffer",
            slug: "paul-pfeiffer",
          },
          width: 1050,
          height: 1340,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>"Nate Young’s works at first glance looks incomprehensible and inaccessible. Despite this formal look, Young offers complex forms and shapes excavated from familial histories. He is interested in reflecting on absence as a kind of potential space for re-imagination of our own histories." - Tumelo Mosaka</p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce871734442000d5726be",
          slug: "nate-young-reliquary-for-a-declaration-no-4",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/rtqAwJfwlyv4lmg3OEzykA/larger.jpg",
          title: "Reliquary for a Declaration No. 4",
          date: "2015",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Nate Young",
              slug: "nate-young",
            },
          ],
          artist: {
            name: "Nate Young",
            slug: "nate-young",
          },
          width: 800,
          height: 1200,
        },
      ],
    },
    {
      type: "text",
      body: "<p>6.<strong> Paul Schimmel</strong>, Independent Curator</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9cf07488dcf20012c05b7a",
          slug: "rachel-rose-failing-at-the-4th-dimension",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/9Dx5YT1ITDfI7ey3LrJvTA/larger.jpg",
          title: "Failing at the 4th Dimension",
          date: "2017",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Rachel Rose",
              slug: "rachel-rose",
            },
          ],
          artist: {
            name: "Rachel Rose",
            slug: "rachel-rose",
          },
          width: 6925,
          height: 2400,
        },
      ],
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9cf074985cb5000d0a7736",
          slug: "amoako-boafo-yaw-abedi",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/XITMc6Bfw1aQcOCl2RHfuQ/larger.jpg",
          title: "Yaw Abedi",
          date: "2019",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Amoako Boafo",
              slug: "amoako-boafo",
            },
          ],
          artist: {
            name: "Amoako Boafo",
            slug: "amoako-boafo",
          },
          width: 2691,
          height: 3818,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>7.<strong> Franklin Sirmans</strong>, Director, Perez Art Museum in Miami (PAMM), Miami, FL</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce86ab6952d000e283e56",
          slug: "christo-wrapped-fountain-project-for-la-fontana-de-jujol",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/a6rvKCJbXyyuHX91miGZbg/larger.jpg",
          title: 'Wrapped Fountain (Project for "La Fontana de Jujol")',
          date: "2009",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Christo",
              slug: "christo",
            },
          ],
          artist: {
            name: "Christo",
            slug: "christo",
          },
          width: 2000,
          height: 1626,
        },
      ],
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "5d9ce871734442000d5726be",
          slug: "nate-young-reliquary-for-a-declaration-no-4",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/rtqAwJfwlyv4lmg3OEzykA/larger.jpg",
          title: "Reliquary for a Declaration No. 4",
          date: "2015",
          partner: {
            name: "Independent Curators International (ICI) Benefit Auction",
            slug: null,
          },
          artists: [
            {
              name: "Nate Young",
              slug: "nate-young",
            },
          ],
          artist: {
            name: "Nate Young",
            slug: "nate-young",
          },
          width: 800,
          height: 1200,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>The creation of the Benefit Auction Curatorial Committee is ICI's latest effort to honor the generosity of artists by developing collaborations with curators, galleries, collectors and others to maximize the power of each donation. ICI was among the first non-profits to collaborate with Artsy, and since 2013 the organisation has always offered artists the choice to receive up to 20% of the sale of their donated works. </p>",
    },
  ],
  relatedArticlesPanel: null,
  relatedArticlesCanvas: [
    {
      id: "5e4473584ce5d4001f875061",
      layout: "standard",
      slug:
        "artsy-editorial-artwork-changed-life-graciela-iturbides-nuestra-senora-de-las-iguanas",
      thumbnail_title:
        "This Artwork Changed My Life: Graciela Iturbide’s “Nuestra Señora de Las Iguanas”",
      thumbnail_image:
        "https://artsy-media-uploads.s3.amazonaws.com/NpQ6kzl0vmFiqWuXjWwrPg%2Fcustom-Custom_Size___graciela-iturbide-senora-de-las-iguanas-juchitan-1979-2-2.jpg",
      published_at: "2020-02-18T13:00:00.000Z",
      contributing_authors: [
        {
          name: "Eva Recinos",
        },
      ],
      authors: [
        {
          name: "Eva Recinos",
        },
      ],
    },
    {
      id: "5e45c710cbcccc0022fb8250",
      layout: "standard",
      slug:
        "artsy-editorial-meteoric-rise-gallerist-mariane-ibrahim-champion-african-diasporic-art",
      thumbnail_title:
        "The Meteoric Rise of Gallerist Mariane Ibrahim, Champion of African Diasporic Art ",
      thumbnail_image:
        "https://artsy-media-uploads.s3.amazonaws.com/KTtcjL8YBanpMY-QtimfiA%2Fcustom-Custom_Size___Mariane+Ibrahim_Credit+Sofia+Giner.jpeg",
      published_at: "2020-02-17T20:00:00.000Z",
      contributing_authors: [
        {
          name: "Claire Voon",
        },
      ],
      authors: [
        {
          name: "Claire Voon",
        },
      ],
    },
    {
      id: "5e4a9fc6902fb90020def94b",
      layout: "standard",
      slug: "artsy-editorial-sold-frieze-los-angeles-02-17-20",
      thumbnail_title: "What Sold at Frieze Los Angeles",
      thumbnail_image:
        "https://artsy-media-uploads.s3.amazonaws.com/tITBg0kPG57qeiTztnYGRQ%2Fcustom-Custom_Size___SINGA102319-hires.jpg",
      published_at: "2020-02-17T16:37:41.336Z",
      contributing_authors: [
        {
          name: "Benjamin Sutton",
        },
      ],
      authors: [
        {
          name: "Benjamin Sutton",
        },
      ],
    },
    {
      id: "5e46ecea429fe000208a3265",
      layout: "standard",
      slug:
        "artsy-editorial-contemporary-artists-washington-crossing-delaware-challenge-history",
      thumbnail_title:
        "How Contemporary Artists Have Used “Washington Crossing the Delaware” to Challenge History ",
      thumbnail_image:
        "https://artsy-media-uploads.s3.amazonaws.com/0buCA8pPqOWO9gFcz-q85Q%2Fcustom-Custom_Size___06.+Resurgence+of+the+People_2019.jpg",
      published_at: "2020-02-14T22:56:24.223Z",
      contributing_authors: [
        {
          name: "Alexxa Gotthardt",
        },
      ],
      authors: [
        {
          name: "Alexxa Gotthardt",
        },
      ],
    },
  ],
  relatedArticles: null,
  sale: ClassicArticleSale,
}

export const StandardArticle: ArticleData = {
  id: "594a7e2254c37f00177c0ea9",
  title: "New York's Next Art District",
  slug: "new-yorks-next-art-district",
  contributing_authors: [
    // deprecated
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
      bio:
        "[Casey Lesser](http://artsy.net) is a well-known author and a long-time baker.",
      twitter_handle: "caseylesser",
    },
  ],
  published_at: "2017-05-19T13:09:18.567Z",
  thumbnail_title: "New York's Next Art District",
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
  layout: "standard",
  vertical: {
    name: "Art Market",
    id: "12345",
  },
  description:
    "Land exhibitions, make influential contacts, and gain valuable feedback about your work.",
  sections: [
    {
      type: "text",
      body:
        "<p><a href='https://www.artsy.net/artist/pablo-picasso'>What would Antoine Court</a>’s de Gébelin think of the Happy Squirrel? </p><p>De Gébelin was a Protestant minister born in the 18th century. He authored the multi-volume tome <em>Le Monde primitif</em>, which insisted that the tarot deck contained secrets of the ancient Egyptians, whose priests had distilled their occult wisdom into the cards’ illustrations, imbuing them with great mystical power. Before that point, tarot was primarily a card game—meant for fun, not prophecy.</p><p>It was a bold and somewhat absurd assertion, given that de Gébelin could not read Egyptian hieroglyphics (no one could at the time, since they weren’t deciphered until the 19th century). Despite a total lack of historical evidence to back his claim, the theory stuck: Tarot decks, once a novelty, became popular tools for divination after the publication of de Gébelin’s book.</p><p>Which brings us back to the Happy Squirrel, a relatively recent addition to the tarot’s Major Arcana, and one whose provenance is less hazy: it originated on season six of <em>The Simpsons</em>. Lisa visits a fortune teller who is unconcerned when Lisa picks Death, but gasps in horror when the next card she draws is the Happy Squirrel. (When Lisa asks if the fuzzy rodent is a bad sign, the fortune teller demurs, saying that “the cards are vague and mysterious.”) Although it began as a cartoon joke, the Happy Squirrel card has made its way into over a dozen commercially available tarot decks. </p><p>So what would de Gébelin’s reaction be? The answer depends on whether tarot is a collection of timeless, mystical wisdom—or a flexible framework that has endured by changing with the times. Although tarot imagery employs supposedly universal archetypes, new decks are constantly being invented, and old decks altered. The art of tarot cards can never fully transcend its milieu. Which begs a second question: How do the cards’ art and design relate to the social changes, technological advances, and aesthetic sensibilities of their particular eras?</p>",
    },
    {
      type: "text",
      body:
        "<h3><strong>Galleries Section, Booth 10221</strong></h3><h2>neugerriemschneider</h2><h3>With works by Franz Ackermann, Ai Weiwei, Pawel Althamer, Billy Childish, Keith Edmier, Olafur Eliasson, Andreas Eriksson, Noa Eshkol, Mario García Torres, Renata Lucas, Michel Majerus, Mike Nelson, Jorge Pardo, Elizabeth Peyton, Tobias Rehberger, Thaddeus Strode, Rirkrit Tiravanija, Pae White</h3><p>The resultant work allows Salley the chance to recount her experiences of the aftermath of her scandal in her own words. In the film, Fujiwara and Salley are shown meeting professionals from public relations, advertising, and fashion companies as they seek to construct a new public image for her. Alongside the film, light boxes display fashion photographer Andreas Larsson’s pictures of Salley, which were taken as part of the project to rebuild her profile. While the show tackles public identity, female iconography, and Salley’s voice as an artist, the pair’s close working relationship—one in which the conventional power relationship has been overturned—no doubt aided their collaboration.</p>",
    },
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>The fixed stars exhibit no regular arrangement, either in their magnitudes, distances, or positions.</blockquote>",
    },
    {
      type: "text",
      body: "<h2>A Wealthy Family’s Trick-Taking Game</h2>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      title: "A World Without Capitalism",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/5ZP7vKuVPqiynVU0jpFewQ%2Funnamed.png",
          type: "image",
          width: 600,
          height: 1067,
          caption:
            "<p>John Elisle, <em>The Star</em>, from the reimagined female Tarot cards. Courtesy of the artist. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/PcvH_rh89gRGxRXgCyGGng%2Funnamed-5.png",
          type: "image",
          width: 600,
          height: 1067,
          caption:
            "<p>John Elisle, <em>The Magician</em>, from the reimagined female Tarot cards. Courtesy of the artist. </p>",
        },
        {
          type: "artwork",
          id: "596aa2851a1e864d5eea6681",
          slug: "matt-devine-brass-tax",
          date: "2000",
          title: "Brass Tax",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/lSBz0tsfvOAm2qKdWwgxLw/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 1500,
          height: 2000,
          credit: "Courtesy of The Metropolitan Museum of Art",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Despite their aura of mystery, medieval tarot cards were not used for divination, and were probably <em>not</em> created by ancient Egyptian magicians. The earliest surviving tarot decks—now preserved in various museum collections—are Italian, and were commissioned by wealthy patrons, the same way one might have hired an artist to paint a portrait or illuminated prayerbook. </p><p>The Visconti-Sforza Tarot is a collection of decks, none complete, commissioned by the Visconti and Sforza families from the workshop of Milanese court painter Bonifacio Bembo. Cards such as Death, who rides a horse and swings a giant scythe like a player in the world’s most high-stakes polo match, will seem familiar to contemporary enthusiasts. So will the Pope, who sits on a golden throne; and the Lovers, who hold hands beneath a string of heraldic flags. Rather than looking to these cards for mystic guidance, the Visconti and Sforza families would have used them to play a trick-taking card game similar to modern-day Bridge. (Although it’s unlikely—given the good condition of the decks—that they were ever handled with much frequency).</p><p>The cards each have intricately tooled gold backgrounds that glow like the luxury items that they were. Bembo is believed to have included portraits of the families in many of the cards, as well as adding the Visconti family motto here and there for good measure. Akin to the work of <a href="https://www.artsy.net/artist/fra-angelico">Fra Angelico</a> and other early-Renaissance artists, the cards are opulent but pictorially flat, although the bodies appear in naturalistic perspective and their clothing billows around them, suggesting volume and form. </p><p><br></p><h2>The 18th-Century Conver Classic</h2>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/GwIVCQftjauWBCQie9oQ-A%2FTarot_de_Marseille_major21_world.jpg",
          type: "image",
          width: 320,
          height: 620,
          caption:
            "<p>Nicolas Conver, Tarot card from Tarot de Marseille, ca. 1760. Via Wikimedia Commons. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/UaNPuL9iz-X7Xm-SNtat7Q%2FTarot_de_Marseille_clubs13_queen.jpg",
          type: "image",
          width: 320,
          height: 620,
          caption:
            "<p>Nicolas Conver, <em>Queen of Clubs</em>. Tarot card from Tarot de Marseille, ca. 1760. Via Wikimedia Commons. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/x5EcmVNBKoUJqQa8BQgqJA%2FTarot_de_Marseille_major06_lovers.jpg",
          type: "image",
          width: 320,
          height: 620,
          caption:
            "<p>Nicolas Conver, Tarot card from Tarot de Marseille, ca. 1760. Via Wikimedia Commons. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Produced in 1760, French engraver Nicolas Conver’s deck of delicate woodcuts, the Tarot de Marseille, is the template on which many contemporary decks are based. Like the Visconti-Sforza Tarot, the deck’s design likely originated in 15th-century Italy before traveling north to France. It’s a favorite of many tarot enthusiasts, most notably the cult film director Alejandro Jodorowsky, who <a href="http://www.nytimes.com/2011/11/13/fashion/alejandro-jodorowsky-and-his-tarot-de-marseille.html?mcubz=1">designed his own deck</a> based on the style. While the Conver deck wasn’t the first to be called the Tarot de Marseille, it’s highly prized by collectors for its delicate color palette of sky blues and minty greens. The graphic black outlines and blunt shading of the prints give the cards a simple and rough-hewn appearance, which adds to the ambience of ancient wisdom. The popularity of the tarot grew due to advances in printing technology and via the writings of 19th-century French occultists such as Éliphas Lévi and Etteilla, which popularized the use of tarot as a method of fortune-telling and assigned additional divinatory meaning to the cards.</p><p><br></p><h2>The New Mystics</h2>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
          type: "image",
          width: 1152,
          height: 826,
          caption:
            "<p>Pamela Colman Smith, <em>The Empress</em>, c. 1937. Courtesy of the Beinecke Rare Book &amp; Manuscript Library at Yale University.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The Rider-Waite Smith deck, which debuted in 1909, remains the most recognizable and popular today. Designed by artist Pamela Colman Smith under the direction of the mystic A.E. Waite, it was the first to be mass-produced in English, and was intended for divination rather than gameplay. Smith and Waite were both active members of the Order of the Golden Dawn, a secretive organization devoted to the exploration of the paranormal and occult (allegedly Bram Stoker, Aleister Crowley, and Sir Arthur Conan Doyle were also members). </p><p>In addition to Smith’s occult bonafides, she was also an accomplished artist, championed by <a href="https://www.artsy.net/artist/alfred-stieglitz">Alfred Stieglitz</a>, who collected her work and showed it at his gallery. Smith created fully-realized illustrations of all 78 cards that made the deck a treasure-trove for cartomancers, who now had a much richer store of images to work with. (Previously, only the 22 Major Arcana cards such as the Fool, the Magician, and the Lovers had been elaborately illustrated—traditionally, the Minor Arcana cards, which are roughly analogous to the suits in a deck of modern playing cards, were not.) The Major Arcana were based on the Tarot de Marseille drawings, but rendered in an illustrative <a href="https://www.artsy.net/gene/art-nouveau">Art Nouveau</a> style rich with patterns. Even the Fool looks debonaire; he carelessly approaches the cliff, a feather in his cap and a blooming rose in his elegant fingers, wearing a floral tunic that looks straight out of <a href="https://www.artsy.net/artist/william-morris">William Morris</a>’s workshop.</p><p><br></p><h2>An Occultist’s Pure Geometry</h2>',
    },
    {
      mobile_height: 1300,
      height: 1000,
      url: "http://files.artsy.net/documents/1parrasch.html",
      layout: "overflow_fillwidth",
      type: "embed",
    },
    {
      type: "text",
      body:
        '<p>The Thoth deck, named for the Ibis-faced Egyptian god more commonly known as Horus, was painted by the artist Frieda Harris based on direction from the infamous occultist-about-town Aleister Crowley. Completed in the early 1940s, but not widely available until 1969, it features <a href="https://www.artsy.net/gene/art-deco">Art Deco</a> borders resembling the pattern of a butterfly wing. </p><p>The deck is an aesthetic departure from the Rider-Waite’s homey <a href="https://www.artsy.net/gene/arts-and-crafts-movement">Arts and Crafts</a> aesthetic. Shaped by Harris’s interest in pure geometry, the cards are reminiscent of the work of Swedish painter <a href="https://www.artsy.net/artist/hilma-af-klint">Hilma af Klint</a> (a visionary artist who shared Harris’s interest in spiritualism and the writings of Austrian philosopher Rudolf Steiner, both popular subjects of study among the middle and upper classes in the early 20th century). Harris’s shaded orbs and compass-inscribed curves that fill the background of each card bear more than a passing resemblance to Klint’s highly-saturated geometries. Klint, considered by some to be Europe’s first abstract painter, believed that her luminous compositions were the created under the influence of spirits. (The same could easily be said of Harris because she was taking direction from Crowley, who was believed to be a medium, able to channel ancient and magical forces.) </p><p>It’s no coincidence that Klint’s paintings and Harris’s Thoth illustrations were shown in the same pavilion at the 2013 Venice Biennale, which was intended to amplify voices that had previously been excluded and “cover 100 years of dreams and visions,” <a href="http://www.nytimes.com/2013/05/26/arts/design/massimiliano-gioni-of-venice-biennale.html">according</a> to curator Massimiliano Gioni.</p><p><br></p><h2>Sex &amp; Self-Help, ’70s Style</h2>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/jmrvzuo7VfRidule-4zWNA%2F07272017170054-0001+%28dragged%29+copy.jpg",
          type: "image",
          width: 405,
          height: 723,
          caption:
            "<p>Bill Greer and Lloyd Morgan, card from Morgan-Greer Tarot, 1979. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/66XOTGwZQzAAa0igYKSNTQ%2F07272017170207-0001+%28dragged%29.jpg",
          type: "image",
          width: 407,
          height: 719,
          caption:
            "<p>Bill Greer and Lloyd Morgan, card from Morgan-Greer Tarot, 1979. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/l0Qu946mLja0Dbv4ME4MHg%2F07272017170259-0001+%28dragged%29.jpg",
          type: "image",
          width: 413,
          height: 721,
          caption:
            "<p>Bill Greer and Lloyd Morgan, card from Morgan-Greer Tarot, 1979. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Created by the artist Bill Greer under the direction of Lloyd Morgan, the Morgan-Greer deck is, like the 1970s themselves, both opulent and optimistic. The Magician sports a mustache that would make Tom Selleck blush, and the naked and embracing Lovers would fit right in with the hirsute and curvaceous illustrations in the original 1972 edition of <em>The Joy of Sex</em>.</p><p>The ‘70s enthusiasm for all things New Age created a renewed interest in tarot as a tool for self-discovery, and the Morgan Greer deck was there to greet it. The cards’ colors are lush and the lines are fluid. Greer chose to crop his figures tightly and removed the borders, allowing the illustrations to extend to the edges. The effect is fresh and personal. Formally, the Morgan-Greer illustrations have more in common with Jefferson Starship’s <em>Spitfire</em> (1976) album cover than with contemporary painting of the same period—the pendulum had swung away from figuration and would take a few years longer to swing back—but it’s possible to find a resonance between this deck’s art and a work like <a href="https://www.artsy.net/artist/judy-chicago">Judy </a><a href="https://www.artsy.net/artist/judy-chicago">Chicago</a>’s <em>Dinner Party </em>(1979), with its powerful goddess and blooming flowers. Greer’s strong women and frank sexuality make the deck very much of its time.</p><p><br></p><h2>Minimalism &amp; Identity in the Present Day</h2>',
    },
    {
      type: "image_set",
      layout: "full",
      title: "The Work of Bruce M. Sherman",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/CzofaZln2q-XhtXFqIio5A%2F07272017133815-0001+%28dragged%29+copy.jpg",
          type: "image",
          width: 396,
          height: 719,
          caption: "<p>King Khan, card from the Black Power Tarot. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/z7BUiIKCStBxlcXh53t0Xg%2F07272017133730-0001+%28dragged%29+copy.jpg",
          type: "image",
          width: 396,
          height: 728,
          caption: "<p>King Khan, card from the Black Power Tarot. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/T9g-NNJcmy8ej6qV6UQ-fA%2F07272017133839-0001.jpg",
          type: "image",
          width: 392,
          height: 718,
          caption: "<p>King Khan, card from the Black Power Tarot. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer, the Dreslyn tarot is the epitome of techno-minimalism. Although the deck is lovingly printed with high-gloss embossing, its illustrations are simple enough to be mistaken for the icon of an elegant iPhone app. It’s a radical departure from the historical approach, where each card is full to bursting with details, signs, and symbols—instead, each card has been paired down the bare minimum. The Dreslyn’s Lovers image is just two slender circles bisecting a line; its Eight of Wands is simply eight diagonal rules. The deck’s aesthetic mirrors the contemporary fear of clutter, as well as the increasing simplicity of the interfaces we use every day.</p><p>Tarot decks have also increasingly become more personal, and occasionally political, while reflecting a greater diversity. Illustrator John Elisle, in a commission for Missy Magazine, created seven all-women tarot cards, a chic sci-fi universe that includes a dominatrix Devil and a psychedelic High Priestess.</p>",
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/Gk95i1tUaDJKeqQ-jcq6Cw%2FIMG_2142.jpg",
          type: "image",
          width: 5184,
          height: 3456,
          caption:
            "<p>Designed by Kati Forner for The Dreslyn, courtesy of the artist. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>The Black Power Tarot was conceived by musician King Khan in consultation with Alejandro Jodorowsky, and designed by illustrator Michael Eaton in 2015. The deck celebrates the strength and achievements of Black musicians, artists, and activists while staying faithful to the imagery and composition of the classic Tarot de Marseilles. The familiar faces of Malcolm X, James Brown, Tina Turner, Howlin’ Wolf, Sister Rosetta Tharpe, and others emerge from the Major Arcana. Sun Ra is there too, appropriately imagined as the Sun card. At a time when Black Americans are at a high risk of being the victims of state-sponsored violence, the Black Power Tarot feels especially urgent. By situating these figures within a centuries-old framework of esoteric wisdom, Khan affirms their value and influence, the importance of their legacy. By placing them on cards used for fortune-telling, he extends their power into the future.</p>",
    },
  ],
}

export const BasicArticle: ArticleData = {
  ...StandardArticle,
  layout: "feature",
  lead_paragraph:
    "<p>Critics were skeptical of Bambi when it was first released in 1942—what was the point, they wondered, of a cartoon that ignored fantasy in favor of naturalistic forest landscapes?</p>",
  title:
    "9 Famous Artists’ Studios You Can Visit, from Jackson Pollock to Barbara Hepworth",
  sections: [
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    ...StandardArticle.sections,
  ],
  contributing_authors: [
    // deprecated
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  hero_section: {
    type: "basic",
    title: "What’s the Path to Winning an Art Prize?",
    url: "https://vimeo.com/238843720",
    deck:
      "Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer",
    cover_image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
  },
}

export const FeatureArticle: ArticleData = {
  _id: "594a7e2254c37f00177c0ea9",
  keywords: ["Inspiration", "Casey Lesser"],
  author_id: "57b5fc6acd530e65f8000406",
  author: {
    id: "50f4367051e7956b6e00045d",
    name: "Artsy Editorial",
  },
  thumbnail_title: "What’s the Path to Winning an Art Prize?",
  vertical: {
    name: "Creativity",
    id: "591eaa6bfaef6a3a8e7fe1b1",
  },
  hero_section: {
    type: "fullscreen",
    title: "What’s the Path to Winning an Art Prize?",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    deck: "Lorem Ipsum",
  },
  contributing_authors: [
    // deprecated
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
      bio:
        "[Casey Lesser](http://artsy.net) is a well-known author and a long-time baker.",
      twitter_handle: "caseylesser",
    },
  ],
  channel_id: "5759e3efb5989e6f98f77993",
  description:
    "Applying for art prizes can be daunting, but doing so is a pathway to exhibitions, influential contacts, and a way to gain valuable feedback about your work.",
  tier: 1,
  tags: ["Inspiration"],
  tracking_tags: ["sponsored"],
  layout: "feature",
  published: true,
  featured: true,
  updated_at: "2017-07-19T17:19:55.909Z",
  title: "What’s the Path to Winning an Art Prize?",
  lead_paragraph: "",
  sections: [
    {
      type: "text",
      body:
        "<p>Around two years ago, a collector encouraged New York-based ceramic artist <a href='https://www.artsy.net/artist/jennie-jieun-lee'>Jennie Jieun Lee</a> to apply for an art prize. “I was a little bit scared. I’d applied to a few things in the past and been rejected, so I was bummed by that,” she admits. “I entered not thinking that I was going to win, but that it would be a good exercise to go through the process.” &nbsp;</p><p>It paid off. She was among several artists in 2015 who won an Artadia Award—an unrestricted, merit-based prize of up to $10,000, which is given to visual artists working in certain U.S. cities. The winnings, as well as the experience, helped Lee push her career forward. </p><p>“That money enabled me to move into a bigger studio and buy a larger kiln,” she explains. “With that movement, I was able to make my career.” And the momentum continued: More recently, she won a Pollock-Krasner grant that she used to move cross-country and fund a residency in the ceramic department at California State University, Long Beach. </p><p>Lee is by no means alone. While we’ve all heard of the boldfaced awards, like the Turner Prize or the Hugo Boss Prize, which tend to anoint artists when they’re already well known to the art world, a wealth of awards are available for lesser-known and emerging artists. </p>",
    },
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>Land exhibitions, make influential contacts, and gain valuable feedback about your work.</blockquote>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "57dc83ce139b212bd7000172",
          slug: "matt-devine-untitled-suspended",
          date: "",
          title: "Untitled Suspended",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/jDXiwSBgNP2eml1YkMIitg/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 3134,
          height: 2062,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p><p><br></p><h2>Finding the Prize That’s Right for You</h2><p>Artists should seek out opportunities based on their eligibility and the kind of work they make. “Don’t change to accommodate prizes,” advises London artist <a href='https://www.artsy.net/artist/ally-mcintyre'>Allyson McIntyre</a>, who won the 2015 HIX Award, which gives artists £10,000 to go towards a solo show at the London gallery HIX ART. “Be authentic to your practice and find the prizes that work for what you do.”</p><p>It’s important to recognize the distinction between prizes and awards—which are generally given in recognition of past work—and grants, which typically serve to facilitate future projects. Many artists note that they apply to both types of opportunities based on recommendations by word-of-mouth; they find that peers, former teachers, or other art-world contacts can share valuable input. New Orleans-based artist <a href='https://www.artsy.net/artist/aron-belka'>Aron Belka</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2015, advises artists to search for opportunities locally, through art schools, regional arts councils, art centers, and museums. &nbsp;</p><p>For those who perhaps do not have a tight-knit network of artist peers, there are several open-call websites and listservs that aggregate information on prizes, grants, and juried exhibitions. These include <a href='https://www.submittable.com/'>Submittable</a> and <a href='https://www.callforentry.org/'>Call for Entry</a>. On the latter, artists can create a profile, upload artwork images, and browse opportunities.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<h1>Section Header</h1><p>Enthusiastically grow high-payoff infomediaries for virtual methodologies. Competently maximize reliable scenarios whereas magnetic e-services. Completely formulate sticky schemas rather than strategic technologies. Phosfluorescently disseminate long-term high-impact e-services vis-a-vis effective collaboration and idea-sharing. Credibly provide access to technically sound services through plug-and-play niches.</p>",
    },
    {
      type: "video",
      url: "https://vimeo.com/191988155",
      caption:
        "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
      cover_image_url:
        "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
      layout: "overflow_fillwidth",
    },
    {
      type: "text",
      body:
        '<p><br></p><h2>The Application Process</h2><p>Most awards will require several images of your work, as well as a written artist statement to provide some context. With higher-stakes prizes, artists may be asked to submit recommendation letters from peers or professionals. </p><p>A somewhat obvious, though easily botched, element of the application process is following directions. “You have to be careful not to get lazy with how you submit, as it may lead to you being disqualified, which is just a waste of your time,” McIntyre explains. Be sure to read the fine print and adhere to all particulars regarding preparing, labeling, and submitting application materials.</p><p>Organizations administering prizes will allow artists to submit several—typically three to eight—images. They are generally interested in seeing recent work, created over the past two or three years. Some prizes may specify that artists create a new, original work to submit. Artists should be sure to send high-quality photographs; if resources allow, hire a photographer (or recruit a qualified friend) to have works shot professionally.</p><p>For those artists who work across mediums—perhaps printmaking one day, performance the next—know that it might not be advisable to try to include the full breadth of your practice in a single application. “Try to hone in on a single idea, or a couple of ideas,” says artist <a href="https://www.artsy.net/artist/alex-podesta">Alex Podesta</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2013, and has also served as a juror for other awards. “I’ve been on the other side of this a number of times, and when you’re reviewing applications it’s confusing and not helpful to have an artist submitting sculpture, painting, <em>and</em> a video piece. Focus on one aspect of your work.” </p><p>In addition to images, a written artist’s statement that explains and contextualizes the artist’s work is important, too. Artists should get in the habit of updating their statements regularly, adapting their texts to accurately reflect their current practices. Artist <a href="https://www.artsy.net/artist/yevgeniya-baras">Yevgeniya Baras</a>, who won an Artadia Award in New York in 2015, notes that she rewrites or edits her artist statement every two years. &nbsp;</p><p>For certain awards, artists may need to be able to speak about their work with jurors in person. If this is the case, be prepared to take full advantage of the opportunity. Baras notes that for Artadia, the panel of jurors visited her studio; she was careful to delve deeper into elements of her work that don’t come across through two-dimensional images or her online application. For the Meurice Prize for contemporary art, artists must give an oral presentation of their work. “While we don’t judge the artist on their ability to conduct a perfect verbal presentation of the work, we are of course interested to hear the artist speak of their work in a very intimate way, and that can actually be the decisive sector,” says Jennifer Flay, director of the art fair FIAC, and a juror for the Meurice Prize.</p><p><br></p><h2>Application Fees</h2><p>While it’s free to apply for some awards, it’s not uncommon to pay a fee in the range of $20 to $75—which can make a difference for artists looking to apply to multiple opportunites. Belka notes that if the stakes are high, an application fee may be worth it, but he advises that artists do their research before submitting said fees to avoid scams. </p><p>McIntyre recalls that she once applied to a competition that promised winners a show in Venice. “I was accepted, but they asked for an outrageous artist fee of €500,” she says. Later she learned that fellow artists had fallen for the scam and lost their money—and the works they had submitted. “Have discretion and awareness that your money may amount to nothing,” she counsels.</p><p><br></p><h2>Set Expectations and Be Persistent</h2><p>No one wins every award; there’s often a trail of rejections on the way to any prize. Baras, who landed the Rema Hort Mann Foundation Emerging Artist Grant in 2014 and the Artadia Award thereafter, notes that there’s been plenty of failure mixed in with those successes. (She estimates that she submits around 10 award or grant applications per year.) </p><p>“Assume that for nine out of every 10 applications that you send in, it’s not going to be the work they’re looking for,” Podesta says. “Younger artists, especially, shouldn’t get daunted. Remember that the work just isn’t resonating with the [specific] people reviewing it.”</p><p>It helps to go into the application process with an open mind, and reasonable hopes. “I went into it not expecting it to make my career, but rather for it to be an addition to it,” says <a href="https://www.artsy.net/artist/kristine-mays">Kristine Mays</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2014. Artists, she adds, should simply stay true to their craft, and keep working away.</p><p>Remember that rejection, while disappointing, can be a learning experience. “Without this kind of risk, you can’t really put yourself out there,” Baras says. “Most applications, for many amazing awards, just take a few days. It’s a way to see a new community, to seek new eyes, and I think that’s a necessary and healthy risk for an artist to take.”</p><p>Lee advises fellow artists to cast a wide net and apply to as many opportunities as possible, developing a thick skin as they do. “If you get rejected one year, apply again the next,” she says, simply. “It’s about being persistent and not taking anything personally.”</p><p><br></p>',
    },
    {
      type: "image_collection",
      layout: "fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/MGjCex4gkN4ofE_qOj_DPQ%2Farticle+asset+2-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>Enthusiastically grow high-payoff infomediaries for virtual methodologies. Competently maximize reliable scenarios whereas magnetic e-services. Completely formulate sticky schemas rather than strategic technologies. Phosfluorescently disseminate long-term high-impact e-services vis-a-vis effective collaboration and idea-sharing. Credibly provide access to technically sound services through plug-and-play niches.</p>",
    },
    {
      type: "image_set",
      layout: "mini",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/MGjCex4gkN4ofE_qOj_DPQ%2Farticle+asset+2-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p><br></p><h2>Make the Most of Winning</h2><p>Depending on the prize, artists may be awarded a stipend to create new work for a show or unrestricted funds to further their careers. In both cases, artists report that these funds have gone towards keeping their art practices up and running, be it through realizing new works and shows or for subsidizing rent, bills, and the costs of production and supplies. &nbsp;</p><p>For example, the Meurice Prize, which supports artists under the age of 45 who show with French galleries, awards €20,000, which is split between the artist and their gallery. This year, the BOMBAY SAPPHIRE® Artisan Series (which is only open to entrants from North America) awards a grand prize winner a stipend of $10,000 to create a public artwork. </p><p>In some cases, like Lee’s, a sizable prize could help an artist move into a bigger studio, relocate to another city, or participate in a residency. “Before, I never even thought about moving out of New York,” she says. “The Pollock-Krasner grant gave me the freedom to possibly move cross-country to explore this residency. I feel like it’s completely changed my life, and now I’m not sure when I’m coming back.”</p><p><br></p><h2>It’s More Than Just Money </h2><p>Baras notes that even if she hadn’t won the Artadia Award it would’ve been a rewarding experience due to the panel of jurors she encountered. “Whether you win or not, whoever’s on the panel remembers your work,” she says. “It’s beneficial regardless to put yourself out there because you really never know who might notice.” &nbsp; </p><p>Other prizes similarly award artists with the opportunity to exhibit their work to a new audience. The Daiwa Foundation Art Prize, awarded each year to a British artist, serves to give that artist a solo gallery exhibition in Japan. And the Luxembourg Art Prize gives finalists the opportunity to show their work in a group exhibition in Luxembourg; the winner is awarded €25,000 to produce new work for a solo presentation at Galerie Hervé Lancelin for an exhibition the following year. </p><p>For Belka and Mays, who both won the chance to show their work at the Scope Art Fair in New York through the BOMBAY SAPPHIRE® Artisan Series, winning led to important exposure and networking opportunities. “Overall, the most positive outcome was being able to put myself in arenas I’d never been in before,” Mays says of her experience. She saw it as a “jump start” for her career; she’s been busy making and showing her work steadily since her Scope debut.</p><p>“I made a point of greeting and speaking to everyone that came to the space,” Mays adds. Both artists recommend being prepared with business cards and following up with the contacts you make via email. Belka notes that he made an important collector contact that he maintains today. “Come prepared to talk about your work, have cards, spread your name, and get yourself out there,” says Belka.</p><p>Mays was also inspired by the feedback she received from viewers of her work. “Many times we overlook the value of feedback from people, the ideas that can come out of conversation with people,” she says. </p><p><br></p><h2>Building Confidence </h2><p>Most artists agree that one of the most impactful parts of winning a prize is the vote of confidence that it provides. Formal recognition can be a sign of assurance that they were right to pursue a career as an artist, and can inspire them to get back in the studio. &nbsp;</p><p>“It’s a nice confirmation to know that you can communicate to people you don’t even know, and just continue along the path of making your work,” Baras muses. “I see it as a kind of hug. Generally, you’re sort of hugging yourself as an artist—but once in awhile, you get an acknowledgment from the outside world.”</p>",
    },
  ],
  postscript:
    "<p>Header animation: Illustration by Tomi Um for Artsy. Animation by Ale Pixel Studio.</p>",
  id: "594a7e2254c37f00177c0ea9",
  scheduled_publish_at: null,
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/gejssmXDiO3G1pE73phZ3Q%2FArtboard+2%402xef-100.jpg",
  social_image:
    "https://artsy-media-uploads.s3.amazonaws.com/wU7ase6M0zWv6MLcC8-L5A%2Fd7hftxdivxxvm.cloudfront.jpg",
  published_at: "2017-06-29T15:00:00.000Z",
  slug: "artsy-editorial-path-winning-art-prize",
}

export const NonSponsoredFeatureArticle: ArticleData = {
  ...FeatureArticle,
  sections: [
    {
      type: "text",
      body:
        '<p>My first forays into the Lower East Side of Manhattan began in 1972. I was an eccentric Black 17-year-old from Montreal, wearing eyeliner, looking for my flock. I arrived after the Stonewall Riots to a world of off-off-Broadway theatrical characters. It wasn’t until 1976 that I would firmly transplant myself to the Lower East Side with plans to pursue my vision of life as a poet and artist. </p><p>It’s been 50 years since Stonewall. In our new age of corporate marketing, the annual Pride March has become a celebration of pride without anger, as if we need not continue fighting for our lives, our civil and human rights. How would our ongoing struggle be portrayed in the various anniversary exhibitions on view in New York: “Art after Stonewall, 1969–1989,” organized by the Columbus Museum of Art at the <a href="https://www.artsy.net/leslie-lohman-museum">Leslie-Lohman Museum</a> and the <a href="https://www.artsy.net/grey-nyu">Grey Art Gallery</a>, and “Nobody Promised You Tomorrow: Art 50 Years After Stonewall” at the <a href="https://www.artsy.net/brooklyn-museum">Brooklyn Museum?</a></p>',
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/C6L7avZzD-i4-iHZgDNvcg%2F04.-Lyle-Ashton-Harris%2C-Americas-%28Right%29.jpg",
          caption:
            "<p>Lyle Ashton Harris, <i>Americas, </i>1987–88/2007. Courtesy of the artist, Salon 94, and the Solomon R. Guggenheim Museum / Art Resource, NY.</p>",
          type: "image",
          width: 1190,
          height: 1731,
          index: 0,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>I was 14 years old at the time of the riot in June 1969, when patrons of the Stonewall Inn, a mafia-run gay bar in Greenwich Village, fought back against law enforcement’s oppressive bullying. I was living in Montreal, a place that was progressively liberated. Amendments to the Criminal Code to relax laws against homosexuality were proposed by then-Justice Minister Pierre Trudeau in 1967, two years before Stonewall launched gay rights into the spotlight in the United States. The bill to decriminalize homosexuality was passed in Canada in 1969, and likely overshadowed any press of Stonewall in my world. </p><p>Due to my delayed landing in New York in 1972, I’d missed that year’s annual commemoration of Stonewall. In the years that followed, I have memories of throngs of folks gravitating west on the last Sunday in June for the Gay Liberation Marches. I rarely followed. I wasn’t interested in the mob mentality of marches or parades; I preferred avoiding them altogether. <strong><em> </em></strong></p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/cudoUvvjlGol3luBvqtUtA%2FHujar-GLF2.jpg",
          caption:
            "<p>Peter Hujar, <i>Gay Liberation Front Poster, </i>1970. © 1987 The Peter Hujar Archive LLC; Courtesy Pace/MacGill Gallery, New York and Fraenkel Gallery, San Francisco.</p>",
          type: "image",
          width: 1196,
          height: 1780,
          index: 1,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/abZpHhfupMPXkfM-niszCQ%2F07.-Diana-Davies%2C-Gay-Rights-Demonstration%2C-Albany%2C-NY%2C-1971.jpg",
          caption:
            "<p>Diana Davies,<i> Gay Rights Demonstrations, Albany, NY, </i>1971.<i> </i>© The New York Public Library. </p>",
          type: "image",
          width: 1200,
          height: 1779,
          index: 2,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The first march was a protest for civil and human rights; anyone could join in off the streets. Today the parade has been taken over by corporate-sponsored floats that tout how wonderful it is to be gay. Onlookers can no longer participate—railings guard the long line of floats. Considering the unequal society we still live in, this is shameful. Whatever liberation we feel we’ve won in our post-Stonewall age of illusion reminds me of what the transgender activist Sylvia Rivera had to say in a 1995 interview, clipped in <a href="https://www.artsy.net/artist/sasha-wortzel">Sasha Wortzel</a>’s 2018 video, <em>This is an Address</em>, on view in the Brooklyn Museum show: “Fight for something and stop being comfortable.” We’re still at war. </p><p>There’s a suggestion that the tide may be turning. This year there are plans for concurrent marches. The nonprofit Heritage of Pride will make a loop from the Flatiron District to Stonewall and up to Chelsea with its sponsored floats behind an impenetrable wall of police barriers. A second parade, organized by the Reclaim Pride Coalition, will follow the path of the original march—without barriers or corporate floats—to refocus our demand for civil rights.</p>',
    },
    {
      type: "text",
      body: "<h1></h1>",
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/E9aSd7E-Yqi39eW53cq3dQ%2FWarhol.jpg",
          caption:
            "<p>Andy Warhol, <i>Ladies and Gentlemen, </i>1975. © 2018 The Andy Warhol Foundation for the Visual Arts, Inc. / Licensed by Artists Rights Society (ARS), New York.</p>",
          type: "image",
          width: 1400,
          height: 2112,
          index: 3,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p><a href="https://www.artsy.net/show/leslie-lohman-museum-art-after-stonewall-1969-1989">The Leslie-Lohman show</a> spans the 1970s, the period covering my early introduction to the Lower East Side, where I still live today. For a brief period in the mid-’90s, I lived on Fifth Avenue, situated on Manhattan’s East/West divide. I never felt comfortable on this border. The ethnically diverse East Village was always preferable to the homogenous commercialization of the West Village. With the exception of occasional visits to the West Side piers or visits to the Oscar Wilde Memorial Bookshop on Christopher Street, where my first chapbook of poems was distributed, I rarely crossed over. Marsha P. Johnson would hang out on Christopher Street. I met her on the Lower East Side in 1972, when she was rehearsing with the Hot Peaches. </p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/-66cqur2l6sxcOcQT9G_SQ%2F17.-Ann-Patricia-Meredith%2C-Lesbian-Physique%2C-Gay-Games-II-Triumph-in-%2786-San-Francisco%2C-CA%2C-1986-%281%29.jpg",
          caption:
            "<p>Ann Patricia Meredith, <i>Lesbian Physique, Gay Games II/Triumph In ‘86 San Francisco, CA, 1986, </i>from “A Different Drummer,” 1970–90. ©annpmeredith.com 6.1986.</p>",
          type: "image",
          width: 1800,
          height: 1295,
          index: 4,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>During this time, drag and queer performance art might appear out on the street. The late performance artist Stephen Varble is represented in the show in two photographic portraits by Greg Day and <a href="https://www.artsy.net/artist/peter-hujar-2">Peter Hujar</a>. By chance, I witnessed some of Varble’s antics on West Broadway in the mid-’70s. On the weekends he would arrive to SoHo in a limo to then tour the streets in his elaborate costumes.</p><p>Then there’s a 1970 poster by <a href="https://www.artsy.net/artist/martin-wong">Martin Wong</a> advertising the Cockettes, a group of theatrical drag personas—a big disappointment as far as performance from what I remember—who nonetheless left an indelible impression on what queer could look like. Without the glittered beards and eccentric drag of the Cockettes or Stephen Varble, would there ever have been the Sisters of Perpetual Indulgence? All of their camp aesthetics were foregrounded by <a href="https://www.artsy.net/artist/jack-smith-1">Jack Smith</a>’s earlier 1963 movie <em>Flaming Creatures</em>, which is not included in the exhibition. The color film’s graphic depiction of queer sexuality is canonized in gay history.</p>',
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/dC-Ed7L5yJef66goLvzxmA%2F13.+Peter+Hujar%2C+Daniel+Ware+%28Cockette%29.jpg",
          caption:
            "<p>Peter Hujar, <i>Daniel Ware (Cockette), </i>1971. © 1987 The Peter Hujar Archive LLC. Courtesy of Pace/MacGill Gallery, New York, and Fraenkel Gallery, San Francisco. </p>",
          type: "image",
          width: 1400,
          height: 1384,
          index: 5,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>For the most part, the show largely presents documentary photography, portraiture, and archival materials that highlight what has always been visible. The prominence of these pictures had me wondering why there isn’t more work included by artists that took on the spirit of the post-Stonewall era to make more interpretive creative statements about being queer.</p>",
    },
    {
      type: "text",
      body:
        "<blockquote>We had always been in the picture, but in the post-Stonewall era, unabashedly so.</blockquote>",
    },
    {
      type: "text",
      body:
        '<p>What is recovered from this period in photography, though, will live on for generations. Photographers like <a href="https://www.artsy.net/artist/robert-mapplethorpe">Robert Mapplethorpe</a>, <a href="https://www.artsy.net/artist/catherine-opie">Catherine Opie</a>, and <a href="https://www.artsy.net/artist/alvin-baltrop">Alvin Baltrop</a> exposed the predominance of the body and queer sex play among the gay community in the 1970s. I liked seeing the representations of ourselves so openly. We had always been in the picture, but in the post-Stonewall era, unabashedly so.</p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "58d436c1cd530e026e0e54a1",
          slug: "robert-mapplethorpe-17",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/BaNXUiAp74GGF6PTKBU1Pg/larger.jpg",
          title: null,
          date: "",
          partner: {
            name: "Baudoin Lebon Gallery",
            slug: "baudoin-lebon-gallery",
          },
          artists: [
            {
              name: "Robert Mapplethorpe",
              slug: "robert-mapplethorpe",
            },
          ],
          artist: {
            name: "Robert Mapplethorpe",
            slug: "robert-mapplethorpe",
          },
          width: 609,
          height: 610,
          index: 6,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/MEORh5qbS0v8g7tKEO6Log%2FJS0531.jpg",
          caption:
            "<p>Jack Smith, <i>Untitled</i>, c. 1964–1981. © Jack Smith Archive. Courtesy of Gladstone Gallery, New York and Brussels.</p>",
          type: "image",
          width: 3606,
          height: 4164,
          index: 7,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p><a href="https://www.artsy.net/gene/conceptual-art">Conceptual</a> representations of queerness are best exemplified in the show by the remarkable number of works by women. Kudos for that. There are so many I’ve never heard of, for no good reason. The abstractions produced by now-well-known lesbian artists like <a href="https://www.artsy.net/artist/harmony-hammond">Harmony Hammond</a>, <a href="https://www.artsy.net/artist/joan-snyder">Joan Snyder</a>, <a href="https://www.artsy.net/artist/barbara-hammer">Barbara Hammer</a>, <a href="https://www.artsy.net/artist/lula-mae-blocton">Lula Mae Blocton</a>, and Fran Winant, gathered in one gallery, provide alternative thinking about queerness as a visual metaphor. Snyder does an exemplary job of this in <em>Heart On</em> (1975), a sutured, textural abstract painting that had me thinking about how we contain our feelings, blending or contrasting one in relation to the other.</p>',
    },
    {
      type: "image_set",
      title: null,
      layout: "full",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/3lHi4h8Xh9qhz5TMsrCmpA%2FLouise+Fishman%2C+Angry+Jill.jpg",
          caption:
            "<p>Louise Fishman, <i>Angry Jill, </i>1973. © Louise Fishman. Courtesy of the artist.</p>",
          type: "image",
          width: 1800,
          height: 1153,
          setTitle: null,
          index: 8,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/HOLB-0lLwK5AeiupcaKYBQ%2F273+Heart+On.jpg",
          caption:
            "<p>Joan Snyder, <i>Heart On, </i>1975. Photo by Jack Abraham. Courtesy of the artist and The Metropolitan Museum of Art.</p>",
          type: "image",
          width: 1800,
          height: 1346,
          setTitle: null,
          index: 9,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/4wrm6Xca69dAuaALUOpvjQ%2F46aeefb41b96194451214decbcd32f50.jpeg",
          caption:
            "<p>Harmony Hammond, <i>Duo, </i>1980. © Harmony Hammond/Licensed by VAGA via ARS, New York. Courtesy of Alexander Gray Associates, New York.</p>",
          type: "image",
          width: 1431,
          height: 1800,
          setTitle: null,
          index: 10,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/01AzjBf3_d6sv3Z3x9BBgw%2FMBE010+Happy+Birthday+America.jpg",
          caption:
            "<p>Mary Beth Edelson, <i>Happy Birthday America,</i> 1976. Courtesy the artist and David Lewis, New York.</p>",
          type: "image",
          width: 7218,
          height: 5004,
          setTitle: null,
          index: 11,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/pT-3oWIg-ZA3wQWaSv7wEQ%2FLouise+Fishman%2C+Angry+Louise.jpg",
          caption:
            "<p>Louise Fishman,  <i>Angry Louise, </i> 1973. © Louise Fishman. Courtesy of the artist.</p>",
          type: "image",
          width: 1800,
          height: 1164,
          setTitle: null,
          index: 12,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The figures who created platforms for this work to be visible to the larger public are also lionized. Holly Solomon was a champion for what the queer 1970s had to offer. She was the first art dealer to show Mapplethorpe and embrace <a href="https://www.artsy.net/artist/thomas-lanigan-schmidt">Thomas Lanigan-Schmidt</a> with her eponymous gallery. I would get to know Holly personally in the ’80s when I began my own gallery venture with Gracie Mansion. Holly always appreciated our glitzy aesthetic. </p><h1></h1>',
    },
    {
      type: "text",
      body:
        '<p>Judy Garland appears in the <a href="https://www.artsy.net/show/grey-art-gallery-art-after-stonewall-1969-1989">Grey Art Gallery’s iteration</a> of the show, representing the 1980s, in <em>Pride 69–’89 </em>(1989), a video by the collective DIVA TV. There’s a persistent belief that the Stonewall Riot happened because many gay folks were mourning Garland’s death. Here, she is a reminder to never forget what was lost to the generation after Stonewall. <a href="https://www.artsy.net/artist/robert-gober">Robert Gober</a>’s <em>Untitled Closet</em> (1989) announces what we could expect to discover in the ’80s: An empty closet with the door removed. After coming out in the ’70s, we were now all about being center stage, even as AIDS was killing too many of us. </p>',
    },
    {
      type: "text",
      body:
        "<blockquote>Our passion for loving was seen as killing us, although it saved us, liberating our desires and solidifying our emotional bonds by the time AIDS arrived.</blockquote>",
    },
    {
      type: "text",
      body:
        '<p>The queer presence in the East Village became a press magnet. They tagged it “the East Village Scene,” as if there weren’t numerous other scenes at its edges. We were flooded with talented artists and more and more places to present their work. New doors would open in the ’80s when the clubs really got going. They were certainly more familiar social settings than the West Side bars that too often didn’t welcome Black folks. Venues like Club 57, The Pyramid Club, PS 122, 8BC, La MaMa, and the Theater for a New City centered queerness. These were the places I ventured in my neighborhood. </p><p>With the introduction of these spaces, queer performance art became even more evident. John Kelly, <a href="https://www.artsy.net/artist/karen-finley">Karen Finley</a>, Tim Miller, Klaus Nomi, <a href="https://www.artsy.net/artist/keith-haring">Keith Haring</a>, and <a href="https://www.artsy.net/artist/david-mcdermott">David McDermott</a> grew out of a different scene than John Vaccaro, Charles Ludlam’s Theater of the Ridiculous, the Hot Peaches, and the Bloolips—inhabitants of the theatrical world I was introduced to when I first arrived in New York. In the ’80s, drag performers like Ethyl Eichelberger and Penny Arcade crossed over to the burgeoning <a href="https://www.artsy.net/article/artsy-editorial-history-drag-art">art world club scene</a>.</p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/ZizcBKU4MNcb5C9zjdzxxA%2Fjds.jpg",
          caption:
            "<p>Jimmy DeSana, <i>Television</i>, 1978. Courtesy of the Jimmy DeSana Trust and Salon 94, New York.</p>",
          type: "image",
          width: 1261,
          height: 1872,
          index: 13,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/1D8PtDLZJ1VSTLp4SKtG8g%2FStephenVarbelbyGregDay007t.jpg",
          caption:
            "<p>Greg Day, <i>Stephen Varble at the 12th Annual NY Avant Garde Festival, </i>1975. Courtesy of the artist.</p>",
          type: "image",
          width: 579,
          height: 864,
          index: 14,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The ’80s were my biggest swing. I was submerged in art and sexual adventures on the Lower East Side, SoHo, and Tribeca. <a href="https://www.artsy.net/artist/jimmy-desana">Jimmy DeSana</a>’s images from this decade always skirted the edge of that culture. I met Jimmy when I was curating photography exhibitions in the late ’70s, soon after he created the pictures from his “Submission” series (1979). The image used to represent him in this exhibition, <em>Television</em> (1978), is <a href="https://www.artsy.net/gene/surrealism">Surrealist</a> in nature. DeSana is shown lying on seamless paper, nude save for a leather mask covering his face, as he props up a plugged-in TV with his feet. The photograph alludes to a fetishized sexuality that was a part of our generation’s playtime. The parties would eventually end and turn us into warriors fighting for our lives during the AIDS pandemic.</p><p>“What is the sound of ballroom?” asks <em>Dance Tracks 1973–1997 (from the Ballroom Archive &amp; Oral History Project Interviews)</em>, a 2010 project presented by Ultra-Red and the Vogue’ology Collective<em>.</em> I never attended the balls or Keith Haring’s parties at the Paradise Garage where Grace Jones performed, but what a brilliant consideration. This work and several others included in the show clearly bring into view the presence of a Black gay cultural movement.</p>',
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/ZbWj1gONcDyY3Yd8ouSMGA%2F12.-Keith-Haring%2C-Safe-Sex.jpg",
          caption:
            "<p>Keith Haring, <i>Safe Sex, </i>1985. © Keith Haring Foundation.</p>",
          type: "image",
          width: 1400,
          height: 1433,
          index: 15,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The Other Countries collective of Black gay male writers are the subjects of Marlon T. Riggs’s film with Essex Hemphill, <em>Affirmations</em> (1990), and <a href="https://www.artsy.net/artist/lyle-ashton-harris">Lyle Ashton Harris</a>’s <em>Americas</em> triptych of black-and-white photographs (1987–88) presents the artist and a model posing in whiteface in the tradition of African warriors. </p><p>We were not a monolithic group. <em>That Fertile Feeling</em>, a 1980 video featuring <a href="https://www.artsy.net/artist/vaginal-davis">Vaginal Creme Davis</a> performing in the artist’s usual over-the-top madness, provides boundary-pushing proof that being queer in all its diversity was happening in art at the same time, even though much of it went unrecognized because of the respectability politics that many of us were pushing against. </p><p>Yet the exhibitions offer no picture of what our AIDS life looked like. To my surprise, not one <a href="https://www.artsy.net/artist/hugh-steers">Hugh Steers</a> painting was to be found. Tragic. His was a true artistic expression of what was happening in our world at the time, in our war against a system that compromised AIDS education and promoted fear that stigmatized people living with the disease. <strong><em> </em></strong></p>',
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/fYlnqaZZnlXD9FdXGql-AQ%2Fquilt.jpg",
          caption:
            "<p>Names Project Foundation, <i>AIDS Memorial Quilt, Block 001, </i>1987. Courtesy of the NAMES Project Foundation.</p>",
          type: "image",
          width: 1200,
          height: 1181,
          index: 16,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Fear put many back in the closet. They wanted us dead, as <a href="https://www.artsy.net/artist/david-wojnarowicz">David Wojnarowicz</a> suggested in his 1990–91 broadside <em>Untitled (One Day this Kid…)</em>. Sex clubs and bathhouses shut down. Our passion for loving was seen as killing us, although it saved us, liberating our desires and solidifying our emotional bonds by the time AIDS arrived.</p><p>What’s left to say about this is predominantly illustrated by <a href="https://www.artsy.net/artist/gran-fury">Gran Fury</a>’s political protest posters, which were well publicized in ACT UP demonstrations. Why photographer <a href="https://www.artsy.net/artist/lola-flash">Lola Flash</a>, a member of ACT UP and the affiliate group Art+, was never recognized for her color reversal photographic prints, astounds me. Many of Flash’s works document political protests and actions in which the artist herself was a participant. She is represented in the show by a single photograph, <em>AIDS Quilt</em> (1987). </p>',
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/_Oaj3Y25vZ6gIs5rqoB2KQ%2F11.-Gran-Fury%2C-The-Government-Has-Blood-on-Its-Hands.jpg",
          caption:
            "<p>Gran Fury, <i>The Government Has Blood On Its Hands, </i>1988. Courtesy of Avram Finkelstein.</p>",
          type: "image",
          width: 1200,
          height: 1728,
          index: 17,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>What the artists in both exhibitions have in common, although it’s barely touched on, is that they all lived through the worst of the HIV/AIDS epidemic. They witnessed too many dying or were themselves afflicted. Visual AIDS, a nonprofit New York arts organization formed in the late ’80s, would bring it all together. AIDS decimated and affected the larger part of our queer and non-queer allies. In the ’90s, I was invited to join the Visual AIDS board with my interest in developing the Archive Project. That is when the invisible became visible and I could begin to connect the dots.</p>",
    },
    {
      type: "text",
      body: "<h1></h1>",
    },
    {
      type: "text",
      body:
        "<p>The Brooklyn Museum was a different experience entirely. “Nobody Promised You Tomorrow” tells a more inclusive story of the Stonewall Uprising, directly connecting it to the remarkably diverse community of LGBTQ+ artists carrying on the legacy of Stonewall today and into the future. These artists have come into their own within the developing culture of queer studies and gender theory that came to fruition in the 1990s, well after Stonewall. </p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/5wMsFYKm9CR04IRUc3V-UA%2FEL171.17_NPYT_David_+Antonio_Cruz2.jpg",
          caption:
            "<p>David Antonio Cruz, <i>thenightbeneathusacrystalofpain, portrait of ms. dee</i>, 2018. Courtesy of the artist. </p>",
          type: "image",
          width: 819,
          height: 1097,
          index: 18,
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/p_wpEc-ZMWBqhBK0wFJ8og%2FEL171.72+Summer+Honey+24x30.jpg",
          caption:
            "<p>Mohammed Fayaz, <i>Volume 29: Summer Honey</i>, 2016. Courtesy of the artist. <br> <br> <br> </p>",
          type: "image",
          width: 800,
          height: 1000,
          index: 19,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>The artists in the exhibition have an eye toward the past; Hugo Gyrl’s vinyl wall piece from 2019 reads: “THE FIRST PRIDE WAS A RIOT! KNOW YOUR POWER.” Yet other sections of this show create much-needed spaces for imagining and organizing toward more equitable futures and new ways of living. One vital platform centers on how gentrification and violence continue to affect our communities today, while another explores attraction and intimacy. </p><p>Some of the works in the Brooklyn Museum show call out the racism that many of us experienced but that is rarely mentioned in gay history. <em>Happy Birthday, Marsha! </em>(2018), a film by Tourmaline and Sasha Wortzel that imagines a day in the life of Marsha P. Johnson, brings us there. Others bring into question the segmentation of what we think of as the gay community—not one but many disparate communities with different needs.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/tLoxn89UmBKtIMHaO319bA%2FHappyBirthdayMarsha_06.jpg",
          caption:
            "<p>Sasha Wortzel and Tourmaline, <i>Happy Birthday, Marsha!</i> (film still), 2018. Courtesy of the artists.</p>",
          type: "image",
          width: 1800,
          height: 1012,
          index: 20,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p><em>Urgency</em> (2015) by Linda LaBeija speaks to our responsibility to the trans community. Wortzel’s <em>This is an Address I, II</em> (2019) highlights the growing homeless population, especially among queer and trans youth, and the limits of obtaining social services without an address. Other artists reveal personal, interior views of being in a queer world. <a href="https://www.artsy.net/artist/rindon-johnson">Rindon Johnson</a>’s video poem <em>It is April </em>(2017) and <a href="https://www.artsy.net/artist/mark-aguhar">Mark Aguhar</a>’s <em>I’d rather be beautiful than male </em>(2011–12) are both tender and touching. </p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/lHrDmHDdAvw2ZwKzBBqGHA%2FRindon_Johnson__It_Is_April_Godothers.jpg",
          caption:
            "<p>Rindon Johnson, featuring Milo McBride, <i>It is April, </i>2017. © Rindon Johnson. Courtesy of the artist.</p>",
          type: "image",
          width: 1400,
          height: 787,
          index: 21,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The Brooklyn venue also brings us into the experiences of the marginalized, lost, and forgotten. <a href="https://www.artsy.net/artist/lj-roberts-1">LJ Roberts</a>’s lightbox installation from 2019 is a memorial to Stormé DeLarverie. According to many eyewitnesses, DeLarverie, a butch lesbian, provoked the tussle with police that triggered the Stonewall Riots. The work calls on us to pay tribute to a figure too often lost in our remembrances.</p>',
    },
    {
      type: "text",
      body: "<h1></h1>",
    },
    {
      type: "text",
      body:
        '<p>Some things never change. Mentioned in all of the exhibitions are the <a href="https://www.artsy.net/artist/george-segal">George Segal</a> sculptures that rest in the park across from the Stonewall Inn. Many community activists have <a href="https://www.vulture.com/2018/11/is-nycs-gay-liberation-monument-too-white.html">created controversy</a> around them. As an archivist, I try to make sense of what’s evidenced and question assumptions while considering what can be discovered in attempts to fill in the gaps. </p><p>The sculptures, completed in 1979 but not installed in Christopher Park until 1992, comprise bronze casts of two pairs: one standing male couple and a seated female couple. The figures are painted white, a suggestion of the artist’s method of plaster casting by wrapping his subjects in gauze. They are described in the “Art after Stonewall” catalogue and the wall text in “Nobody Promised You Tomorrow” as whitewashing Stonewall’s legacy. This has me scratching my head. </p>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/Bf6ayX2S_tSx8mouwwbymw%2FGettyImages-916576176.jpg",
          caption:
            "<p>Sculptures by George Segal at Stonewall National Monument in Christopher Park, New York. Photo by Jeffrey Greenberg/UIG via Getty Images.</p>",
          type: "image",
          width: 1400,
          height: 933,
          index: 22,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>The ignorance that so many of these protesters proclaim in their “controversy” is disingenuous. The figures, who appear covered in bandages, show no implication of race. As I see it, these “bandages” are quite a fitting representation of the damage done to our community, our existence, and survival through the AIDS pandemic. To misrepresent these sculptures as disparaging to people of color seems ridiculous. People of color were so instrumental in the history of the Stonewall Uprising but many have never recognized how badly we’ve been treated by the very community we’re expected to embrace. Redressing that by protesting and implicating the sculptures as a sign of our further erasure seems like a ploy to alleviate guilt. </p>",
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/Kpyum218FlAMEB2DFQKykg%2FRolston.jpg",
          caption:
            "<p>Adam Rolston, <i>I Am Out Therefore I Am, </i>1989. © Adam Rolston. Courtesy of the artist.</p>",
          type: "image",
          width: 1400,
          height: 1435,
          index: 23,
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Let’s be honest here about the extent of our progress. The celebrated sculptor <a href="https://www.artsy.net/artist/louise-nevelson">Louise Nevelson</a> had originally accepted the commission before it was offered to Segal, but according to the “Art after Stonewall” catalogue, her “‘business advisors’ persuaded her that public affirmation of her lesbianism would hurt the career of her younger lover, also an artist, so she pulled out.” That’s the way the art world was then. Would the advice Nevelson’s advisors gave her be tolerated in the art world today? Is that a rhetorical question? Maybe.</p><p><br></p>',
    },
  ],
}
export const FeatureBasicVideoArticle: ArticleData = {
  ...FeatureArticle,
  hero_section: {
    type: "basic",
    title: "What’s the Path to Winning an Art Prize?",
    url: "https://vimeo.com/238843720",
    deck:
      "Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer",
    cover_image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
  },
}

const {
  tracking_tags,
  ...UnsponsoredFeatureArticleSansTrackingTagsProp
} = FeatureArticle
export const UnsponsoredFeatureArticle: ArticleData = {
  ...UnsponsoredFeatureArticleSansTrackingTagsProp,
  sponsor: {
    partner_condensed_logo: null,
    partner_dark_logo: null,
    partner_light_logo: null,
    partner_logo_link: null,
    pixel_tracking_code: null,
  },
}

export const FeatureBasicArticle: ArticleData = {
  ...FeatureArticle,
  hero_section: {
    type: "basic",
    title: "What’s the Path to Winning an Art Prize?",
    deck:
      "Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer",
  },
}

export const SponsoredArticle = extend(cloneDeep(FeatureArticle), Sponsor)
export const SponsoredFeatureArticle = extend(
  cloneDeep(NonSponsoredFeatureArticle),
  Sponsor
)

export const SuperArticle = extend(cloneDeep(FeatureArticle), {
  is_super_article: true,
  super_article: {
    footer_blurb:
      "This feature is created in collaboration with UBS with data sourced from UBS’s art news app Planet Art. Planet Art provides a distilled look at contemporary news, reviews and information from the art world.",
    partner_fullscreen_header_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/qp6GUcn5RkvscdYEBmqFXw%2FUBS_White.png",
    partner_link:
      "https://itunes.apple.com/us/app/planet-art-your-source-for/id937737095?mt=8",
    partner_link_title: "Download the Planet Art app",
    partner_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/PUn-n_Zn0VHfyDKofWeLeQ%2FUBS_Black.png",
    partner_logo_link: "https://www.ubs.com/microsites/planet-art/home.html",
    related_articles: [
      "5846e12cc137140011634710",
      "5846e1fdc137140011634711",
      "58459e56104093001189a7d1",
      "584b0ee3e751080011bc1ad5",
    ],
    secondary_logo_link:
      "https://www.ubs.com/global/en/about_ubs/contemporary-art.html",
    secondary_logo_text: "PRESENTED IN PARTNERSHIP WITH",
    secondary_partner_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png",
  },
})

export const ImageHeavyStandardArticle = extend(cloneDeep(StandardArticle), {
  sections: [
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p><p><br></p><h2>Finding the Prize That’s Right for You</h2><p>Artists should seek out opportunities based on their eligibility and the kind of work they make. “Don’t change to accommodate prizes,” advises London artist <a href='https://www.artsy.net/artist/ally-mcintyre'>Allyson McIntyre</a>, who won the 2015 HIX Award, which gives artists £10,000 to go towards a solo show at the London gallery HIX ART. “Be authentic to your practice and find the prizes that work for what you do.”</p><p>It’s important to recognize the distinction between prizes and awards—which are generally given in recognition of past work—and grants, which typically serve to facilitate future projects. Many artists note that they apply to both types of opportunities based on recommendations by word-of-mouth; they find that peers, former teachers, or other art-world contacts can share valuable input. New Orleans-based artist <a href='https://www.artsy.net/artist/aron-belka'>Aron Belka</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2015, advises artists to search for opportunities locally, through art schools, regional arts councils, art centers, and museums. &nbsp;</p><p>For those who perhaps do not have a tight-knit network of artist peers, there are several open-call websites and listservs that aggregate information on prizes, grants, and juried exhibitions. These include <a href='https://www.submittable.com/'>Submittable</a> and <a href='https://www.callforentry.org/'>Call for Entry</a>. On the latter, artists can create a profile, upload artwork images, and browse opportunities.</p>",
    },
    {
      type: "text",
      body:
        "<p>Efficiently seize optimal innovation for adaptive technology. Continually drive equity invested architectures and visionary best practices. Completely transition frictionless potentialities after optimal web-readiness. Proactively leverage other's reliable infomediaries rather than multifunctional mindshare. Phosfluorescently utilize frictionless technology vis-a-vis backward-compatible catalysts for change.</p>",
    },
  ],
})

export const ShortStandardArticle = extend(cloneDeep(StandardArticle), {
  sections: [
    {
      type: "text",
      body:
        "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p>",
    },
  ],
})

export const MissingVerticalStandardArticle = extend(
  cloneDeep(StandardArticle),
  {
    vertical: null,
  }
)

// Articles with only text sections
export const TextClassicArticle = extend(cloneDeep(ClassicArticle), {
  sections: ClassicText,
})
export const TextStandardArticle = extend(cloneDeep(StandardArticle), {
  sections: StandardText,
})
export const TextFeatureArticle = extend(cloneDeep(FeatureArticle), {
  sections: FeatureText,
})

export const VideoArticle: ArticleData = {
  layout: "video",
  id: "597b9f652d35b80017a2a6a7",
  _id: "597b9f652d35b80017a2a6a7",
  title: "Trevor Paglan",
  thumbnail_title:
    "New Study Shows the Gender Pay Gap for Artists Is Not So Simple",
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/wHFgQlrTrHav5O6bQRJ0dg%2FUntitled+Suspended_30x67x33+%282%29_sm+cropped.jpg",
  slug: "joanne-artman-gallery-poetry-naturerefinement-form",
  published_at: "2017-07-28T20:38:05.709Z",
  description:
    "The elegant spiral of the Nautilus shell, the sinuous pattern of the banks of a river, or the swirling vortex street of clouds - patterns exist.",
  vertical: {
    name: "Art Market",
  },
  media: Media[0],
  sponsor: {
    partner_condensed_logo: null,
    partner_dark_logo: null,
    partner_light_logo: null,
    partner_logo_link: null,
    pixel_tracking_code: null,
  },
}

export const VideoArticleUnpublished = extend(cloneDeep(VideoArticle), {
  media: {
    title: "Trevor Paglan",
    url: "",
    duration: 4000,
    release_date: "2018-08-28T20:38:05.709Z",
    published: false,
    description:
      "<p>Integer posuere erat a <a href='http://artsy.net'>ante venenatis dapibus posuere</a> velit aliquet. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>",
    credits:
      "<p><b>Director</b></br>Marina Cashdan<br><b>Featuring</b></br>Trevor Paglan</p>",
  },
})

export const VideoArticleSponsored = extend(cloneDeep(VideoArticle), Sponsor)

export const SeriesArticle: ArticleData = {
  _id: "594a7e2254c37f00177c0ea9",
  id: "594a7e2254c37f00177c0ea9",
  layout: "series",
  title: "The Future of Art",
  slug: "future-of-art",
  slugs: ["future-of-art"],
  hero_section: {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/GXvnaBYBdP2z6LKIBQF7XA%2FArtboard.jpg",
  },
  series: {
    description:
      "<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. <a href='http://artsy.net'>Curabitur blandit</a> tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>",
  },
  related_article_ids: ["594a7e2254c37f00177c0ea9", "597b9f652d35b80017a2a6a7"],
}

export const SeriesArticleSponsored = extend(cloneDeep(SeriesArticle), Sponsor)

export const SeriesArticleCustomSubTitle = extend(cloneDeep(SeriesArticle), {
  series: {
    sub_title: "About this Feature",
  },
})

export const NewsArticle: ArticleData = {
  id: "594a7e2254c37f00177c0ea9",
  _id: "594a7e2254c37f00177c0ea9",
  layout: "news",
  slug: "news-article",
  author_id: "57b5fc6acd530e65f8000406",
  author: {
    id: "50f4367051e7956b6e00045d",
    name: "Artsy Editorial",
  },
  vertical: {
    name: "News",
    id: "12345",
  },
  published_at: "2018-07-19T17:19:55.909Z",
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
      bio:
        "[Casey Lesser](http://artsy.net) is a well-known author and a long-time baker.",
      twitter_handle: "caseylesser",
    },
  ],
  title:
    "The oldest known depiction of a supernova was found in a work of 5,000 year old rock art, scientists believe.",
  sections: [
    {
      type: "image_collection",
      images: [
        {
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
          height: 533,
          type: "image",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/N13JE8AbtWFAgvueH8G1uQ/larger.jpg",
          width: 800,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p><strong>The design for the as-yet-uncompleted sculpture</strong>, <span style='text-decoration:line-through;'><em>Bouquet of Tulips</em></span>, was donated by Koons to the French capital in November 2016 as a memorial to the recent terrorist attacks that have taken place in the city. But Koons, <a href='#'>one of the world’s richest living artists</a>, didn’t donate the $4.3 million needed to create 40-foot-tall sculpture, which was raised separately via donations. And the work, slated for installation in front of the Palais de Tokyo and Paris’s Museum of Modern Art, has attracted opposition. In a letter published in the French newspaper Libération on Sunday, signatories—including Frédéric Mitterrand, the country’s former culture minister—demanded that the city halt its plans to install the sculpture, calling it “shocking.” </p>",
    },
    SocialEmbedInstagram,
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>It is understood the [British Museum] has been in talks about a possible loan of the tapestry for several years, but there will be other contenders to host it.</blockquote>",
    },
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>The bookmaker Ladbrokes is offering odds on where it might go, with the British Museum evens favourite, followed by Westminster Cathedral at 3/1, Canterbury Cathedral at 5/1 and Hastings at 8/1.</blockquote>",
    },
    {
      type: "text",
      layout: "blockquote",
      body: "<blockquote><a href='#'>The Guardian</a></blockquote>",
    },
    {
      type: "text",
      body:
        "<p>It further criticized Koons for using the opportunity as a publicity stunt, as the sculpture’s planned location is in a tourist-heavy area far from where the 2015 terrorist attacks actually took place. “We appreciate gifts, [but ones that are] free, unconditional, and without ulterior motives,” the letter said. In any case, Parisian officials have not yet granted authorization to install the sculpture, according to the <em>New York Times</em>.</p>",
    },
    SocialEmbedTwitter,
    {
      type: "text",
      body:
        "<h3><strong>Takeaway</strong></h3><h3>Should Prince lose at trial and on appeal the resulting precedent would reign in the broader <em>fair use interpretations</em> now afforded to artists.</h3>",
    },
  ],
  news_source: {
    title: "The New York Times",
    url: "http://nytimes.com",
  },
}
