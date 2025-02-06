/**
 * @generated SignedSource<<d4aea6d51e2e4a1d6ef35f9aac9ac194>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtsyShippingEstimate_Test_Query$variables = Record<PropertyKey, never>;
export type ArtsyShippingEstimate_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtsyShippingEstimate_artwork">;
  } | null | undefined;
};
export type ArtsyShippingEstimate_Test_Query = {
  response: ArtsyShippingEstimate_Test_Query$data;
  variables: ArtsyShippingEstimate_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtsyShippingEstimate_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtsyShippingEstimate_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtsyShippingEstimate_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "diameterCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedHeight",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedWidth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedDepth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedDiameter",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "framedMetric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFramed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v1/*: any*/),
                "type": "Money",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "PriceRange",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingOrigin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingWeight",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingWeightMetric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "widthCm",
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
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "55e4608d74bf395909b4868ea6d19bff",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.depthCm": (v2/*: any*/),
        "artwork.diameterCm": (v2/*: any*/),
        "artwork.framedDepth": (v3/*: any*/),
        "artwork.framedDiameter": (v2/*: any*/),
        "artwork.framedHeight": (v3/*: any*/),
        "artwork.framedMetric": (v3/*: any*/),
        "artwork.framedWidth": (v3/*: any*/),
        "artwork.heightCm": (v2/*: any*/),
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.isFramed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artwork.listPrice.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "artwork.listPrice.major": (v4/*: any*/),
        "artwork.listPrice.maxPrice": (v5/*: any*/),
        "artwork.listPrice.maxPrice.major": (v4/*: any*/),
        "artwork.listPrice.minPrice": (v5/*: any*/),
        "artwork.listPrice.minPrice.major": (v4/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.name": (v3/*: any*/),
        "artwork.priceCurrency": (v3/*: any*/),
        "artwork.shippingOrigin": (v3/*: any*/),
        "artwork.shippingWeight": (v2/*: any*/),
        "artwork.shippingWeightMetric": (v3/*: any*/),
        "artwork.widthCm": (v2/*: any*/)
      }
    },
    "name": "ArtsyShippingEstimate_Test_Query",
    "operationKind": "query",
    "text": "query ArtsyShippingEstimate_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtsyShippingEstimate_artwork\n    id\n  }\n}\n\nfragment ArtsyShippingEstimate_artwork on Artwork {\n  depthCm\n  diameterCm\n  framedHeight\n  framedWidth\n  framedDepth\n  framedDiameter\n  framedMetric\n  heightCm\n  isFramed\n  listPrice {\n    __typename\n    ... on Money {\n      major\n    }\n    ... on PriceRange {\n      maxPrice {\n        major\n      }\n      minPrice {\n        major\n      }\n    }\n  }\n  mediumType {\n    name\n  }\n  priceCurrency\n  shippingOrigin\n  shippingWeight\n  shippingWeightMetric\n  widthCm\n}\n"
  }
};
})();

(node as any).hash = "f25a2d3c9606aed9c04d558609a067dc";

export default node;
