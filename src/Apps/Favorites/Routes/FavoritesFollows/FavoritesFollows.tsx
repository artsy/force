import { Join, Spacer } from "@artsy/palette"
import { SettingsSavesArtistsQueryRenderer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "Apps/Favorites/Routes/FavoritesFollows/Components/SettingsSavesProfiles"
import { MetaTags } from "Components/MetaTags"
import type { FC } from "react"

export const FavoritesFollows: FC<React.PropsWithChildren<unknown>> = () => {
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
