import { Column, GridColumns } from "@artsy/palette"
import { FC } from "react"
import { HomePersonalizeMoreCard } from "./HomePersonalizeMoreCard"

export const HomePersonalizeMore: FC = () => {
  return (
    <GridColumns>
      <Column span={4}>
        <HomePersonalizeMoreCard
          src="https://files.artsy.net/images/boafo-banner.jpg"
          title="Never miss an artwork"
          subtitle="Saves and Follows help you keep track of the artworks and artists you love."
          label="Manage Saves and Follows"
          href="/favorites/saves"
          height="100%"
        />
      </Column>

      <Column span={4}>
        <HomePersonalizeMoreCard
          src="https://files.artsy.net/images/larsen-banner.jpg"
          title="Introduce yourself"
          subtitle="Fill out your collector profile to build stronger relationships with galleries on Artsy."
          label="Complete Your Profile"
          href="/settings/edit-profile"
          height="100%"
        />
      </Column>

      <Column span={4}>
        <HomePersonalizeMoreCard
          src="https://files.artsy.net/images/warhol-banner.jpg"
          title="Sell with Artsy"
          subtitle="Get the best sales options for artworks from your collection."
          label="Learn More"
          href="/sell"
          height="100%"
        />
      </Column>
    </GridColumns>
  )
}
