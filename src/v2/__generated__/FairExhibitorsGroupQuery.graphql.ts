/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroupQueryVariables = {
    ids?: Array<string> | null;
};
export type FairExhibitorsGroupQueryResponse = {
    readonly partnersConnection: {
        readonly " $fragmentRefs": FragmentRefs<"FairExhibitorsGroup_partnersConnection">;
    } | null;
};
export type FairExhibitorsGroupQuery = {
    readonly response: FairExhibitorsGroupQueryResponse;
    readonly variables: FairExhibitorsGroupQueryVariables;
};



/*
query FairExhibitorsGroupQuery(
  $ids: [String!]
) {
  partnersConnection(ids: $ids) {
    ...FairExhibitorsGroup_partnersConnection
  }
}

fragment FairExhibitorCard_partner on Partner {
  name
  href
  internalID
  slug
  profile {
    ...FollowProfileButton_profile
    icon {
      cropped(width: 50, height: 50) {
        src
        srcSet
      }
    }
    image {
      url(version: "medium")
    }
    id
  }
  locations: locationsConnection(first: 20) {
    totalCount
    edges {
      node {
        city
        id
      }
    }
  }
}

fragment FairExhibitorsGroup_partnersConnection on PartnerConnection {
  edges {
    node {
      ...FairExhibitorCard_partner
      id
    }
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
    "name": "ids",
    "type": "[String!]"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ids",
    "variableName": "ids"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairExhibitorsGroupQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PartnerConnection",
        "kind": "LinkedField",
        "name": "partnersConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairExhibitorsGroup_partnersConnection"
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
    "name": "FairExhibitorsGroupQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PartnerConnection",
        "kind": "LinkedField",
        "name": "partnersConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
                  (v3/*: any*/),
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
                      (v4/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
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
                      },
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
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "medium"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"medium\")"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "locations",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 20
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
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      },
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
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "locationsConnection(first:20)"
                  },
                  (v5/*: any*/)
                ],
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
    "id": null,
    "metadata": {},
    "name": "FairExhibitorsGroupQuery",
    "operationKind": "query",
    "text": "query FairExhibitorsGroupQuery(\n  $ids: [String!]\n) {\n  partnersConnection(ids: $ids) {\n    ...FairExhibitorsGroup_partnersConnection\n  }\n}\n\nfragment FairExhibitorCard_partner on Partner {\n  name\n  href\n  internalID\n  slug\n  profile {\n    ...FollowProfileButton_profile\n    icon {\n      cropped(width: 50, height: 50) {\n        src\n        srcSet\n      }\n    }\n    image {\n      url(version: \"medium\")\n    }\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment FairExhibitorsGroup_partnersConnection on PartnerConnection {\n  edges {\n    node {\n      ...FairExhibitorCard_partner\n      id\n    }\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n"
  }
};
})();
(node as any).hash = 'f3bc96cae7287d61f9b996ba2c9050fc';
export default node;
