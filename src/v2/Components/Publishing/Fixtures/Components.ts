import {
  AdDimension,
  AdUnit,
  MediaData,
  RelatedArticleCanvasData,
  RelatedArticlePanelData,
  SectionData,
} from "v2/Components/Publishing/Typings"
import { flatten } from "lodash"
import { DisplayAdProps } from "../Display/DisplayAd"
import { ImageSetPreviewProps } from "../Sections/ImageSetPreview"
import { SocialEmbedProps } from "../Sections/SocialEmbed"
import { ArtistToolTipProps } from "../ToolTip/ArtistToolTip"
import { GeneProps } from "../ToolTip/GeneToolTip"

export const ImageCollection: SectionData = {
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
}

export const ArtworkMissingInfo = {
  type: "artwork",
  id: "589a6291275b2410d1beb6a5",
  slug: "fernando-botero-nude-on-the-beach",
  title: "",
  image:
    "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
  partner: {},
  artists: [],
  width: 1152,
  height: 826,
}

export const ArtworkMultipleArtists = {
  type: "artwork",
  id: "589a6291275b2410d1beb6a5",
  slug: "fernando-botero-nude-on-the-beach",
  date: "2000",
  title: "Nude on the Beach",
  image:
    "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
  partner: {
    name: "Gary Nader",
    slug: "gary-nader",
  },
  artists: [
    {
      name: "Fernando Botero",
      slug: "fernando-botero",
    },
    {
      name: "Frida Kahlo",
      slug: "frida-kahlo",
    },
  ],
  width: 1152,
  height: 826,
  credit: "Courtesy of Gary Nader",
}

export const ArtworkLongInfo = {
  type: "artwork",
  id: "596aa2851a1e864d5eea6681",
  slug: "matt-devine-brass-tax",
  date: "2000",
  title:
    "Fifty Abstract Pictures Which As Seen From Two Yards Change Into Three Lenins Masquerading As Chinese And As Seen From Six Yards Appear As The Head Of A Royal Bengal Tiger",
  image:
    "https://d32dm0rphc51dk.cloudfront.net/lSBz0tsfvOAm2qKdWwgxLw/larger.jpg",
  partner: {
    name: "Joanne Artman Gallery and Gagosian Gallery",
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
  credit:
    "Courtesy of The Metropolitan Museum of Art, Gagosian Gallery, and the artist.",
}

export const ArtworkRegular = {
  type: "artwork",
  id: "589a6291275b2410d1beb6a5",
  slug: "fernando-botero-nude-on-the-beach",
  date: "2000",
  title: "Nude on the Beach",
  image:
    "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
  partner: {
    name: "Gary Nader",
  },
  artist: {
    name: "Fernando Botero",
  },
  width: 1152,
  height: 826,
  credit: "Courtesy of Gary Nader",
}

export const Artworks = [
  ArtworkRegular,
  ArtworkMultipleArtists,
  ArtworkMissingInfo,
  ArtworkLongInfo,
]

export const Authors = [
  {
    image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/9vcX6FR21rKHatmvJ8K0sg%2FAbigail.jpg",
    name: "Abigail Cain",
    bio:
      "[Abigail Cain](https://artsy.net/abigail) is an Art Market Editor at Artsy",
    twitter_handle: "abigailcain",
  },
  {
    image_url: "http://files.artsy.net/images/molly_01.jpg",
    name: "Molly Gottschalk",
    bio:
      "[Molly Gottschalk](https://artsy.net/molly) is a Features Producer at Artsy. She is a photographer and lover of cats.",
    twitter_handle: "mollygottschalk",
  },
  {
    name: "Halley Johnson",
    bio:
      "[Halley Johnson](https://artsy.net/molly) is an Writer Guru at Artsy. She enjoys speaking Georgian.",
    twitter_handle: "halleyjohnson",
  },
  {
    name: "Kana Abe",
    bio: "",
    twitter_handle: "",
  },
]

export const ArticleDisplayAdProps: DisplayAdProps = {
  articleSlug: "a-standard-article",
  adUnit: "Desktop_TopLeaderboard" as AdUnit,
  adDimension: "970x250" as AdDimension,
  targetingData: {
    is_testing: true,
    page_type: "article",
    post_id: "123",
    tags: "Art Market",
  },
}

export const Embeds = [
  {
    mobile_height: 1300,
    height: 1000,
    url:
      "https://artsy-vanity-files-production.s3.amazonaws.com/documents/1parrasch.html",
    layout: "overflow",
    type: "embed",
  },
]

export const SocialEmbedTwitter: SocialEmbedProps["section"] = {
  url: "https://twitter.com/artsy/status/965246051107164160",
  layout: "column_width",
  type: "social_embed",
}

export const SocialEmbedInstagram: SocialEmbedProps["section"] = {
  url: "https://www.instagram.com/p/BfJ2TU9F6sm",
  layout: "column_width",
  type: "social_embed",
}

export const HeroSections = [
  {
    type: "text",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg",
    deck:
      "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "split",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg",
    deck:
      "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "fullscreen",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg",
    deck:
      "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "split",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
  },
  {
    type: "fullscreen",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
  },
  {
    type: "text",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
  },
  {
    type: "basic",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    deck:
      "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
]

export const Images = [
  {
    type: "artwork",
    id: "589a6291275b2410d1beb6a5",
    slug: "fernando-botero-nude-on-the-beach",
    date: "2000",
    title: "Nude on the Beach",
    image:
      "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
    partner: {
      name: "Gary Nader",
      slug: "gary-nader",
    },
    artists: [
      {
        name: "Fernando Botero",
        slug: "fernando-botero",
      },
    ],
    artist: {
      name: "Fernando Botero",
      slug: "fernando-botero",
    },
    width: 1152,
    height: 826,
    credit: "Courtesy of Gary Nader",
    index: 0,
  },
  {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/co8j2xq40ROMyBrJQm_4eQ%2FDafenOilPaintingVillage_AK03.jpg",
    type: "image",
    width: 900,
    height: 1200,
    caption: "<p>Photo by Adam Kuehl for Artsy.</p>",
    setTitle: "New York City",
    index: 1,
  },
  {
    url:
      "https://d32dm0rphc51dk.cloudfront.net/CpHY-DRr7KW0HGXLslCXHw/larger.jpg",
    type: "image",
    width: 816,
    height: 1024,
    caption:
      "<p>Photo by <a href='artsy.net'>Adam Kuehl</a> for Artsy. Image courtesy of the Guggenheim Museum.</p>",
    setTitle: "New York City",
    index: 2,
  },
]

export const ImagesNarrow = [
  {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/fUb8nBvTw5TZ3ZbU6WYbQQ%2Fsequence4c+copy.jpg",
    type: "image",
    width: 254,
    height: 1200,
    caption:
      "<p>Louise Bourgeois, <em>The Sky’s the Limit</em>, 1989–2003. The Museum of Modern Art, New York. © 2017 The Easton Foundation/Licensed by VAGA, NY. Courtesy of the Museum of Modern Art.</p>",
  },
  {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z2c9GQ8P69QjfW6SPXRK1Q%2Fskyscraper+copy.jpg",
    type: "image",
    width: 268,
    height: 1200,
    caption:
      "<p>Louise Bourgeois, <em>The Sky’s the Limit</em>, 1989–2003. The Museum of Modern Art, New York. © 2017 The Easton Foundation/Licensed by VAGA, NY. Courtesy of the Museum of Modern Art.</p>",
  },
  {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/3AW6ZGyyGscbswkyTqUQAw%2FScreen+Shot+2017-09-22+at+5.17.50+PM.png",
    type: "image",
    width: 598,
    height: 596,
    caption:
      "<p>Installation view of Louise Bourgeois, <em>Portrait of Jean-Louis</em>, 1947-49, at the Museum of Modern Art, New York. Photo by @radicchioradicchio, via Instagram.</p>",
  },
]

export const ImageSetFull: ImageSetPreviewProps["section"] = {
  type: "image_set",
  layout: "full",
  title: "The Work of Bruce M. Sherman",
  images: Images,
}

export const ImageSetMini: ImageSetPreviewProps["section"] = {
  type: "image_set",
  title: "The Work of Bruce M. Sherman",
  images: Images,
}

export const ImageSetFullSansTitle: ImageSetPreviewProps["section"] = {
  type: "image_set",
  layout: "full",
  images: Images,
}

export const ImageSetMiniSansTitle: ImageSetPreviewProps["section"] = {
  type: "image_set",
  images: Images,
}

export const Media: MediaData[] = [
  {
    url:
      "https://artsy-vanity-files-production.s3.amazonaws.com/videos/scenic_mono_3.mp4",
    duration: 10948,
    release_date: "2017-08-28T20:38:05.709Z",
    published: true,
    cover_image_url:
      "https://artsy-vanity-files-production.s3.amazonaws.com/images/galerie-ceysson-benetiere_abmb.jpg",
    description:
      "<p>Integer posuere erat a ante venenatis <a href='artsy.net'>dapibus posuere velit</a> aliquet. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>",
    credits:
      "<p><b>Director</b></p><p>Marina Cashdan</p><p><b>Featuring</b></p><p>Trevor Paglan</p>",
  },
]

export const RelatedPanel: RelatedArticlePanelData[] = [
  {
    thumbnail_title: "The 15 Top Art Schools in the United States",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/4Tq-iYkN8dOpshFoKRXyYw%2Fcustom-Custom_Size___PoetterHall_Exterior+copy.jpg",
    slug: "artsy-editorial-15-top-art-schools-united-states",
    id: "52d99185cd530e581300006c",
    layout: "standard",
  },
  {
    thumbnail_title:
      "Four Years after Walter De Maria’s Death, His Final Work Is Complete",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/6IqxBTQCkExip2auQ7ZWCA%2FDEMAR-2011.0006-B.jpg",
    slug:
      "artsy-editorial-four-years-walter-de-marias-death-final-work-complete",
    id: "52d99185cd530e581300006c",
    layout: "feature",
  },
  {
    thumbnail_title: "French Art History in a Nutshell",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/lEcCm2XbfZ7bPAVgLlM21w%2Flarger-21.jpg",
    slug: "artsy-editorial-french-art-history-in-a-nutshell",
    id: "52d99185cd530e581300006c",
    layout: "news",
  },
]

export const RelatedCanvas: RelatedArticleCanvasData[] = [
  {
    thumbnail_title: "The 15 Top Art Schools in the United States",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/4Tq-iYkN8dOpshFoKRXyYw%2Fcustom-Custom_Size___PoetterHall_Exterior+copy.jpg",
    slug: "artsy-editorial-15-top-art-schools-united-states",
    authors: [{ name: "Anna Louis-Sussman" }, { name: "Kana Abe" }],
    // Deprecated
    contributing_authors: [{ name: "Casey Lesser" }],
    published_at: "2017-05-19T13:09:18.567Z",
    id: "52d99185cd530e581300006c",
    layout: "standard",
  },
  {
    thumbnail_title:
      "Four Years after Walter De Maria’s Death, His Final Work Is Complete",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/6IqxBTQCkExip2auQ7ZWCA%2FDEMAR-2011.0006-B.jpg",
    slug:
      "artsy-editorial-four-years-walter-de-marias-death-final-work-complete",
    authors: [{ name: "Halley Johnson" }],
    // Deprecated
    contributing_authors: [{ name: "Casey Lesser" }],
    published_at: "2017-05-19T13:09:18.567Z",
    id: "52d99185cd530e581300006c",
    layout: "feature",
  },
  {
    thumbnail_title: "French Art History in a Nutshell",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/lEcCm2XbfZ7bPAVgLlM21w%2Flarger-21.jpg",
    slug: "artsy-editorial-french-art-history-in-a-nutshell",
    authors: [{ name: "Casey Lesser" }],
    // Deprecated
    contributing_authors: [{ name: "Casey Lesser" }],
    published_at: "2017-05-19T13:09:18.567Z",
    id: "52d99185cd530e581300006c",
    layout: "series",
  },
  {
    thumbnail_title: "Miami Artists and Museums Brace for Hurricane Irma",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/jAu4NaKnr_m53OnnMaDe_w%2Fmag.jpg",
    slug: "artsy-editorial-miami-artists-museums-brace-hurricane-irma",
    authors: [{ name: "Owen Dodd" }],
    published_at: "2017-05-19T13:09:18.567Z",
    id: "52d99185cd530e581300006c",
    layout: "news",
  },
]

export const Sponsor = {
  sponsor: {
    partner_condensed_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/GEu3iYW6CQhbVxsjpOYwZQ%2FGKL_Wort-Bildmarke_negative_rgb+2.png",
    partner_light_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/GEu3iYW6CQhbVxsjpOYwZQ%2FGKL_Wort-Bildmarke_negative_rgb+2.png",
    partner_dark_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/AjncVmjZHFM4Z-0b6nPz8A%2FGUCCI.png",
    partner_logo_link: "http://artsy.net",
    pixel_tracking_code: "http://sometrackingcodeurl.com/12345",
  },
}

export const Videos = [
  {
    url: "https://www.youtube.com/watch?v=PXi7Kjlsz9A",
    caption: "<p>What motivates patrons to fund artists’ wildest dreams?</p>",
    cover_image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/IB6epb5L_l0rm9btaDsY7Q%2F14183_MDP_Evening_240.jpg",
  },
  {
    url: "https://vimeo.com/191988155",
    caption:
      "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
    cover_image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
  },
  {
    url: "https://vimeo.com/191988155",
  },
]

export const ClassicText: object[] = [
  {
    type: "text",
    body:
      "<p>Rines is a part of a recent migration that has galleries gravitating to the <a href='https://www.artsy.net/'>Lower East Side and Chinatown</a>. The new gallery sits on a stretch of Henry Street that also includes Chapter NY, Cuevas Tilleard, and newcomer Shrine, and is just blocks from:</p>",
  },
  {
    type: "text",
    body:
      "<ul><li>Chinatown stalwart Reena Spaulings Fine Art</li><li>The shiny new <span style='text-decoration: line-through;'>Foxy Production</span></li><li>Freshly launched programs like Erin Goldberger’s New Release</li><li>Angelo Lanza’s gallery Jeffrey Stark in the basement of the East Broadway Mall</li></ul>",
  },
  {
    type: "text",
    body:
      "<p>And <em>not a stone’s throw away</em> are the southern bounds of the Lower East Side, where <strong>hundreds</strong> of more galleries gather.</p>",
  },
  {
    type: "text",
    layout: "blockquote",
    body:
      "<blockquote>Hardly a week goes by without murmurings that yet another gallery is opening</blockquote>",
  },
  {
    type: "text",
    body:
      "<h3><strong>Galleries Section, Booth 10221</strong></h3><h2>neugerriemschneider</h2>",
  },
  {
    type: "text",
    body:
      "<h3><em>With works by</em> Franz Ackermann, Ai Weiwei, Pawel Althamer, Billy Childish, Keith Edmier, Olafur Eliasson, Andreas Eriksson, Noa Eshkol, Mario García Torres, Renata Lucas, Michel Majerus, Mike Nelson, Jorge Pardo, Elizabeth Peyton, Tobias Rehberger, Thaddeus Strode, Rirkrit Tiravanija, Pae White</h3>",
  },
  {
    type: "text",
    body:
      "<p>The resultant work allows Salley the chance to recount her experiences of the aftermath of her scandal in her own words. In the film, Fujiwara and Salley are shown meeting professionals from public relations, advertising, and fashion companies as they seek to construct a new public image for her. Alongside the film, light boxes display fashion photographer Andreas Larsson’s pictures of Salley, which were taken as part of the project to rebuild her profile. While the show tackles public identity, female iconography, and Salley’s voice as an artist, the pair’s close working relationship—one in which the conventional power relationship has been overturned—no doubt aided their collaboration.</p>",
  },
  {
    type: "text",
    body:
      "<ol><li>Chinatown stalwart Reena Spaulings Fine Art</li><li>The shiny new Foxy Production</li><li>Freshly launched programs like Erin Goldberger’s New Release</li><li>Angelo Lanza’s gallery Jeffrey Stark in the basement of the East Broadway Mall</li></ol>",
  },
  {
    type: "text",
    body:
      "<p>Rines is a part of a recent migration that has galleries gravitating to the Lower East Side and Chinatown. She opened 56 Henry in December 2015, just four months after being forced to shutter her previous microgallery 55 Gansevoort—an elevator shaft a block east of the Whitney—after Restoration Hardware bought its building.</p>",
  },
  {
    type: "text",
    body:
      "<h2><a href='https://www.artsy.net/artist/ej-hill' class='is-follow-link' name='EJ_Hill'>EJ Hill</a><a data-id='ej-hill' class='entity-follow artist-follow'></a></h2>",
  },
  {
    type: "text",
    body:
      "<p><a href='https://www.artsy.net/artist/ej-hill' class='is-follow-link' name='EJ_Hill'>EJ Hill</a><a data-id='ej-hill' class='entity-follow artist-follow'></a></p>",
  },
]

export const StandardText = flatten([
  ClassicText,
  {
    type: "text",
    body:
      "<p>Rines is a part of a recent migration that has galleries gravitating to the Lower East Side and Chinatown. She opened 56 Henry in December 2015, just four months after being forced to shutter her previous microgallery 55 Gansevoort—an elevator shaft a block east of the Whitney—after Restoration Hardware bought its building.</p>",
  },
])

export const FeatureText = flatten([
  { type: "text", body: "<h1>Standard Header</h1>" },
  StandardText,
])

export const Genes: GeneProps[] = [
  {
    gene: {
      " $refType": null,
      name: "Capitalist Realism",
      slug: "capitalist-realism",
      internalID: "5955005ceaaedc0017acdd1f",
      image: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=240&height=160&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKX6a5mdTJd5cVrqCC-yb9A%2Fthumb.jpg",
      },
      href: "gene/capitalist-realism",
      description:
        "_“Capitalist Realism was another form of provocation. This term somehow attacked both sides: It made Socialist Realism look ridiculous, and did the same to the possibility of Capitalist Realism as well.” —[Gerhard Richter](/artist/gerhard-richter)_\n\nCapitalist Realism was launched in 1963 in Germany by the artists [Gerhard Richter](/artist/gerhard-richter), [Sigmar Polke](/artist/sigmar-polke), and Konrad Lueg (later to become the dealer Konrad Fischer) not as a movement, but rather as a send-up. Its most iconic expression was a performance titled “Living with Pop – A Demonstration for Capitalist Realism,” orchestrated by Richter and Lueg in the Berges department store in Dusseldorf that same year. The artists invited patrons to come view “what is hailed in America as the greatest breakthrough in art since Cubism,” as an advertisement for the event proclaimed. Puzzled visitors arrived to find the artists making themselves at home in a staged and decidedly average living room (Richter was reading a mystery novel). Of course Capitalist Realism had no such reputation in the U.S.; the artists were parodying the overnight ascendance of [Pop Art](/gene/pop-art), with its celebrity culture and embrace of everyday commodities, as well as the German craze for all things American. Against the backdrop of the Cold War and a divided Germany, the fake movement’s title also alluded to the Soviet doctrine of [Socialist Realism](/gene/socialist-realism). The concerns of so-called Capitalist Realism—heavy-handed irony, investigation of the political aspects of consumerism, and critique of popular culture—have been seen by some as predecessors to a German strain of Pop Art, though the existence thereof is, itself, debatable.",
    },
  },
]

export const Artists: ArtistToolTipProps[] = [
  {
    artist: {
      " $refType": null,
      name: "Nick Mauss",
      formatted_nationality_and_birthday: "American, b. 1980",
      href: "/artist/nick-mauss",
      slug: "nick-mauss",
      internalID: "5955005ceaaedc0017acdd1f",
      blurb:
        "Nick Mauss makes drawings, prints, and paintings that often take on sculptural presence in their presentation; his 2012 large-scale series of [silkscreen](/gene/silkscreen-1) prints on aluminum sheeting were propped against the wall, folded to stand upright, or rolled up on the ground, revealing only parts of the printed image. Mauss creates his works using a variety of materials, including ceramic tablets, glaze, ink, acrylic, wooden panels, paper, and velvet appliqué, in the case of his 2012 Whitney Biennial installation. He also uses a range of techniques to apply marks and color, including rubbing, rasping, stenciling, and scraping, in addition to silkscreening and printing. His works have a common interest in the presentation of memory and repetition.",
      carousel: {
        images: [
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=152&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeYGNRMFqIirK-962fSOAsw%2Flarge.jpg",
              width: 152,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=258&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F_lnI3nNFEo6D9TFqm2oM1w%2Flarge.jpg",
              width: 258,
              height: 200,
            },
          },
        ],
      },
      genes: [
        {
          name: "United States",
        },
        {
          name: "Abstract Art",
        },
        {
          name: "21st Century",
        },
        {
          name: "1970–present",
        },
        {
          name: "Use of Common Materials",
        },
        {
          name: "Drawing",
        },
        {
          name: "Painting",
        },
        {
          name: "Immersive",
        },
        {
          name: "Ceramic",
        },
        {
          name: "Mixed-Media",
        },
      ],
    },
  },
  {
    artist: {
      " $refType": null,
      name: "Jutta Koether",
      formatted_nationality_and_birthday: "German, b. 1958",
      href: "/artist/jutta-koether",
      slug: "jutta-koether",
      internalID: "5955005ceaaedc0017acdd1f",
      blurb:
        "Since the 1990s, German artist Jutta Koether has reflected on contemporary culture through her painting, performance, music, and writing. Koether is most commonly recognized for her abstract paintings that combine vibrant colors and gestural strokes with contemporary and historical imagery, such as graffiti-like brushwork, song lyrics, images of women, floral motifs, and other symbolic references. In her own take on [Neoclassical](/gene/neoclassicism) renderings of landscapes and Biblical images, Koether painted a series based on 17th-century painter [Nicolas Poussin](/artist/nicolas-poussin)'s _The Four Seasons_. Using frenetic lines in contrast to Poussin's formal refined techniques, Koether reveals her contemporary view of the seasons and notes the context of the work, a theme also carried through in her display of the works, frequently meant to be site-specific.",
      carousel: {
        images: [
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=299&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F1vTtdhvFhNbqpPQuX-Iv6w%2Flarge.jpg",
              width: 299,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=300&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fzjk5e7k2ii8LVpcZNGN75w%2Flarge.jpg",
              width: 300,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=150&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F4fWiy9ypPV9eBAzbmhe5HQ%2Flarge.jpg",
              width: 150,
              height: 200,
            },
          },
        ],
      },
      genes: [],
    },
  },
  {
    artist: {
      " $refType": null,
      name: "Diamond Stingily",
      formatted_nationality_and_birthday: "",
      href: "/artist/diamond-stingily",
      slug: "diamond-stingily",
      internalID: "5955005ceaaedc0017acdd1f",
      blurb:
        "Diamond Stingily is an American artist whose work explores memory and identity through powerful, restrained installations mediated by an intentional choice of material and careful negotiation of spatial relationships. Using [childhood](/gene/childhood) as a universalizing inflection point, Stingily addresses neglected narratives, particularly the ignored experience of black girlhood, drawing on experiences in her mother’s hair salon and childhood diary, which was published in 2014. Stingily has used braids to materialize the historical and contemporary implications of black women’s hair, and more broadly, the physical alienation and exploitation. Structures of power emerge in unexpected presentations of familiar objects, highlighting disproportionate systemic limitation, physical violence, and [surveillance](/gene/surveillance). ",
      carousel: {
        images: [
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=321&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FBnViN8O7L4qm1LF95wBxSw%2Flarge.jpg",
              width: 321,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=133&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCtQrdlNO8F36Bo46olHNzw%2Flarge.jpg",
              width: 133,
              height: 200,
            },
          },
        ],
      },
      genes: [
        {
          name: "Emerging Art",
        },
        {
          name: "Brooklyn Artists",
        },
      ],
    },
  },
  {
    artist: {
      " $refType": null,
      name: "Anni Albers",
      formatted_nationality_and_birthday: "German-American, 1899–1994",
      href: "/artist/anni-albers",
      slug: "anni-albers",
      internalID: "5955005ceaaedc0017acdd1f",
      blurb:
        "Printmaker and textile artist Anni Albers is widely recognized both for her geometric patterned compositions and deep involvement with the [Bauhaus](/gene/bauhaus) and Black Mountain College, teaching at the latter between 1933 and 1949. Albers arrived at the Bauhaus in Weimar, Germany in 1922, but was limited in the coursework she could pursue as certain disciplines were not taught to women. Although she began weaving almost by default, Albers became among the 20th century’s defining “pictorial” textile artists. At the Bauhaus she studied under painters [Paul Klee](/artist/paul-klee) and [Wassily Kandinsky](/artist/wassily-kandinsky), focusing on relationships between colors and the expressive potential of simple forms. She then married leading Bauhaus figure and renowned color theorist [Josef Albers](/artist/josef-albers) in 1925. In addition to frequent conversations with her many friends and colleagues, Albers drew inspiration from the pre-Columbian art she viewed during travels throughout Mexico and the Americas.",
      carousel: {
        images: [
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=300&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fyywb0L33PlhpPIzUfvu2Sg%2Flarge.jpg",
              width: 300,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=324&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FjPPb9arcM1qqw9Fn6zMSbw%2Flarge.jpg",
              width: 324,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=154&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FxX8DYk6TSmsdRAzXAA3VVA%2Flarge.jpg",
              width: 154,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=252&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FM9rbjJsD4VoyPzI_Rein7A%2Flarge.jpg",
              width: 252,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=121&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FX3BBTgq-WcCpnvg-FbW52Q%2Flarge.jpg",
              width: 121,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=285&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbjOpm_qN7B0XDqdnxs1wUw%2Flarge.jpg",
              width: 285,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=123&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fgli7IyWJ4yxCB9RVqUvhEg%2Flarge.jpg",
              width: 123,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=174&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FDeBaVbdN3cmIHXr4NUho0g%2Flarge.jpg",
              width: 174,
              height: 200,
            },
          },
          {
            resized: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=167&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F0qT9YOV0Ct7fUqL43klckA%2Flarge.jpg",
              width: 167,
              height: 200,
            },
          },
        ],
      },
      genes: [],
    },
  },
]
