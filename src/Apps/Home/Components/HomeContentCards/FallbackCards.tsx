import { HomeContentCard } from "./HomeContentCard"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import Braze from "@braze/web-sdk"

const makeContentCard = ({
  imageUrl,
  credit,
  label,
  url,
  id,
  linkText,
  description,
  title,
}): Braze.CaptionedImage => {
  const extras = {
    credit,
    label,
  }

  return {
    aspectRatio: 1.0,
    categories: [],
    clicked: false,
    created: null,
    description,
    dismissCard: () => {},
    dismissed: false,
    dismissible: false,
    extras,
    expiresAt: null,
    id,
    imageUrl,
    linkText,
    pinned: false,
    removeAllSubscriptions: () => {},
    removeSubscription: () => {},
    subscribeToClickedEvent: () => "",
    subscribeToDismissedEvent: () => "",
    title,
    updated: new Date(),
    viewed: false,
    url,
  }
}

const fallbackData = [
  {
    credit: "Illustration by Artsy.",
    description:
      "A weekly curated selection of the best works on Artsy by emerging and sought-after artists. All works available now.",
    id: 1,
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/Ank3B35DVzxLcI9azZBK2w/untouched-jpg.jpg",
    label: "Featured Collection",
    linkText: "Browse Works",
    title: "Trove: Editor’s Picks",
    url: "https://www.artsy.net/collection/trove-editors-picks",
  },
  {
    credit:
      "Sam Francis, Untitled (SF94-042), 1994. Courtesy of Rago/Wright. Charles Arnoldi, Untitled, 2017. Courtesy of Venice Art Walk Benefit Auction. Sam Gilliam, Baby's Blue, circa 1963. Courtesy of Heritage Auctions. James Daugherty, The Joy of Red, c.1960. Courtesy of Swann Auction Galleries. David Shrigley, Untitled (Thank You for Burning All of My Posessions), 2019. Courtesy of Forum Auctions.",
    description: "Find works by emerging and established artists at auction",
    id: 2,
    imageUrl:
      "https://d32dm0rphc51dk.cloudfront.net/IopjCK3x5TuGzjFqp-K3rQ/untouched-jpg.jpg",
    label: "Artsy Auctions",
    linkText: "Browse Works",
    title: "Bid on Art by Today’s Leading Artists",
    url: "/auctions",
  },
]

export const FallbackCards = () => {
  const cards = fallbackData.map(data => makeContentCard(data))

  return (
    <HeroCarousel>
      {cards.map((card, index) => (
        <HomeContentCard card={card} index={index} key={card.id} />
      ))}
    </HeroCarousel>
  )
}
