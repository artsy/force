/**
 * @generated SignedSource<<ea4553d74b91200a03993d25cf54719c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarPartnerInfo_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkSidebarPartnerInfo_Test_Query$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarPartnerInfo_artwork">;
  } | null | undefined;
};
export type ArtworkSidebarPartnerInfo_Test_Query = {
  response: ArtworkSidebarPartnerInfo_Test_Query$data;
  variables: ArtworkSidebarPartnerInfo_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork_from_partner_with_locations"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInquireable",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v8 = {
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
    "name": "ArtworkSidebarPartnerInfo_Test_Query",
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
            "name": "ArtworkSidebarPartnerInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork_from_partner_with_locations\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarPartnerInfo_Test_Query",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v1/*: any*/),
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cities",
                "storageKey": null
              },
              (v1/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CollectorSignals",
            "kind": "LinkedField",
            "name": "collectorSignals",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollector",
                "kind": "LinkedField",
                "name": "partnerOffer",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAvailable",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork_from_partner_with_locations\")"
      }
    ]
  },
  "params": {
    "cacheID": "63b31684a3c63998174f3e28a62f1388",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "artwork.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "artwork.collectorSignals.partnerOffer.id": (v5/*: any*/),
        "artwork.collectorSignals.partnerOffer.isAvailable": (v6/*: any*/),
        "artwork.id": (v5/*: any*/),
        "artwork.internalID": (v5/*: any*/),
        "artwork.isInquireable": (v6/*: any*/),
        "artwork.isUnlisted": (v7/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.cities": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.partner.href": (v8/*: any*/),
        "artwork.partner.id": (v5/*: any*/),
        "artwork.partner.isInquireable": (v7/*: any*/),
        "artwork.partner.name": (v8/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.href": (v8/*: any*/),
        "artwork.sale.id": (v5/*: any*/),
        "artwork.sale.name": (v8/*: any*/),
        "artwork.slug": (v5/*: any*/)
      }
    },
    "name": "ArtworkSidebarPartnerInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarPartnerInfo_Test_Query {\n  artwork(id: \"artwork_from_partner_with_locations\") {\n    ...ArtworkSidebarPartnerInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  isUnlisted\n  partner {\n    name\n    href\n    cities\n    isInquireable\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n  collectorSignals {\n    partnerOffer {\n      isAvailable\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c28fcd12678374ea3678a8b3c41e5dbc";

export default node;
