/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingOrderedSetQueryVariables = {
    key: string;
};
export type OnboardingOrderedSetQueryResponse = {
    readonly orderedSets: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"OnboardingOrderedSet_orderedSet">;
    } | null> | null;
};
export type OnboardingOrderedSetQuery = {
    readonly response: OnboardingOrderedSetQueryResponse;
    readonly variables: OnboardingOrderedSetQueryVariables;
};



/*
query OnboardingOrderedSetQuery(
  $key: String!
) {
  orderedSets(key: $key) {
    ...OnboardingOrderedSet_orderedSet
    id
  }
}

fragment OnboardingOrderedSet_orderedSet on OrderedSet {
  orderedItemsConnection(first: 50) {
    edges {
      node {
        __typename
        ... on Artist {
          name
          slug
          internalID
          image {
            imageURL
            internalID
          }
          formattedNationalityAndBirthday
        }
        ... on Node {
          __isNode: __typename
          id
        }
        ... on FeaturedLink {
          id
        }
        ... on Profile {
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "key"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "key",
    "variableName": "key"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingOrderedSetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OnboardingOrderedSet_orderedSet"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OnboardingOrderedSetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSets",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              }
            ],
            "concreteType": "OrderedSetItemConnection",
            "kind": "LinkedField",
            "name": "orderedItemsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "OrderedSetItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
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
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "imageURL",
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "formattedNationalityAndBirthday",
                            "storageKey": null
                          }
                        ],
                        "type": "Artist",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
                        "type": "FeaturedLink",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v4/*: any*/),
                        "type": "Profile",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orderedItemsConnection(first:50)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1914701cbeff220c2aebeaf33ca65327",
    "id": null,
    "metadata": {},
    "name": "OnboardingOrderedSetQuery",
    "operationKind": "query",
    "text": "query OnboardingOrderedSetQuery(\n  $key: String!\n) {\n  orderedSets(key: $key) {\n    ...OnboardingOrderedSet_orderedSet\n    id\n  }\n}\n\nfragment OnboardingOrderedSet_orderedSet on OrderedSet {\n  orderedItemsConnection(first: 50) {\n    edges {\n      node {\n        __typename\n        ... on Artist {\n          name\n          slug\n          internalID\n          image {\n            imageURL\n            internalID\n          }\n          formattedNationalityAndBirthday\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n        ... on Profile {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1f698c68f9f2741b52867749c6466971';
export default node;
