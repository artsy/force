/* tslint:disable */
/* eslint-disable */

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
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectionsHubsHomepageNavQuery",
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
            "name": "CollectionsHubsHomepageNav_marketingHubCollections"
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
    "name": "CollectionsHubsHomepageNavQuery",
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
    "name": "CollectionsHubsHomepageNavQuery",
    "operationKind": "query",
    "text": "query CollectionsHubsHomepageNavQuery {\n  marketingHubCollections {\n    ...CollectionsHubsHomepageNav_marketingHubCollections\n    id\n  }\n}\n\nfragment CollectionsHubsHomepageNav_marketingHubCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n"
  }
};
(node as any).hash = '7e2b35da19e4803e18aca235288f1303';
export default node;
