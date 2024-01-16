/**
 * @generated SignedSource<<eb64d4fa16b4523eafc4a73178c6921c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type saleRoutes_SaleQuery$variables = {
  slug: string;
};
export type saleRoutes_SaleQuery$data = {
  readonly sale: {
    readonly isAuction: boolean | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"SaleApp_sale">;
  } | null | undefined;
};
export type saleRoutes_SaleQuery = {
  response: saleRoutes_SaleQuery$data;
  variables: saleRoutes_SaleQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "saleRoutes_SaleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SaleApp_sale"
          },
          (v2/*: any*/)
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
    "name": "saleRoutes_SaleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
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
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "wide",
                      "source",
                      "large_rectangle"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
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
    "cacheID": "1938d573f4d2cfbc32f6ae96691c97d4",
    "id": null,
    "metadata": {},
    "name": "saleRoutes_SaleQuery",
    "operationKind": "query",
    "text": "query saleRoutes_SaleQuery(\n  $slug: String!\n) {\n  sale(id: $slug) @principalField {\n    ...SaleApp_sale\n    isAuction\n    id\n  }\n}\n\nfragment SaleApp_sale on Sale {\n  ...SaleMeta_sale\n  name\n}\n\nfragment SaleMeta_sale on Sale {\n  name\n  description(format: HTML)\n  slug\n  coverImage {\n    url(version: [\"wide\", \"source\", \"large_rectangle\"])\n  }\n}\n"
  }
};
})();

(node as any).hash = "a3c3ae32ed2469ca33712bf856ffbb78";

export default node;
