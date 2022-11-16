import { CaptionedImage as BrazeContentCard } from "@braze/web-sdk"
import {
  HomeHeroUnit,
  StaticHeroUnit,
} from "Apps/Home/Components/HomeHeroUnits/HomeHeroUnit"

interface HomeContentCardProps {
  card: BrazeContentCard
  index: number
}

export const HomeContentCard: React.FC<HomeContentCardProps> = ({
  card,
  index,
}) => {
  const extras = card.extras || {}

  const heroUnit: StaticHeroUnit = {
    backgroundImageURL: card.imageUrl!,
    creditLine: extras.credit,
    heading: extras.label,
    href: card.url!,
    linkText: card.linkText,
    subtitle: card.description,
    title: card.title,
  }

  return <HomeHeroUnit heroUnit={heroUnit} index={index} layout="a" />
}
