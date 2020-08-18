/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsAppTestQueryVariables = {};
export type CollectionsAppTestQueryResponse = {
    readonly marketingCategories: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"Collections_marketingCategories">;
    }>;
};
export type CollectionsAppTestQueryRawResponse = {
    readonly marketingCategories: ReadonlyArray<{
        readonly name: string;
        readonly collections: ReadonlyArray<{
            readonly slug: string;
            readonly headerImage: string | null;
            readonly title: string;
            readonly id: string | null;
        }>;
    }>;
};
export type CollectionsAppTestQuery = {
    readonly response: CollectionsAppTestQueryResponse;
    readonly variables: CollectionsAppTestQueryVariables;
    readonly rawResponse: CollectionsAppTestQueryRawResponse;
};



/*
query CollectionsAppTestQuery {
  marketingCategories {
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
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectionsAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "kind": "LinkedField",
        "name": "marketingCategories",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Collections_marketingCategories"
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
    "name": "CollectionsAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "kind": "LinkedField",
        "name": "marketingCategories",
        "plural": true,
        "selections": [
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
            "concreteType": "MarketingCollection",
            "kind": "LinkedField",
            "name": "collections",
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
                "name": "headerImage",
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
                "name": "id",
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
    "name": "CollectionsAppTestQuery",
    "operationKind": "query",
    "text": "query CollectionsAppTestQuery {\n  marketingCategories {\n    ...Collections_marketingCategories\n  }\n}\n\nfragment Collections_marketingCategories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    id\n  }\n}\n"
  }
};
(node as any).hash = '050582dc3697c03c390f4940c8479191';
export default node;
