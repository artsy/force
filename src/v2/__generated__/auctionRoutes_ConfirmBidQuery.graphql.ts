/**
 * @generated SignedSource<<ec22ae26de8114fc153c75404585d098>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_ConfirmBidQuery$variables = {
  saleID: string;
  artworkID: string;
};
export type auctionRoutes_ConfirmBidQuery$data = {
  readonly artwork: {
    readonly internalID: string;
    readonly slug: string;
    readonly saleArtwork: {
      readonly internalID: string;
      readonly slug: string;
      readonly sale: {
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly isClosed: boolean | null;
        readonly isRegistrationClosed: boolean | null;
        readonly registrationStatus: {
          readonly internalID: string;
          readonly qualifiedForBidding: boolean | null;
        } | null;
      } | null;
      readonly " $fragmentSpreads": FragmentRefs<"LotInfo_saleArtwork" | "BidForm_saleArtwork">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"LotInfo_artwork">;
  } | null;
  readonly me: {
    readonly internalID: string;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"ConfirmBid_me">;
  } | null;
};
export type auctionRoutes_ConfirmBidQuery$rawResponse = {
  readonly artwork: {
    readonly internalID: string;
    readonly slug: string;
    readonly saleArtwork: {
      readonly internalID: string;
      readonly slug: string;
      readonly sale: {
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly isClosed: boolean | null;
        readonly isRegistrationClosed: boolean | null;
        readonly registrationStatus: {
          readonly internalID: string;
          readonly qualifiedForBidding: boolean | null;
          readonly id: string;
        } | null;
        readonly id: string;
      } | null;
      readonly counts: {
        readonly bidderPositions: Int | null;
      } | null;
      readonly lotLabel: string | null;
      readonly currentBid: {
        readonly display: string | null;
      } | null;
      readonly minimumNextBid: {
        readonly cents: number | null;
      } | null;
      readonly increments: ReadonlyArray<{
        readonly cents: number | null;
        readonly display: string | null;
      } | null> | null;
      readonly id: string;
    } | null;
    readonly date: string | null;
    readonly title: string | null;
    readonly imageUrl: string | null;
    readonly artistNames: string | null;
    readonly id: string;
  } | null;
  readonly me: {
    readonly internalID: string;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly id: string;
  } | null;
};
export type auctionRoutes_ConfirmBidQuery = {
  variables: auctionRoutes_ConfirmBidQuery$variables;
  response: auctionRoutes_ConfirmBidQuery$data;
  rawResponse: auctionRoutes_ConfirmBidQuery$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artworkID"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleID"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleID"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isRegistrationClosed",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qualifiedForBidding",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasQualifiedCreditCards",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_ConfirmBidQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "LotInfo_saleArtwork"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "BidForm_saleArtwork"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LotInfo_artwork"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v10/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConfirmBid_me"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "auctionRoutes_ConfirmBidQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidderPositions",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": [
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkMinimumNextBid",
                "kind": "LinkedField",
                "name": "minimumNextBid",
                "plural": false,
                "selections": [
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "useMyMaxBid",
                    "value": true
                  }
                ],
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v13/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": "increments(useMyMaxBid:true)"
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "imageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "87e8edbd641fb3363318def935409de5",
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_ConfirmBidQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_ConfirmBidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    internalID\n    slug\n    saleArtwork(saleID: $saleID) {\n      internalID\n      slug\n      sale {\n        internalID\n        slug\n        name\n        isClosed\n        isRegistrationClosed\n        registrationStatus {\n          internalID\n          qualifiedForBidding\n          id\n        }\n        id\n      }\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      id\n    }\n    ...LotInfo_artwork\n    id\n  }\n  me {\n    internalID\n    hasQualifiedCreditCards\n    ...ConfirmBid_me\n    id\n  }\n}\n\nfragment BidForm_me on Me {\n  hasQualifiedCreditCards\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n  sale {\n    slug\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n}\n\nfragment ConfirmBid_me on Me {\n  internalID\n  hasQualifiedCreditCards\n  ...BidForm_me\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n  slug\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n}\n"
  }
};
})();

(node as any).hash = "adcf07972a148d0d3950e6621493023b";

export default node;
