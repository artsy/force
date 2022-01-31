/**
 * @generated SignedSource<<9eb58f7cb54a68af4766fcf40a8c3f74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesProfiles_test_Query$variables = {
  after?: string | null;
};
export type SettingsSavesProfiles_test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsSavesProfiles_me">;
  } | null;
};
export type SettingsSavesProfiles_test_Query = {
  variables: SettingsSavesProfiles_test_Query$variables;
  response: SettingsSavesProfiles_test_Query$data;
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
        {
          "kind": "Literal",
          "name": "height",
          "value": 45
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 45
        }
      ],
      "concreteType": "CroppedImageUrl",
      "kind": "LinkedField",
      "name": "cropped",
      "plural": false,
      "selections": [
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
      "storageKey": "cropped(height:45,width:45)"
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initials",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": "is_followed",
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowed",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowed",
  "storageKey": null
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "href",
                                "storageKey": null
                              },
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "owner",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v4/*: any*/),
                                      (v8/*: any*/),
                                      (v5/*: any*/),
                                      (v9/*: any*/),
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
                                        "concreteType": "Profile",
                                        "kind": "LinkedField",
                                        "name": "profile",
                                        "plural": false,
                                        "selections": [
                                          (v10/*: any*/),
                                          (v8/*: any*/),
                                          (v5/*: any*/),
                                          (v4/*: any*/),
                                          (v11/*: any*/),
                                          (v12/*: any*/),
                                          (v6/*: any*/)
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
                                      (v8/*: any*/),
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
                                      (v6/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Profile",
                                        "kind": "LinkedField",
                                        "name": "profile",
                                        "plural": false,
                                        "selections": [
                                          (v10/*: any*/),
                                          (v8/*: any*/),
                                          (v5/*: any*/),
                                          (v4/*: any*/),
                                          (v11/*: any*/),
                                          (v12/*: any*/),
                                          (v9/*: any*/)
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
                                      (v8/*: any*/),
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
                                          (v10/*: any*/),
                                          (v8/*: any*/),
                                          (v5/*: any*/),
                                          (v4/*: any*/),
                                          (v11/*: any*/),
                                          (v12/*: any*/),
                                          (v9/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v10/*: any*/)
                                    ],
                                    "type": "FairOrganizer",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v10/*: any*/)
                                    ],
                                    "type": "Node",
                                    "abstractKey": "__isNode"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/),
                          (v7/*: any*/)
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
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "162d4b177b0206f6f14ceefbb2d128d7",
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
        "me.followsAndSaves.profilesConnection.edges.cursor": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowedProfile"
        },
        "me.followsAndSaves.profilesConnection.edges.node.__typename": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.id": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.internalID": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Profile"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar.cropped": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar.cropped.src": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.avatar.cropped.srcSet": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.href": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.id": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.name": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProfileOwnerType"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.__isNode": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.__typename": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar.cropped": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar.cropped.src": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.avatar.cropped.srcSet": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.endAt": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.fairsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FairConnection"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.fairsConnection.totalCount": (v18/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.id": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.initials": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.internalID": (v14/*: any*/),
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
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection.edges.node.city": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.locationsConnection.edges.node.id": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.name": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar": (v15/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar.cropped": (v16/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar.cropped.src": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.avatar.cropped.srcSet": (v13/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.id": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.initials": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.internalID": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.isFollowed": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.is_followed": (v19/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.name": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.profile.slug": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.slug": (v14/*: any*/),
        "me.followsAndSaves.profilesConnection.edges.node.profile.owner.startAt": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.followsAndSaves.profilesConnection.pageInfo.endCursor": (v17/*: any*/),
        "me.followsAndSaves.profilesConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.followsAndSaves.profilesConnection.totalCount": (v18/*: any*/),
        "me.id": (v14/*: any*/)
      }
    },
    "name": "SettingsSavesProfiles_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesProfiles_test_Query(\n  $after: String\n) {\n  me {\n    ...SettingsSavesProfiles_me_WGPvJ\n    id\n  }\n}\n\nfragment FairEntityHeader_fair on Fair {\n  internalID\n  slug\n  name\n  startAt(format: \"MMM Do\")\n  endAt(format: \"MMM Do YYYY\")\n  avatar: image {\n    cropped(width: 45, height: 45) {\n      src\n      srcSet\n    }\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    initials\n    id\n  }\n}\n\nfragment FairOrganizerEntityHeader_fairOrganizer on FairOrganizer {\n  internalID\n  slug\n  name\n  fairsConnection {\n    totalCount\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    initials\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerEntityHeader_partner on Partner {\n  internalID\n  slug\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment SettingsSavesProfiles_me_WGPvJ on Me {\n  followsAndSaves {\n    profilesConnection(first: 12, after: $after) {\n      totalCount\n      edges {\n        node {\n          internalID\n          profile {\n            name\n            href\n            avatar: image {\n              cropped(width: 45, height: 45) {\n                src\n                srcSet\n              }\n            }\n            owner {\n              __typename\n              ... on Partner {\n                ...PartnerEntityHeader_partner\n              }\n              ... on Fair {\n                ...FairEntityHeader_fair\n              }\n              ... on FairOrganizer {\n                ...FairOrganizerEntityHeader_fairOrganizer\n                id\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            id\n          }\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "115eb231b4a2bc92c6021746f0858100";

export default node;
