/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InquiryAuctionHousesYouWorkWithQueryVariables = {
    term: string;
};
export type InquiryAuctionHousesYouWorkWithQueryResponse = {
    readonly external: {
        readonly auctionHouses: ReadonlyArray<{
            readonly internalID: string;
            readonly name: string;
        }>;
    };
};
export type InquiryAuctionHousesYouWorkWithQuery = {
    readonly response: InquiryAuctionHousesYouWorkWithQueryResponse;
    readonly variables: InquiryAuctionHousesYouWorkWithQueryVariables;
};



/*
query InquiryAuctionHousesYouWorkWithQuery(
  $term: String!
) {
  external {
    auctionHouses(size: 5, term: $term) {
      internalID
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "size",
    "value": 5
  },
  {
    "kind": "Variable",
    "name": "term",
    "variableName": "term"
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryAuctionHousesYouWorkWithQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "External",
        "kind": "LinkedField",
        "name": "external",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ExternalAuctionHouse",
            "kind": "LinkedField",
            "name": "auctionHouses",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
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
    "name": "InquiryAuctionHousesYouWorkWithQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "External",
        "kind": "LinkedField",
        "name": "external",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ExternalAuctionHouse",
            "kind": "LinkedField",
            "name": "auctionHouses",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "InquiryAuctionHousesYouWorkWithQuery",
    "operationKind": "query",
    "text": "query InquiryAuctionHousesYouWorkWithQuery(\n  $term: String!\n) {\n  external {\n    auctionHouses(size: 5, term: $term) {\n      internalID\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f5cacd67efc799a7387e076ab088afda';
export default node;
