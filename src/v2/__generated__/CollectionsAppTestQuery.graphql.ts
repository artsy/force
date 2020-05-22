/* tslint:disable */

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
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsAppTestQuery",
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
    "name": "CollectionsAppTestQuery",
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
    "name": "CollectionsAppTestQuery",
    "id": null,
    "text": "query CollectionsAppTestQuery {\n  marketingCategories {\n    ...Collections_marketingCategories\n  }\n}\n\nfragment Collections_marketingCategories on MarketingCollectionCategory {\n  name\n  collections {\n    slug\n    headerImage\n    title\n    id\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = '050582dc3697c03c390f4940c8479191';
export default node;
