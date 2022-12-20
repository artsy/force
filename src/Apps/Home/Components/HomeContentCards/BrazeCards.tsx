import React from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import Braze from "@braze/web-sdk"
import { HomeContentCard } from "./HomeContentCard"

interface BrazeCardsProps {
  braze: typeof Braze
  cards: Braze.CaptionedImage[]
}

export const BrazeCards: React.FC<BrazeCardsProps> = ({ braze, cards }) => {
  const handleChange = index => {
    const card = cards[index]
    braze.logCardImpressions([card])
  }

  return (
    <HeroCarousel onChange={handleChange}>
      {cards.map((card, index) => {
        const handleClick = () => {
          braze.logCardClick(card)
        }

        return (
          <HomeContentCard
            card={card}
            index={index}
            key={card.id}
            onClick={handleClick}
          />
        )
      })}
    </HeroCarousel>
  )
}
