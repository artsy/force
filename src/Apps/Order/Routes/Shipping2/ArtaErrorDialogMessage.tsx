import { RouterLink } from "System/Router/RouterLink"

export const ArtaErrorDialogMessage = () => (
  <>
    There was a problem getting shipping quotes. <br />
    Please contact{" "}
    <RouterLink inline to={`mailto:orders@artsy.net`}>
      orders@artsy.net
    </RouterLink>
    .
  </>
)
