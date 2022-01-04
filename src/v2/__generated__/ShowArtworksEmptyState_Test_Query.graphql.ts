/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowArtworksEmptyState_Test_QueryVariables = {};
export type ShowArtworksEmptyState_Test_QueryResponse = {
    readonly show: {
        readonly " $fragmentRefs": FragmentRefs<"ShowArtworksEmptyState_show">;
    } | null;
};
export type ShowArtworksEmptyState_Test_Query = {
    readonly response: ShowArtworksEmptyState_Test_QueryResponse;
    readonly variables: ShowArtworksEmptyState_Test_QueryVariables;
};



/*
query ShowArtworksEmptyState_Test_Query {
  show(id: "example-show-id") {
    ...ShowArtworksEmptyState_show
    id
  }
}

fragment ShowArtworksEmptyState_show on Show {
  isFairBooth
  status
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example-show-id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShowArtworksEmptyState_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowArtworksEmptyState_show"
          }
        ],
        "storageKey": "show(id:\"example-show-id\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowArtworksEmptyState_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFairBooth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
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
        "storageKey": "show(id:\"example-show-id\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "type": "Show",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.isFairBooth": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "show.status": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "ShowArtworksEmptyState_Test_Query",
    "operationKind": "query",
    "text": "query ShowArtworksEmptyState_Test_Query {\n  show(id: \"example-show-id\") {\n    ...ShowArtworksEmptyState_show\n    id\n  }\n}\n\nfragment ShowArtworksEmptyState_show on Show {\n  isFairBooth\n  status\n}\n"
  }
};
})();
(node as any).hash = '33e95d9ba8f2204ae2a38ff628f28f4a';
export default node;
