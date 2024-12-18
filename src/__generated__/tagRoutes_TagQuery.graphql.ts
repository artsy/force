/**
 * @generated SignedSource<<6fb8baf5337f03b7ddb415d5e17624ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type tagRoutes_TagQuery$variables = {
  slug: string
}
export type tagRoutes_TagQuery$data = {
  readonly tag:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"TagApp_tag">
      }
    | null
    | undefined
}
export type tagRoutes_TagQuery = {
  response: tagRoutes_TagQuery$data
  variables: tagRoutes_TagQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "slug",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "id",
        variableName: "slug",
      },
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "tagRoutes_TagQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Tag",
          kind: "LinkedField",
          name: "tag",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "TagApp_tag",
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
      name: "tagRoutes_TagQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Tag",
          kind: "LinkedField",
          name: "tag",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "name",
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
              args: null,
              kind: "ScalarField",
              name: "description",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: "Image",
              kind: "LinkedField",
              name: "image",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: [
                    {
                      kind: "Literal",
                      name: "height",
                      value: 630,
                    },
                    {
                      kind: "Literal",
                      name: "width",
                      value: 1200,
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
                      name: "src",
                      storageKey: null,
                    },
                  ],
                  storageKey: "cropped(height:630,width:1200)",
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "035d078a8dc1e5672ec96bd1575eea3b",
      id: null,
      metadata: {},
      name: "tagRoutes_TagQuery",
      operationKind: "query",
      text: "query tagRoutes_TagQuery(\n  $slug: String!\n) {\n  tag(id: $slug) @principalField {\n    ...TagApp_tag\n    id\n  }\n}\n\nfragment TagApp_tag on Tag {\n  ...TagMeta_tag\n  name\n}\n\nfragment TagMeta_tag on Tag {\n  name\n  href\n  description\n  image {\n    cropped(width: 1200, height: 630) {\n      src\n    }\n  }\n}\n",
    },
  }
})()
;(node as any).hash = "a969974f4251bcc8522f3c4b08ee1d39"

export default node
