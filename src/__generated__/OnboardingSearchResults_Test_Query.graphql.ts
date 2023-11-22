/**
 * @generated SignedSource<<1db2e248eb5d5e48605347dd1966e8ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OnboardingSearchResults_Test_Query$variables = Record<PropertyKey, never>;
export type OnboardingSearchResults_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"OnboardingSearchResults_viewer">;
  } | null | undefined;
};
export type OnboardingSearchResults_Test_Query = {
  response: OnboardingSearchResults_Test_Query$data;
  variables: OnboardingSearchResults_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "height",
  "value": 45
},
v7 = {
  "kind": "Literal",
  "name": "width",
  "value": 45
},
v8 = [
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
v9 = {
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
        (v6/*: any*/),
        (v7/*: any*/)
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": (v8/*: any*/),
      "storageKey": "cropped(height:45,width:45)"
    }
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  (v10/*: any*/)
],
v12 = {
  "kind": "InlineFragment",
  "selections": (v11/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v18 = {
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
    "name": "OnboardingSearchResults_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OnboardingSearchResults_viewer"
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
    "name": "OnboardingSearchResults_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "entities",
                "value": []
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "mode",
                "value": "AUTOSUGGEST"
              },
              {
                "kind": "Literal",
                "name": "term",
                "value": ""
              }
            ],
            "concreteType": "MatchConnection",
            "kind": "LinkedField",
            "name": "matchConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MatchEdge",
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
                      (v0/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
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
                              (v9/*: any*/),
                              (v10/*: any*/)
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
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "owner",
                            "plural": false,
                            "selections": [
                              (v0/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v1/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "type",
                                    "storageKey": null
                                  },
                                  (v3/*: any*/),
                                  (v2/*: any*/),
                                  (v4/*: any*/),
                                  (v5/*: any*/),
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
                                              (v10/*: any*/)
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
                                      (v4/*: any*/),
                                      (v3/*: any*/),
                                      (v10/*: any*/)
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
                                      (v1/*: any*/),
                                      (v9/*: any*/),
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
                                              (v6/*: any*/),
                                              {
                                                "kind": "Literal",
                                                "name": "version",
                                                "value": [
                                                  "untouched-png",
                                                  "large",
                                                  "square"
                                                ]
                                              },
                                              (v7/*: any*/)
                                            ],
                                            "concreteType": "CroppedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "cropped",
                                            "plural": false,
                                            "selections": (v8/*: any*/),
                                            "storageKey": "cropped(height:45,version:[\"untouched-png\",\"large\",\"square\"],width:45)"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v10/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "Partner",
                                "abstractKey": null
                              },
                              (v12/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v11/*: any*/),
                                "type": "FairOrganizer",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/)
                        ],
                        "type": "Profile",
                        "abstractKey": null
                      },
                      (v12/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v11/*: any*/),
                        "type": "Feature",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v11/*: any*/),
                        "type": "Page",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "matchConnection(entities:[],first:10,mode:\"AUTOSUGGEST\",term:\"\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "008c439237992b08d2e07b8c0f7ea6dc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.matchConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MatchConnection"
        },
        "viewer.matchConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MatchEdge"
        },
        "viewer.matchConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Match"
        },
        "viewer.matchConnection.edges.node.__isNode": (v13/*: any*/),
        "viewer.matchConnection.edges.node.__typename": (v13/*: any*/),
        "viewer.matchConnection.edges.node.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewer.matchConnection.edges.node.counts.artworks": (v14/*: any*/),
        "viewer.matchConnection.edges.node.counts.forSaleArtworks": (v14/*: any*/),
        "viewer.matchConnection.edges.node.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.matchConnection.edges.node.coverArtwork.avatar": (v15/*: any*/),
        "viewer.matchConnection.edges.node.coverArtwork.avatar.cropped": (v16/*: any*/),
        "viewer.matchConnection.edges.node.coverArtwork.avatar.cropped.src": (v13/*: any*/),
        "viewer.matchConnection.edges.node.coverArtwork.avatar.cropped.srcSet": (v13/*: any*/),
        "viewer.matchConnection.edges.node.coverArtwork.id": (v17/*: any*/),
        "viewer.matchConnection.edges.node.formattedNationalityAndBirthday": (v18/*: any*/),
        "viewer.matchConnection.edges.node.href": (v18/*: any*/),
        "viewer.matchConnection.edges.node.id": (v17/*: any*/),
        "viewer.matchConnection.edges.node.initials": (v18/*: any*/),
        "viewer.matchConnection.edges.node.internalID": (v17/*: any*/),
        "viewer.matchConnection.edges.node.name": (v18/*: any*/),
        "viewer.matchConnection.edges.node.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "viewer.matchConnection.edges.node.owner.__isNode": (v13/*: any*/),
        "viewer.matchConnection.edges.node.owner.__typename": (v13/*: any*/),
        "viewer.matchConnection.edges.node.owner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "viewer.matchConnection.edges.node.owner.categories.id": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.categories.name": (v18/*: any*/),
        "viewer.matchConnection.edges.node.owner.categories.slug": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.href": (v18/*: any*/),
        "viewer.matchConnection.edges.node.owner.id": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.initials": (v18/*: any*/),
        "viewer.matchConnection.edges.node.owner.internalID": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "viewer.matchConnection.edges.node.owner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "viewer.matchConnection.edges.node.owner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "viewer.matchConnection.edges.node.owner.locationsConnection.edges.node.city": (v18/*: any*/),
        "viewer.matchConnection.edges.node.owner.locationsConnection.edges.node.id": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.name": (v18/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "viewer.matchConnection.edges.node.owner.profile.avatar": (v15/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.avatar.cropped": (v16/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.avatar.cropped.src": (v13/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.avatar.cropped.srcSet": (v13/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.icon": (v15/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.icon.cropped": (v16/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.icon.cropped.src": (v13/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.icon.cropped.srcSet": (v13/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.id": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.profile.internalID": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.slug": (v17/*: any*/),
        "viewer.matchConnection.edges.node.owner.type": (v18/*: any*/),
        "viewer.matchConnection.edges.node.slug": (v17/*: any*/)
      }
    },
    "name": "OnboardingSearchResults_Test_Query",
    "operationKind": "query",
    "text": "query OnboardingSearchResults_Test_Query {\n  viewer {\n    ...OnboardingSearchResults_viewer\n  }\n}\n\nfragment EntityHeaderArtist_artist on Artist {\n  internalID\n  href\n  slug\n  name\n  initials\n  formattedNationalityAndBirthday\n  counts {\n    artworks\n    forSaleArtworks\n  }\n  coverArtwork {\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment OnboardingSearchResults_viewer on Viewer {\n  matchConnection(term: \"\", entities: [], first: 10, mode: AUTOSUGGEST) {\n    edges {\n      node {\n        __typename\n        ... on Artist {\n          internalID\n          ...EntityHeaderArtist_artist\n        }\n        ... on Profile {\n          internalID\n          owner {\n            __typename\n            ... on Partner {\n              ...EntityHeaderPartner_partner\n            }\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n            ... on FairOrganizer {\n              id\n            }\n          }\n          id\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n        ... on Feature {\n          id\n        }\n        ... on Page {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c8f59847dd93fe5390e434941270456d";

export default node;
