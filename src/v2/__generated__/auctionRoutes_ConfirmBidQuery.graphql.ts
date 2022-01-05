/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_ConfirmBidQueryVariables = {
    saleID: string;
    artworkID: string;
};
export type auctionRoutes_ConfirmBidQueryResponse = {
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
            readonly " $fragmentRefs": FragmentRefs<"LotInfo_saleArtwork" | "BidForm_saleArtwork">;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"LotInfo_artwork">;
    } | null;
    readonly me: {
        readonly internalID: string;
        readonly hasQualifiedCreditCards: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"ConfirmBid_me">;
    } | null;
};
export type auctionRoutes_ConfirmBidQueryRawResponse = {
    readonly artwork: ({
        readonly internalID: string;
        readonly slug: string;
        readonly saleArtwork: ({
            readonly internalID: string;
            readonly slug: string;
            readonly sale: ({
                readonly internalID: string;
                readonly slug: string;
                readonly name: string | null;
                readonly isClosed: boolean | null;
                readonly isRegistrationClosed: boolean | null;
                readonly registrationStatus: ({
                    readonly internalID: string;
                    readonly qualifiedForBidding: boolean | null;
                    readonly id: string | null;
                }) | null;
                readonly id: string | null;
            }) | null;
            readonly counts: ({
                readonly bidderPositions: number | null;
            }) | null;
            readonly lotLabel: string | null;
            readonly minimumNextBid: ({
                readonly amount: string | null;
                readonly cents: number | null;
                readonly display: string | null;
            }) | null;
            readonly increments: ReadonlyArray<({
                readonly cents: number | null;
                readonly display: string | null;
            }) | null> | null;
            readonly id: string | null;
        }) | null;
        readonly date: string | null;
        readonly title: string | null;
        readonly imageUrl: string | null;
        readonly artistNames: string | null;
        readonly id: string | null;
    }) | null;
    readonly me: ({
        readonly internalID: string;
        readonly hasQualifiedCreditCards: boolean | null;
        readonly id: string | null;
    }) | null;
};
export type auctionRoutes_ConfirmBidQuery = {
    readonly response: auctionRoutes_ConfirmBidQueryResponse;
    readonly variables: auctionRoutes_ConfirmBidQueryVariables;
    readonly rawResponse: auctionRoutes_ConfirmBidQueryRawResponse;
};



/*
query auctionRoutes_ConfirmBidQuery(
  $saleID: String!
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    internalID
    slug
    saleArtwork(saleID: $saleID) {
      internalID
      slug
      sale {
        internalID
        slug
        name
        isClosed
        isRegistrationClosed
        registrationStatus {
          internalID
          qualifiedForBidding
          id
        }
        id
      }
      ...LotInfo_saleArtwork
      ...BidForm_saleArtwork
      id
    }
    ...LotInfo_artwork
    id
  }
  me {
    internalID
    hasQualifiedCreditCards
    ...ConfirmBid_me
    id
  }
}

fragment BidForm_me on Me {
  hasQualifiedCreditCards
}

fragment BidForm_saleArtwork on SaleArtwork {
  minimumNextBid {
    cents
  }
  increments(useMyMaxBid: true) {
    cents
    display
  }
  sale {
    slug
    registrationStatus {
      qualifiedForBidding
      id
    }
    id
  }
}

fragment ConfirmBid_me on Me {
  internalID
  hasQualifiedCreditCards
  ...BidForm_me
}

fragment LotInfo_artwork on Artwork {
  internalID
  date
  title
  imageUrl
  artistNames
  slug
}

fragment LotInfo_saleArtwork on SaleArtwork {
  counts {
    bidderPositions
  }
  lotLabel
  minimumNextBid {
    amount
    cents
    display
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "saleID",
    "variableName": "saleID"
  }
],
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
  "name": "qualifiedForBidding",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasQualifiedCreditCards",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_ConfirmBidQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v8/*: any*/)
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
          (v2/*: any*/),
          (v9/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConfirmBid_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "auctionRoutes_ConfirmBidQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
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
                "concreteType": "SaleArtworkMinimumNextBid",
                "kind": "LinkedField",
                "name": "minimumNextBid",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "amount",
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/)
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
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": "increments(useMyMaxBid:true)"
              },
              (v10/*: any*/)
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
          (v10/*: any*/)
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
          (v2/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_ConfirmBidQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_ConfirmBidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    internalID\n    slug\n    saleArtwork(saleID: $saleID) {\n      internalID\n      slug\n      sale {\n        internalID\n        slug\n        name\n        isClosed\n        isRegistrationClosed\n        registrationStatus {\n          internalID\n          qualifiedForBidding\n          id\n        }\n        id\n      }\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      id\n    }\n    ...LotInfo_artwork\n    id\n  }\n  me {\n    internalID\n    hasQualifiedCreditCards\n    ...ConfirmBid_me\n    id\n  }\n}\n\nfragment BidForm_me on Me {\n  hasQualifiedCreditCards\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n  sale {\n    slug\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n}\n\nfragment ConfirmBid_me on Me {\n  internalID\n  hasQualifiedCreditCards\n  ...BidForm_me\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n  slug\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  minimumNextBid {\n    amount\n    cents\n    display\n  }\n}\n"
  }
};
})();
(node as any).hash = 'adcf07972a148d0d3950e6621493023b';
export default node;
