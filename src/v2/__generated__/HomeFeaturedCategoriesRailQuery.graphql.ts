/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedCategoriesRailQueryVariables = {};
export type HomeFeaturedCategoriesRailQueryResponse = {
    readonly marketingHubCollections: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedCategoriesRail_marketingCollections">;
    }>;
};
export type HomeFeaturedCategoriesRailQuery = {
    readonly response: HomeFeaturedCategoriesRailQueryResponse;
    readonly variables: HomeFeaturedCategoriesRailQueryVariables;
};



/*
query HomeFeaturedCategoriesRailQuery {
  marketingHubCollections {
    ...HomeFeaturedCategoriesRail_marketingCollections
    id
  }
}

fragment HomeFeaturedCategoriesRail_marketingCollections on MarketingCollection {
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
    "name": "HomeFeaturedCategoriesRailQuery",
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
            "name": "HomeFeaturedCategoriesRail_marketingCollections"
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
    "name": "HomeFeaturedCategoriesRailQuery",
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
    "name": "HomeFeaturedCategoriesRailQuery",
    "operationKind": "query",
    "text": "query HomeFeaturedCategoriesRailQuery {\n  marketingHubCollections {\n    ...HomeFeaturedCategoriesRail_marketingCollections\n    id\n  }\n}\n\nfragment HomeFeaturedCategoriesRail_marketingCollections on MarketingCollection {\n  slug\n  title\n  thumbnail\n}\n"
  }
};
(node as any).hash = '66d9e324f7e944a3f069a7bd0a8589da';
export default node;
