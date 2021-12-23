/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlgoliaIndices_Test_QueryVariables = {};
export type AlgoliaIndices_Test_QueryResponse = {
    readonly system: {
        readonly algolia: {
            readonly " $fragmentRefs": FragmentRefs<"AlgoliaIndices_algolia">;
        } | null;
    } | null;
};
export type AlgoliaIndices_Test_QueryRawResponse = {
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
export type AlgoliaIndices_Test_Query = {
    readonly response: AlgoliaIndices_Test_QueryResponse;
    readonly variables: AlgoliaIndices_Test_QueryVariables;
    readonly rawResponse: AlgoliaIndices_Test_QueryRawResponse;
};



/*
query AlgoliaIndices_Test_Query {
  system {
    algolia {
      ...AlgoliaIndices_algolia
    }
  }
}

fragment AlgoliaIndices_algolia on Algolia {
  indices {
    displayName
    key
    name
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AlgoliaIndices_Test_Query",
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
                "name": "AlgoliaIndices_algolia"
              }
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlgoliaIndices_Test_Query",
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
    "id": null,
    "metadata": {},
    "name": "AlgoliaIndices_Test_Query",
    "operationKind": "query",
    "text": "query AlgoliaIndices_Test_Query {\n  system {\n    algolia {\n      ...AlgoliaIndices_algolia\n    }\n  }\n}\n\nfragment AlgoliaIndices_algolia on Algolia {\n  indices {\n    displayName\n    key\n    name\n  }\n}\n"
  }
};
(node as any).hash = 'c8c9cea2b43afe976bced36a23a9a626';
export default node;
