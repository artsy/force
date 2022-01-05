/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Search2Indices_Test_QueryVariables = {};
export type Search2Indices_Test_QueryResponse = {
    readonly system: {
        readonly algolia: {
            readonly " $fragmentRefs": FragmentRefs<"Search2Indices_algolia">;
        } | null;
    } | null;
};
export type Search2Indices_Test_QueryRawResponse = {
    readonly system: ({
        readonly algolia: ({
            readonly indices: ReadonlyArray<{
                readonly displayName: string;
                readonly key: string;
                readonly name: string;
            }>;
        }) | null;
    }) | null;
};
export type Search2Indices_Test_Query = {
    readonly response: Search2Indices_Test_QueryResponse;
    readonly variables: Search2Indices_Test_QueryVariables;
    readonly rawResponse: Search2Indices_Test_QueryRawResponse;
};



/*
query Search2Indices_Test_Query {
  system {
    algolia {
      ...Search2Indices_algolia
    }
  }
}

fragment Search2Indices_algolia on Algolia {
  indices {
    displayName
    key
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Search2Indices_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Algolia",
            "kind": "LinkedField",
            "name": "algolia",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Search2Indices_algolia"
              }
            ],
            "storageKey": null
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
    "name": "Search2Indices_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Algolia",
            "kind": "LinkedField",
            "name": "algolia",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AlgoliaIndex",
                "kind": "LinkedField",
                "name": "indices",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "displayName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
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
    "cacheID": "a8a58c9b2a4c739571d1c2b5389f8b26",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "system": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "System"
        },
        "system.algolia": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Algolia"
        },
        "system.algolia.indices": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "AlgoliaIndex"
        },
        "system.algolia.indices.displayName": (v0/*: any*/),
        "system.algolia.indices.key": (v0/*: any*/),
        "system.algolia.indices.name": (v0/*: any*/)
      }
    },
    "name": "Search2Indices_Test_Query",
    "operationKind": "query",
    "text": "query Search2Indices_Test_Query {\n  system {\n    algolia {\n      ...Search2Indices_algolia\n    }\n  }\n}\n\nfragment Search2Indices_algolia on Algolia {\n  indices {\n    displayName\n    key\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f2ba4006d3dac54577115f770f667e75';
export default node;
