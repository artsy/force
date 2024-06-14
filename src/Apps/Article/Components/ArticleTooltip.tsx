import { Dropdown } from "@artsy/palette"
import { FC } from "react"
import {
  Entity,
  EntityTooltip,
  EntityTooltipHighlight,
} from "Components/EntityTooltip"
import { RouterLink } from "System/Components/RouterLink"

export { isEntity as isSupportedArticleTooltip } from "Components/EntityTooltip"

interface ArticleTooltipProps {
  entity: Entity
  href: string
  id: string
}

export const ArticleTooltip: FC<ArticleTooltipProps> = ({
  entity,
  href,
  id,
  children,
}) => {
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
