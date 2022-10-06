import { graphql } from "react-relay"

export const REDIRECTS_SHORTCUTS_QUERY = graphql`
  query RedirectsShortcutsQuery($id: ID!) {
    shortcut(id: $id) {
      long
    }
  }
`
