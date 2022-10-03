/**
 * @generated SignedSource<<ff8526b6e33200ac322123bdf8a7c7d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageRoutes_PageQuery$variables = {
  id: string;
};
export type pageRoutes_PageQuery$data = {
  readonly page: {
    readonly " $fragmentSpreads": FragmentRefs<"PageApp_page">;
  };
};
export type pageRoutes_PageQuery = {
  variables: pageRoutes_PageQuery$variables;
  response: pageRoutes_PageQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pageRoutes_PageQuery",
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
            "name": "PageApp_page"
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
    "name": "pageRoutes_PageQuery",
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
            "name": "internalID",
            "storageKey": null
          },
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
    "cacheID": "bbce546c73c13350b02235445c92b516",
    "id": null,
    "metadata": {},
    "name": "pageRoutes_PageQuery",
    "operationKind": "query",
    "text": "query pageRoutes_PageQuery(\n  $id: ID!\n) {\n  page(id: $id) @principalField {\n    ...PageApp_page\n    id\n  }\n}\n\nfragment PageApp_page on Page {\n  internalID\n  name\n  content(format: HTML)\n}\n"
  }
};
})();

(node as any).hash = "45e5b86c54cb7b4e6e24703a746af08b";

export default node;
