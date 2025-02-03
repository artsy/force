/**
 * @generated SignedSource<<6ecb98e0906f3f3f682afaaeffbfe262>>
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
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
            "name": "isFramed",
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
            "name": "shippingOrigin",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingCountry",
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
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
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
            "kind": "ScalarField",
            "name": "heightCm",
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
    "cacheID": "d6d53ca44923a7f2500bc0223a09b1e2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
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
        "artwork.listPrice.major": (v3/*: any*/),
        "artwork.listPrice.maxPrice": (v4/*: any*/),
        "artwork.listPrice.maxPrice.major": (v3/*: any*/),
        "artwork.listPrice.minPrice": (v4/*: any*/),
        "artwork.listPrice.minPrice.major": (v3/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.name": (v5/*: any*/),
        "artwork.priceCurrency": (v5/*: any*/),
        "artwork.shippingCountry": (v5/*: any*/),
        "artwork.shippingOrigin": (v5/*: any*/),
        "artwork.widthCm": (v2/*: any*/)
      }
    },
    "name": "ArtsyShippingEstimate_Test_Query",
    "operationKind": "query",
    "text": "query ArtsyShippingEstimate_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtsyShippingEstimate_artwork\n    id\n  }\n}\n\nfragment ArtsyShippingEstimate_artwork on Artwork {\n  isFramed\n  mediumType {\n    name\n  }\n  shippingOrigin\n  shippingCountry\n  priceCurrency\n  listPrice {\n    __typename\n    ... on Money {\n      major\n    }\n    ... on PriceRange {\n      minPrice {\n        major\n      }\n      maxPrice {\n        major\n      }\n    }\n  }\n  heightCm\n  widthCm\n}\n"
  }
};
})();

(node as any).hash = "f25a2d3c9606aed9c04d558609a067dc";

export default node;
