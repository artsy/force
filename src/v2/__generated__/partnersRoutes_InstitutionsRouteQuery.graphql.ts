/**
 * @generated SignedSource<<b482f5af5a16a12840b86eed3574d816>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type partnersRoutes_InstitutionsRouteQuery$variables = {};
export type partnersRoutes_InstitutionsRouteQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"InstitutionsRoute_viewer">;
  } | null;
};
export type partnersRoutes_InstitutionsRouteQuery = {
  variables: partnersRoutes_InstitutionsRouteQuery$variables;
  response: partnersRoutes_InstitutionsRouteQuery$data;
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
  "name": "id",
  "storageKey": null
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
  "name": "href",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMM D"
  }
],
v6 = [
  (v2/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "partnersRoutes_InstitutionsRouteQuery",
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
            "name": "InstitutionsRoute_viewer"
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
    "name": "partnersRoutes_InstitutionsRouteQuery",
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
                "name": "id",
                "value": "564e181a258faf3d5c000080"
              }
            ],
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
                          (v0/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
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
                                      (v4/*: any*/),
                                      (v3/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Show",
                                        "kind": "LinkedField",
                                        "name": "featuredShow",
                                        "plural": false,
                                        "selections": [
                                          (v4/*: any*/),
                                          (v3/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "status",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "statusUpdate",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": (v5/*: any*/),
                                            "kind": "ScalarField",
                                            "name": "startAt",
                                            "storageKey": "startAt(format:\"MMM D\")"
                                          },
                                          {
                                            "alias": null,
                                            "args": (v5/*: any*/),
                                            "kind": "ScalarField",
                                            "name": "endAt",
                                            "storageKey": "endAt(format:\"MMM D\")"
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "isOnlineExclusive",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Location",
                                            "kind": "LinkedField",
                                            "name": "location",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "city",
                                                "storageKey": null
                                              },
                                              (v2/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Image",
                                            "kind": "LinkedField",
                                            "name": "coverImage",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": [
                                                  {
                                                    "kind": "Literal",
                                                    "name": "height",
                                                    "value": 500
                                                  },
                                                  {
                                                    "kind": "Literal",
                                                    "name": "version",
                                                    "value": [
                                                      "normalized",
                                                      "larger",
                                                      "large"
                                                    ]
                                                  }
                                                ],
                                                "concreteType": "ResizedImageUrl",
                                                "kind": "LinkedField",
                                                "name": "resized",
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
                                                "storageKey": "resized(height:500,version:[\"normalized\",\"larger\",\"large\"])"
                                              }
                                            ],
                                            "storageKey": null
                                          },
                                          (v2/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "Partner",
                                    "abstractKey": null
                                  },
                                  (v7/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v6/*: any*/),
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
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v6/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": "orderedSet(id:\"564e181a258faf3d5c000080\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "acc42081abd48bef9ba629faeb7f3762",
    "id": null,
    "metadata": {},
    "name": "partnersRoutes_InstitutionsRouteQuery",
    "operationKind": "query",
    "text": "query partnersRoutes_InstitutionsRouteQuery {\n  viewer {\n    ...InstitutionsRoute_viewer\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment InstitutionsRoute_viewer on Viewer {\n  ...PartnersFeaturedCarousel_viewer_3Ao4DD\n}\n\nfragment PartnersFeaturedCarouselCell_profile on Profile {\n  ...FollowProfileButton_profile\n  owner {\n    __typename\n    ... on Partner {\n      internalID\n      href\n      name\n      featuredShow {\n        href\n        name\n        status\n        statusUpdate\n        startAt(format: \"MMM D\")\n        endAt(format: \"MMM D\")\n        isOnlineExclusive\n        location {\n          city\n          id\n        }\n        coverImage {\n          resized(height: 500, version: [\"normalized\", \"larger\", \"large\"]) {\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on FairOrganizer {\n      id\n    }\n  }\n}\n\nfragment PartnersFeaturedCarousel_viewer_3Ao4DD on Viewer {\n  orderedSet(id: \"564e181a258faf3d5c000080\") {\n    orderedItemsConnection(first: 50) {\n      edges {\n        node {\n          __typename\n          ... on Profile {\n            internalID\n            ...PartnersFeaturedCarouselCell_profile\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n          ... on FeaturedLink {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3d638da9726e83cbc4faa0be3fe71145";

export default node;
