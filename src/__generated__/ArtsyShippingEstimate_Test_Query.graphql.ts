/**
 * @generated SignedSource<<ad05f8f0ae0d54897bdfb6580f84257d>>
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
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
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
            "name": "isFramed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
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
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postalCode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              (v1/*: any*/)
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
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
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
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "d8d6e0dd445f676172374534ed6e8555",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.category": (v3/*: any*/),
        "artwork.heightCm": (v4/*: any*/),
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
        "artwork.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "artwork.location.city": (v3/*: any*/),
        "artwork.location.country": (v3/*: any*/),
        "artwork.location.id": (v5/*: any*/),
        "artwork.location.postalCode": (v3/*: any*/),
        "artwork.priceCurrency": (v3/*: any*/),
        "artwork.shippingCountry": (v3/*: any*/),
        "artwork.shippingOrigin": (v3/*: any*/),
        "artwork.widthCm": (v4/*: any*/)
      }
    },
    "name": "ArtsyShippingEstimate_Test_Query",
    "operationKind": "query",
    "text": "query ArtsyShippingEstimate_Test_Query {\n  artwork(id: \"example\") {\n    ...ArtsyShippingEstimate_artwork\n    id\n  }\n}\n\nfragment ArtsyShippingEstimate_artwork on Artwork {\n  isFramed\n  category\n  shippingOrigin\n  shippingCountry\n  location {\n    country\n    postalCode\n    city\n    id\n  }\n  priceCurrency\n  listPrice {\n    __typename\n    ... on Money {\n      major\n    }\n    ... on PriceRange {\n      minPrice {\n        major\n      }\n      maxPrice {\n        major\n      }\n    }\n  }\n  heightCm\n  widthCm\n}\n"
  }
};
})();

(node as any).hash = "f25a2d3c9606aed9c04d558609a067dc";

export default node;
