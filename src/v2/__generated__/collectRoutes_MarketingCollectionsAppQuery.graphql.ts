/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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

fragment CollectionsCategory_category on MarketingCollectionCategory {
  name
  collections {
    internalID
    slug
    title
    headerImage
    id
  }
}

fragment Collections_marketingCategories on MarketingCollectionCategory {
  name
  ...CollectionsCategory_category
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_MarketingCollectionsAppQuery",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "collectRoutes_MarketingCollectionsAppQuery",
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
                "name": "internalID",
                "storageKey": null
              },
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
                "name": "headerImage",
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
    "cacheID": "2ce39f1a77768173826ade0cceba2503",
    "id": null,
    "metadata": {},
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "operationKind": "query",
    "text": "query collectRoutes_MarketingCollectionsAppQuery {\n  marketingCategories @principalField {\n    ...Collections_marketingCategories\n  }\n}\n\nfragment CollectionsCategory_category on MarketingCollectionCategory {\n  name\n  collections {\n    internalID\n    slug\n    title\n    headerImage\n    id\n  }\n}\n\nfragment Collections_marketingCategories on MarketingCollectionCategory {\n  name\n  ...CollectionsCategory_category\n}\n"
  }
};
(node as any).hash = 'fef524f8337c800a5308955689bca0b6';
export default node;
