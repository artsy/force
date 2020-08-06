/* tslint:disable */

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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsHubsNavQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingHubCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CollectionsHubsNav_marketingHubCollections",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsHubsNavQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingHubCollections",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollection",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "thumbnail",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionsHubsNavQuery",
    "id": null,
    "text": "query CollectionsHubsNavQuery {\n  marketingHubCollections {\n    ...CollectionsHubsNav_marketingHubCollections\n    id\n  }\n}\n\nfragment CollectionsHubsNav_marketingHubCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'e5ed35dc266541269a05a2a638814af6';
export default node;
