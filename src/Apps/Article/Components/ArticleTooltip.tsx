import {
  type Entity,
  EntityTooltip,
  EntityTooltipHighlight,
} from "Components/EntityTooltip"
import { RouterLink } from "System/Components/RouterLink"
import { Dropdown } from "@artsy/palette"
import type { FC } from "react"

export { isEntity as isSupportedArticleTooltip } from "Components/EntityTooltip"

interface ArticleTooltipProps {
  entity: Entity
  href: string
  id: string
}

export const ArticleTooltip: FC<
  React.PropsWithChildren<ArticleTooltipProps>
> = ({ entity, href, id, children }) => {
  return (
    <Dropdown
      placement="bottom"
      dropdown={<EntityTooltip entity={entity} id={id} />}
    >
      {({ anchorRef, anchorProps }) => (
        <EntityTooltipHighlight
          as="span"
          ref={anchorRef as any}
          {...anchorProps}
        >
          <RouterLink to={href} textDecoration="none">
            {children}
          </RouterLink>
        </EntityTooltipHighlight>
      )}
    </Dropdown>
  )
}
