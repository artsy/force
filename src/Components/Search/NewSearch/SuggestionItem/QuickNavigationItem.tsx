import { Pill, PillProps } from "@artsy/palette"
import { FC } from "react"

interface QuickNavigationItemProps {
  to: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const QuickNavigationItem: FC<QuickNavigationItemProps & PillProps> = ({
  to,
  onClick,
  ...rest
}) => {
  const handleClick = event => {
    // Stopping the event from propagating to prevent SearchBar from navigation to the main suggestion item url.
    event.stopPropagation()
    event.preventDefault()
    onClick?.(event)

    // TODO: Use routerLink instead of manual navigation?
    // FIXME: Using `window.location.assign(to)` instead of `router.push(to)` to prevent a bug where the search bar won't hide anymore.
    window.location.assign(to)
  }

  return <Pill onClick={handleClick} mt={1} mr={1} {...rest} />
}
