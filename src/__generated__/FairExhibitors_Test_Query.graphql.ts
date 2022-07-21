/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitors_Test_QueryVariables = {
    id: string;
};
export type FairExhibitors_Test_QueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairExhibitors_fair">;
    } | null;
};
export type FairExhibitors_Test_Query = {
    readonly response: FairExhibitors_Test_QueryResponse;
    readonly variables: FairExhibitors_Test_QueryVariables;
};



/*
query FairExhibitors_Test_Query(
  $id: String!
) {
  fair(id: $id) @principalField {
    ...FairExhibitors_fair
    id
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

fragment FairExhibitorCard_exhibitor on FairExhibitor {
  profileID
  partner {
    ...EntityHeaderPartner_partner
    internalID
    slug
    id
  }
}

fragment FairExhibitorCard_fair on Fair {
  href
}

fragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {
  exhibitors {
    ...FairExhibitorCard_exhibitor
    partner {
      internalID
      id
    }
  }
}

fragment FairExhibitorsGroup_fair on Fair {
  ...FairExhibitorCard_fair
}

fragment FairExhibitors_fair on Fair {
  ...FairExhibitorsGroup_fair
  exhibitorsGroupedByName {
    letter
    exhibitors {
      partnerID
    }
    ...FairExhibitorsGroup_exhibitorsGroup
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  isFollowed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
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
  "name": "internalID",
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
  "name": "id",
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairExhibitors_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairExhibitors_fair"
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
    "name": "FairExhibitors_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "FairExhibitorsGroup",
            "kind": "LinkedField",
            "name": "exhibitorsGroupedByName",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "letter",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FairExhibitor",
                "kind": "LinkedField",
                "name": "exhibitors",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "partnerID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "profileID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v2/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "initials",
                        "storageKey": null
                      },
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
                                  (v6/*: any*/)
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
                          (v6/*: any*/)
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
                          (v6/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFollowed",
                            "storageKey": null
                          },
                          {
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
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "781d78c6067386580f3ea9d974163cf2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.exhibitorsGroupedByName": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairExhibitorsGroup"
        },
        "fair.exhibitorsGroupedByName.exhibitors": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FairExhibitor"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerCategory"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories.name": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.categories.slug": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.href": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.initials": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.internalID": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "LocationConnection"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "LocationEdge"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges.node.city": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.locationsConnection.edges.node.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.name": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar": (v12/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar.cropped": (v13/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar.cropped.src": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.avatar.cropped.srcSet": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon": (v12/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon.cropped": (v13/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon.cropped.src": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.icon.cropped.srcSet": (v14/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.id": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.internalID": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.name": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.slug": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.slug": (v10/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.type": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partnerID": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.profileID": (v11/*: any*/),
        "fair.exhibitorsGroupedByName.letter": (v11/*: any*/),
        "fair.href": (v11/*: any*/),
        "fair.id": (v10/*: any*/)
      }
    },
    "name": "FairExhibitors_Test_Query",
    "operationKind": "query",
    "text": "query FairExhibitors_Test_Query(\n  $id: String!\n) {\n  fair(id: $id) @principalField {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment EntityHeaderPartner_partner on Partner {\n  internalID\n  type\n  slug\n  href\n  name\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    ...FollowProfileButton_profile\n    avatar: image {\n      cropped(width: 45, height: 45) {\n        src\n        srcSet\n      }\n    }\n    icon {\n      cropped(width: 45, height: 45, version: [\"untouched-png\", \"large\", \"square\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment FairExhibitorCard_exhibitor on FairExhibitor {\n  profileID\n  partner {\n    ...EntityHeaderPartner_partner\n    internalID\n    slug\n    id\n  }\n}\n\nfragment FairExhibitorCard_fair on Fair {\n  href\n}\n\nfragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {\n  exhibitors {\n    ...FairExhibitorCard_exhibitor\n    partner {\n      internalID\n      id\n    }\n  }\n}\n\nfragment FairExhibitorsGroup_fair on Fair {\n  ...FairExhibitorCard_fair\n}\n\nfragment FairExhibitors_fair on Fair {\n  ...FairExhibitorsGroup_fair\n  exhibitorsGroupedByName {\n    letter\n    exhibitors {\n      partnerID\n    }\n    ...FairExhibitorsGroup_exhibitorsGroup\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n}\n"
  }
};
})();
(node as any).hash = '6b38f9188e36328f5a3fe8bb93b56862';
export default node;
