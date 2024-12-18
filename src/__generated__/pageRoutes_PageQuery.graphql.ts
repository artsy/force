/**
 * @generated SignedSource<<fd5b61351286b56c807227a0ac35c054>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type pageRoutes_PageQuery$variables = {
  id: string
}
export type pageRoutes_PageQuery$data = {
  readonly page: {
    readonly " $fragmentSpreads": FragmentRefs<"PageApp_page">
  }
}
export type pageRoutes_PageQuery = {
  response: pageRoutes_PageQuery$data
  variables: pageRoutes_PageQuery$variables
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
    ]
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "pageRoutes_PageQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Page",
          kind: "LinkedField",
          name: "page",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "PageApp_page",
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
      name: "pageRoutes_PageQuery",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "Page",
          kind: "LinkedField",
          name: "page",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "internalID",
              storageKey: null,
            },
            {
              alias: null,
              args: [
                {
                  kind: "Literal",
                  name: "format",
                  value: "HTML",
                },
              ],
              kind: "ScalarField",
              name: "content",
              storageKey: 'content(format:"HTML")',
            },
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
              name: "published",
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
      cacheID: "ba9753ca155a5b69e1844edeaef0fbdb",
      id: null,
      metadata: {},
      name: "pageRoutes_PageQuery",
      operationKind: "query",
      text: "query pageRoutes_PageQuery(\n  $id: ID!\n) @cacheable {\n  page(id: $id) @principalField {\n    ...PageApp_page\n    id\n  }\n}\n\nfragment PageApp_page on Page {\n  internalID\n  content(format: HTML)\n  name\n  published\n}\n",
    },
  }
})()
;(node as any).hash = "f2f39a330ff003600ba7484baf012ad0"

export default node
