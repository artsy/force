/**
 * @generated SignedSource<<6fec1fd96ac0f5901e3e0457cd81519e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleApp_Test_Query$variables = Record<PropertyKey, never>;
export type SaleApp_Test_Query$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"SaleApp_sale">;
  } | null | undefined;
};
export type SaleApp_Test_Query = {
  response: SaleApp_Test_Query$data;
  variables: SaleApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SaleApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SaleApp_sale"
          }
        ],
        "storageKey": "sale(id:\"xxx\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SaleApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "eligibleSaleArtworksCount",
            "storageKey": null
          },
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "sale(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "cacheID": "239280a632949620a1299e8ffd1ed649",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.coverImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "sale.coverImage.url": (v1/*: any*/),
        "sale.description": (v1/*: any*/),
        "sale.eligibleSaleArtworksCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "sale.id": (v2/*: any*/),
        "sale.internalID": (v2/*: any*/),
        "sale.name": (v1/*: any*/),
        "sale.slug": (v2/*: any*/)
      }
    },
    "name": "SaleApp_Test_Query",
    "operationKind": "query",
    "text": "query SaleApp_Test_Query {\n  sale(id: \"xxx\") {\n    ...SaleApp_sale\n    id\n  }\n}\n\nfragment SaleApp_sale on Sale {\n  ...SaleMeta_sale\n  coverImage {\n    url(version: [\"wide\", \"source\", \"large_rectangle\"])\n  }\n  description(format: HTML)\n  eligibleSaleArtworksCount\n  internalID\n  name\n}\n\nfragment SaleMeta_sale on Sale {\n  name\n  description(format: HTML)\n  slug\n  coverImage {\n    url(version: [\"wide\", \"source\", \"large_rectangle\"])\n  }\n}\n"
  }
};
})();

(node as any).hash = "736639e1f14aff5f2512c7e5cdcf6d21";

export default node;
