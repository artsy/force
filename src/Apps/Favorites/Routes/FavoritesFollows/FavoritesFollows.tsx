import { FC } from "react"
import { MetaTags } from "Components/MetaTags"
import { SettingsSavesArtistsQueryRenderer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesProfiles"
import { Join, Spacer } from "@artsy/palette"

export const FavoritesFollows: FC = () => {
  return (
    <>
      <MetaTags title="Follows | Artsy" pathname="favorites/follows" />

      <Join separator={<Spacer y={4} />}>
        <SettingsSavesArtistsQueryRenderer />

        <SettingsSavesProfilesQueryRenderer />

        <SettingsSavesCategoriesQueryRenderer />
      </Join>
    </>
  )
}
