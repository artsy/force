/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNavQueryVariables = {};
export type CollectionsHubsNavQueryResponse = {
    readonly marketingHubCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"CollectionsHubsNav_marketingHubCollections">;
    }>;
};
export type CollectionsHubsNavQuery = {
    readonly response: CollectionsHubsNavQueryResponse;
    readonly variables: CollectionsHubsNavQueryVariables;
};



/*
query CollectionsHubsNavQuery {
  marketingHubCollections {
    ...CollectionsHubsNav_marketingHubCollections
    id
  }
}

fragment CollectionsHubsNav_marketingHubCollections on MarketingCollection {
  slug
  title
  thumbnail
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectionsHubsNavQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingHubCollections",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CollectionsHubsNav_marketingHubCollections"
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
    "name": "CollectionsHubsNavQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingHubCollections",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "thumbnail",
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
    "name": "CollectionsHubsNavQuery",
    "operationKind": "query",
    "text": "query CollectionsHubsNavQuery {\n  marketingHubCollections {\n    ...CollectionsHubsNav_marketingHubCollections\n    id\n  }\n}\n\nfragment CollectionsHubsNav_marketingHubCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n"
  }
};
(node as any).hash = 'e5ed35dc266541269a05a2a638814af6';
export default node;
