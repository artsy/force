/**
 * @generated SignedSource<<d51f27778298afee0777322b4c66c31a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type staticPageRoutes_TopLevelQuery$variables = {
  slug: string;
};
export type staticPageRoutes_TopLevelQuery$data = {
  readonly page: {
    readonly " $fragmentSpreads": FragmentRefs<"StaticPageApp_page">;
  };
};
export type staticPageRoutes_TopLevelQuery = {
  variables: staticPageRoutes_TopLevelQuery$variables;
  response: staticPageRoutes_TopLevelQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "staticPageRoutes_TopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaticPageApp_page"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "staticPageRoutes_TopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Page",
        "kind": "LinkedField",
        "name": "page",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "content",
            "storageKey": "content(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "de787d71c7ff755788f8991294a50c77",
    "id": null,
    "metadata": {},
    "name": "staticPageRoutes_TopLevelQuery",
    "operationKind": "query",
    "text": "query staticPageRoutes_TopLevelQuery(\n  $slug: ID!\n) {\n  page(id: $slug) {\n    ...StaticPageApp_page\n    id\n  }\n}\n\nfragment StaticPageApp_page on Page {\n  name\n  content(format: HTML)\n}\n"
  }
};
})();

(node as any).hash = "73ca758dbf390fca7491db2031e169dc";

export default node;
