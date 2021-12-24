/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type algoliaRoutes_AlgoliaResultsQueryVariables = {};
export type algoliaRoutes_AlgoliaResultsQueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"AlgoliaResults_system">;
    } | null;
};
export type algoliaRoutes_AlgoliaResultsQuery = {
    readonly response: algoliaRoutes_AlgoliaResultsQueryResponse;
    readonly variables: algoliaRoutes_AlgoliaResultsQueryVariables;
};



/*
query algoliaRoutes_AlgoliaResultsQuery {
  system {
    ...AlgoliaResults_system
  }
}

fragment AlgoliaIndices_algolia on Algolia {
  indices {
    displayName
    key
    name
  }
}

fragment AlgoliaResultsList_algolia on Algolia {
  indices {
    displayName
    name
  }
}

fragment AlgoliaResults_system on System {
  algolia {
    apiKey
    appID
    indices {
      displayName
      name
    }
    ...AlgoliaIndices_algolia
    ...AlgoliaResultsList_algolia
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "algoliaRoutes_AlgoliaResultsQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "AlgoliaResults_system"
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
    "name": "algoliaRoutes_AlgoliaResultsQuery",
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
                "kind": "ScalarField",
                "name": "apiKey",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "appID",
                "storageKey": null
              },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
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
    "name": "algoliaRoutes_AlgoliaResultsQuery",
    "operationKind": "query",
    "text": "query algoliaRoutes_AlgoliaResultsQuery {\n  system {\n    ...AlgoliaResults_system\n  }\n}\n\nfragment AlgoliaIndices_algolia on Algolia {\n  indices {\n    displayName\n    key\n    name\n  }\n}\n\nfragment AlgoliaResultsList_algolia on Algolia {\n  indices {\n    displayName\n    name\n  }\n}\n\nfragment AlgoliaResults_system on System {\n  algolia {\n    apiKey\n    appID\n    indices {\n      displayName\n      name\n    }\n    ...AlgoliaIndices_algolia\n    ...AlgoliaResultsList_algolia\n  }\n}\n"
  }
};
(node as any).hash = '608f52c3d031f36f87571add00f22a92';
export default node;
