/**
 * @generated SignedSource<<d274558a06f3607e2ac00a6397544798>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BidTimerLineTestQuery$variables = Record<PropertyKey, never>;
export type BidTimerLineTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"BidTimerLine_artwork">;
  } | null | undefined;
};
export type BidTimerLineTestQuery = {
  response: BidTimerLineTestQuery$data;
  variables: BidTimerLineTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
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
    "name": "BidTimerLineTestQuery",
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
            "name": "BidTimerLine_artwork"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BidTimerLineTestQuery",
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
            "concreteType": "CollectorSignals",
            "kind": "LinkedField",
            "name": "collectorSignals",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionCollectorSignals",
                "kind": "LinkedField",
                "name": "auction",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotClosesAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "registrationEndsAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "onlineBiddingExtended",
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
        "storageKey": "artwork(id:\"artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "8955b875a63b7920057b7a2544b3eaa2",
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
        "artwork.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "artwork.collectorSignals.auction.lotClosesAt": (v1/*: any*/),
        "artwork.collectorSignals.auction.onlineBiddingExtended": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.collectorSignals.auction.registrationEndsAt": (v1/*: any*/),
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "BidTimerLineTestQuery",
    "operationKind": "query",
    "text": "query BidTimerLineTestQuery {\n  artwork(id: \"artwork-id\") {\n    ...BidTimerLine_artwork\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa33eea40d30ae5413eff83b52fabf68";

export default node;
