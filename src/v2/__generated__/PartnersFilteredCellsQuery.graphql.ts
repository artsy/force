/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersFilteredCellsQueryVariables = {
    near?: string | null;
    category?: Array<string | null> | null;
    type?: Array<PartnerClassification | null> | null;
};
export type PartnersFilteredCellsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersFilteredCells_viewer">;
    } | null;
};
export type PartnersFilteredCellsQuery = {
    readonly response: PartnersFilteredCellsQueryResponse;
    readonly variables: PartnersFilteredCellsQueryVariables;
};



/*
query PartnersFilteredCellsQuery(
  $near: String
  $category: [String]
  $type: [PartnerClassification]
) {
  viewer {
    ...PartnersFilteredCells_viewer_4vwjik
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment PartnerCell_partner on Partner {
  internalID
  slug
  name
  href
  initials
  locationsConnection(first: 15) {
    edges {
      node {
        city
        id
      }
    }
  }
  profile {
    ...FollowProfileButton_profile
    isFollowed
    image {
      cropped(width: 445, height: 334, version: ["wide", "large", "featured", "larger"]) {
        src
        srcSet
      }
    }
    id
  }
}

fragment PartnersFilteredCells_viewer_4vwjik on Viewer {
  filterPartners(aggregations: [TOTAL], defaultProfilePublic: true, eligibleForListing: true, near: $near, page: 1, partnerCategories: $category, size: 12, sort: RANDOM_SCORE_DESC, type: $type) {
    total
    aggregations {
      counts {
        name
        value
        count
      }
    }
    hits {
      internalID
      ...PartnerCell_partner
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "near",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "category",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type",
    "type": "[PartnerClassification]"
  }
],
v1 = {
  "kind": "Variable",
  "name": "near",
  "variableName": "near"
},
v2 = {
  "kind": "Variable",
  "name": "type",
  "variableName": "type"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "slug",
  "storageKey": null
},
v6 = {
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
    "name": "PartnersFilteredCellsQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "category",
                "variableName": "category"
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersFilteredCells_viewer"
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
    "name": "PartnersFilteredCellsQuery",
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
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ]
              },
              {
                "kind": "Literal",
                "name": "defaultProfilePublic",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "eligibleForListing",
                "value": true
              },
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "page",
                "value": 1
              },
              {
                "kind": "Variable",
                "name": "partnerCategories",
                "variableName": "category"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 12
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "RANDOM_SCORE_DESC"
              },
              (v2/*: any*/)
            ],
            "concreteType": "FilterPartners",
            "kind": "LinkedField",
            "name": "filterPartners",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "total",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnersAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
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
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "hits",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "href",
                    "storageKey": null
                  },
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
                    "concreteType": "Profile",
                    "kind": "LinkedField",
                    "name": "profile",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v5/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                        "kind": "ScalarField",
                        "name": "isFollowed",
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
                                "name": "height",
                                "value": 334
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "wide",
                                  "large",
                                  "featured",
                                  "larger"
                                ]
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 445
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
                            "storageKey": "cropped(height:334,version:[\"wide\",\"large\",\"featured\",\"larger\"],width:445)"
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
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnersFilteredCellsQuery",
    "operationKind": "query",
    "text": "query PartnersFilteredCellsQuery(\n  $near: String\n  $category: [String]\n  $type: [PartnerClassification]\n) {\n  viewer {\n    ...PartnersFilteredCells_viewer_4vwjik\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerCell_partner on Partner {\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersFilteredCells_viewer_4vwjik on Viewer {\n  filterPartners(aggregations: [TOTAL], defaultProfilePublic: true, eligibleForListing: true, near: $near, page: 1, partnerCategories: $category, size: 12, sort: RANDOM_SCORE_DESC, type: $type) {\n    total\n    aggregations {\n      counts {\n        name\n        value\n        count\n      }\n    }\n    hits {\n      internalID\n      ...PartnerCell_partner\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c38d039654dfacc2a89d61db506f1073';
export default node;
