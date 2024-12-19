/**
 * @generated SignedSource<<f1eb36069e7c48cefbc845a2ea0335da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type ArticleVerticalRelatedArticlesQuery$variables = {
  id: string
}
export type ArticleVerticalRelatedArticlesQuery$data = {
  readonly article:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"ArticleVerticalRelatedArticles_article">
      }
    | null
    | undefined
}
export type ArticleVerticalRelatedArticlesQuery = {
  response: ArticleVerticalRelatedArticlesQuery$data
  variables: ArticleVerticalRelatedArticlesQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "id",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "vertical",
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "id",
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "ArticleVerticalRelatedArticlesQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Article",
          kind: "LinkedField",
          name: "article",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "ArticleVerticalRelatedArticles_article",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "ArticleVerticalRelatedArticlesQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Article",
          kind: "LinkedField",
          name: "article",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: "verticalRelatedArticles",
              args: [
                {
                  kind: "Literal",
                  name: "inVertical",
                  value: true,
                },
                {
                  kind: "Literal",
                  name: "size",
                  value: 8,
                },
              ],
              concreteType: "Article",
              kind: "LinkedField",
              name: "relatedArticles",
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "internalID",
                  storageKey: null,
                },
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "title",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "thumbnailTitle",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "byline",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "href",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: [
                    {
                      kind: "Literal",
                      name: "format",
                      value: "MMM D, YYYY",
                    },
                  ],
                  kind: "ScalarField",
                  name: "publishedAt",
                  storageKey: 'publishedAt(format:"MMM D, YYYY")',
                },
                {
                  alias: null,
                  args: null,
                  concreteType: "Image",
                  kind: "LinkedField",
                  name: "thumbnailImage",
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: [
                        {
                          kind: "Literal",
                          name: "height",
                          value: 334,
                        },
                        {
                          kind: "Literal",
                          name: "width",
                          value: 445,
                        },
                      ],
                      concreteType: "CroppedImageUrl",
                      kind: "LinkedField",
                      name: "cropped",
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "width",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "height",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "src",
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: "ScalarField",
                          name: "srcSet",
                          storageKey: null,
                        },
                      ],
                      storageKey: "cropped(height:334,width:445)",
                    },
                  ],
                  storageKey: null,
                },
                v3 /*: any*/,
              ],
              storageKey: "relatedArticles(inVertical:true,size:8)",
            },
            v3 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "61bed6898a5a3ca7fd6c7f421f293cd8",
      id: null,
      metadata: {},
      name: "ArticleVerticalRelatedArticlesQuery",
      operationKind: "query",
      text: 'query ArticleVerticalRelatedArticlesQuery(\n  $id: String!\n) @cacheable {\n  article(id: $id) {\n    ...ArticleVerticalRelatedArticles_article\n    id\n  }\n}\n\nfragment ArticleVerticalRelatedArticles_article on Article {\n  vertical\n  verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {\n    internalID\n    ...CellArticle_article\n    id\n  }\n}\n\nfragment CellArticle_article on Article {\n  vertical\n  title\n  thumbnailTitle\n  byline\n  href\n  publishedAt(format: "MMM D, YYYY")\n  thumbnailImage {\n    cropped(width: 445, height: 334) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n',
    },
  }
})()

;(node as any).hash = "90c7a0ad9be35d3d3396e16bf5895d6b"

export default node
