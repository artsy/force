/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Search2ResultsList_Test_QueryVariables = {};
export type Search2ResultsList_Test_QueryResponse = {
    readonly system: {
        readonly algolia: {
            readonly " $fragmentRefs": FragmentRefs<"Search2ResultsList_algolia">;
        } | null;
    } | null;
};
export type Search2ResultsList_Test_QueryRawResponse = {
    readonly system: ({
        readonly algolia: ({
            readonly indices: ReadonlyArray<{
                readonly displayName: string;
                readonly name: string;
            }>;
        }) | null;
    }) | null;
};
export type Search2ResultsList_Test_Query = {
    readonly response: Search2ResultsList_Test_QueryResponse;
    readonly variables: Search2ResultsList_Test_QueryVariables;
    readonly rawResponse: Search2ResultsList_Test_QueryRawResponse;
};



/*
query Search2ResultsList_Test_Query {
  system {
    algolia {
      ...Search2ResultsList_algolia
    }
  }
}

fragment Search2ResultsList_algolia on Algolia {
  indices {
    displayName
    name
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Search2ResultsList_Test_Query",
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
                "name": "Search2ResultsList_algolia"
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
    "name": "Search2ResultsList_Test_Query",
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
    "cacheID": "4d8e439fff382ff26cda69769a2c59dc",
    "id": null,
    "metadata": {},
    "name": "Search2ResultsList_Test_Query",
    "operationKind": "query",
    "text": "query Search2ResultsList_Test_Query {\n  system {\n    algolia {\n      ...Search2ResultsList_algolia\n    }\n  }\n}\n\nfragment Search2ResultsList_algolia on Algolia {\n  indices {\n    displayName\n    name\n  }\n}\n"
  }
};
(node as any).hash = 'e75a6a204e1f7701e2889e8a2a758380';
export default node;
