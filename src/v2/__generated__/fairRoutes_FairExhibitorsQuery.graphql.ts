/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type fairRoutes_FairExhibitorsQueryVariables = {
    slug: string;
};
export type fairRoutes_FairExhibitorsQueryResponse = {
    readonly fair: {
        readonly " $fragmentRefs": FragmentRefs<"FairExhibitors_fair">;
    } | null;
};
export type fairRoutes_FairExhibitorsQuery = {
    readonly response: fairRoutes_FairExhibitorsQueryResponse;
    readonly variables: fairRoutes_FairExhibitorsQueryVariables;
};



/*
query fairRoutes_FairExhibitorsQuery(
  $slug: String!
) {
  fair(id: $slug) @principalField {
    ...FairExhibitors_fair
    id
  }
}

fragment ExhibitorsLetterNav_fair on Fair {
  exhibitorsGroupedByName {
    letter
  }
}

fragment FairExhibitorCard_exhibitor on FairExhibitor {
  profileID
  partner {
    name
    internalID
    slug
    cities
    profile {
      ...FollowProfileButton_profile
      icon {
        cropped(width: 50, height: 50) {
          src
          srcSet
        }
      }
      id
    }
    id
  }
}

fragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {
  exhibitors {
    partner {
      internalID
      id
    }
    ...FairExhibitorCard_exhibitor
  }
}

fragment FairExhibitors_fair on Fair {
  exhibitorsGroupedByName {
    letter
    exhibitors {
      partnerID
    }
    ...FairExhibitorsGroup_exhibitorsGroup
  }
  ...ExhibitorsLetterNav_fair
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
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
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairRoutes_FairExhibitorsQuery",
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fairRoutes_FairExhibitorsQuery",
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
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "partner",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cities",
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
                          (v3/*: any*/),
                          (v5/*: any*/),
                          (v4/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": "is_followed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFollowed",
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
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 50
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 50
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
                                "storageKey": "cropped(height:50,width:50)"
                              }
                            ],
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
                    "args": null,
                    "kind": "ScalarField",
                    "name": "profileID",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "fairRoutes_FairExhibitorsQuery",
    "operationKind": "query",
    "text": "query fairRoutes_FairExhibitorsQuery(\n  $slug: String!\n) {\n  fair(id: $slug) @principalField {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment ExhibitorsLetterNav_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n  }\n}\n\nfragment FairExhibitorCard_exhibitor on FairExhibitor {\n  profileID\n  partner {\n    name\n    internalID\n    slug\n    cities\n    profile {\n      ...FollowProfileButton_profile\n      icon {\n        cropped(width: 50, height: 50) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {\n  exhibitors {\n    partner {\n      internalID\n      id\n    }\n    ...FairExhibitorCard_exhibitor\n  }\n}\n\nfragment FairExhibitors_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n    exhibitors {\n      partnerID\n    }\n    ...FairExhibitorsGroup_exhibitorsGroup\n  }\n  ...ExhibitorsLetterNav_fair\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n"
  }
};
})();
(node as any).hash = 'b8df584a7350aafbf64963fc92954dec';
export default node;
