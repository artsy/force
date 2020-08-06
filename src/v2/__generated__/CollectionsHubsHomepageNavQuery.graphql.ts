/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsHomepageNavQueryVariables = {};
export type CollectionsHubsHomepageNavQueryResponse = {
    readonly marketingHubCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"CollectionsHubsHomepageNav_marketingHubCollections">;
    }>;
};
export type CollectionsHubsHomepageNavQuery = {
    readonly response: CollectionsHubsHomepageNavQueryResponse;
    readonly variables: CollectionsHubsHomepageNavQueryVariables;
};



/*
query CollectionsHubsHomepageNavQuery {
  marketingHubCollections {
    ...CollectionsHubsHomepageNav_marketingHubCollections
    id
  }
}

fragment CollectionsHubsHomepageNav_marketingHubCollections on MarketingCollection {
  slug
  title
  thumbnail
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsHubsHomepageNavQuery",
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
            "name": "CollectionsHubsHomepageNav_marketingHubCollections",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsHubsHomepageNavQuery",
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
    "name": "CollectionsHubsHomepageNavQuery",
    "id": null,
    "text": "query CollectionsHubsHomepageNavQuery {\n  marketingHubCollections {\n    ...CollectionsHubsHomepageNav_marketingHubCollections\n    id\n  }\n}\n\nfragment CollectionsHubsHomepageNav_marketingHubCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '7e2b35da19e4803e18aca235288f1303';
export default node;
