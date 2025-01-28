/**
 * @generated SignedSource<<09a47bd96b84befd6c9321665b319262>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarShippingInformation_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkSidebarShippingInformation_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarShippingInformation_artwork">;
  } | null | undefined;
};
export type ArtworkSidebarShippingInformation_Test_Query = {
  response: ArtworkSidebarShippingInformation_Test_Query$data;
  variables: ArtworkSidebarShippingInformation_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayText",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarShippingInformation_Test_Query",
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
            "name": "ArtworkSidebarShippingInformation_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarShippingInformation_Test_Query",
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
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "priceListed",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "major",
                "storageKey": null
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
            "name": "isUnlisted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "priceIncludesTaxDisplay",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artsyShippingDomestic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artsyShippingInternational",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shippingInfo",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pickupAvailable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TaxInfo",
            "kind": "LinkedField",
            "name": "taxInfo",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TaxMoreInfo",
                "kind": "LinkedField",
                "name": "moreInfo",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "83e030aa8dd5b00cad4befb8cb13e392",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artsyShippingDomestic": (v3/*: any*/),
        "artwork.artsyShippingInternational": (v3/*: any*/),
        "artwork.category": (v4/*: any*/),
        "artwork.heightCm": (v5/*: any*/),
        "artwork.id": (v6/*: any*/),
        "artwork.isFramed": (v3/*: any*/),
        "artwork.isUnlisted": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "artwork.location.city": (v4/*: any*/),
        "artwork.location.country": (v4/*: any*/),
        "artwork.location.id": (v6/*: any*/),
        "artwork.location.postalCode": (v4/*: any*/),
        "artwork.pickupAvailable": (v3/*: any*/),
        "artwork.priceCurrency": (v4/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v4/*: any*/),
        "artwork.priceListed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.priceListed.major": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artwork.shippingCountry": (v4/*: any*/),
        "artwork.shippingInfo": (v4/*: any*/),
        "artwork.shippingOrigin": (v4/*: any*/),
        "artwork.taxInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "TaxInfo"
        },
        "artwork.taxInfo.displayText": (v7/*: any*/),
        "artwork.taxInfo.moreInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "TaxMoreInfo"
        },
        "artwork.taxInfo.moreInfo.displayText": (v7/*: any*/),
        "artwork.taxInfo.moreInfo.url": (v7/*: any*/),
        "artwork.widthCm": (v5/*: any*/)
      }
    },
    "name": "ArtworkSidebarShippingInformation_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarShippingInformation_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarShippingInformation_artwork\n    id\n  }\n}\n\nfragment ArtsyShippingEstimate_artwork on Artwork {\n  isFramed\n  category\n  shippingOrigin\n  shippingCountry\n  location {\n    country\n    postalCode\n    city\n    id\n  }\n  priceCurrency\n  priceListed {\n    major\n  }\n  heightCm\n  widthCm\n}\n\nfragment ArtworkSidebarShippingInformation_artwork on Artwork {\n  ...ArtsyShippingEstimate_artwork\n  isUnlisted\n  priceIncludesTaxDisplay\n  shippingOrigin\n  artsyShippingDomestic\n  artsyShippingInternational\n  shippingInfo\n  pickupAvailable\n  taxInfo {\n    displayText\n    moreInfo {\n      displayText\n      url\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "66d3c2c340a10b58af6f467fa5c69dc4";

export default node;
