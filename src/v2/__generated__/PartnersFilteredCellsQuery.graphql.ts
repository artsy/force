/**
 * @generated SignedSource<<497e1768469e92462b38551a57612364>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersFilteredCellsQuery$variables = {
  after?: string | null;
  near?: string | null;
  category?: ReadonlyArray<string | null> | null;
  type?: ReadonlyArray<PartnerClassification | null> | null;
};
export type PartnersFilteredCellsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersFilteredCells_viewer">;
  } | null;
};
export type PartnersFilteredCellsQuery = {
  variables: PartnersFilteredCellsQuery$variables;
  response: PartnersFilteredCellsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "category"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "near"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v4 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v5 = {
  "kind": "Variable",
  "name": "near",
  "variableName": "near"
},
v6 = {
  "kind": "Variable",
  "name": "type",
  "variableName": "type"
},
v7 = [
  (v4/*: any*/),
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
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  },
  (v5/*: any*/),
  {
    "kind": "Variable",
    "name": "partnerCategories",
    "variableName": "category"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "RANDOM_SCORE_DESC"
  },
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
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
              (v4/*: any*/),
              {
                "kind": "Variable",
                "name": "category",
                "variableName": "category"
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersFilteredCells_viewer"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
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
            "args": (v7/*: any*/),
            "concreteType": "PartnerConnection",
            "kind": "LinkedField",
            "name": "partnersConnection",
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
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
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
                          (v10/*: any*/),
                          (v9/*: any*/),
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
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v8/*: any*/),
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
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
            "args": (v7/*: any*/),
            "filters": [
              "defaultProfilePublic",
              "eligibleForListing",
              "near",
              "partnerCategories",
              "sort",
              "type"
            ],
            "handle": "connection",
            "key": "PartnersFilteredCells_partnersConnection",
            "kind": "LinkedHandle",
            "name": "partnersConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "260bf0a240a15c5c8aa77980d67f55a1",
    "id": null,
    "metadata": {},
    "name": "PartnersFilteredCellsQuery",
    "operationKind": "query",
    "text": "query PartnersFilteredCellsQuery(\n  $after: String\n  $near: String\n  $category: [String]\n  $type: [PartnerClassification]\n) {\n  viewer {\n    ...PartnersFilteredCells_viewer_iDCAR\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerCell_partner on Partner {\n  internalID\n  slug\n  name\n  href\n  initials\n  locationsConnection(first: 15) {\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n  categories {\n    name\n    slug\n    id\n  }\n  profile {\n    ...FollowProfileButton_profile\n    isFollowed\n    image {\n      cropped(width: 445, height: 334, version: [\"wide\", \"large\", \"featured\", \"larger\"]) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n}\n\nfragment PartnersFilteredCells_viewer_iDCAR on Viewer {\n  partnersConnection(after: $after, defaultProfilePublic: true, eligibleForListing: true, first: 12, near: $near, partnerCategories: $category, sort: RANDOM_SCORE_DESC, type: $type) {\n    totalCount\n    edges {\n      node {\n        internalID\n        ...PartnerCell_partner\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "40643de86cc477764755f3806a559c93";

export default node;
