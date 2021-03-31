/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionArtworksRails_Test_QueryVariables = {};
export type AuctionArtworksRails_Test_QueryResponse = {
    readonly sale: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_sale">;
    } | null;
};
export type AuctionArtworksRails_Test_Query = {
    readonly response: AuctionArtworksRails_Test_QueryResponse;
    readonly variables: AuctionArtworksRails_Test_QueryVariables;
};



/*
query AuctionArtworksRails_Test_Query {
  sale(id: "xxx") {
    ...AuctionArtworksRail_sale
    id
  }
}

fragment AuctionArtworksRail_sale on Sale {
  internalID
  href
  name
  formattedStartDateTime
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "xxx"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionArtworksRails_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionArtworksRail_sale"
          }
        ],
        "storageKey": "sale(id:\"xxx\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionArtworksRails_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedStartDateTime",
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
        "storageKey": "sale(id:\"xxx\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "AuctionArtworksRails_Test_Query",
    "operationKind": "query",
    "text": "query AuctionArtworksRails_Test_Query {\n  sale(id: \"xxx\") {\n    ...AuctionArtworksRail_sale\n    id\n  }\n}\n\nfragment AuctionArtworksRail_sale on Sale {\n  internalID\n  href\n  name\n  formattedStartDateTime\n}\n"
  }
};
})();
(node as any).hash = '092e59ff9bb3d5d380f453d44b896f94';
export default node;
