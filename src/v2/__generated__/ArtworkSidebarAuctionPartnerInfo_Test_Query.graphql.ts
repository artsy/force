/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "sale_artwork",
            "name": "saleArtwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "estimate",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "internalID",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "is_closed",
                "name": "isClosed",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
    "id": null,
    "text": "query ArtworkSidebarAuctionPartnerInfo_Test_Query {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarAuctionPartnerInfo_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale_artwork: saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    internalID\n    is_closed: isClosed\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'affb9d09ad318d6abe783c6bd9bfec45';
export default node;
