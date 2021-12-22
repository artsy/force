/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type algoliaRoutes_AlgoliaQueryVariables = {};
export type algoliaRoutes_AlgoliaQueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"AlgoliaApp_system">;
    } | null;
};
export type algoliaRoutes_AlgoliaQuery = {
    readonly response: algoliaRoutes_AlgoliaQueryResponse;
    readonly variables: algoliaRoutes_AlgoliaQueryVariables;
};



/*
query algoliaRoutes_AlgoliaQuery {
  system {
    ...AlgoliaApp_system
  }
}

fragment AlgoliaApp_system on System {
  algolia {
    apiKey
    appID
    indices {
      displayName
      name
    }
    ...AlgoliaIndices_algolia
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
    "name": "algoliaRoutes_AlgoliaQuery",
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
            "name": "AlgoliaApp_system"
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
    "name": "algoliaRoutes_AlgoliaQuery",
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
    "name": "algoliaRoutes_AlgoliaQuery",
    "operationKind": "query",
    "text": "query algoliaRoutes_AlgoliaQuery {\n  system {\n    ...AlgoliaApp_system\n  }\n}\n\nfragment AlgoliaApp_system on System {\n  algolia {\n    apiKey\n    appID\n    indices {\n      displayName\n      name\n    }\n    ...AlgoliaIndices_algolia\n  }\n}\n\nfragment AlgoliaIndices_algolia on Algolia {\n  indices {\n    displayName\n    key\n    name\n  }\n}\n"
  }
};
(node as any).hash = 'fe9f7e94981a0a973e5bace060b62840';
export default node;
