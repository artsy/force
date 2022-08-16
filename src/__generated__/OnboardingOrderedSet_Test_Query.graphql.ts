/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OnboardingOrderedSet_Test_QueryVariables = {};
export type OnboardingOrderedSet_Test_QueryResponse = {
    readonly orderedSet: {
        readonly " $fragmentRefs": FragmentRefs<"OnboardingOrderedSet_orderedSet">;
    } | null;
};
export type OnboardingOrderedSet_Test_Query = {
    readonly response: OnboardingOrderedSet_Test_QueryResponse;
    readonly variables: OnboardingOrderedSet_Test_QueryVariables;
};



/*
query OnboardingOrderedSet_Test_Query {
  orderedSet(id: "onboarding:test-ordered-set") {
    ...OnboardingOrderedSet_orderedSet
    id
  }
}

fragment EntityHeaderArtist_artist on Artist {
  internalID
  href
  slug
  name
  initials
  formattedNationalityAndBirthday
  counts {
    artworks
    forSaleArtworks
  }
  avatar: image {
    cropped(width: 45, height: 45) {
      src
      srcSet
    }
  }
}

fragment EntityHeaderPartner_partner on Partner {
  internalID
  type
  slug
  href
  name
  initials
  locationsConnection(first: 15) {
    edges {
      node {
        city
        id
      }
    }
  }
  categories {
    name
    slug
    id
  }
  profile {
    ...FollowProfileButton_profile
    avatar: image {
      cropped(width: 45, height: 45) {
        src
        srcSet
      }
    }
    icon {
      cropped(width: 45, height: 45, version: ["untouched-png", "large", "square"]) {
        src
        srcSet
      }
    }
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  isFollowed
}

fragment OnboardingOrderedSet_orderedSet on OrderedSet {
  orderedItemsConnection(first: 50) {
    edges {
      node {
        __typename
        ... on Artist {
          internalID
          ...EntityHeaderArtist_artist
        }
        ... on Profile {
          internalID
          ...FollowProfileButton_profile
          owner {
            __typename
            ... on Partner {
              ...EntityHeaderPartner_partner
            }
            ... on Node {
              __isNode: __typename
              id
            }
            ... on FairOrganizer {
              id
            }
          }
          id
        }
        ... on Node {
          __isNode: __typename
          id
        }
        ... on FeaturedLink {
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
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowed",
  "storageKey": null
},
v13 = [
  (v11/*: any*/)
],
v14 = {
  "kind": "InlineFragment",
  "selections": (v13/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
  "type": "FormattedNumber"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
                          (v10/*: any*/)
                        ],
                        "type": "Artist",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v11/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v12/*: any*/),
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
                                      (v11/*: any*/),
                                      (v4/*: any*/),
                                      (v5/*: any*/),
                                      (v2/*: any*/),
                                      (v12/*: any*/),
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
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "Partner",
                                "abstractKey": null
                              },
                              (v14/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v13/*: any*/),
                                "type": "FairOrganizer",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Profile",
                        "abstractKey": null
                      },
                      (v14/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v13/*: any*/),
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
    "cacheID": "e1e5419dfc12873169f1bf6fb871d95a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "orderedSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderedSet"
        },
        "orderedSet.id": (v15/*: any*/),
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
        "orderedSet.orderedItemsConnection.edges.node.__isNode": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.__typename": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.avatar": (v17/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.avatar.cropped": (v18/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.avatar.cropped.src": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.avatar.cropped.srcSet": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "orderedSet.orderedItemsConnection.edges.node.counts.artworks": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.counts.forSaleArtworks": (v19/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.formattedNationalityAndBirthday": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.href": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.id": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.initials": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.internalID": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.isFollowed": (v21/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.name": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.__isNode": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.__typename": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.id": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.name": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.categories.slug": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.href": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.id": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.initials": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.internalID": (v15/*: any*/),
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
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node.city": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.locationsConnection.edges.node.id": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.name": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar": (v17/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped": (v18/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped.src": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.avatar.cropped.srcSet": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon": (v17/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon.cropped": (v18/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon.cropped.src": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.icon.cropped.srcSet": (v16/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.id": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.internalID": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.isFollowed": (v21/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.name": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.profile.slug": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.slug": (v15/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.owner.type": (v20/*: any*/),
        "orderedSet.orderedItemsConnection.edges.node.slug": (v15/*: any*/)
      }
    },
    "name": "OnboardingOrderedSet_Test_Query",
    "operationKind": "query",
    "text": "query OnboardingOrderedSet_Test_Query {\n  orderedSet(id: \"onboarding:test-ordered-set\") {\n    ...OnboardingOrderedSet_orderedSet\n    id\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    ...FollowProfileButton_profile\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n\nfragment OnboardingOrderedSet_orderedSet on OrderedSet {\n  orderedItemsConnection(first: 50) {\n    edges {\n      node {\n        __typename\n        ... on Artist {\n          internalID\n          ...EntityHeaderArtist_artist\n        }\n        ... on Profile {\n          internalID\n          ...FollowProfileButton_profile\n          owner {\n            __typename\n            ... on Partner {\n              ...EntityHeaderPartner_partner\n            }\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n            ... on FairOrganizer {\n              id\n            }\n          }\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on FeaturedLink {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dd0ec315e43e9ea305e6c7fb6b67782c';
export default node;
