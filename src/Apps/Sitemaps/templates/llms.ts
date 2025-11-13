import { FACTS_AND_FIGURES } from "Utils/factsAndFigures"
import { Device, DOWNLOAD_APP_URLS } from "Utils/Hooks/useDeviceDetection"

export const LLMS_TXT = `# Artsy

> Artsy is the world’s largest online art marketplace. Browse over ${FACTS_AND_FIGURES.artworksCount} artworks by iconic and emerging artists from ${FACTS_AND_FIGURES.galleriesCount}+ galleries and top auction houses.

## Browse & Buy Art
- [Artists](https://www.artsy.net/artists): Profiles for over ${FACTS_AND_FIGURES.artistsCount}+ artists: bios, works, auction results.
- [Artworks](https://www.artsy.net/collect): Global inventory of over ${FACTS_AND_FIGURES.artworksCount}+ artworks searchable by medium, price, size, and more.
- [Galleries](https://www.artsy.net/galleries): A global index of Artsy’s ${FACTS_AND_FIGURES.galleriesCount}+ partner galleries, organized by city and specialty. Listings surface the gallery’s current, upcoming, and past shows, along with artworks that are available to buy immediately.
- [Museums](https://www.artsy.net/institutions): A directory of more than ${FACTS_AND_FIGURES.institutionsCount} museum and nonprofit institution partners worldwide. Each profile showcases current and past exhibitions, highlights from the collection, and a “Follow” button so collectors get notified when new shows go live.
- [Shows](https://www.artsy.net/shows): Artsy’s calendar of gallery and museum exhibitions worldwide. Filter by city or “Online Exclusive,” browse featured shows, and track live countdowns until opening or closing.
- [Fairs & Events](https://www.artsy.net/fairs): A hub for ${FACTS_AND_FIGURES.fairsCount}+ international art fairs—from Art Basel and Frieze to regional pop-ups. Users can preview booths, filter by “Current / Upcoming / Past,” and buy works before, during, or after the physical fair dates.
- [Viewing Rooms](https://www.artsy.net/viewing-rooms): Time-limited online exhibitions where leading galleries and institutions present tightly curated selections of work. Pages blend high-resolution images, curatorial storytelling, and instant purchase or inquiry options.
- [Collections](https://www.artsy.net/collections): Curated thematic groups (e.g., Surrealism, Women Sculptors).
- [Categories](https://www.artsy.net/categories): *The Art Genome Project* taxonomy of 1,000+ art-historical “genes.”

## Get the App
- [iOS App](${DOWNLOAD_APP_URLS[Device.iPhone]})
- [Android App](${DOWNLOAD_APP_URLS[Device.Android]})

## Auctions & Live Sales
- [Auctions](https://www.artsy.net/auctions): Live and timed sales from leading houses and nonprofits.
- [Auction Info](https://www.artsy.net/auction-info): How bidding works, increments, maximum-bid logic.
- [Supplemental Conditions of Sale](https://www.artsy.net/supplemental-cos): House-specific terms for each auction.

## Editorial & News
- [Editorial](https://www.artsy.net/articles): News, market analysis, studio visits, and explainers.
- [News](https://www.artsy.net/news): Latest updates from the art world.

## Buyer Resources & Policies
- [Collecting 101 - How to Buy Art](https://www.artsy.net/feature/how-to-buy-art): Beginner-friendly collecting guide.
- [Visit our Help Center](https://support.artsy.net/): FAQs, guides, and support.
- [Buying on Artsy](https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy): How to buy art on Artsy.
- [Price Database](https://www.artsy.net/price-database): Historical pricing data for artworks.
- [Buyer Guarantee](https://www.artsy.net/buyer-guarantee): Authenticity & refund policy (coverage up to $100,000).
- [Complete Guide to Bidding](https://support.artsy.net/s/article/The-Complete-Guide-to-Auctions-on-Artsy): Step-by-step auction tutorial.
- [Terms & Conditions](https://www.artsy.net/terms)
- [Privacy Policy](https://www.artsy.net/privacy)
- [Security](https://www.artsy.net/security)

## Partnerships
- [Artsy for Galleries](https://partners.artsy.net/)
- [Artsy for Museums](https://www.artsy.net/institution-partnerships)
- [Artsy for Benefits](https://partners.artsy.net/auction-partnerships)
- [Gallery Resources](https://partners.artsy.net/gallery-resources)

## About
- [About](https://www.artsy.net/about): Mission, team, and key marketplace stats.
- [Press Releases](https://www.artsy.net/press/press-releases)
- [Jobs](https://www.artsy.net/jobs)
- [Contact](https://www.artsy.net/contact)

## Social
- [WeChat](http://weixin.qq.com/r/2CotNbbES_s0rfJW93-K)
- [Instagram](https://www.instagram.com/artsy)
- [X](https://x.com/artsy)
- [Spotify](https://open.spotify.com/user/ic7ea71nb4o0dy7xpu958vx2q)
- [Facebook](https://www.facebook.com/artsy)
- [TikTok](https://www.tiktok.com/@artsy)
- [YouTube](https://www.youtube.com/@artsy)
- [Pinterest](https://www.pinterest.com/artsy)
`
