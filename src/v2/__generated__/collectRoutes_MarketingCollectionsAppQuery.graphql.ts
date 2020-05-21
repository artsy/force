/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_MarketingCollectionsAppQueryVariables = {};
export type collectRoutes_MarketingCollectionsAppQueryResponse = {
    readonly marketingCategories: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Collections_marketingCategories">;
    }>;
};
export type collectRoutes_MarketingCollectionsAppQuery = {
    readonly response: collectRoutes_MarketingCollectionsAppQueryResponse;
    readonly variables: collectRoutes_MarketingCollectionsAppQueryVariables;
};



/*
query collectRoutes_MarketingCollectionsAppQuery {
  marketingCategories @principalField {
    ...Collections_marketingCategories
  }
}

fragment Collections_marketingCategories on MarketingCollectionCategory {
  name
  collections {
    slug
    headerImage
    title
    id
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCategories",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Collections_marketingCategories",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCategories",
        "storageKey": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "collections",
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
                "name": "headerImage",
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
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "id": null,
    "text": "query collectRoutes_MarketingCollectionsAppQuery {\n  marketingCategories @principalField {\n    ...Collections_marketingCategories\n  }\n}\n\nfragment Collections_marketingCategories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    id\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'fef524f8337c800a5308955689bca0b6';
export default node;
