/**
 * @generated SignedSource<<b349135fecc9c1122f323d5469656565>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OnboardingOrderedSet_Test_Query$variables = Record<PropertyKey, never>;
export type OnboardingOrderedSet_Test_Query$data = {
  readonly orderedSet: {
    readonly " $fragmentSpreads": FragmentRefs<"OnboardingOrderedSet_orderedSet">;
  } | null | undefined;
};
export type OnboardingOrderedSet_Test_Query = {
  response: OnboardingOrderedSet_Test_Query$data;
  variables: OnboardingOrderedSet_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "onboarding:test-ordered-set"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v7 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v8 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v10 = {
  "alias": "avatar",
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        (v7/*: any*/),
        (v8/*: any*/)
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": (v9/*: any*/),
      "storageKey": "cropped(height:45,width:45)"
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  (v11/*: any*/)
],
v13 = {
  "kind": "InlineFragment",
  "selections": (v12/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OnboardingOrderedSet_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OnboardingOrderedSet_orderedSet"
          }
        ],
        "storageKey": "orderedSet(id:\"onboarding:test-ordered-set\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OnboardingOrderedSet_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "OrderedSet",
        "kind": "LinkedField",
        "name": "orderedSet",
        "plural": false,
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
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "formattedNationalityAndBirthday",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtistCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "artworks",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "forSaleArtworks",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "coverArtwork",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Artist",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "owner",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "type",
                                    "storageKey": null
                                  },
                                  (v4/*: any*/),
                                  (v3/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "first",
                                        "value": 15
                                      }
                                    ],
                                    "concreteType": "LocationConnection",
                                    "kind": "LinkedField",
                                    "name": "locationsConnection",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "LocationEdge",
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Location",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "city",
                                                "storageKey": null
                                              },
                                              (v11/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "locationsConnection(first:15)"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PartnerCategory",
                                    "kind": "LinkedField",
                                    "name": "categories",
                                    "plural": true,
                                    "selections": [
                                      (v5/*: any*/),
                                      (v4/*: any*/),
                                      (v11/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Profile",
                                    "kind": "LinkedField",
                                    "name": "profile",
                                    "plural": false,
                                    "selections": [
                                      (v2/*: any*/),
                                      (v10/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "icon",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": [
                                              (v7/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "version",
                                                "value": [
                                                  "untouched-png",
                                                  "large",
                                                  "square"
                                                ]
                                              },
                                              (v8/*: any*/)
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v9/*: any*/),
                                            "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v11/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "Partner",
                                "abstractKey": null
                              },
                              (v13/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v12/*: any*/),
                                "type": "FairOrganizer",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v11/*: any*/)
                        ],
                        "type": "Profile",
                        "abstractKey": null
                      },
                      (v13/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v12/*: any*/),
                        "type": "FeaturedLink",
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
          (v11/*: any*/)
        ],
        "storageKey": "orderedSet(id:\"onboarding:test-ordered-set\")"
      }
    ]
  },
  "params": {
    "cacheID": "0a8259b711971be13786b147fc748497",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "orderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "orderedSet.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "OrderedSetItemConnection"
        },
        "orderedSet.orderedItemsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "OrderedSetItemEdge"
        },
        "orderedSet.orderedItemsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSetItem"
        },
        "orderedSet.orderedItemsConnection.edges.node.__isNode": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.__typename": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "orderedSet.orderedItemsConnection.edges.node.counts.artworks": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.counts.forSaleArtworks": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "orderedSet.orderedItemsConnection.edges.node.coverArtwork.avatar": (v17/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.coverArtwork.avatar.cropped": (v18/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.coverArtwork.avatar.cropped.src": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.coverArtwork.avatar.cropped.srcSet": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.coverArtwork.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.formattedNationalityAndBirthday": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.href": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.initials": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.internalID": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.name": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.__isNode": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.__typename": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.name": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.slug": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.href": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.initials": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.internalID": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node.city": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.name": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar": (v17/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped": (v18/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped.src": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped.srcSet": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon": (v17/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon.cropped": (v18/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon.cropped.src": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon.cropped.srcSet": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.id": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.internalID": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.slug": (v14/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.type": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.slug": (v14/*: any*/)
      }
    },
    "name": "OnboardingOrderedSet_Test_Query",
    "operationKind": "query",
    "text": "query OnboardingOrderedSet_Test_Query {\n  orderedSet(id: \"onboarding:test-ordered-set\") {\n    ...OnboardingOrderedSet_orderedSet\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment OnboardingOrderedSet_orderedSet on OrderedSet {\n  orderedItemsConnection(first: 50) {\n    edges {\n      node {\n        __typename\n        ... on Artist {\n          internalID\n          ...EntityHeaderArtist_artist\n        }\n        ... on Profile {\n          internalID\n          owner {\n            __typename\n            ... on Partner {\n              ...EntityHeaderPartner_partner\n            }\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n            ... on FairOrganizer {\n              id\n            }\n          }\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dd0ec315e43e9ea305e6c7fb6b67782c";

export default node;
