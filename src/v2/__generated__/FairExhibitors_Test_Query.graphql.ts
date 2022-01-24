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

fragment FairExhibitorCard_exhibitor on FairExhibitor {
  profileID
  partner {
    name
    internalID
    slug
    cities
    profile {
      ...FollowProfileButton_profile
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
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
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
    "cacheID": "f0fc17405b92dd7813a3b9128ce9e549",
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
        "fair.exhibitorsGroupedByName.exhibitors.partner.cities": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.id": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.internalID": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.name": (v7/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.id": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.internalID": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.is_followed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.name": (v7/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.profile.slug": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partner.slug": (v6/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.partnerID": (v7/*: any*/),
        "fair.exhibitorsGroupedByName.exhibitors.profileID": (v7/*: any*/),
        "fair.exhibitorsGroupedByName.letter": (v7/*: any*/),
        "fair.id": (v6/*: any*/)
      }
    },
    "name": "FairExhibitors_Test_Query",
    "operationKind": "query",
    "text": "query FairExhibitors_Test_Query(\n  $id: String!\n) {\n  fair(id: $id) @principalField {\n    ...FairExhibitors_fair\n    id\n  }\n}\n\nfragment FairExhibitorCard_exhibitor on FairExhibitor {\n  profileID\n  partner {\n    name\n    internalID\n    slug\n    cities\n    profile {\n      ...FollowProfileButton_profile\n      id\n    }\n    id\n  }\n}\n\nfragment FairExhibitorsGroup_exhibitorsGroup on FairExhibitorsGroup {\n  exhibitors {\n    partner {\n      internalID\n      id\n    }\n    ...FairExhibitorCard_exhibitor\n  }\n}\n\nfragment FairExhibitors_fair on Fair {\n  exhibitorsGroupedByName {\n    letter\n    exhibitors {\n      partnerID\n    }\n    ...FairExhibitorsGroup_exhibitorsGroup\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n"
  }
};
})();
(node as any).hash = '6b38f9188e36328f5a3fe8bb93b56862';
export default node;
