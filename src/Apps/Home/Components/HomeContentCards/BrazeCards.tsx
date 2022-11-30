import React from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import { HomeContentCard } from "./HomeContentCard"

interface BrazeCardsProps {
  appboy: any
  cards: BrazeContentCard[]
}

export const BrazeCards: React.FC<BrazeCardsProps> = ({ appboy, cards }) => {
  const handleChange = index => {
    const card = cards[index]
    appboy.logCardImpressions([card])
  }

  return (
    <HeroCarousel onChange={handleChange}>
      {cards.map((card, index) => {
        const handleClick = () => {
          appboy.logCardClick(card)
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
