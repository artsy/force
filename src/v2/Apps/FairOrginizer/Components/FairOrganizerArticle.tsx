import styled, { StyledComponentClass } from "styled-components"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "v2/Apps/Fair/Components/FairEditorial/FairEditorialItem"

export const FairOrganizerArticle = styled(FairEditorialItem).attrs({
  isResponsive: true,
})`` as StyledComponentClass<any, any>
FairOrganizerArticle.displayName = "FairOrganizerArticle"
