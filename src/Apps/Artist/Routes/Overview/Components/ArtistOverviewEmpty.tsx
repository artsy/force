import { EmptyState } from "Components/EmptyState"
import { RouterLink } from "System/Components/RouterLink"

export const ArtistOverviewEmpty: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <EmptyState
      title="We’ll update this area when more information is available."
      description={
        <>
          Do you represent this artist?{" "}
          <RouterLink inline to="/gallery-partnerships">
            Become a partner.
          </RouterLink>
        </>
      }
    />
  )
}
