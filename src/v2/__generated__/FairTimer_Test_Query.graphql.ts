/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairTimer_Test_QueryVariables = {};
export type FairTimer_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairTimer_fair">;
    } | null;
};
export type FairTimer_Test_Query = {
    readonly response: FairTimer_Test_QueryResponse;
    readonly variables: FairTimer_Test_QueryVariables;
};



/*
query FairTimer_Test_Query {
  fair(id: "example") {
    ...FairTimer_fair
    id
  }
}

fragment FairTimer_fair on Fair {
  endAt
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FairTimer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairTimer_fair"
          }
        ],
        "storageKey": "fair(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FairTimer_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endAt",
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
        "storageKey": "fair(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "de1c2ffe9f192b0a09d1e5757b6ddf88",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.endAt": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "fair.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "FairTimer_Test_Query",
    "operationKind": "query",
    "text": "query FairTimer_Test_Query {\n  fair(id: \"example\") {\n    ...FairTimer_fair\n    id\n  }\n}\n\nfragment FairTimer_fair on Fair {\n  endAt\n}\n"
  }
};
})();
(node as any).hash = '64730289506a51ba11082469a99e4a0b';
export default node;
