/**
 * @generated SignedSource<<01dfbb5106acb73df9b6485a284e7af1>>
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
  "name": "displayText",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
            "name": "shippingOrigin",
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TaxMoreInfo",
                "kind": "LinkedField",
                "name": "moreInfo",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "46731a73de9f48412b988570b425d68a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artsyShippingDomestic": (v2/*: any*/),
        "artwork.artsyShippingInternational": (v2/*: any*/),
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.isUnlisted": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.pickupAvailable": (v2/*: any*/),
        "artwork.priceIncludesTaxDisplay": (v3/*: any*/),
        "artwork.shippingInfo": (v3/*: any*/),
        "artwork.shippingOrigin": (v3/*: any*/),
        "artwork.taxInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "TaxInfo"
        },
        "artwork.taxInfo.displayText": (v4/*: any*/),
        "artwork.taxInfo.moreInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "TaxMoreInfo"
        },
        "artwork.taxInfo.moreInfo.displayText": (v4/*: any*/),
        "artwork.taxInfo.moreInfo.url": (v4/*: any*/)
      }
    },
    "name": "ArtworkSidebarShippingInformation_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarShippingInformation_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarShippingInformation_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarShippingInformation_artwork on Artwork {\n  isUnlisted\n  priceIncludesTaxDisplay\n  shippingOrigin\n  artsyShippingDomestic\n  artsyShippingInternational\n  shippingInfo\n  pickupAvailable\n  taxInfo {\n    displayText\n    moreInfo {\n      displayText\n      url\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "66d3c2c340a10b58af6f467fa5c69dc4";

export default node;
