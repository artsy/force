/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuctionPartnerInfo_Test_QueryVariables = {};
export type ArtworkSidebarAuctionPartnerInfo_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarAuctionPartnerInfo_artwork">;
    } | null;
};
export type ArtworkSidebarAuctionPartnerInfo_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly partner: ({
            readonly name: string | null;
            readonly id: string | null;
        }) | null;
        readonly sale_artwork: ({
            readonly estimate: string | null;
            readonly id: string | null;
        }) | null;
        readonly sale: ({
            readonly internalID: string;
            readonly is_closed: boolean | null;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkSidebarAuctionPartnerInfo_Test_Query = {
    readonly response: ArtworkSidebarAuctionPartnerInfo_Test_QueryResponse;
    readonly variables: ArtworkSidebarAuctionPartnerInfo_Test_QueryVariables;
    readonly rawResponse: ArtworkSidebarAuctionPartnerInfo_Test_QueryRawResponse;
};



/*
query ArtworkSidebarAuctionPartnerInfo_Test_Query {
  artwork(id: "auction_artwork_estimate_premium") {
    ...ArtworkSidebarAuctionPartnerInfo_artwork
    id
  }
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  partner {
    name
    id
  }
  sale_artwork: saleArtwork {
    estimate
    id
  }
  sale {
    internalID
    is_closed: isClosed
    id
  }
}
*/

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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
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
    "id": null,
    "metadata": {},
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebarAuctionPartnerInfo_Test_Query {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarAuctionPartnerInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'affb9d09ad318d6abe783c6bd9bfec45';
export default node;
