/**
 * @generated SignedSource<<fb43d802690a6d89440b08dedfde6628>>
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v7 = {
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
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "publicLocation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postalCode",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
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
                "selections": (v2/*: any*/),
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
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v2/*: any*/),
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
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "8c97d5096fc07f8c38a0d9064bf78ef1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.depthCm": (v3/*: any*/),
        "artwork.diameterCm": (v3/*: any*/),
        "artwork.framedDepth": (v4/*: any*/),
        "artwork.framedDiameter": (v4/*: any*/),
        "artwork.framedHeight": (v4/*: any*/),
        "artwork.framedMetric": (v4/*: any*/),
        "artwork.framedWidth": (v4/*: any*/),
        "artwork.heightCm": (v3/*: any*/),
        "artwork.id": (v5/*: any*/),
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
        "artwork.listPrice.major": (v6/*: any*/),
        "artwork.listPrice.maxPrice": (v7/*: any*/),
        "artwork.listPrice.maxPrice.major": (v6/*: any*/),
        "artwork.listPrice.minPrice": (v7/*: any*/),
        "artwork.listPrice.minPrice.major": (v6/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.name": (v4/*: any*/),
        "artwork.priceCurrency": (v4/*: any*/),
        "artwork.publicLocation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "artwork.publicLocation.id": (v5/*: any*/),
        "artwork.publicLocation.postalCode": (v4/*: any*/),
        "artwork.shippingOrigin": (v4/*: any*/),
        "artwork.shippingWeight": (v3/*: any*/),
        "artwork.shippingWeightMetric": (v4/*: any*/),
        "artwork.widthCm": (v3/*: any*/)
      }
    },
    "name": "ArtsyShippingEstimate_Test_Query",
    "operationKind": "query",
    "text": "query ArtsyShippingEstimate_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtsyShippingEstimate_artwork\n    id\n  }\n}\n\nfragment ArtsyShippingEstimate_artwork on Artwork {\n  depthCm\n  diameterCm\n  framedHeight\n  framedWidth\n  framedDepth\n  framedDiameter\n  framedMetric\n  heightCm\n  isFramed\n  publicLocation {\n    postalCode\n    id\n  }\n  listPrice {\n    __typename\n    ... on Money {\n      major\n    }\n    ... on PriceRange {\n      maxPrice {\n        major\n      }\n      minPrice {\n        major\n      }\n    }\n  }\n  mediumType {\n    name\n  }\n  priceCurrency\n  shippingOrigin\n  shippingWeight\n  shippingWeightMetric\n  widthCm\n}\n"
  }
};
})();

(node as any).hash = "f25a2d3c9606aed9c04d558609a067dc";

export default node;
