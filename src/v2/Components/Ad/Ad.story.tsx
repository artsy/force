import { AdProvider, Ad, AdProps } from "./Ad"
import { AD_SIZES } from "./types"
import { States } from "storybook-states"

export default {
  title: "Components/Ad",
}

export const Default = () => {
  return (
    <AdProvider>
      <States<Partial<AdProps>> states={AD_SIZES.map(size => ({ size }))}>
        <Ad unit="Desktop_Leaderboard1" size="970x250" />
      </States>
    </AdProvider>
  )
}
