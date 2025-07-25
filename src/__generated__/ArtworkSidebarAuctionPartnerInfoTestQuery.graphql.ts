/**
 * @generated SignedSource<<03e03bce0ae110000eb310d057e71ef7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionPartnerInfoTestQuery$variables = Record<PropertyKey, never>;
export type ArtworkSidebarAuctionPartnerInfoTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuctionPartnerInfo_artwork">;
  } | null | undefined;
};
export type ArtworkSidebarAuctionPartnerInfoTestQuery$rawResponse = {
  readonly artwork: {
    readonly id: string;
    readonly partner: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly sale: {
      readonly id: string;
      readonly internalID: string;
      readonly is_closed: boolean | null | undefined;
    } | null | undefined;
    readonly sale_artwork: {
      readonly estimate: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type ArtworkSidebarAuctionPartnerInfoTestQuery = {
  rawResponse: ArtworkSidebarAuctionPartnerInfoTestQuery$rawResponse;
  response: ArtworkSidebarAuctionPartnerInfoTestQuery$data;
  variables: ArtworkSidebarAuctionPartnerInfoTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "auction_artwork_estimate_premium"
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
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
    "name": "ArtworkSidebarAuctionPartnerInfoTestQuery",
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
            "name": "ArtworkSidebarAuctionPartnerInfo_artwork"
          }
        ],
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarAuctionPartnerInfoTestQuery",
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
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "sale_artwork",
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "estimate",
                "storageKey": null
              },
              (v1/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")"
      }
    ]
  },
  "params": {
    "cacheID": "8ef9dc83f0748a8cd770bef11c956c1b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v2/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v2/*: any*/),
        "artwork.partner.name": (v3/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v2/*: any*/),
        "artwork.sale.internalID": (v2/*: any*/),
        "artwork.sale.is_closed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.sale_artwork.estimate": (v3/*: any*/),
        "artwork.sale_artwork.id": (v2/*: any*/)
      }
    },
    "name": "ArtworkSidebarAuctionPartnerInfoTestQuery",
    "operationKind": "query",
    "text": "query ArtworkSidebarAuctionPartnerInfoTestQuery {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarAuctionPartnerInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ba56b89a57b268c79fedfe68eadcbd8d";

export default node;
