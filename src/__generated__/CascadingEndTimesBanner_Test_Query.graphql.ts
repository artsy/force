/**
 * @generated SignedSource<<a7d8809f31b2eb964913de5b79211ecd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CascadingEndTimesBanner_Test_Query$variables = {};
export type CascadingEndTimesBanner_Test_Query$data = {
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">;
  } | null;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_viewer">;
  } | null;
};
export type CascadingEndTimesBanner_Test_Query = {
  response: CascadingEndTimesBanner_Test_Query$data;
  variables: CascadingEndTimesBanner_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CascadingEndTimesBanner_Test_Query",
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
            "name": "CascadingEndTimesBanner_sale"
          }
        ],
        "storageKey": "sale(id:\"example\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Literal",
                "name": "saleID",
                "value": "saleID"
              }
            ],
            "kind": "FragmentSpread",
            "name": "CascadingEndTimesBanner_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CascadingEndTimesBanner_Test_Query",
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
            "name": "cascadingEndTimeIntervalMinutes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "extendedBiddingIntervalMinutes",
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
        "storageKey": "sale(id:\"example\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "cascadingBannerSaleArtworks",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ]
              },
              {
                "kind": "Literal",
                "name": "saleSlug",
                "value": "saleID"
              }
            ],
            "concreteType": "SaleArtworksConnection",
            "kind": "LinkedField",
            "name": "saleArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterSaleArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtworksConnection(aggregations:[\"TOTAL\"],saleSlug:\"saleID\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "07a06202b97318dd579d8690c1444048",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "sale.cascadingEndTimeIntervalMinutes": (v1/*: any*/),
        "sale.extendedBiddingIntervalMinutes": (v1/*: any*/),
        "sale.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.cascadingBannerSaleArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworksConnection"
        },
        "viewer.cascadingBannerSaleArtworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterSaleArtworksCounts"
        },
        "viewer.cascadingBannerSaleArtworks.counts.total": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        }
      }
    },
    "name": "CascadingEndTimesBanner_Test_Query",
    "operationKind": "query",
    "text": "query CascadingEndTimesBanner_Test_Query {\n  sale(id: \"example\") {\n    ...CascadingEndTimesBanner_sale\n    id\n  }\n  viewer {\n    ...CascadingEndTimesBanner_viewer_2Vgk83\n  }\n}\n\nfragment CascadingEndTimesBanner_sale on Sale {\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n}\n\nfragment CascadingEndTimesBanner_viewer_2Vgk83 on Viewer {\n  cascadingBannerSaleArtworks: saleArtworksConnection(saleSlug: \"saleID\", aggregations: [TOTAL]) {\n    counts {\n      total\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c05d5ee0f053488e67ec4ef4bd3b86e7";

export default node;
