/**
 * @generated SignedSource<<0726ec9dfd495e02326d4715bf8b0df6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmBidValidTestQuery$variables = {};
export type ConfirmBidValidTestQuery$data = {
  readonly artwork: {
    readonly internalID: string;
    readonly slug: string;
    readonly saleArtwork: {
      readonly internalID: string;
      readonly slug: string;
      readonly sale: {
        readonly registrationStatus: {
          readonly internalID: string;
          readonly qualifiedForBidding: boolean | null;
        } | null;
        readonly internalID: string;
        readonly slug: string;
        readonly name: string | null;
        readonly isClosed: boolean | null;
        readonly isRegistrationClosed: boolean | null;
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
export type ConfirmBidValidTestQuery$rawResponse = {
  readonly artwork: {
    readonly internalID: string;
    readonly date: string | null;
    readonly title: string | null;
    readonly imageUrl: string | null;
    readonly artistNames: string | null;
    readonly slug: string;
    readonly saleArtwork: {
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
      readonly sale: {
        readonly slug: string;
        readonly registrationStatus: {
          readonly qualifiedForBidding: boolean | null;
          readonly id: string;
          readonly internalID: string;
        } | null;
        readonly id: string;
        readonly internalID: string;
        readonly name: string | null;
        readonly isClosed: boolean | null;
        readonly isRegistrationClosed: boolean | null;
      } | null;
      readonly internalID: string;
      readonly slug: string;
      readonly id: string;
    } | null;
    readonly id: string;
  } | null;
  readonly me: {
    readonly internalID: string;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly id: string;
  } | null;
};
export type ConfirmBidValidTestQuery = {
  variables: ConfirmBidValidTestQuery$variables;
  response: ConfirmBidValidTestQuery$data;
  rawResponse: ConfirmBidValidTestQuery$rawResponse;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "saleID",
    "value": "example-auction-id"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qualifiedForBidding",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isRegistrationClosed",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasQualifiedCreditCards",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmBidValidTestQuery",
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
            "name": "LotInfo_artwork"
          },
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "LotInfo_saleArtwork"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "BidForm_saleArtwork"
              },
              (v1/*: any*/),
              (v2/*: any*/),
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
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleArtwork(saleID:\"example-auction-id\")"
          }
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v8/*: any*/),
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConfirmBidValidTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
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
                  (v9/*: any*/)
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
                  (v10/*: any*/)
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
                  (v10/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": "increments(useMyMaxBid:true)"
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v11/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v1/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/),
              (v2/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": "saleArtwork(saleID:\"example-auction-id\")"
          },
          (v11/*: any*/)
        ],
        "storageKey": "artwork(id:\"artwork-id\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v8/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6868c96d63254a69e3123b50aa275ec2",
    "id": null,
    "metadata": {},
    "name": "ConfirmBidValidTestQuery",
    "operationKind": "query",
    "text": "query ConfirmBidValidTestQuery {\n  artwork(id: \"artwork-id\") {\n    ...LotInfo_artwork\n    internalID\n    slug\n    saleArtwork(saleID: \"example-auction-id\") {\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      internalID\n      slug\n      sale {\n        registrationStatus {\n          internalID\n          qualifiedForBidding\n          id\n        }\n        internalID\n        slug\n        name\n        isClosed\n        isRegistrationClosed\n        id\n      }\n      id\n    }\n    id\n  }\n  me {\n    internalID\n    hasQualifiedCreditCards\n    ...ConfirmBid_me\n    id\n  }\n}\n\nfragment BidForm_me on Me {\n  hasQualifiedCreditCards\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n  sale {\n    slug\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n}\n\nfragment ConfirmBid_me on Me {\n  internalID\n  hasQualifiedCreditCards\n  ...BidForm_me\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n  slug\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n}\n"
  }
};
})();

(node as any).hash = "d3d5f2a63505fcb755a39be2083b2f77";

export default node;
