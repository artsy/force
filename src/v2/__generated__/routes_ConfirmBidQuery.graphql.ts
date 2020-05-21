/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ConfirmBidQueryVariables = {
    saleID: string;
    artworkID: string;
};
export type routes_ConfirmBidQueryResponse = {
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
export type routes_ConfirmBidQueryRawResponse = {
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
export type routes_ConfirmBidQuery = {
    readonly response: routes_ConfirmBidQueryResponse;
    readonly variables: routes_ConfirmBidQueryVariables;
    readonly rawResponse: routes_ConfirmBidQueryRawResponse;
};



/*
query routes_ConfirmBidQuery(
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
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
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
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isClosed",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isRegistrationClosed",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualifiedForBidding",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "hasQualifiedCreditCards",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ConfirmBidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "registrationStatus",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v8/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "FragmentSpread",
                "name": "LotInfo_saleArtwork",
                "args": null
              },
              {
                "kind": "FragmentSpread",
                "name": "BidForm_saleArtwork",
                "args": null
              }
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "LotInfo_artwork",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v9/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "ConfirmBid_me",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ConfirmBidQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "saleArtwork",
            "storageKey": null,
            "args": (v4/*: any*/),
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "registrationStatus",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/)
                    ]
                  },
                  (v10/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "bidderPositions",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lotLabel",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "minimumNextBid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkMinimumNextBid",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "amount",
                    "args": null,
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": "increments(useMyMaxBid:true)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "useMyMaxBid",
                    "value": true
                  }
                ],
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/)
                ]
              },
              (v10/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "imageUrl",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "artistNames",
            "args": null,
            "storageKey": null
          },
          (v10/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ConfirmBidQuery",
    "id": null,
    "text": "query routes_ConfirmBidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    internalID\n    slug\n    saleArtwork(saleID: $saleID) {\n      internalID\n      slug\n      sale {\n        internalID\n        slug\n        name\n        isClosed\n        isRegistrationClosed\n        registrationStatus {\n          internalID\n          qualifiedForBidding\n          id\n        }\n        id\n      }\n      ...LotInfo_saleArtwork\n      ...BidForm_saleArtwork\n      id\n    }\n    ...LotInfo_artwork\n    id\n  }\n  me {\n    internalID\n    hasQualifiedCreditCards\n    ...ConfirmBid_me\n    id\n  }\n}\n\nfragment BidForm_me on Me {\n  hasQualifiedCreditCards\n}\n\nfragment BidForm_saleArtwork on SaleArtwork {\n  minimumNextBid {\n    cents\n  }\n  increments(useMyMaxBid: true) {\n    cents\n    display\n  }\n  sale {\n    slug\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n}\n\nfragment ConfirmBid_me on Me {\n  internalID\n  hasQualifiedCreditCards\n  ...BidForm_me\n}\n\nfragment LotInfo_artwork on Artwork {\n  internalID\n  date\n  title\n  imageUrl\n  artistNames\n}\n\nfragment LotInfo_saleArtwork on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  minimumNextBid {\n    amount\n    cents\n    display\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '8486526a66852558b11319cc76d7fa2e';
export default node;
