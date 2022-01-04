/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type search2Routes_Search2ResultsQueryVariables = {};
export type search2Routes_Search2ResultsQueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"Search2Results_system">;
    } | null;
};
export type search2Routes_Search2ResultsQuery = {
    readonly response: search2Routes_Search2ResultsQueryResponse;
    readonly variables: search2Routes_Search2ResultsQueryVariables;
};



/*
query search2Routes_Search2ResultsQuery {
  system {
    ...Search2Results_system
  }
}

fragment Search2Indices_algolia on Algolia {
  indices {
    displayName
    key
    name
  }
}

fragment Search2ResultsList_algolia on Algolia {
  indices {
    displayName
    name
  }
}

fragment Search2Results_system on System {
  algolia {
    apiKey
    appID
    indices {
      displayName
      name
    }
    ...Search2Indices_algolia
    ...Search2ResultsList_algolia
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "search2Routes_Search2ResultsQuery",
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
            "name": "Search2Results_system"
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
    "name": "search2Routes_Search2ResultsQuery",
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
    "name": "search2Routes_Search2ResultsQuery",
    "operationKind": "query",
    "text": "query search2Routes_Search2ResultsQuery {\n  system {\n    ...Search2Results_system\n  }\n}\n\nfragment Search2Indices_algolia on Algolia {\n  indices {\n    displayName\n    key\n    name\n  }\n}\n\nfragment Search2ResultsList_algolia on Algolia {\n  indices {\n    displayName\n    name\n  }\n}\n\nfragment Search2Results_system on System {\n  algolia {\n    apiKey\n    appID\n    indices {\n      displayName\n      name\n    }\n    ...Search2Indices_algolia\n    ...Search2ResultsList_algolia\n  }\n}\n"
  }
};
(node as any).hash = '2281ffcf5b4dd04b404ce3658cec2b3a';
export default node;
