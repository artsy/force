import React from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import Braze from "@braze/web-sdk"
import { HomeContentCard } from "./HomeContentCard"

interface BrazeCardsProps {
  braze: typeof Braze
  cards: Braze.CaptionedImage[]
}

export const BrazeCards: React.FC<BrazeCardsProps> = ({ braze, cards }) => {
  const handleChange = (index: number) => {
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
            key={card.id}
            card={card}
            index={index}
            onClick={handleClick}
          />
        )
      })}
    </HeroCarousel>
  )
}
