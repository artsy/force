/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuaranteeIndex_Test_QueryVariables = {};
export type BuyerGuaranteeIndex_Test_QueryResponse = {
    readonly buyerGuarantee: {
        readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_buyerGuarantee">;
    } | null;
};
export type BuyerGuaranteeIndex_Test_Query = {
    readonly response: BuyerGuaranteeIndex_Test_QueryResponse;
    readonly variables: BuyerGuaranteeIndex_Test_QueryVariables;
};



/*
query BuyerGuaranteeIndex_Test_Query {
  buyerGuarantee: me {
    ...BuyerGuaranteeIndex_buyerGuarantee
    id
  }
}

fragment BuyerGuaranteeIndex_buyerGuarantee on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BuyerGuaranteeIndex_Test_Query",
    "selections": [
      {
        "alias": "buyerGuarantee",
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyerGuaranteeIndex_buyerGuarantee"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BuyerGuaranteeIndex_Test_Query",
    "selections": [
      {
        "alias": "buyerGuarantee",
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
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
            "name": "id",
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
    "name": "BuyerGuaranteeIndex_Test_Query",
    "operationKind": "query",
    "text": "query BuyerGuaranteeIndex_Test_Query {\n  buyerGuarantee: me {\n    ...BuyerGuaranteeIndex_buyerGuarantee\n    id\n  }\n}\n\nfragment BuyerGuaranteeIndex_buyerGuarantee on Me {\n  name\n}\n"
  }
};
(node as any).hash = '08c02fc79b826e4650d6dde2ec5c5c2e';
export default node;
