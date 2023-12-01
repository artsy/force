/**
 * @generated SignedSource<<88df49550551d9ce046abcd353cf69f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesProfiles_test_Query$variables = {
  after?: string | null | undefined;
};
export type SettingsSavesProfiles_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesProfiles_me">;
  } | null | undefined;
};
export type SettingsSavesProfiles_test_Query = {
  response: SettingsSavesProfiles_test_Query$data;
  variables: SettingsSavesProfiles_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "name": "href",
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
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsSavesProfiles_test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "SettingsSavesProfiles_me"
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
    "name": "SettingsSavesProfiles_test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FollowsAndSaves",
            "kind": "LinkedField",
            "name": "followsAndSaves",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "FollowedProfileConnection",
                "kind": "LinkedField",
                "name": "profilesConnection",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FollowedProfileEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowedProfile",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Profile",
                            "kind": "LinkedField",
                            "name": "profile",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "owner",
                                "plural": false,
                                "selections": [
                                  (v11/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v4/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "type",
                                        "storageKey": null
                                      },
                                      (v12/*: any*/),
                                      (v6/*: any*/),
                                      (v5/*: any*/),
                                      (v13/*: any*/),
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
                                                  (v14/*: any*/)
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
                                          (v12/*: any*/),
                                          (v14/*: any*/)
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
                                          (v4/*: any*/),
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
                                          (v14/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "Partner",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v4/*: any*/),
                                      (v6/*: any*/),
                                      (v5/*: any*/),
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "format",
                                            "value": "MMM Do"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "startAt",
                                        "storageKey": "startAt(format:\"MMM Do\")"
                                      },
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "format",
                                            "value": "MMM Do YYYY"
                                          }
                                        ],
                                        "kind": "ScalarField",
                                        "name": "endAt",
                                        "storageKey": "endAt(format:\"MMM Do YYYY\")"
                                      },
                                      (v10/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Profile",
                                        "kind": "LinkedField",
                                        "name": "profile",
                                        "plural": false,
                                        "selections": [
                                          (v4/*: any*/),
                                          (v13/*: any*/),
                                          (v14/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "Fair",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v4/*: any*/),
                                      (v12/*: any*/),
                                      (v5/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "FairConnection",
                                        "kind": "LinkedField",
                                        "name": "fairsConnection",
                                        "plural": false,
                                        "selections": [
                                          (v3/*: any*/)
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
                                          (v4/*: any*/),
                                          (v6/*: any*/),
                                          (v13/*: any*/),
                                          (v10/*: any*/),
                                          (v14/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v14/*: any*/)
                                    ],
                                    "type": "FairOrganizer",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v14/*: any*/)
                                    ],
                                    "type": "Node",
                                    "abstractKey": "__isNode"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v14/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "SettingsSavesProfiles_profilesConnection",
                "kind": "LinkedHandle",
                "name": "profilesConnection"
              }
            ],
            "storageKey": null
          },
          (v14/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d9284d01a004eeb873b270b50d73164e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.followsAndSaves": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowsAndSaves"
        },
        "me.followsAndSaves.profilesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowedProfileConnection"
        },
        "me.followsAndSaves.profilesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FollowedProfileEdge"
        },
        "me.followsAndSaves.profilesConnection.edges.cursor": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowedProfile"
        },
        "me.followsAndSaves.profilesConnection.edges.node.__typename": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.internalID": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Profile"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar.cropped": (v18/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar.cropped.src": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar.cropped.srcSet": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.href": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.id": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.name": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.__isNode": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.__typename": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar.cropped": (v18/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar.cropped.src": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar.cropped.srcSet": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.categories.id": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.categories.name": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.categories.slug": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.endAt": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.fairsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairConnection"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.fairsConnection.totalCount": (v20/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.href": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.id": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.initials": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.internalID": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection.edges.node.city": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection.edges.node.id": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.name": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar.cropped": (v18/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar.cropped.src": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar.cropped.srcSet": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.href": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.icon": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.icon.cropped": (v18/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.icon.cropped.src": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.icon.cropped.srcSet": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.id": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.initials": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.internalID": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.slug": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.startAt": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.type": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.followsAndSaves.profilesConnection.pageInfo.endCursor": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.followsAndSaves.profilesConnection.totalCount": (v20/*: any*/),
        "me.id": (v16/*: any*/)
      }
    },
    "name": "SettingsSavesProfiles_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesProfiles_test_Query(\n  $after: String\n) {\n  me {\n    ...SettingsSavesProfiles_me_WGPvJ\n    id\n  }\n}\n\nfragment EntityHeaderFairOrganizer_fairOrganizer on FairOrganizer {\n  internalID\n  slug\n  name\n  fairsConnection {\n    totalCount\n  }\n  profile {\n    internalID\n    href\n    initials\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment EntityHeaderFair_fair on Fair {\n  internalID\n  href\n  name\n  startAt(format: \"MMM Do\")\n  endAt(format: \"MMM Do YYYY\")\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  profile {\n    internalID\n    initials\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    internalID\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment SettingsSavesProfiles_me_WGPvJ on Me {\n  followsAndSaves {\n    profilesConnection(first: 12, after: $after) {\n      totalCount\n      edges {\n        node {\n          internalID\n          profile {\n            name\n            href\n            avatar: image {\n              cropped(width: 45, height: 45) {\n                src\n                srcSet\n              }\n            }\n            owner {\n              __typename\n              ... on Partner {\n                ...EntityHeaderPartner_partner\n              }\n              ... on Fair {\n                ...EntityHeaderFair_fair\n              }\n              ... on FairOrganizer {\n                ...EntityHeaderFairOrganizer_fairOrganizer\n                id\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "115eb231b4a2bc92c6021746f0858100";

export default node;
